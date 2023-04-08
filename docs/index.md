--- 
title: "🧬Helix Keymap modiƒew"
---

<meta charset=utf-8>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel=stylesheet type=text/css href=css/bootstrap.min.css media=screen>
<link rel=stylesheet type=text/css href=css/font-awesome.min.css>
<link rel=stylesheet type=text/css href=css/kb.css>
<link rel=stylesheet type=text/css href=css/kbd-webfont.css>
<link rel=stylesheet type=text/css href=css/kbd-custom.css>

# Table of contents
- [Overview](#overview)
- [Helix Keymap modiƒew Normal](#helix-keymap-modiew-normal)
- [Helix Keymap modiƒew Insert](#helix-keymap-modiew-insert)
- [Helix Keymap modiƒew Select](#helix-keymap-modiew-select)
- [Helix Keymap modiƒew GoTo](#helix-keymap-modiew-goto)
- [Helix Keymap modiƒew View](#helix-keymap-modiew-view)
- [Helix Keymap modiƒew Match](#helix-keymap-modiew-match)
- [Helix Keymap modiƒew Window](#helix-keymap-modiew-window)


### Overview


This is a draft of the __modiƒew__ keymap for the [Helix](https://helix-editor.com) text editor that tries to break the chains ⛓ of keycap-based mnemonics[^1] like __f__ for `find` and instead maps most __frequent commands__ to the __best keys__, so 👆 (<kbd>f</kbd> in QWERTY) `moves forward by a word` instead of executing `find`<br>
It also attempts to convert most of the commands requiring modifiers into a chainable key sequence, hence its name: "few modifiers based on frequency" (__ƒ__ for frequency) or __modiƒew__

This keymap is based on a dumb standard staggered keyboard design, so if you use a better one with a thumb 👍 key cluster, you might want to move some of the more frequent commands there instead. The config file is based on the standard US-based __QWERTY__ layout[^2]

It's inspired by the [Emacs: Xah Fly Keys](http://xahlee.info/emacs/misc/ergoemacs_vi_mode.html) and uses Xah Lee's data on [Emacs command frequencies](http://xahlee.info/emacs/emacs/command-frequency.html), but is trying to outlfy the fly master :) by being more consistent in applying the basic frequent→best principle[^3]

Below is a summary of some of the design decisions followed up by detailed keymap Cheat Sheets for the main layout and the various "minor" modes:

  - __Home__ row is __safe__: a lot of the movement commands happen to be the most frequent, enough to utilize the 8 home row keys, so as a side effect you get safety — to modify a buffer move your fingers elsewhere!
  - __Insert mode__ has a copy of most of Normal mode commands (from <kbd>key</kbd> and <kbd>⇧</kbd><kbd>key</kbd>) on the sames keys, but with an extra <kbd>⌥</kbd> — no need to switch modes for just a single command!
  - (to do) convert most of the commands requiring modifiers into a chainable key sequence with a "leader" key <kbd>Space</kbd> as the easiest to press (and if this [feature request](https://github.com/helix-editor/helix/issues/1499) is implemented, this approach could also work nicely with repeatable commands that would not close the menu dialog command list upon execution)
  - Differentiate between __repeatable__ and __single-press__ __paired__ keybinds (left/right, back/forward, earlier/later etc.)
    + __Repeatable__ keybinds should be on __separate__ __adjacent__ keys (just like <kbd>◀</kbd><kbd>▶</kbd>) instead of being on the same key with the second operation behind a <kbd>⇧</kbd>’ed status, so char/word/line-based movements and in-/decrement are together rather than being on separate rows by default. This greatly simplifies going back and forth:
        + Strongest non-thumb fingers on the __right__ hand:<br>
          move by line 👆down/🖕up <kbd>j</kbd><span class="keyMove">▼</span> <kbd>k</kbd><span class="keyMove">▲</span>
        + Strongest non-thumb fingers on the __left__ hand:<br>
          move by word 👆left/🖕right <kbd>d</kbd><span class="keyMove">🢔w</span> <kbd>f</kbd><span class="keyMove">w🢖</span>
        + Rest of the home row on the __right__ for the next most frequent commands:<br>
          move by char 💍left/🤙right <kbd>l</kbd><span class="keyMove">◀</span> <kbd>;</kbd><span class="keyMove">▶</span>
        + Repeat the 👆down/🖕up right hand mnemonic:
            + for the less frequent commands: decrement/increment object (number) under cursor <kbd>^</kbd><kbd>m</kbd><span class="keyChange">⊖</span> <kbd>^</kbd><kbd>,</kbd><span class="keyChange">⊕</span>
            + in the lower row: move half page down/up <kbd>m</kbd><span class="keyMove">⤈</span> <kbd>,</kbd><span class="keyMove">⤉</span>
            + for the minor modes: (in ☰👁 View mode) <kbd>u</kbd><span class="keyOther">🗔⭳</span> <kbd>i</kbd><span class="keyOther">🗔⭱</span>
        + Repeat the 💍left/🤙right right hand mnemonic in the lower row: select previous/next search match <kbd>.</kbd><span class="keyMove">🢔◎</span> <kbd>/</kbd><span class="keyMove">◎🢖</span> (broken pending fixing [this issue](https://github.com/helix-editor/helix/issues/1488), at the moment requires <kbd>⇧</kbd>)
        + Repeat the 👆left/🖕right left hand mnemonic for jumplist ←→ navigation <kbd>3</kbd><span class="keyMove">⎗̡</span> <kbd>4</kbd><span class="keyMove">⎘̡</span> (pending adding this [feature request](https://github.com/helix-editor/helix/issues/1200), currently need to use <kbd>⌥</kbd>)
        + `Undo`/`redo` isn't yet fully optimized in this way (they are on adjacent <kbd>y</kbd><span class="keyChange">↷</span> <kbd>u</kbd><span class="keyChange">⎌</span>, but on the same finger and in reverse order), some frequency data on the other Helix top row commands would help
    + __Single-press__ paired keybinds can remain with the opposite direction <kbd>⇧</kbd>’ed, e.g. move to the beginning/end of a line <kbd>a</kbd><span class="keyMove">⭰</span> <kbd>⇧</kbd><kbd>a</kbd><span class="keyMove">⭲</span>
  - It's ok to use (or even hold😲) <kbd>⌥</kbd> when you don't need to move by word (like in the <span class="keySelect">Ⓢ</span>select mode), so the multi-cursor selection/manipulation is done with <kbd>⌥</kbd>+cursor:
      - select down/up <kbd>⌥</kbd><kbd>j</kbd><span class="keySelect">🠷</span> <kbd>⌥</kbd><kbd>k</kbd><span class="keySelect">🠵</span> (`copy_selection_on_next_line`/`copy_selection_on_prev_line`) 
      - shift selection back/forward <kbd>⌥</kbd><kbd>l</kbd><span class="keySelect">⟲</span> <kbd>⌥</kbd><kbd>;</kbd><span class="keySelect">⟳</span> (`rotate_selections_backward`/`rotate_selections_forward`)
      - quick selection correction without releasing the modifier: "soft undo" once <kbd>⌥</kbd><kbd>u</kbd><span class="keySelect">×</span> and all <kbd>⌥</kbd><kbd>i</kbd><span class="keySelect">×∀</span> (`remove_primary_selection`/`keep_primary_selection`)
  - Bonus: the `Cut`/`Copy`/`Paste` commands' frequencies seem to allow having them together under 💍🖕👆 left hand bottom row with the common <kbd>x</kbd><kbd>c</kbd><kbd>v</kbd>, though `Undo` is too frequent to be left at a 🤙<kbd>z</kbd> (however, with <kbd>^</kbd> they all maintain the	<kbd>z</kbd><kbd>x</kbd><kbd>c</kbd><kbd>v</kbd> compatibility) [^4]
  - Turn <kbd>h</kbd> into a combo <kbd>⌫</kbd>/<kbd>⌦</kbd> key
  - (lacking sufficient frequency data) Group various inserts together: insert/append at <kbd>i</kbd><span class="keyChange">⁁⤸</span> <kbd>o</kbd><span class="keyChange">⤹⎀</span> and `open_below`/`open_above` at <kbd>⇧</kbd><kbd>i</kbd><span class="keyChange">⭡␤</span> <kbd>⇧</kbd><kbd>o</kbd><span class="keyChange">⭣␤</span> (`prepend_to_line`/`append_to_line` are removed as there is a stand alone command to move to the beginning of a line, so <kbd>a</kbd><span class="keyMove">⭰</span><kbd>i</kbd><kbd>i</kbd><span class="keyChange">⁁⤸</span> is easier than the old <kbd>⇧</kbd><kbd>i</kbd><span class="keyChange">⁁⭰</span>)
  - Add a few keybinds to make it similar to non-modal editors to help with transition
    - <kbd>⏎</kbd><span class="keyChange">⭣␤</span> <kbd>⇧</kbd><kbd>⏎</kbd><span class="keyChange">⭡␤</span> Insert a new line below/above (`open_below`/`open_above`)
    - <kbd>^</kbd><kbd>a</kbd><span class="keySelect">∀▋</span> Select all (`select_all`)
    - <kbd>^</kbd><kbd>o</kbd><span class="keyOther">☰␜</span> Open (`file_picker`)
    - <kbd>^</kbd><kbd>s</kbd><span class="keyOther"><i class="fa fa-save"></i></span> Save (`:write`)
    - <kbd>^</kbd><kbd>z</kbd><span class="keyChange">⎌</span> Undo (`undo`)
    - <kbd>^</kbd><kbd>y</kbd><span class="keyChange">↷</span> Redo (`redo`)
    - <kbd>^</kbd><kbd>x</kbd><span class="keyChange">×</span> Cut (`yank_main_selection_to_clipboard`, `delete_selection`)
    - <kbd>^</kbd><kbd>c</kbd><span class="keyOther"><i class="fa fa-copy"></i></span> Copy (`yank_main_selection_to_clipboard`)
    - <kbd>^</kbd><kbd>v</kbd><span class="keyChange"><i class="fa fa-copy"></i>⤹</span> Paste (`paste_clipboard_after`)
    - <kbd>⌥</kbd>/<kbd>^</kbd>+<kbd>⌫</kbd>/<kbd>⌦</kbd> to delete a w/Word left/right
    - <kbd>^</kbd><kbd>⇞</kbd>/<kbd>⇟</kbd> to navigate files (`goto_previous_buffer`/`goto_next_buffer`)
  - <span style="color: orange">⚠</span> (lacking sufficient frequency data) little optimization was applied to the top vs. bottom row placement of commands
  - <span style="color: orange">⚠</span> number row-base commands don't work pending implementing this [feature request](https://github.com/helix-editor/helix/issues/1200), currently need to use the version with modifiers

[^1]: re. mnemonics: in such a complex keybind system such as Helix's I don't find them all that useful as they don't offer intuitive predictability due to said complexity since there are several alternatives to most of the keys, e.g., should <kbd>c</kbd> stand for Cut/Copy/Change/Collapse/Comment/Char/Command/Case/...?
[^2]: hopefully Helix will introduce a way to translate keycap labels to an arbitrary layout without having to rebind every single key (maybe as a solution to [this issue](https://github.com/helix-editor/helix/issues/133))
[^3]: for example, instead of placing the 2nd most frequent command <span class="keyMove">▲</span> (15.5%) on a non-home row <kbd>i</kbd> it uses the home row <kbd>k</kbd>
[^4]: this breaks the 'sticky' `select_mode` pending implementation of [this feature request](https://github.com/helix-editor/helix/issues/1487)

Below are __modiƒew__ __Cheat Sheets__ (the main layer as well as additional "minor" menu modes), in an html format to make it easier to copy/search for an icon here and in the [config file](https://github.com/eugenesvk/kbdHelix/blob/main/helper/config_modifew.toml) since not all icons are obvious enough, but also as separate images as well as links to Keyboard Layout Editor so you could fit the cheat sheet to a modified keymap

  |    | Modifier key legend	| Example of <kbd>j</kbd> |
  | :- | :-----------------:	| :---------------------: |
  | Symbol's position match the modifier key legend<br>(`∀` applies to all others, e.g., `→` for direction)<br>(some key labels have a command frequency value in percent points)<br> <div>Colors: <span class="keyMove">Move</span> <span class="keySelect">Select</span> <span class="keyChange">Change</span> <span class="keyOther">Other</span></div> | <img src="https://github.com/eugenesvk/kbdHelix/blob/main/img/KeyInfo-1Labels.png?raw=true" alt="Key Modifier Labels" width="125"/> | <img src="https://github.com/eugenesvk/kbdHelix/blob/main/img/KeyInfo-2Example.png?raw=true" alt="Key Example" width="149"/>|



#### Helix Keymap modiƒew Normal

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/537c5fed0748cb2cf889bab3ff866667), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew.png?raw=true), [config](https://github.com/eugenesvk/kbdHelix/blob/main/helper/config_modifew.toml)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Insert

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/7a5ff7b6fb13e52ad1ae63445536ca4b), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew-insert.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Select

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/cd44f7fd307f22d52d59f74c0967faaf), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew-select.png?raw=true). Only commands that differ from Normal mode are shown, the rest are copied

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew GoTo

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/235396cdfbd07f19f6af1e26dff1e949), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew-menu-goto.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew View

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/94d728fc74d61af4de9ed17ff7d8566d), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew-menu-view.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Match

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/1b083641d649a424a7edbf1a491aff75), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew-menu-match.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>



#### Helix Keymap modiƒew Window

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/22a4426747d045cc828e0d125af3a540), [image](https://github.com/eugenesvk/kbdHelix/blob/main/img/helix-keymap-modifew-menu-window.png?raw=true)

<div id=keyboard tabindex=0 style="display: inline-flex;">
</div>
