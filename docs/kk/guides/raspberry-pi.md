# Raspberry Pi-да тәулік бойы сервер

Raspberry Pi аз қуат тұтынады және әлеміңізді күн-түні орналастыра алады. ARM нұсқасын орнатасыз, оны жүктелгенде іске қосасыз және түнгі сақтық көшірмелер жасайсыз.

::: info Не қажет
- Желіге қосылған, Raspberry Pi OS (немесе басқа Linux) орнатылған Raspberry Pi
- Pi-дағы терминал (тікелей немесе SSH арқылы)
- [Шығарылымдар бетіндегі](https://github.com/Blockheads-Club/blockheads-server/releases) командалық жол сервері
:::

## 1. 32 бит пе, 64 бит пе — тексеріңіз

64 биттік жүйеде `aarch64` нұсқасын, 32 биттік жүйеде `armv7` нұсқасын қолданыңыз. Қайсысы екенін мына команда көрсетеді:

```sh
uname -m
# aarch64 = 64-bit, armv7l = 32-bit
```

## 2. Жүктеп алып, архивті ашыңыз

Бұл командалар 0.1.1 нұсқасы мен 64 биттік жинақты қолданады. Шығарылымдар бетінен ең жаңа нұсқаны алыңыз, ал 32 биттік жүйеде `aarch64-unknown-linux-gnu` орнына `armv7-unknown-linux-gnueabihf` қолданыңыз.

```sh
curl -LO https://github.com/Blockheads-Club/blockheads-server/releases/download/v0.1.1/blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
tar -xzf blockheads-server-v0.1.1-aarch64-unknown-linux-gnu.tar.gz
sudo mv blockheads-server-v0.1.1-aarch64-unknown-linux-gnu /opt/blockheads-server
```

## 3. Әлеміңізді жасаңыз

Әлемді бір рет қолмен жасаңыз. Әлемдер `~/GNUstep/Library/ApplicationSupport/TheBlockheads` ішінде сақталады.

```text
/opt/blockheads-server/blockheads_server --new MYWORLD
# wait for "World load complete.", then type:
/stop
```

::: tip
Параметрсіз сервер ең соңғы әлемді жүктейді. Төмендегі қызмет сол мүмкіндікті қолданады.
:::

## 4. Әр жүктелгенде іске қосыңыз

systemd қызметін жасаңыз. `pi` орнына әлемді жасаған пайдаланушы атын жазыңыз.

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
Қызметтің консолі жоқ. Командаларды ойын чатында админ ретінде беріңіз ([Админдер, модераторлар және бандар](./admins-mods) қараңыз), ал журналды `journalctl` арқылы қараңыз.
:::

## 5. Түнгі сақтық көшірмелер жасаңыз

Әлем папкасын тек сервер тоқтағанда көшіріңіз. Бұл root cron тапсырмасы серверді 04:00-де тоқтатады, бәрін күні бар `.tar.gz` архивіне жинайды да, оны қайта іске қосады. `/home/pi` орнына өз үй папкаңызды жазыңыз.

```sh
sudo crontab -e
# add this line (one line): every night at 04:00
0 4 * * * systemctl stop blockheads && tar -czf /home/pi/bh-backup-$(date +\%F).tar.gz -C /home/pi/GNUstep/Library/ApplicationSupport TheBlockheads; systemctl start blockheads
```

::: warning
`systemctl stop` серверді соңғы сақтаусыз тоқтатады. Сервер үнемі сақтап отырады, бірақ соңғы бірнеше секунд жоғалуы мүмкін — тыныш уақытты таңдаңыз.
:::

## Бірдеңе дұрыс болмаса

- **«Exec format error»** — жинақ дұрыс емес. `uname -m` командасын қайта тексеріңіз.
- **Достар қосыла алмайды** — [Достармен бір Wi-Fi желісінде ойнау](./lan-play) бөліміндегідей тексерулер.
- Әлі шешілмеді ме? `journalctl` шығысымен [GitHub-та хабарлаңыз](https://github.com/Blockheads-Club/blockheads-server/issues).
