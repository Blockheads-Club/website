# Run a 24/7 server on a Raspberry Pi

A Raspberry Pi uses little power and can host your world day and night. You will install the ARM build, start it on boot and keep nightly backups.

::: info What you need
- A Raspberry Pi with Raspberry Pi OS (or another Linux), connected to your network
- A terminal on the Pi (directly or over SSH)
- The command-line server from the [releases page](https://github.com/Blockheads-Club/blockheads-server/releases)
:::

## 1. Check 32-bit or 64-bit

Use the `aarch64` build on a 64-bit OS and the `armv7` build on a 32-bit OS. This command tells you which you have:

```sh
uname -m
# aarch64 = 64-bit, armv7l = 32-bit
```

## 2. Download and unpack

These commands use version 0.1.1 and the 64-bit build. Take the newest version from the releases page, and use `armv7-unknown-linux-gnueabihf` instead of `aarch64-unknown-linux-gnu` on a 32-bit OS.

```sh
curl -LO https://github.com/Blockheads-Club/blockheads-server/releases/download/v0.1.1/blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
tar -xzf blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
sudo mv blockheads-server-v0.1.1-aarch64-unknown-linux-gnu /opt/blockheads-server
```

## 3. Create your world

Create the world once by hand. Worlds are saved in `~/GNUstep/Library/ApplicationSupport/TheBlockheads`.

```text
/opt/blockheads-server/blockheads_server --new MYWORLD
# wait for "World load complete.", then type:
/stop
```

::: tip
Without options, the server loads the most recent world. The service below uses that.
:::

## 4. Start it on every boot

Create a systemd service. Replace `pi` with your user name — the one that created the world.

```sh
sudo tee /etc/systemd/system/blockheads.service <<'EOF'
[Unit]
Description=Blockheads server
After=network-online.target
Wants=network-online.target

[Service]
User=pi
ExecStart=/opt/blockheads-server/blockheads_server
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl enable --now blockheads
journalctl -u blockheads -f
```

::: tip
The service has no console. Give commands as an admin in the game chat (see [Admins, mods and bans](./admins-mods)), and watch the log with `journalctl`.
:::

## 5. Keep nightly backups

Copy the world folder only while the server is stopped. This root cron job stops the server at 04:00, packs everything into a dated `.tar.gz` and starts it again. Replace `/home/pi` with your home folder.

```sh
sudo crontab -e
# add this line (one line): every night at 04:00
0 4 * * * systemctl stop blockheads && tar -czf /home/pi/bh-backup-$(date +\%F).tar.gz -C /home/pi/GNUstep/Library/ApplicationSupport TheBlockheads; systemctl start blockheads
```

::: warning
`systemctl stop` ends the server without a final save. The server saves regularly, but the last few seconds can be lost — pick a quiet time.
:::

## If something goes wrong

- **“Exec format error”** — wrong build. Check `uname -m` again.
- **Friends can’t connect** — the same checks as in [Play with friends on the same Wi-Fi](./lan-play).
- Still stuck? [Open an issue on GitHub](https://github.com/Blockheads-Club/blockheads-server/issues) with the `journalctl` output.
