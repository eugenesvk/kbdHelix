--- 
title: "🧬Helix Keymap modiƒew"
---

<meta charset=utf-8>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel=stylesheet type=text/css href=css/bootstrap.css media=screen>
<link rel=stylesheet type=text/css href=css/font-awesome.min.css>
<link rel=stylesheet type=text/css href=css/kb.css>
<link rel=stylesheet type=text/css href=css/kbd-webfont.css>
<link rel=stylesheet type=text/css href=css/kbd-custom.css>

# Table of contents
- [Overview](#overview)
- [Major modes](#major-modes)
    - [Helix Keymap modiƒew Normal](#helix-keymap-modiew-normal)
    - [Helix Keymap modiƒew Insert](#helix-keymap-modiew-insert)
    - [Helix Keymap modiƒew Select](#helix-keymap-modiew-select)
- [Minor modes](#minor-modes)
    - [Helix Keymap modiƒew GoTo](#helix-keymap-modiew-goto)
    - [Helix Keymap modiƒew Space](#helix-keymap-modiew-space)
    - [Helix Keymap modiƒew View](#helix-keymap-modiew-view)
    - [Helix Keymap modiƒew Match](#helix-keymap-modiew-match)
    - [Helix Keymap modiƒew Window](#helix-keymap-modiew-window)
    - [Helix Keymap modiƒew Unimpaired](#helix-keymap-modiew-unimpaired)
- [Install](#install)

<div id=buttons>
  Change keyboard layout to:
  <button class="btn" id=btn_qwerty    	type=button style=margin:5px>QWERTY</button>
  <button class="btn" id=btn_dvorak    	type=button style=margin:5px>Dvorak</button>
  <button class="btn" id=btn_colemak   	type=button style=margin:5px>Colemak</button>
  <button class="btn" id=btn_colemak_dh	type=button style=margin:5px>Colemak DH</button>
  <button class="btn" id=btn_workman   	type=button style=margin:5px>Workman</button>
  <button class="btn" id=btn_neo2      	type=button style=margin:5px>Neo2</button>
</div>
<script defer src=js/layout-convert.js></script>

### Overview


This is a draft of the __modiƒew__ keymap for the [Helix](https://helix-editor.com) text editor that tries to break the chains ⛓ of keycap-based mnemonics[^1] like __f__ for `find` and instead maps most __frequent commands__ to the __best keys__, so 👆🏻 (<kbd>f</kbd> in QWERTY) `moves forward by a word` instead of executing `find`<br>
It also attempts to convert most of the commands requiring modifiers into a chainable key sequence, hence its name: "few modifiers based on frequency" (__ƒ__ for frequency) or __modiƒew__

This keymap is based on a dumb standard staggered keyboard design, so if you use a better one with a thumb 👍🏻👍 key cluster, you might want to move some of the more frequent commands there instead. The config file is based on the standard US-based __QWERTY__ layout[^2], though this document supports multiple layouts via buttons at the bottom

It's inspired by the [Emacs: Xah Fly Keys](http://xahlee.info/emacs/misc/ergoemacs_vi_mode.html) and uses Xah Lee's data on [Emacs command frequencies](http://xahlee.info/emacs/emacs/command-frequency.html), but is trying to outlfy the fly master :) by being more consistent in applying the basic frequent→best principle[^3]

Below is a summary of some of the design decisions followed up by detailed keymap Cheat Sheets for the various modes:

  - ⌂__Home__ keys are __safe__: all 8 of the home keys are movement commands, so to modify a buffer your fingers need to leave __⌂__!
  - __Insert mode__ has a copy of most of Normal mode commands (from <kbd>key</kbd> and <kbd>⇧</kbd><kbd>key</kbd>) on the sames keys, but with an extra <kbd>⌥</kbd> — no need to switch modes for just a single command!
  - __Space mode__ converts most of the commands requiring modifiers into a chainable key sequence with a "leader" key <kbd>Space</kbd> as the easiest to press. Its main layer mostly consists of commands that were assigned to <kbd>^</kbd> or <kbd>⇧</kbd> in the Normal mode, though via additional submodes any other command can also be chained (and if this [feature request](https://github.com/helix-editor/helix/issues/1499) is implemented, this approach could also work nicely with repeatable commands that would not close the menu dialog command list upon execution)
  - Differentiate between __repeatable__ and __single-press__ __paired__ keybinds (left/right, back/forward, earlier/later etc.)
    + __Repeatable__ keybinds should be on __separate__ __adjacent__ keys (just like <kbd>◀</kbd><kbd>▶</kbd>) instead of being on the same key with the second operation behind a <kbd>⇧</kbd>’ed status, so char/word/line-based movements and in-/decrement are together rather than being on separate rows by default. This greatly simplifies going back and forth:
        + Strongest non-thumb fingers on the __right__ hand:<br>
          move by __line__ 👆🏻down/🖕🏻up <kbd lyt=q>j</kbd><span class="keyMove">▼</span> <kbd lyt=q>k</kbd><span class="keyMove">▲</span>
        + Strongest non-thumb fingers on the __left__ hand:<br>
          move by __word__ 👆left/🖕right <kbd lyt=q>d</kbd><span class="keyMove">🢔w</span> <kbd lyt=q>f</kbd><span class="keyMove">w🢖</span>
        + Rest of the home row on the __right__ for the next most frequent commands:<br>
          move by __char__ 💍left/🤙🏻right <kbd lyt=q>l</kbd><span class="keyMove">◀</span> <kbd lyt=q>;</kbd><span class="keyMove">▶</span>
        + Repeat the 👆🏻down/🖕🏻up right hand mnemonic:
            + for the less frequent commands: decrement/increment object (number) under cursor <kbd>^</kbd><kbd lyt=q>m</kbd><span class="keyChange">⊖</span> <kbd>^</kbd><kbd lyt=q>,</kbd><span class="keyChange">⊕</span>
            + in the lower row: move half page down/up <kbd lyt=q>m</kbd><span class="keyMove">⤈</span> <kbd lyt=q>,</kbd><span class="keyMove">⤉</span>
            + for the minor modes: (in <span class="keyOther">☰👁</span> View mode) <kbd lyt=q>u</kbd><span class="keyOther">🗔⭳</span> <kbd lyt=q>i</kbd><span class="keyOther">🗔⭱</span>
        + Repeat the 💍left/🤙🏻right right hand mnemonic in the lower row: select previous/next search match <kbd lyt=q>.</kbd><span class="keyMove">🢔◎</span> <kbd lyt=q>/</kbd><span class="keyMove">◎🢖</span> (broken pending fixing [this issue](https://github.com/helix-editor/helix/issues/1488), at the moment requires <kbd>⇧</kbd>)
        + Repeat the 👆left/🖕right left hand mnemonic for jumplist ←→ navigation <kbd lyt=q>3</kbd><span class="keyMove">⎗̡</span> <kbd lyt=q>4</kbd><span class="keyMove">⎘̡</span> (pending adding this [feature request](https://github.com/helix-editor/helix/issues/1200), currently need to use <kbd>⌥</kbd>)
        + `Undo`/`redo` isn't yet fully optimized in this way (they are on adjacent <kbd lyt=q>y</kbd><span class="keyChange">↷</span> <kbd lyt=q>u</kbd><span class="keyChange">⎌</span>, but on the same finger and in reverse order), some frequency data on the other Helix top row commands would help
    + __Single-press__ paired keybinds can remain with the opposite direction <kbd>⇧</kbd>’ed, e.g. move to the beginning/end of a line <kbd lyt=q>a</kbd><span class="keyMove">⭰</span> <kbd>⇧</kbd><kbd lyt=q>a</kbd><span class="keyMove">⭲</span>
  - It's ok to use (or even hold😲) <kbd>⌥</kbd> when you don't need to move by word (like in the <span class="keySelect">Ⓢ</span> Select mode), so the multi-cursor selection/manipulation is done with <kbd>⌥</kbd>+cursor:
      - select down/up <kbd>⌥</kbd><kbd lyt=q>j</kbd><span class="keySelect">🠷</span> <kbd>⌥</kbd><kbd lyt=q>k</kbd><span class="keySelect">🠵</span> (`copy_selection_on_next_line`/`copy_selection_on_prev_line`) 
      - shift selection back/forward <kbd>⌥</kbd><kbd lyt=q>l</kbd><span class="keySelect">⟲</span> <kbd>⌥</kbd><kbd lyt=q>;</kbd><span class="keySelect">⟳</span> (`rotate_selections_backward`/`rotate_selections_forward`)
      - quick selection correction without releasing the modifier: "soft undo" once <kbd>⌥</kbd><kbd lyt=q>u</kbd><span class="keySelect">×</span> and all <kbd>⌥</kbd><kbd lyt=q>i</kbd><span class="keySelect">×∀</span> (`remove_primary_selection`/`keep_primary_selection`)
  - Bonus: the `Cut`/`Copy`/`Paste` commands' frequencies seem to allow having them together under 💍🖕👆 left hand bottom row with the common <kbd lyt=q>x</kbd><kbd lyt=q>c</kbd><kbd lyt=q>v</kbd>, though `Undo` is too frequent to be left at a 🤙<kbd lyt=q>z</kbd> (however, with <kbd>^</kbd> they all maintain the	<kbd lyt=q>z</kbd><kbd lyt=q>x</kbd><kbd lyt=q>c</kbd><kbd lyt=q>v</kbd> compatibility) [^4]
  - Turn <kbd lyt=q>h</kbd> into a combo <kbd>⌫</kbd>/<kbd>⌦</kbd> key
  - (lacking sufficient frequency data) Group various inserts together: insert/append at <kbd lyt=q>i</kbd><span class="keyChange">⁁⤸</span> <kbd lyt=q>o</kbd><span class="keyChange">⤹⎀</span> and `open_below`/`open_above` at <kbd>⇧</kbd><kbd lyt=q>i</kbd><span class="keyChange">⭡␤</span> <kbd>⇧</kbd><kbd lyt=q>o</kbd><span class="keyChange">⭣␤</span> (`prepend_to_line`/`append_to_line` are removed as there is a stand alone command to move to the beginning of a line, so <kbd lyt=q>a</kbd><span class="keyMove">⭰</span><kbd lyt=q>i</kbd><kbd lyt=q>i</kbd><span class="keyChange">⁁⤸</span> is easier than the old <kbd>⇧</kbd><kbd lyt=q>i</kbd><span class="keyChange">⁁⭰</span>)
  - Add a few keybinds to make it similar to non-modal editors to help with transition
    - <kbd>⏎</kbd><span class="keyChange">⭣␤</span> <kbd>⇧</kbd><kbd>⏎</kbd><span class="keyChange">⭡␤</span> Insert a new line below/above (`open_below`/`open_above`)
    - <kbd>^</kbd><kbd lyt=q>a</kbd><span class="keySelect">∀▋</span> Select all (`select_all`)
    - <kbd>^</kbd><kbd lyt=q>o</kbd><span class="keyOther">☰␜</span> Open (`file_picker`)
    - <kbd>^</kbd><kbd lyt=q>s</kbd><span class="keyOther"><i class="fa fa-save"></i></span> Save (`:write`)
    - <kbd>^</kbd><kbd lyt=q>z</kbd><span class="keyChange">⎌</span> Undo (`undo`)
    - <kbd>^</kbd><kbd lyt=q>y</kbd><span class="keyChange">↷</span> Redo (`redo`)
    - <kbd>^</kbd><kbd lyt=q>x</kbd><span class="keyChange">×</span> Cut (`yank_main_selection_to_clipboard`, `delete_selection`)
    - <kbd>^</kbd><kbd lyt=q>c</kbd><span class="keyOther"><i class="fa fa-copy"></i></span> Copy (`yank_main_selection_to_clipboard`)
    - <kbd>^</kbd><kbd lyt=q>v</kbd><span class="keyChange"><i class="fa fa-copy"></i>⤹</span> Paste (`paste_clipboard_after`)
    - <kbd>⌥</kbd>/<kbd>^</kbd>+<kbd>⌫</kbd>/<kbd>⌦</kbd> to delete a w/Word left/right
    - <kbd>^</kbd><kbd>⇞</kbd>/<kbd>⇟</kbd> to navigate files (`goto_previous_buffer`/`goto_next_buffer`)
  - <span style="color: orange">⚠</span> (lacking sufficient frequency data) little optimization was applied to the top vs. bottom row placement of commands
  - <span style="color: orange">⚠</span> number row-base commands don't work pending implementation of this [feature request](https://github.com/helix-editor/helix/issues/1200), currently need to use the version with modifiers

[^1]: re. mnemonics: in such a complex keybind system such as Helix's I don't find them all that useful as they don't offer intuitive predictability due to said complexity since there are several alternatives to most of the keys, e.g., should <kbd>c</kbd> stand for Cut/Copy/Change/Collapse/Comment/Char/Command/Case/...?
[^2]: hopefully Helix will introduce a way to translate keycap labels to an arbitrary layout without having to rebind every single key (maybe as a solution to [this issue](https://github.com/helix-editor/helix/issues/133))
[^3]: for example, instead of placing the 2nd most frequent command <span class="keyMove">▲</span> (15.5%) on a non-home row <kbd lyt=q>i</kbd> it uses the home row <kbd lyt=q>k</kbd>
[^4]: this breaks the 'sticky' `select_mode` pending implementation of [this feature request](https://github.com/helix-editor/helix/issues/1487)

Below are __modiƒew__ __Cheat Sheets__ for the various major and minor "modes" in an html format to make it easier to copy/search for an icon here and in the [config file](https://github.com/eugenesvk/kbdHelix/blob/modifew/config/modifew.toml) since not all icons are obvious enough, but also as separate images as well as links to Keyboard Layout Editor so you could fit the cheat sheet to a modified keymap

  |    | Modifier key legend	| Example of <kbd>j</kbd> |
  | :- | :-----------------:	| :---------------------: |
  | Symbol's position match the modifier key legend<br>(`∀` applies to all others, e.g., `→` for direction)<br>(some key labels have a command frequency value in percent points)<br> <div>Colors: <span class="keyMove">Move</span> <span class="keySelect">Select</span> <span class="keyChange">Change</span> <span class="keyOther">Other</span></div> | <img src="https://github.com/eugenesvk/kbdHelix/blob/modifew/img/KeyInfo-1Labels.png?raw=true" alt="Key Modifier Labels" width="125"/> | <img src="https://github.com/eugenesvk/kbdHelix/blob/modifew/img/KeyInfo-2Example.png?raw=true" alt="Key Example" width="149"/>|



### Major modes

#### Helix Keymap modiƒew Normal

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/537c5fed0748cb2cf889bab3ff866667), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-m1NOR.png?raw=true), [config](https://github.com/eugenesvk/kbdHelix/blob/modifew/config/modifew.toml)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Insert

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/7a5ff7b6fb13e52ad1ae63445536ca4b), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-m2INS.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Select

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/cd44f7fd307f22d52d59f74c0967faaf), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-m3SEL.png?raw=true). Only commands that differ from Normal mode are shown, the rest are copied

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



### Minor modes

#### Helix Keymap modiƒew GoTo

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/235396cdfbd07f19f6af1e26dff1e949), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nGoTo.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Space

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/476cb89ca592befe598617a4af733910), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nSpace.png?raw=true). Note that modifiers are replaced with sub-modes since Space mode strives to use sequential key presses instead of key combos. Also, not all actions are yet implemented in Helix

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>




#### Helix Keymap modiƒew View

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/94d728fc74d61af4de9ed17ff7d8566d), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nView.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Match

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/1b083641d649a424a7edbf1a491aff75), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nMatch.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Window

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/22a4426747d045cc828e0d125af3a540), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nWindow.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Unimpaired

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/b885c21cc83ae06108b3da6728148191), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nUnimpaired.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>

#### Install

1. Simple, but inflexible: copy the content of the __modiƒew__ [config keymap file](https://github.com/eugenesvk/kbdHelix/blob/modifew/config/modifew.toml) to your own Helix `~/.config/helix/config.toml` below your `[editor]` section
2. More complicated, but more flexible (makes it easier to change)
    - install [chezmoi config file manager](https://www.chezmoi.io/)
    - copy all template files from [modifew/src](https://github.com/eugenesvk/kbdHelix/tree/modifew/src) to your `~/.local/share/chezmoi/private_dot_config/helix` folder
    - replace theme and `[editor]` sections of the `Editor.toml.tmpl` file with your preferred settings
    - build the actual full Helix `config.toml` with `chezmoi apply -v --interactive`

    Now you can edit individual template files for each major/minor mode and build the config with `chezmoi` instead of drowning in one huge config. You can also add a single line to include repeated minor modes in various major modes (and even pass different keybinds as input parametes to those templates) instead of having to copy&paste them manually on every single change!
