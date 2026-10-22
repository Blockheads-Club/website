# Ваш первый мод на Rust

Моды на Rust компилируются в **компонент WebAssembly**. Они работают в песочнице, как и Lua-моды, и могут вызывать
Lua-моды и наоборот.

::: warning Серверы пока не умеют запускать WASM-моды
Мод на Rust уже можно собрать, проверить и упаковать. WASM-среда для сервера скоро появится; до тех пор пробуйте
на сервере на [Lua](./first-lua-mod).
:::

## 1. Подготовка

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
rustup target add wasm32-wasip2
```

## 2. Создайте и соберите

```sh
bhmod new my-mod --lang rust
cd my-mod
./build.sh          # cargo build --target wasm32-wasip2, затем копирует server/mod.wasm
bhmod check .
bhmod pack .        # my-mod-0.1.0.bhmod
```

В `.bhmod` попадают только `mod.toml`, `LICENSE` и папки пакета; `src/`, `Cargo.toml` и `target/` остаются снаружи.

## 3. Код

Привязки создаются из WIT-файлов API с помощью [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen).
Мод реализует интерфейс `guest`:

```rust
wit_bindgen::generate!({ path: "bindings/blockheads-api", world: "server-mod" }); // bhmod new копирует сюда WIT

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

    // on_disable, run_command, run_task, call_service, on_channel_message: см. шаблон.
}

export!(MyMod);
```

В Lua вы передаёте функции (`bh.events.on(kind, fn)`); в Rust каждое событие приходит в `handle_event`, а каждая
команда в `run_command`, и различаются они по id, который вернул `subscribe` или `register`. Все функции:
[справочник API](./api/), [`guest`](./api/guest).

## Примеры

- [`hello-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-rust): `/hello` и приветствие при входе.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): `/buy` с оплатой через
  Lua-мод `economy` ([работа с другими модами](./interop)).
