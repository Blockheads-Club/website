# Docker and Docker Compose

Run the server as a container. Worlds live in a volume, so they survive updates.

::: info What you need
- Docker (and Docker Compose if you want it)
- The multi-arch image `ghcr.io/blockheads-club/blockheads-server` (amd64, arm64, arm/v7)
:::

## 1. Create a world

Run the container once with `-it` so you get the console. Worlds go into the `bh-data` volume. Wait for **World load complete.**, then type `/stop`.

```sh
docker run -it --rm -p 15151:15151/udp -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

::: tip
The examples use version 0.1.1. Every release has a version tag; pick the newest one.
:::

## 2. Find the world ID

List the worlds in the volume. The long hex name is the world ID.

```sh
docker run --rm -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --list
# "MYWORLD" stored in directory named 4e834bde…
```

## 3. Run it in the background

Start the world with `--load`. Keep `-i` and `-t` so you can open the console later, and map the port as **UDP**.

```sh
docker run -dit --name blockheads --restart unless-stopped \
    -p 15151:15151/udp -v bh-data:/data \
    ghcr.io/blockheads-club/blockheads-server:0.1.1 --load WORLD_ID
```

## 4. Logs and console

Follow the log, or attach to the console to type commands like `/players` or `/stop`.

```sh
docker logs -f blockheads
docker attach blockheads   # detach: Ctrl+P, Ctrl+Q
```

## 5. Or use Docker Compose

The same setup as a `compose.yaml`. Start it with `docker compose up -d`.

```yaml
services:
  blockheads:
    image: ghcr.io/blockheads-club/blockheads-server:0.1.1
    command: ["--load", "WORLD_ID"]
    ports: ["15151:15151/udp"]
    volumes: ["bh-data:/data"]
    stdin_open: true
    tty: true
    restart: unless-stopped
volumes:
  bh-data:
```

## If something goes wrong

- **The container only prints help** — the image starts with `--help` unless you give options such as `--new` or `--load`.
- **Updating** — stop and remove the container, then run it again with the new tag. The `bh-data` volume keeps your worlds. `docker stop` ends the server without a final save, so stop when nobody is playing.
- **No connection** — the port must be mapped as `15151:15151/udp`.
