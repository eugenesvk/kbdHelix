# Pre-release
  - update changelog
  - update Helix config
    - chezmoi templates
      - update `hxModifew` branch in chezmoi private repo to include all modifew template changes
      - pull from `xchezmoi/hxModifew` repo in `kbdHelix`
      - cherry-pick all the new chezmoi template config changes
      - build (copy&paste and delete the `Editor` section) `config.toml` to `config/modifew.toml`
# Dedicated web page
  - build config for embedding to json `toml2json --pretty ./src/config.toml > ./static/config/modifew.json`
  - update cheatsheet html templates
    - generate new font symbol set with `script/font-shake-data.py`
    - generate new fonts with ↑ symbol set with `yarn font-shake` (uses `script/font-woff2-shake`)
  - update cheatsheet json from KLE (use scripts in `kbdHelix-KLE` repo to download from gists)
  - update cheatsheet images (do screenshots manually from the cheatsheet page)
  - run `yarn b` to build release versions of stylesheets/javascript
