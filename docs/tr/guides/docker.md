# Docker ve Docker Compose

Sunucuyu bir konteyner olarak çalıştır. Dünyalar bir volume’de durur; böylece güncellemelerden sonra da kalır.

::: info Nelere ihtiyacın var
- Docker (istersen Docker Compose da)
- Çok mimarili `ghcr.io/blockheads-club/blockheads-server` imajı (amd64, arm64, arm/v7)
:::

## 1. Bir dünya oluştur

Konsolu almak için konteyneri bir kez `-it` ile çalıştır. Dünyalar `bh-data` volume’üne gider. **World load complete.** yazısını bekle, sonra `/stop` yaz.

```sh
docker run -it --rm -p 15151:15151/udp -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --new MYWORLD
```

::: tip
Örnekler 0.1.1 sürümünü kullanır. Her sürümün bir sürüm etiketi vardır; en yenisini seç.
:::

## 2. Dünya kimliğini bul

Volume’deki dünyaları listele. Uzun onaltılık ad dünya kimliğidir.

```sh
docker run --rm -v bh-data:/data ghcr.io/blockheads-club/blockheads-server:0.1.1 --list
# "MYWORLD" stored in directory named 4e834bde…
```

## 3. Arka planda çalıştır

Dünyayı `--load` ile başlat. Konsolu sonra açabilmek için `-i` ve `-t` kalsın; portu **UDP** olarak eşle.

```sh
docker run -dit --name blockheads --restart unless-stopped \
    -p 15151:15151/udp -v bh-data:/data \
    ghcr.io/blockheads-club/blockheads-server:0.1.1 --load WORLD_ID
```

## 4. Loglar ve konsol

Logları izle ya da `/players` veya `/stop` gibi komutlar yazmak için konsola bağlan.

```sh
docker logs -f blockheads
docker attach blockheads   # detach: Ctrl+P, Ctrl+Q
```

## 5. Ya da Docker Compose kullan

Aynı kurulum bir `compose.yaml` olarak. `docker compose up -d` ile başlat.

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

## Bir şeyler ters giderse

- **Konteyner yalnızca yardım metnini yazıyor** — `--new` ya da `--load` gibi seçenekler vermezsen imaj `--help` ile başlar.
- **Güncelleme** — konteyneri durdurup sil, sonra yeni etiketle yeniden çalıştır. `bh-data` volume’ü dünyalarını saklar. `docker stop` sunucuyu son kaydı yapmadan kapatır; kimse oynamıyorken durdur.
- **Bağlantı yok** — port `15151:15151/udp` olarak eşlenmelidir.
