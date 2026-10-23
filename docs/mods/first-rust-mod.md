# Your first Rust mod

Rust mods compile to a **WebAssembly component**. They run in a sandbox, like Lua mods, and can call Lua mods and
the other way round.

::: tip Servers run WASM mods
The [Blockheads Server](../server) runs WASM mods in its development builds, next to Lua mods. They arrive in a
release with the rest of the mod system.
:::

## 1. Set up

```sh
cargo install --git https://github.com/Blockheads-Club/mod-sdk bhmod
rustup target add wasm32-wasip2
```

## 2. Create and build

```sh
bhmod new my-mod --lang rust
cd my-mod
./build.sh          # cargo build --target wasm32-wasip2, then copies server/mod.wasm
bhmod check .
bhmod pack .        # my-mod-0.1.0.bhmod
```

Only `mod.toml`, `LICENSE` and the package folders go into the `.bhmod`; `src/`, `Cargo.toml` and `target/` stay out.

## 3. The code

The bindings come from the API's WIT files with [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen).
A mod implements the `guest` interface:

```rust
wit_bindgen::generate!({ path: "bindings/blockheads-api", world: "server-mod" }); // bhmod new copies the WIT here

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

    // on_disable, run_command, run_task, call_service, on_channel_message: see the template.
}

export!(MyMod);
```

Lua passes functions (`bh.events.on(kind, fn)`); Rust gets every event through `handle_event` and every command
through `run_command`, told apart by the id that `subscribe` or `register` returned. All functions:
[API reference](./api/), [`guest`](./api/guest).

## Examples

- [`hello-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/hello-rust): `/hello` and a join greeting.
- [`shop-rust`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/shop-rust): `/buy`, paid through the Lua
  `economy` mod ([working with other mods](./interop)).
