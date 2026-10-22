# Сервер 24/7 на Raspberry Pi

Raspberry Pi потребляет мало энергии и может держать ваш мир днём и ночью. Вы установите сборку для ARM, настроите запуск при загрузке и ночные резервные копии.

::: info Что понадобится
- Raspberry Pi с Raspberry Pi OS (или другим Linux), подключённый к вашей сети
- Терминал на Pi (напрямую или по SSH)
- Консольный сервер со [страницы релизов](https://github.com/Blockheads-Club/blockheads-server/releases)
:::

## 1. Определите, 32 или 64 бита

В 64-битной системе берите сборку `aarch64`, в 32-битной — `armv7`. Какая у вас, подскажет эта команда:

```sh
uname -m
# aarch64 = 64-bit, armv7l = 32-bit
```

## 2. Скачайте и распакуйте

В этих командах используется версия 0.1.1 и 64-битная сборка. Берите самую свежую версию со страницы релизов, а в 32-битной системе вместо `aarch64-unknown-linux-gnu` указывайте `armv7-unknown-linux-gnueabihf`.

```sh
curl -LO https://github.com/Blockheads-Club/blockheads-server/releases/download/v0.1.1/blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
tar -xzf blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
sudo mv blockheads-server-v0.1.1-aarch64-unknown-linux-gnu /opt/blockheads-server
```

## 3. Создайте мир

Один раз создайте мир вручную. Миры сохраняются в `~/GNUstep/Library/ApplicationSupport/TheBlockheads`.

```text
/opt/blockheads-server/blockheads_server --new MYWORLD
# wait for "World load complete.", then type:
/stop
```

::: tip
Без параметров сервер загружает последний мир. Служба ниже использует именно это.
:::

## 4. Запуск при каждой загрузке

Создайте службу systemd. Замените `pi` на ваше имя пользователя — того, кто создавал мир.

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
У службы нет консоли. Команды выполняйте от имени админа в чате игры (см. [Админы, модераторы и баны](./admins-mods)), а журнал смотрите через `journalctl`.
:::

## 5. Ночные резервные копии

Копировать папку мира можно только при остановленном сервере. Это задание cron от root останавливает сервер в 04:00, упаковывает всё в `.tar.gz` с датой и снова запускает его. Замените `/home/pi` на вашу домашнюю папку.

```sh
sudo crontab -e
# add this line (one line): every night at 04:00
0 4 * * * systemctl stop blockheads && tar -czf /home/pi/bh-backup-$(date +\%F).tar.gz -C /home/pi/GNUstep/Library/ApplicationSupport TheBlockheads; systemctl start blockheads
```

::: warning
`systemctl stop` завершает сервер без финального сохранения. Сервер сохраняется регулярно, но последние секунды могут пропасть — выберите тихое время.
:::

## Если что-то пошло не так

- **«Exec format error»** — не та сборка. Ещё раз проверьте `uname -m`.
- **Друзья не могут подключиться** — те же проверки, что в руководстве [Играть с друзьями по одной сети Wi-Fi](./lan-play).
- Не получается? [Сообщите о проблеме на GitHub](https://github.com/Blockheads-Club/blockheads-server/issues) и приложите вывод `journalctl`.
