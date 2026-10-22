# İlk Lua modun

Sıfırdan kendi sunucunda bir `/hello` komutuna on dakika.

## 1. Aracı kur

`bhmod`'u kurmak için bir kez [Rust](https://rustup.rs) gerekir:

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
```

## 2. Modu oluştur

```sh
bhmod new my-mod
cd my-mod
```

Bu, `mod.toml` ve `server/main.luau` dosyalarını oluşturur. `server/main.luau` dosyasını aç:

```lua
local mod = {}

function mod.on_enable()
	bh.events.on("player-join", function(ev)
		ev.player:send_chat(`Welcome, {ev.player:alias()}!`)
	end)

	bh.commands.register({ name = "hello", description = "Says hello." }, function(sender, label, args)
		return { handled = true, reply = { "Hello from my-mod!" } }
	end)
end

return mod
```

- `on_enable`, dünya yüklendikten sonra bir kez çalışır. Olaylara abone olmayı ve komut kaydetmeyi orada yap.
- Oyunun sunduğu her şey global `bh` tablosunda: [API başvurusu](./api/).
- Luau destekli editörler [`bh.d.luau`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/bh.d.luau) ile tamamlama alır.

## 3. Kontrol et

```sh
bhmod check .
```

`mod.toml` ve dosyalardaki hataları bildirir; örneğin eksik bir giriş dosyası ya da bilinmeyen bir izin.

## 4. Paketle

```sh
bhmod pack .
```

Bu, `my-mod-0.1.0.bhmod` dosyasını yazar. Aynı girdi her zaman aynı dosyayı verir.

## 5. Yerel sunucuda çalıştır

1. Bir [Blockheads Server](../server) geliştirme sürümünü bir kez başlat, veri klasörünü oluştursun.
2. `my-mod-0.1.0.bhmod` dosyasını (ya da tüm `my-mod` klasörünü) `<veri klasörü>/mods/` içine kopyala.
3. Şablon `players:chat` ister, onu `<veri klasörü>/mods/mods.toml` içinde ver:

   ```toml
   [my-mod]
   grant = ["players:chat"]
   ```

4. Sunucuyu başlat ve katıl. Günlükte `loaded 1 mod(s): my-mod 0.1.0` görünür, karşılama satırını alırsın ve
   `/hello` yanıt verir.

::: tip Daha hızlı döngü
Sunucuyu doğrudan çalışma klasörüne yönlendir: `BLOCKHEADS_MODS_DIR=/path/to/folder-with-my-mod`. Her değişiklikten
sonra yeniden başlat. Paketlemeye gerek yok.
:::

## Sırada ne var

- Daha fazla örnek: [`hello-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-lua),
  [`chat-filter`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/chat-filter),
  [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua).
- [Olaylar](./events) · [Komutlar ve zamanlayıcılar](./commands) · [Depolama](./storage)
