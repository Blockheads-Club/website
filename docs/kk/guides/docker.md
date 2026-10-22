# Docker және Docker Compose

Серверді контейнер ретінде іске қосыңыз. Әлемдер томда сақталады, сондықтан жаңартулардан аман қалады.

::: info Не қажет
- Docker (қаласаңыз, Docker Compose да)
- `ghcr.io/blockheads-club/blockheads-server` multi-arch образы (amd64, arm64, arm/v7)
:::

## 1. Әлем жасаңыз

Консоль алу үшін контейнерді бір рет `-it` арқылы іске қосыңыз. Әлемдер `bh-data` томына түседі. **World load complete.** жазуын күтіп, `/stop` теріңіз.

```sh
docker run -it --rm -p 15151:15151/udp -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

::: tip
Мысалдарда 0.1.1 нұсқасы қолданылады. Әр шығарылымның нұсқа тегі бар; ең жаңасын таңдаңыз.
:::

## 2. Әлем ID-ін табыңыз

Томдағы әлемдердің тізімін шығарыңыз. Ұзын hex аты — әлем ID-і.

```sh
docker run --rm -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --list
# "MYWORLD" stored in directory named 4e834bde…
```

## 3. Фонда іске қосыңыз

Әлемді `--load` арқылы іске қосыңыз. Консольді кейін ашу үшін `-i` және `-t` қалдырыңыз, ал портты **UDP** ретінде байланыстырыңыз.

```sh
docker run -dit --name blockheads --restart unless-stopped \
    -p 15151:15151/udp -v bh-data:/data \
    ghcr.io/blockheads-club/blockheads-server:0.1.1 --load WORLD_ID
```

## 4. Журналдар және консоль

Журналды бақылаңыз немесе `/players` не `/stop` сияқты командаларды теру үшін консольге қосылыңыз.

```sh
docker logs -f blockheads
docker attach blockheads   # detach: Ctrl+P, Ctrl+Q
```

## 5. Немесе Docker Compose қолданыңыз

Дәл сол құрылым `compose.yaml` ретінде. Оны `docker compose up -d` арқылы іске қосыңыз.

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

## Бірдеңе дұрыс болмаса

- **Контейнер тек анықтама шығарады** — `--new` немесе `--load` сияқты параметрлер бермесеңіз, образ `--help` арқылы іске қосылады.
- **Жаңарту** — контейнерді тоқтатып, жойыңыз, содан кейін жаңа тегпен қайта іске қосыңыз. `bh-data` томы әлемдеріңізді сақтайды. `docker stop` серверді соңғы сақтаусыз тоқтатады, сондықтан ешкім ойнамай тұрғанда тоқтатыңыз.
- **Қосылым жоқ** — порт `15151:15151/udp` ретінде байланысқан болуы керек.
