# Алғашқы Rust модыңыз

Rust модтары **WebAssembly компонентіне** құрастырылады. Олар Lua модтары сияқты құмсалғышта жұмыс істейді және
Lua модтарын шақыра алады, керісінше де.

::: warning Серверлер WASM модтарын әзірге іске қоса алмайды
Rust модын бүгін құрастыруға, тексеруге және буып-түюге болады. Сервердің WASM орындау ортасы жақында; ол
шыққанша серверде сынау үшін [Lua](./first-lua-mod) қолданыңыз.
:::

## 1. Дайындық

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
rustup target add wasm32-wasip2
```

## 2. Жасаңыз және құрастырыңыз

```sh
bhmod new my-mod --lang rust
cd my-mod
./build.sh          # cargo build --target wasm32-wasip2, содан кейін server/mod.wasm көшіреді
bhmod check .
bhmod pack .        # my-mod-0.1.0.bhmod
```

`.bhmod` ішіне тек `mod.toml`, `LICENSE` және пакет қалталары кіреді; `src/`, `Cargo.toml` және `target/` кірмейді.

## 3. Код

Байланыстар API-дің WIT файлдарынан [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen) арқылы жасалады.
Мод `guest` интерфейсін іске асырады:

```rust
wit_bindgen::generate!({ path: "bindings/blockheads-api", world: "server-mod" }); // bhmod new WIT файлдарын осында көшіреді

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

    // on_disable, run_command, run_task, call_service, on_channel_message: үлгіні қараңыз.
}

export!(MyMod);
```

Lua функцияларды береді (`bh.events.on(kind, fn)`); Rust әр оқиғаны `handle_event` арқылы, әр пәрменді `run_command`
арқылы алады, оларды `subscribe` немесе `register` қайтарған id арқылы ажыратады. Барлық функциялар:
[API анықтамасы](./api/), [`guest`](./api/guest).

## Мысалдар

- [`hello-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-rust): `/hello` және қосылғанда сәлемдесу.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): `/buy`, Lua `economy` моды
  арқылы төленеді ([басқа модтармен жұмыс](./interop)).
