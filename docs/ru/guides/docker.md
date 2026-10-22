# Docker и Docker Compose

Запустите сервер в контейнере. Миры хранятся в томе, поэтому при обновлениях они сохраняются.

::: info Что понадобится
- Docker (и Docker Compose, если хотите им пользоваться)
- Мультиархитектурный образ `ghcr.io/blockheads-club/blockheads-server` (amd64, arm64, arm/v7)
:::

## 1. Создайте мир

Один раз запустите контейнер с `-it`, чтобы получить консоль. Миры попадают в том `bh-data`. Дождитесь **World load complete.**, затем введите `/stop`.

```sh
docker run -it --rm -p 15151:15151/udp -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

::: tip
В примерах используется версия 0.1.1. У каждого релиза есть тег версии — берите самый новый.
:::

## 2. Найдите ID мира

Выведите список миров в томе. Длинное шестнадцатеричное имя — это ID мира.

```sh
docker run --rm -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --list
# "MYWORLD" stored in directory named 4e834bde…
```

## 3. Запустите в фоне

Запустите мир с `--load`. Оставьте `-i` и `-t`, чтобы позже можно было открыть консоль, и пробросьте порт как **UDP**.

```sh
docker run -dit --name blockheads --restart unless-stopped \
    -p 15151:15151/udp -v bh-data:/data \
    ghcr.io/blockheads-club/blockheads-server:0.1.1 --load WORLD_ID
```

## 4. Журнал и консоль

Следите за журналом или подключитесь к консоли, чтобы вводить команды вроде `/players` или `/stop`.

```sh
docker logs -f blockheads
docker attach blockheads   # detach: Ctrl+P, Ctrl+Q
```

## 5. Или используйте Docker Compose

Та же настройка в виде `compose.yaml`. Запустите её командой `docker compose up -d`.

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

## Если что-то пошло не так

- **Контейнер выводит только справку** — образ запускается с `--help`, если не указать параметры вроде `--new` или `--load`.
- **Обновление** — остановите и удалите контейнер, затем запустите снова с новым тегом. Том `bh-data` сохранит ваши миры. `docker stop` завершает сервер без финального сохранения, поэтому останавливайте, когда никто не играет.
- **Нет подключения** — порт нужно пробросить как `15151:15151/udp`.
