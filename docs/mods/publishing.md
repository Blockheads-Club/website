# Publishing

The public list lives in [Blockheads-Club/mods](https://github.com/Blockheads-Club/mods) and is shown on the
<a href="../../mods/" target="_self">Mods page</a>. Mods are added by pull request.

## Before you submit

- Add a `LICENSE` file (any licence you like).
- Put the `.bhmod` somewhere public over HTTPS, for example as a GitHub release asset. It is mirrored on merge.
- Check it with the public-list rules:

  ```sh
  bhmod check . --index
  bhmod pack .
  ```

## Submit

1. Add one file, `mods/<first letter>/<id>.toml`, with your mod's details, the download URL, its SHA-256 and size.
2. Open a pull request. CI checks the entry and the package and comments with the permissions it asks for.
3. A maintainer reads the code of every **new** mod (and of updates that add permissions or native code) before
   it is listed.

All fields and an example: <a href="../../mods/submit" target="_self">Submit a mod</a>.

## Updates

- Add a new version to your entry; published versions are never edited or deleted.
- A broken version can be marked `yanked = true`.
- Only the mod's `owners` may change it.

Run the same checks as CI locally: [`bhmod index validate`](https://github.com/Blockheads-Club/mod-sdk/blob/dev/docs/index.md).
