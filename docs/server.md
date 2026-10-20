# Server

**Blockheads Server** hosts multiplayer worlds for you and your friends. It is a free, open-source rewrite of the
game’s dedicated server (version 1.7.1), so the game and existing worlds work with it unchanged.

Get it from the [releases page](https://github.com/Blockheads-Club/blockheads-server/releases).

## Desktop app

The easiest way on a computer. Download the app for your system:

| System | File |
| --- | --- |
| Windows | `_x64-setup.exe` (`arm64` for ARM PCs) |
| macOS | `_x64.dmg` (Intel) or `_aarch64.dmg` (Apple Silicon) |
| Linux | `.AppImage`, `.deb` or `.rpm` |

Then:

1. **Create a world** (name, size, expert mode if you like).
2. Press **Start server**.
3. Share the address shown in the app with your friends. There is also a QR code for phones.

In the app you can also see the live console and who is online, and edit the admin, mod, white and black lists.
Port, max players and password are under **Settings**.

## Command line

For servers without a screen, or if you prefer a terminal. Download the archive for your system
(`x86_64`, `aarch64`, or `armv7` for a Raspberry Pi), unpack it and run:

```sh
./blockheads_server --new world1 --port 15151
```

On Windows (PowerShell):

```powershell
.\blockheads_server.exe --new world1 --port 15151
```

Run `--help` for all options. They are the same as in the original server.

Worlds are saved in `GNUstep/Library/ApplicationSupport/TheBlockheads` in your home folder. Set the
`BLOCKHEADS_DATA_DIR` environment variable to use another folder.

## Docker

```sh
docker run -i --rm -p 15151:15151/udp -v bh-data:/data \
  ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

- Keep `-i`, so you can type in the console (`/stop`, chat).
- Your worlds are kept in the `bh-data` volume, so they survive updates.
- The image works on x86_64 and ARM.

## Android

1. Download `blockheads-server-…-android.apk` and open it to install. Android may ask you to allow installs from your
   browser.
2. Create a world and tap **Start server**. The server keeps running in the background; a notification shows its status.
3. Keep the phone charging. If the app asks, turn off battery optimization for it, so Android doesn’t stop it.

## Connect from the game

1. Start the server and note its address and port, for example `192.168.1.42` and port `15151`.
2. In the game, open **Join World → Advanced… → Online IP/Port…**
3. Enter the address and port, then join. If the server has a password, the game asks for it.

::: tip Android players
Modern Android versions of the game need the welcome popup fix from the [Patcher](/patcher) before they can join a
server.
:::

## LAN (same Wi-Fi)

The easiest way to play together is on the same network:

- The phone (or computer) and the server must be on the **same Wi-Fi or network**.
- Use the **LAN address** the server shows (it starts with `192.168.`, `10.` or similar). On a phone, scan the QR
  code to copy it.
- The default port is **15151** (UDP). If friends can’t connect, check the address and port, and allow the server
  through your firewall.

::: warning Playing over the internet?
Forward UDP port 15151 on your router to the server computer and share your public IP. Set a password or use the
whitelist first.
:::
