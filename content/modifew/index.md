+++
title      	= "Design overview"
description	= "map the most frequent commands to the best keys; replace (hold) modifiers with (tap) key chords"
date       	= 2023-03-10
updated    	= 2023-04-24

draft          	= false        	# only loaded if the `--drafts` is passed to `zola build`/`serve`/`check`
#template      	= "keymap.html"	# template to render this section page
weight         	= 1            	# used by parent to order its subsections (↓val=↑higher priority)
#slug          	= ""           	# use instead of the filename to make the URL
#path          	= ""           	# overrides both `slug` and the filename, sections' path won't be used
#authors       	= []           	# used as the page's author in the default feed template.
in_search_index	= true         	# add section pages to search (if `build_search_index`)
#aliases       	= []           	# when moving content but want to redirect previous URLs to the  current one.  array of paths, not URLs

[taxonomies] # keys need to match `config.toml`, values=array[String objects], e.g. #tags = ["rust", "web"]

[extra] # Your own data
+++

## Overview {#overview}


This is a draft of the __modiƒew__ keymap for the [Helix](https://helix-editor.com) text editor that tries to break the chains ⛓ of keycap-based mnemonics[^mnem] like __f__ for `find` and instead maps most __frequent commands__ to the __best keys__, so 👆🏻[^finger] (<kbd>f</kbd> in QWERTY) `moves forward by a word` instead of executing `find`<br>
It also attempts to convert most of the commands requiring modifiers into a chainable key sequence, hence its name: "few modifiers based on frequency" (__ƒ__ for frequency) or __modiƒew__ or __◆ƒ__

This keymap is based on a dumb standard staggered keyboard design, so if you use a better one with a thumb 👍🏻👍 key cluster, you might want to move some of the more frequent commands there instead. The config file is based on the standard US-based __QWERTY__ layout[^2], though this document supports multiple layouts via buttons at the bottom of this overview

It's inspired by the [Emacs: Xah Fly Keys](http://xahlee.info/emacs/misc/ergoemacs_vi_mode.html) and uses Xah Lee's data on [Emacs command frequencies](http://xahlee.info/emacs/emacs/command-frequency.html), but is trying to outlfy the fly master :) by being more consistent in applying the basic frequent→best principle[^3]

Below is a summary of some of the design decisions followed up by detailed keymap Cheat Sheets for the various modes:

  - ⌂ __Home__ keys are __safe__: all 8 of the home keys are movement commands, so to modify a buffer your fingers need to leave __⌂__!
  - __Insert mode__ has a copy of most of Normal mode commands (from <kbd>key</kbd> and <kbd>⇧</kbd><kbd>key</kbd>) on the same keys, but with an extra <kbd>⌥</kbd> — no need to switch modes for just a single command!
  - __Space mode__ converts most of the commands requiring modifiers into a chainable key sequence with a "leader" key <kbd>Space</kbd> as the easiest to press. Its main layer mostly consists of commands that were assigned to <kbd>⎈</kbd> or <kbd>⇧</kbd> in the Normal mode, though via additional submodes any other command can also be chained (and if this [feature request](https://github.com/helix-editor/helix/issues/1499) is implemented, this approach could also work nicely with repeatable commands that would not close the menu dialog command list upon execution)
  - Differentiate between __repeatable__ and __single-press__ __paired__ keybinds (left/right, back/forward, earlier/later etc.)
    + __Repeatable__ keybinds should be on __separate__ __adjacent__ keys (just like <kbd>◀</kbd><kbd>▶</kbd>) instead of being on the same key with the second operation behind a <kbd>⇧</kbd>’ed status, so char/word/line-based movements and in-/decrement are together rather than being on separate rows by default. This greatly simplifies going back and forth:
        + Strongest non-thumb fingers on the __right__ hand:<br>
          move by __line__ 👆🏻down/🖕🏻up {{k(m="",k="j",t="keyMove",c="▼")}} {{k(m="",k="k",t="keyMove",c="▲")}}
        + Strongest non-thumb fingers on the __left__ hand:<br>
          move by __word__ 👆left/🖕right {{k(m="",k="d",t="keyMove",c="🢔ω")}} {{k(m="",k="f",t="keyMove",c="ω🢖")}}
        + Rest of the home row on the __right__ for the next most frequent commands:<br>
          move by __char__ 💍left/🤙🏻right {{k(m="",k="l",t="keyMove",c="◀")}} {{k(m="",k=";",t="keyMove",c="▶")}}
        + Repeat the 👆🏻down/🖕🏻up right hand mnemonic:
            + for the less frequent commands: decrement/increment object (number) under cursor <span style="white-space: nowrap;"><kbd>⎈</kbd><kbd lyt=q>m</kbd><span class="keyChange">⊖</span></span> <kbd>⎈</kbd><kbd lyt=q>,</kbd><span class="keyChange">⊕</span>
            + in the lower row: move half page down/up <span style="white-space: nowrap;">{{kw(m="",k="m",t="keyMove",c="⤈")}} {{kw(m="",k=",",t="keyMove",c="⤉")}}</span>
            + for the minor modes: (in {{klbl(t="keyOther",c="☰👁")}} View mode) <span style="white-space: nowrap;">{{kw(m="",k="u",t="keyOther",c="🗔⭳")}} {{kw(m="",k="i",t="keyOther",c="🗔⭱")}} </span>
        + Repeat the 💍left/🤙🏻right right hand mnemonic in the lower row: select previous/next search match <span style="white-space: nowrap;">{{kw(m="",k=".",t="keyMove",c="🢔◎")}} {{kw(m="",k="/",t="keyMove",c="◎🢖")}}</span> (broken pending fixing [this issue](https://github.com/helix-editor/helix/issues/1488), at the moment requires <kbd>⇧</kbd>)
        + Repeat the 👆left/🖕right left hand mnemonic for jumplist ←→ navigation <span style="white-space: nowrap;">{{kw(m="",k="3",t="keyMove",c="⎗̡")}} {{kw(m="",k="4",t="keyMove",c="⎘̡")}}</span> (requires <kbd>⌥</kbd> pending [feature](https://github.com/helix-editor/helix/issues/1200))
        + `Undo`/`redo` isn't yet fully optimized in this way (they are on adjacent <span style="white-space: nowrap;">{{kw(m="",k="y",t="keyChange",c="↷")}} {{kw(m="",k="u",t="keyChange",c="⎌")}}</span>, but on the same finger and in reverse order), some frequency data on the other Helix top row commands would help
    + __Single-press__ paired keybinds can remain with the opposite direction <kbd>⇧</kbd>’ed, e.g.,:
      + {{k(m=""  ,k="a",t="keyMove",c="⭰")}} move to the beginning of a line
      + {{k(m="⇧" ,k="a",t="keyMove",c="⭲")}} move to the end of a line 
  - It's ok to use (or even hold😲) <kbd>⌥</kbd> when you don't need to move by word (like in the <span class="keySelect">Ⓢ</span> Select mode), so the multi-cursor selection/manipulation is done with <kbd>⌥</kbd>+cursor:
      - select down/up <span style="white-space: nowrap;">{{kw(m="⎇",k="j",t="keySelect",c="🠷")}} {{kw(m="⎇",k="k",t="keySelect",c="🠵")}}</span> (`copy_selection_on_next_line`/`copy_selection_on_prev_line`) 
      - shift selection back/forward <span style="white-space: nowrap;">{{kw(m="⎇",k="m",t="keySelect",c="⟲")}} {{kw(m="⎇",k=",",t="keySelect",c="⟳")}}</span> (`rotate_selections_backward`/`rotate_selections_forward`)
      - quick selection correction without releasing the modifier: "soft undo" once {{k(m="⎇",k="u",t="keySelect",c="ᵡ")}} and all {{k(m="⎇",k="i",t="keySelect",c="ᵡ∀")}} (`remove_primary_selection`/`keep_primary_selection`)
  - Bonus: the `Cut`/`Copy`/`Paste` commands' frequencies seem to allow having them together under 💍🖕👆 left hand bottom row with the common <kbd lyt=q>x</kbd><kbd lyt=q>c</kbd><kbd lyt=q>v</kbd>, though `Undo` is too frequent to be left at a 🤙<kbd lyt=q>z</kbd> (however, with <kbd>⎈</kbd> they all maintain the	<kbd lyt=q>z</kbd><kbd lyt=q>x</kbd><kbd lyt=q>c</kbd><kbd lyt=q>v</kbd> compatibility) [^4]
  - Turn <kbd lyt=q>h</kbd> into a combo <kbd>⌫</kbd>/<kbd>⌦</kbd> key
  - (lacking sufficient frequency data) Group various inserts together:<br/>
    <span style="white-space: nowrap;">{{kw(m="",k="i",t="keyChange",c="⁁⤸")}} {{kw(m="",k="o",t="keyChange",c="⤹⎀")}}</span> to insert/append and <br/>
    <span style="white-space: nowrap;">{{kw(m="⇧",k="i",t="keyChange",c="⭡␤")}} {{kw(m="⇧",k="o",t="keyChange",c="⭣␤")}}</span> to `open_below`/`open_above` (`prepend_to_line`/`append_to_line` are removed as there is a standalone command to move to the beginning of a line, so <span style="white-space: nowrap;">{{kw(m="",k="a",t="keyMove",c="⭰")}} {{kw(m="⇧",k="i",t="keyChange",c="⁁⤸")}}</span> is easier than the old {{kw(m="",k="i",t="keyChange",c="⁁⭰")}})
  - Add a few keybinds to make it similar to non-modal editors to help with transition
    - {{k(m="" ,k="⏎",t="keyChange",c="⭣␤")}} {{k(m="⇧",k="⏎",t="keyChange",c="⭡␤")}} Insert a new line below/above (`open_below`/`open_above`)
    - {{k(m="⎈",k="a",t="keySelect"	,c="∀▋")}} Select all
    - {{k(m="⎈",k="o",t="keyOther" 	,c="☰␜")}} Open `file_picker`
    - {{k(m="⎈",k="s",t="keyOther" 	,c='<i class="fa fa-save"></i>')}} Save
    - {{k(m="⎈",k="z",t="keyChange"	,c="⎌")}}/{{k(m="⎈",k="y",t="keyChange",c="↷")}} Undo/Redo
    - {{k(m="⎈",k="x",t="keyChange"	,c="ᵡ")}} Cut (`yank_main_selection_to_clipboard`, `delete_selection`)
    - {{k(m="⎈",k="c",t="keyOther" 	,c='<i class="fa fa-copy"></i>')}} Copy (`yank_main_selection_to_clipboard`)
    - {{k(m="⎈",k="v",t="keyChange"	,c='<i class="fa fa-copy"></i>⤹')}}  Paste (`paste_clipboard_after`)
    - <span style="white-space: nowrap;"><kbd>⌥</kbd>/<kbd>⎈</kbd>+<kbd>⌫</kbd>/<kbd>⌦</kbd></span>  to delete a w/Word left/right
    - <span style="white-space: nowrap;"><kbd>⎈</kbd><kbd>⇞</kbd>/<kbd>⇟</kbd></span>  to navigate files (`goto_previous_buffer`/`goto_next_buffer`)
  - <span style="color: orange">⚠</span> (lacking sufficient frequency data) little optimization was applied to the top vs. bottom row placement of commands
  - <span style="color: orange">⚠</span> commands bound to <kbd>1</kbd>–<kbd>0</kbd> keys don't work pending implementation of this [feature request](https://github.com/helix-editor/helix/issues/1200), use <kbd>mod</kbd><kbd>1</kbd>–<kbd>0</kbd>

Below are __modiƒew__ __Cheat Sheets__ for the various major and minor "modes" in an html format to make it easier to copy/search for an icon here and in the [config file](https://github.com/eugenesvk/kbdHelix/blob/modifew/config/modifew.toml) since not all icons are obvious enough, but also as separate images as well as links to [Keyboard Layout Editor](http:/keyboard-layout-editor.com) so you could adjust the cheat sheet to your modified keymap

|    | Modifier key legend | Example of <kbd>l</kbd> |
| :- | :-----------------: | :---------------------: |
| Symbol's position match the modifier key legend<br>(`∀` denotes a position for a meta-symbol that applies to all commands,<br>e.g.`ω` means all commands are word-based)<br>(some key labels have a command frequency value in percent points)<br> <div>Colors: <span class="keyMove">Move</span> <span class="keySelect">Select</span> <span class="keyChange">Change</span> <span class="keyOther">Other</span></div> | <img src="../img/KeyInfo-1Labels.png" alt="Key Modifier Labels" width="125" height="72" loading="lazy"/> | <img src="../img/KeyInfo-2Example.png" alt="Key Example" width="149" height="86" loading="lazy"/>|

A few tips:
- <span style="color: green">⚠</span> Cheat sheets are best used in a supporting role after you have some basic familiarity with the config, so you might want to start learning by reading through the config's sections, e.g.:
    - Open config section `#Ⓝ Move` in [Normal mode](https://github.com/eugenesvk/kbdHelix/blob/d366b2382e7b08cae45c7990c917d3516dbacfc9/src/m1NOR.toml.tmpl#L64)
    - Open [normal mode cheat sheet](@/modifew/cheat-sheets/m1NOR.md) side-by-side
    - Read the config and compare to the visual cheat sheet
  
  Later if you need to look up just a single icon/button you can use tooltips by hovering over a button or pressing <kbd>⇧</kbd><kbd>KEY</kbd>[^kbd_tooltip]
- You can also load a page with just the cheat sheets using [these links](@/modifew/index.md#misc)
- ☰ is a menu icon

<div id=buttons><span class="inline text">Change keyboard layout to:</span>
  <button class="btn" id=btn_qwerty    	type=button>QWERTY</button>
  <button class="btn" id=btn_dvorak    	type=button>Dvorak</button>
  <button class="btn" id=btn_colemak   	type=button>Colemak</button>
  <button class="btn" id=btn_colemak_dh	type=button>Colemak DH</button>
  <button class="btn" id=btn_workman   	type=button>Workman</button>
  <button class="btn" id=btn_neo2      	type=button>Neo2</button>
</div>

(or load a page with a given layout by including its name as a url `#hash`
{{url_hash (name="#qwerty"     	, url="@/modifew/index.md" , hash="#qwerty")}}
{{url_hash (name="#dvorak"    	, url="@/modifew/index.md" , hash="#dvorak")}}
{{url_hash (name="#colemak"   	, url="@/modifew/index.md" , hash="#colemak")}}
{{url_hash (name="#colemak_dh"	, url="@/modifew/index.md" , hash="#colemak_dh")}}
{{url_hash (name="#workman"   	, url="@/modifew/index.md" , hash="#workman")}}
{{url_hash (name="#neo2"      	, url="@/modifew/index.md" , hash="#neo2")}}
{{url_hash (name="#asset"     	, url="@/modifew/index.md" , hash="#asset")}}
)

## Major modes {#major}

### Normal {{klbl(t="keyOther",c="Ⓝ")}} {#m-normal}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/537c5fed0748cb2cf889bab3ff866667), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-m1NOR.png?raw=true), [config](https://github.com/eugenesvk/kbdHelix/blob/modifew/config/modifew.toml)

<div id=modifew-m1NOR class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-m1NOR.html.tmpl")}}
</div>



### Insert {{klbl(t="keyChange",c="ⓘ")}} {#m-insert}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/7a5ff7b6fb13e52ad1ae63445536ca4b), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-m2INS.png?raw=true)

<div id=modifew-m2INS class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-m2INS.html.tmpl")}}
</div>



### Select {{klbl(t="keySelect",c="Ⓢ")}} {#m-select}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/cd44f7fd307f22d52d59f74c0967faaf), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-m3SEL.png?raw=true). Only commands that differ from Normal mode are shown, the rest are copied

<div id=modifew-m3SEL class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-m3SEL.html.tmpl")}}
</div>



## Minor modes {#minor}

### GoTo {{klbl(t="keyMove",c="⮊")}} {#n-goto}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/235396cdfbd07f19f6af1e26dff1e949), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nGoTo.png?raw=true)

<div id=modifew-nGoTo class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-nGoTo.html.tmpl")}}
</div>



### Space {{klbl(t="keyOther",c="␠")}} {#n-space}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/476cb89ca592befe598617a4af733910), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nSpace.png?raw=true). Note that modifiers are replaced with sub-modes since Space mode strives to use sequential key presses instead of key combos. Also, not all actions are yet implemented in Helix

<div id=modifew-nSpace class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-nSpace.html.tmpl")}}
</div>




### View {{klbl(t="keyOther",c="👁")}} {#n-view}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/94d728fc74d61af4de9ed17ff7d8566d), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nView.png?raw=true)

<div id=modifew-nView class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-nView.html.tmpl")}}
</div>



### Match {{klbl(t="keyOther",c="🧩")}} {#n-match}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/1b083641d649a424a7edbf1a491aff75), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nMatch.png?raw=true)

<div id=modifew-nMatch class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-nMatch.html.tmpl")}}
</div>



### Window {{klbl(t="keyOther",c="🗔")}} {#n-window}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/22a4426747d045cc828e0d125af3a540), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nWindow.png?raw=true)

<div id=modifew-nWindow class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-nWindow.html.tmpl")}}
</div>



### {{klbl(t="keyOther",c="⧛")}}Unimpaired{{klbl(t="keyOther",c="⧚")}} {#n-unimpaired}

[@KeyboardLayoutEditor](http://www.keyboard-layout-editor.com/#/gists/b885c21cc83ae06108b3da6728148191), [image](https://github.com/eugenesvk/kbdHelix/blob/modifew/img/helix-keymap-modifew-nUnimpaired.png?raw=true)

<div id=modifew-nUnimpaired class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc (file="kle/helix-keymap-modifew-nUnimpaired.html.tmpl")}}
</div>

## Install {#install}

1. Simple, but inflexible: copy the content of the __modiƒew__ [config keymap file](https://github.com/eugenesvk/kbdHelix/blob/modifew/config/modifew.toml) to your own Helix `~/.config/helix/config.toml` below your `[editor]` section
2. More complicated, but more flexible (makes it easier to change)
    - install [chezmoi config file manager](https://www.chezmoi.io/)
    - copy all template files from [modifew/src](https://github.com/eugenesvk/kbdHelix/tree/modifew/src) to your `~/.local/share/chezmoi/private_dot_config/helix` folder
    - replace theme and `[editor]` sections of the `Editor.toml.tmpl` file with your preferred settings
    - build the actual full Helix `config.toml` with `chezmoi apply -v --interactive`

    Now you can edit individual template files for each major/minor mode and build the config with `chezmoi` instead of drowning in one huge config. You can also add a single line to include repeated minor modes in various major modes (and even pass different keybinds as input parametes to those templates) instead of having to copy&paste them manually on every single change!

## Misc {#misc}

Direct links to pages with only the cheat cheets (custom layouts in a `#hash` also work):

|Layout→</br>Mode↓|qwerty|dvorak|colemak|colemak_dh|workman|neo2|asset|
|:-|:-|:-|:-|:-|:-|:-|:-|
|{{url_hash (name="all"        	, url="@/modifew/cheat-sheets/all.md"        	, hash="")}}|{{url_hash (name="link"            	, url="@/modifew/cheat-sheets/all.md"        	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#asset")}}|
|{{url_hash (name="m1NOR"      	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#m1NOR")}}|{{url_hash (name="link"      	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#asset")}}|
|{{url_hash (name="m2INS"      	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#m2INS")}}|{{url_hash (name="link"      	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#asset")}}|
|{{url_hash (name="m3SEL"      	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#m3SEL")}}|{{url_hash (name="link"      	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#asset")}}|
|{{url_hash (name="nGoTo"      	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#nGoTo")}}|{{url_hash (name="link"      	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#asset")}}|
|{{url_hash (name="nMatch"     	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#nMatch")}}|{{url_hash (name="link"     	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#asset")}}|
|{{url_hash (name="nSpace"     	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#nSpace")}}|{{url_hash (name="link"     	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#asset")}}|
|{{url_hash (name="nUnimpaired"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#nUnimpaired")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#asset")}}|
|{{url_hash (name="nView"      	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#nView")}}|{{url_hash (name="link"      	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#asset")}}|
|{{url_hash (name="nWindow"    	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#nWindow")}}|{{url_hash (name="link"    	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#qwerty")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#dvorak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#colemak")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#colemak_dh")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#workman")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#neo2")}}|{{url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#asset")}}|

<hr />

[^mnem] re. mnemonics: in such a complex keybind system such as Helix's I don't find them all that useful as they don't offer intuitive predictability due to said complexity since there are several alternatives to most of the keys, e.g., should <kbd>c</kbd> stand for Cut/Copy/Change/Collapse/Comment/Char/Command/Case/...?

[^finger] fingers are denoted with emojis: left‹🤙💍🖕☝️👍 and 👍🏻👆🏻🖕🏻💍🤙🏻›right

[^2] hopefully Helix will introduce a way to translate keycap labels to an arbitrary layout without having to rebind every single key (maybe as a solution to [this issue](https://github.com/helix-editor/helix/issues/133))

[^3] for example, instead of placing the 2nd most frequent command <span class="keyMove">▲</span> (15.5%) on a non-home row <kbd lyt=q>i</kbd> it uses the home row <kbd lyt=q>k</kbd>

[^4] this breaks the 'sticky' `select_mode` pending implementation of [this feature request](https://github.com/helix-editor/helix/issues/1487)

[^kbd_tooltip] (alphanumeric) characters produced as if you typed with a key are used to match cheat sheet labels, so this might not always match correctly the physical key layout. Press <kbd>⎋</kbd> or <kbd>␠</kbd> to hide. Tooltips show an ugly `[object Object]` instead for sub-modes instead of a description since that information is not part of the config, so requires more work to add
