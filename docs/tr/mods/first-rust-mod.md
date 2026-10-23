# İlk Rust modun

Rust modları bir **WebAssembly bileşenine** derlenir. Lua modları gibi korumalı alanda çalışır; Lua modlarını
çağırabilir ve onlar da Rust modlarını çağırabilir.

::: tip Sunucular WASM modlarını çalıştırır
[Blockheads Server](../server) geliştirme sürümlerinde Lua modlarının yanında WASM modlarını da çalıştırır. Modların
geri kalanıyla birlikte bir sürümle gelecek.
:::

## 1. Hazırlık

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
rustup target add wasm32-wasip2
```

## 2. Oluştur ve derle

```sh
bhmod new my-mod --lang rust
cd my-mod
./build.sh          # cargo build --target wasm32-wasip2, sonra server/mod.wasm'ı kopyalar
bhmod check .
bhmod pack .        # my-mod-0.1.0.bhmod
```

`.bhmod` içine yalnızca `mod.toml`, `LICENSE` ve paket klasörleri girer; `src/`, `Cargo.toml` ve `target/` dışarıda kalır.

## 3. Kod

Bağlamalar, API'nin WIT dosyalarından [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen) ile gelir.
Bir mod `guest` arayüzünü uygular:

```rust
wit_bindgen::generate!({ path: "bindings/blockheads-api", world: "server-mod" }); // bhmod new WIT'i buraya kopyalar

use blockheads::api::events::{self, Event, EventKind, Outcome};
use blockheads::api::types::Priority;
use exports::blockheads::api::guest::Guest;

struct MyMod;

impl Guest for MyMod {
    fn on_enable() -> Result<(), String> {
        events::subscribe(EventKind::PlayerJoin, Priority::Normal, false).map_err(|e| format!("{e:?}"))?;
        Ok(())
    }

    fn handle_event(_sub: u32, ev: Event) -> Outcome {
        if let Event::PlayerJoin(join) = ev {
            let _ = join.player.send_chat(&format!("Welcome, {}!", join.player.alias()));
        }
        Outcome { cancelled: false, mutation: None }
    }

    // on_disable, run_command, run_task, call_service, on_channel_message: şablona bak.
}

export!(MyMod);
```

Lua fonksiyon geçirir (`bh.events.on(kind, fn)`); Rust ise her olayı `handle_event` ile, her komutu `run_command`
ile alır ve bunları `subscribe` ya da `register`'ın döndürdüğü id ile ayırt eder. Tüm fonksiyonlar:
[API başvurusu](./api/), [`guest`](./api/guest).

## Örnekler

- [`hello-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-rust): `/hello` ve katılma karşılaması.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): `/buy`, Lua `economy`
  modu üzerinden ödenir ([başka modlarla çalışmak](./interop)).
