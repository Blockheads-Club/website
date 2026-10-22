# Raspberry Pi’de 7/24 sunucu çalıştır

Raspberry Pi az enerji harcar ve dünyanı gece gündüz barındırabilir. ARM sürümünü kuracak, açılışta başlatacak ve her gece yedek alacaksın.

::: info Nelere ihtiyacın var
- Ağına bağlı, Raspberry Pi OS (ya da başka bir Linux) kurulu bir Raspberry Pi
- Pi’de bir terminal (doğrudan ya da SSH ile)
- [Sürümler sayfasından](https://github.com/Blockheads-Club/blockheads-server/releases) komut satırı sunucusu
:::

## 1. 32 bit mi 64 bit mi, kontrol et

64 bit sistemde `aarch64`, 32 bit sistemde `armv7` sürümünü kullan. Hangisine sahip olduğunu bu komut söyler:

```sh
uname -m
# aarch64 = 64-bit, armv7l = 32-bit
```

## 2. İndir ve aç

Bu komutlar 0.1.1 sürümünü ve 64 bit yapıyı kullanır. Sürümler sayfasından en yeni sürümü al; 32 bit sistemde `aarch64-unknown-linux-gnu` yerine `armv7-unknown-linux-gnueabihf` kullan.

```sh
curl -LO https://github.com/Blockheads-Club/blockheads-server/releases/download/v0.1.1/blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
tar -xzf blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
sudo mv blockheads-server-v0.1.1-aarch64-unknown-linux-gnu /opt/blockheads-server
```

## 3. Dünyanı oluştur

Dünyayı bir kez elle oluştur. Dünyalar `~/GNUstep/Library/ApplicationSupport/TheBlockheads` klasörüne kaydedilir.

```text
/opt/blockheads-server/blockheads_server --new MYWORLD
# wait for "World load complete.", then type:
/stop
```

::: tip
Seçenek verilmezse sunucu en son dünyayı yükler. Aşağıdaki servis bunu kullanır.
:::

## 4. Her açılışta başlat

Bir systemd servisi oluştur. `pi` yerine dünyayı oluşturan kullanıcının adını yaz.

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
Servisin konsolu yoktur. Komutları oyun sohbetinde yönetici olarak ver (bkz. [Yöneticiler, moderatörler ve yasaklar](./admins-mods)) ve logları `journalctl` ile izle.
:::

## 5. Her gece yedek al

Dünya klasörünü yalnızca sunucu dururken kopyala. Bu root cron görevi sunucuyu 04:00’te durdurur, her şeyi tarihli bir `.tar.gz` dosyasına paketler ve yeniden başlatır. `/home/pi` yerine kendi ev klasörünü yaz.

```sh
sudo crontab -e
# add this line (one line): every night at 04:00
0 4 * * * systemctl stop blockheads && tar -czf /home/pi/bh-backup-$(date +\%F).tar.gz -C /home/pi/GNUstep/Library/ApplicationSupport TheBlockheads; systemctl start blockheads
```

::: warning
`systemctl stop` sunucuyu son kaydı yapmadan kapatır. Sunucu düzenli kaydeder ama son birkaç saniye kaybolabilir — sakin bir saat seç.
:::

## Bir şeyler ters giderse

- **“Exec format error”** — yanlış yapı. `uname -m` ile yeniden kontrol et.
- **Arkadaşlar bağlanamıyor** — [Aynı Wi-Fi ağındaki arkadaşlarınla oyna](./lan-play) rehberindeki kontrollerin aynısı.
- Hâlâ takıldın mı? `journalctl` çıktısıyla [GitHub’da sorun bildir](https://github.com/Blockheads-Club/blockheads-server/issues).
