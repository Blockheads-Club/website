// Test data: the real asset names of the first public releases.
import type { Release, Releases } from '$lib/releases';

function release(repo: string, tag: string, date: string, names: string): Release {
  const url = 'https://github.com/Blockheads-Club/' + repo + '/releases';
  return {
    version: tag.slice(1),
    tag,
    date,
    url: url + '/tag/' + tag,
    assets: names.split(' ').map((name, i) => ({ name, size: 1_000_000 * (i + 1) + 234_567, url: url + '/download/' + tag + '/' + name }))
  };
}

export const RELEASES: Releases = {
  pc: release('blockheads-pc', 'v0.1.0', '2026-10-20T20:50:56Z', 'Blockheads.PC-0.1.0-1.aarch64.rpm Blockheads.PC-0.1.0-1.x86_64.rpm Blockheads.PC_0.1.0_aarch64.AppImage Blockheads.PC_0.1.0_aarch64.dmg Blockheads.PC_0.1.0_amd64.AppImage Blockheads.PC_0.1.0_amd64.deb Blockheads.PC_0.1.0_arm64-setup.exe Blockheads.PC_0.1.0_arm64.deb Blockheads.PC_0.1.0_x64-setup.exe Blockheads.PC_0.1.0_x64.dmg'),
  patcher: release('blockheads-patcher', 'v0.1.1', '2026-10-21T10:44:42Z', 'blockheads-patcher-0.1.1-android-arm.apk blockheads-patcher-0.1.1-android-arm64.apk blockheads-patcher-web-0.1.1.zip Blockheads.Patcher-0.1.1-1.x86_64.rpm Blockheads.Patcher_0.1.1_amd64.AppImage Blockheads.Patcher_0.1.1_amd64.deb Blockheads.Patcher_0.1.1_arm64-setup.exe Blockheads.Patcher_0.1.1_universal.dmg Blockheads.Patcher_0.1.1_x64-setup.exe'),
  server: release('blockheads-server', 'v0.1.1', '2026-10-20T22:00:47Z', 'blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz blockheads-server-v0.1.1-android.apk blockheads-server-v0.1.1-armv7-unknown-linux-gnueabihf.tar.gz blockheads-server-v0.1.1-x86_64-pc-windows-msvc.zip blockheads-server-v0.1.1-x86_64-unknown-linux-gnu.tar.gz Blockheads.Server-0.1.1-1.x86_64.rpm Blockheads.Server_0.1.1_aarch64.dmg Blockheads.Server_0.1.1_amd64.AppImage Blockheads.Server_0.1.1_amd64.deb Blockheads.Server_0.1.1_x64-setup.exe Blockheads.Server_0.1.1_x64.dmg')
};
