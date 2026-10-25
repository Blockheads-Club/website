# FAQ

## Do your tools include the game?

No. None of our tools contain or download game files. You use your own copy of The Blockheads for Android (the APK).
The Server is a rewrite and contains no original game files either.

## Is this legal?

You bring your own, lawfully obtained copy of the game and use it on your own devices. Only patch and play software
you own, and follow the game’s licence and the law in your country.

Blockheads Club is an unofficial fan project. It is not affiliated with, endorsed or sponsored by Majic Jungle
Software or Noodlecake. "The Blockheads" is a trademark of its owner.

## Which game versions work?

The Blockheads PC and the Patcher support the Android game versions **1.7.4, 1.7.5 and 1.7.6**.

## Which platforms are supported?

| Tool | Platforms |
| --- | --- |
| Blockheads PC | Windows, macOS, Linux (x86_64 and arm64) |
| Patcher | Web browser, Windows, macOS, Linux, Android |
| Server | Windows, macOS, Linux (incl. Raspberry Pi), Docker, Android |

## Do I lose my worlds when I patch the game?

Worlds stored on your phone are deleted when you uninstall the original game, so **back them up in the game first**.
Worlds on a server are not affected. Keep your signing key, and later updates install without uninstalling.

## Can patched and original games play together?

Yes. They can join the same servers.

## Is it free?

Yes. Everything is free and open source (GPL-3.0-or-later).

## Why must I uninstall the original game on Android?

The patched game is signed with your own key, not the original one. Android doesn’t allow an app with a different signature to replace an installed app. Back up your worlds first.

## Android says “This app isn’t compatible with the latest version of Android”. Is my patch broken?

No. The Blockheads is a 32-bit app, and Android 14 and newer show this warning for every 32-bit app when it starts. Tap **OK** and the game runs normally. The Patcher can’t remove the warning: that would mean rebuilding the game’s 32-bit code.

Some newer phones (for example Pixel 7 and later) can’t run 32-bit apps at all, so the game won’t start on them, patched or not. On those, play with [Blockheads PC](./pc-port) instead.

## What is a signing key and why keep it?

It proves an app comes from the same source. If you patch again later with the same key, you can install over your patched game and keep your worlds. Export it and store it somewhere safe.

## How many players can join?

From 1 to 32. You choose the limit in Settings.

## My friend can’t connect. What should I check?

Same Wi-Fi, correct address and port, firewall allows the server, and the whitelist (if on) includes their name. [Connection guide](./guides/lan-play)

## Can I run it on an old Android phone?

Yes. Use the Server app, keep the phone charging and allow it to run in the background.

## Can I help?

Yes — report bugs, write guides or translate the apps on GitHub.

## Where do I get help?

- Report a bug or ask a question on GitHub:
  [Blockheads PC](https://github.com/Blockheads-Club/blockheads-pc/issues),
  [Patcher](https://github.com/Blockheads-Club/blockheads-patcher/issues),
  [Server](https://github.com/Blockheads-Club/blockheads-server/issues),
  [Website and docs](https://github.com/Blockheads-Club/website/issues).
- Attach the log from the app when something crashes. It helps us a lot.
