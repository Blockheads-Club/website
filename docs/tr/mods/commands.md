# Komutlar ve zamanlayıcılar

## Komutlar

```lua
bh.commands.register({
	name = "home",
	aliases = { "h" },
	description = "Takes you home.",
	usage = "/home [name]",
	min_role = "player",   -- player, moderator, admin veya owner
	console = false,       -- sunucu konsolu çalıştırabilir mi?
}, function(sender, label, args)
	local p = sender.player          -- konsol çalıştırınca nil
	if not args[1] then
		return { handled = false }   -- "Usage: /home [name]" gösterir
	end
	return { handled = true, reply = { "Welcome home, " .. p:alias() } }
end)
```

- Adlar `a-z`, `0-9`, `_`, `-` olabilir, en çok 32 karakter; yerleşik ya da başka modların komutlarıyla çakışmamalı.
- Mod komutları **her oyuncu** için çalışır (vanilla `/` kullanımını yalnızca moderatörlere ve yöneticilere
  bırakır), `min_role` aksini söylemedikçe. Altındaki oyuncular "You do not have permission" alır.
- `label` yazılan ad ya da takma addır; `args` satırın geri kalanının boşluklardan bölünmüş halidir.
- `reply` satırları göndericiye gider: oyunculara sohbet, konsola günlük.

## Zamanlayıcılar

Süreler **tick** cinsindendir: bir tick bir dünya adımıdır, 0,2 sn; yani 5 tick 1 saniyedir.

```lua
bh.scheduler.run_later(25, function() ... end)        -- bir kez, 5 sn sonra
local id = bh.scheduler.run_every(0, 5, function() ... end)  -- şimdi, sonra her saniye
bh.scheduler.cancel(id)
bh.scheduler.run_next_poll(function() ... end)        -- yaklaşık 16 ms sonra, hızlı yanıtlar için
```

Bir zamanlayıcıda sakladığın oyuncu, çalıştığında ayrılmış olabilir: önce `p:is_online()` kontrol et.

Örnek: [`scheduler-lua`](https://github.com/Blockheads-Club/mod-sdk/tree/dev/examples/scheduler-lua)
(`/countdown`, `/remind`). Başvuru: [`commands`](./api/commands), [`scheduler`](./api/scheduler).
