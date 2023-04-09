# Changelog
All notable changes to this project will be documented in this file

[unreleased]: https://github.com/eugenesvk/kbdHelix/compare/0.3.0...HEAD
## [Unreleased]
  <!-- - __Added__ -->
   <!-- + :sparkles: ??? -->
   <!-- new features -->
  <!-- - __Changed__ -->
   <!-- + ???  -->
   <!-- changes in existing functionality -->
  <!-- - __Fixed__ -->
   <!-- + :beetle: ??? -->
   <!-- bug fixes -->
  <!-- - __Deprecated__ -->
   <!-- + :poop: ??? -->
   <!-- soon-to-be removed features -->
  <!-- - __Removed__ -->
   <!-- + :wastebasket: ??? -->
   <!-- now removed features -->
  <!-- - __Security__ -->
   <!-- + :lock: ??? -->
   <!-- vulnerabilities -->

  - __Added__
    + :sparkles: [chezmoi](chezmoi.io/) templates to generate config to avoid repeating sections like Space mode and edit each mode in a smaller separate config file instead of one huge config
    + :sparkles: F1 help mode stub
    + :sparkles: new commands added to helix in versions 22.08, 22.12, 23.03
        - Ⓝ<kbd>⎈</kbd><kbd>l</kbd> ⏾Suspend job (`suspend`)
        - Ⓝ<kbd>⎇</kbd><kbd>e</kbd> Sublime's `find_under_expand`
        - Ⓝ<kbd>⇧</kbd><kbd>⎇</kbd><kbd>x</kbd> ×␤+␠ Join lines+select space                                   	    (`join_selections_space`)
        - Ⓝ<kbd>⇧</kbd><kbd>e</kbd>  ━ Extend sel to line bounds (line-wise sel)⎯                              	    (`extend_to_line_bounds`)
        - Ⓝ<kbd>⇧</kbd><kbd>⎇</kbd><kbd>j</kbd> ⮒ Select current line, if already selected, extend to next line	    (`extend_line`)
        - Ⓝ<kbd>⇧</kbd><kbd>-</kbd>   ⛙ Merge consecutive selections ⨝                                         	    (`merge_consecutive_selections`)
        - Ⓝ<kbd>⎈</kbd><kbd>⏎</kbd>  ䷖w Hard-wrap selected lines                                               	    (`:reflow`)
        - Ⓝ<kbd>.</kbd>   🢔¶ Move paragraph start                                                              	    (`goto_prev_paragraph`)
        - Ⓝ<kbd>/</kbd>   ¶🢖 Move paragraph end                                                                	    (`goto_next_paragraph`)
        - Ⓝ<kbd>⎇</kbd><kbd>g</kbd> ☰🖈 List jumplist                                                           	(`jumplist_picker`)
        - Ⓝ<kbd>⎇</kbd><kbd>l</kbd> 🢔⸙ Select previous sibling node in syntax tree 🌳TS                         	(`select_prev_sibling`)
        - Ⓝ<kbd>⎇</kbd><kbd>;</kbd> ⸙🢖 Select next     sibling node in syntax tree 🌳TS                         	(`select_next_sibling`)
        - Ⓝ<kbd>⎇</kbd><kbd>⇧</kbd><kbd>m</kbd> ⸙− Shrink syntax tree object sel 🌳TS                           	(`shrink_selection`)
        - Ⓝ<kbd>⎇</kbd><kbd>⇧</kbd><kbd>,</kbd> ⸙₊ Expand sel to parent syntax node 🌳TS                        	(`expand_selection`)
        - Ⓝ<kbd>⎇</kbd><kbd>r</kbd> ⭿ Select current line/extend to another if selected                        	(`extend_line`)
        - Ⓝ<kbd>\</kbd> ↪   toggle soft wrap                                                                   	(`:toggle soft-wrap.enable`)
        - Ⓝ☰🗔  Window mode
            - <kbd>e</kbd> 🗗⟲ Switch to window previous	(`rotate_view_reverse`)
        - Ⓝ☰␠ Space mode
            - <kbd>⇧</kbd><kbd>f</kbd> 🗁 Open file   picker @ curdir (`file_picker_in_current_directory`)
        - Ⓝ☰⮊ GoTo mode
            - <kbd>b</kbd> ☰🖈 List jumplist          	(`jumplist_picker`)
            - ⇧d 🆔 declaration (LSP)                 	(`goto_declaration`)
            - h ⭰ line start                         	(`goto_line_start`)
        - ⓘ<kbd>⎈</kbd><kbd>u</kbd> α﹖ Signature help	🄻 (`signature_help`)
        - various 🄻LSP/🌳TS/other commands
    + new combo commands added
        - Ⓝ<kbd>⇧</kbd><kbd>⎇</kbd><kbd>z</kbd> 🢖∀🢔 collapse everything to a single cursor		(`keep_primary_selection collapse_selection`)
        - Ⓢ same as ↑, but also exit select mode
        - Ⓝ<kbd>⇧</kbd><kbd>⎇</kbd><kbd>i</kbd> ⭰䷖ Line: split & insert @ start	(`split_selection_on_newline insert_at_line_start`)
        - Ⓝ<kbd>⇧</kbd><kbd>⎇</kbd><kbd>o</kbd> ䷖⭲ Line: split & insert @ end  	(`split_selection_on_newline insert_at_line_end`)
  - __Changed__
    - command names to match newer helix versions 22.08, 22.12, 23.03
    - config/image/layout file names/locations
    - save command to add `commit_undo_checkpoint`
    - some command locations, e.g.
        - Ⓝ☰⮊ GoTo mode
            - a 𝕒⭰ line start 1ₛₜ non-whitespace char	(`goto_first_nonwhitespace`)
    - Layout symbols
      - w to ω
      - × to ᵡ
  - __Fixed__
    - <kbd>⇟</kbd> mapped to <kbd>⇞</kbd> and vice versa

[0.3.0]: https://github.com/eugenesvk/kbdHelix/releases/tag/0.3.0
## [0.3.0]

[0.2.0]: https://github.com/eugenesvk/kbdHelix/releases/tag/0.2.0
## [0.2.0]

  - __Added__
    - A few keybinds to make it similar to non-modal editors
        - <kbd>⏎</kbd>/<kbd>⇧</kbd><kbd>⏎</kbd> Insert a new line (`open_below`/`open_above`)
        - <kbd>^</kbd><kbd>a</kbd> Select all (`select_all`)
        - <kbd>^</kbd><kbd>s</kbd> Save (`:write`)
        - <kbd>^</kbd><kbd>z</kbd> Undo (`undo`)
        - <kbd>^</kbd><kbd>y</kbd> Redo (`redo`)
        - <kbd>^</kbd><kbd>o</kbd> Open (`file_picker`)
        - <kbd>^</kbd><kbd>x</kbd> Cut (`yank_main_selection_to_clipboard`, `delete_selection`)
        - <kbd>^</kbd><kbd>c</kbd> Copy (`yank_main_selection_to_clipboard`)
        - <kbd>^</kbd><kbd>v</kbd> Paste (`paste_clipboard_after`)
        - <kbd>⌥</kbd>/<kbd>^</kbd>+<kbd>⌫</kbd>/<kbd>⌦</kbd> to delete a w/Word left/right (e.g., `move_next_word_end`,`delete_selection`)
        - <kbd>^</kbd><kbd>⇞</kbd>/<kbd>⇟</kbd> to navigate files (`goto_previous_buffer`/`goto_next_buffer`)
  - __Changed__
    - The age-old vim design flaw that required you to shift fingers from home row for cursor movement <br><kbd>h</kbd><kbd>j</kbd><kbd>k</kbd><kbd>l</kbd> → <kbd>j</kbd><kbd>k</kbd><kbd>l</kbd><kbd>;</kbd>
    - <kbd>z</kbd> <kbd>x</kbd> <kbd>c</kbd> <kbd>v</kbd> <kbd>b</kbd> to `Undo` `Cut` `Copy` `Paste` `Redo`
    - <kbd>h</kbd>/<kbd>n</kbd> to free-standing `half_page_up`/`half_page_down` to 
    - <kbd>⇧</kbd><kbd>h</kbd>/<kbd>⇧</kbd><kbd>n</kbd> to `goto_line_start`/`goto_line_end`
    - __Repeatable__ keybinds to be on __separate__ __adjacent__ keys (just like <kbd>←</kbd><kbd>→</kbd>) instead of being on the same key with the second operation behind a <kbd>⇧</kbd>'ed status:
        + <kbd>q</kbd>/<kbd>w</kbd> to move by word (`move_prev_word_start`/`move_next_word_end`) instead of <kbd>b</kbd>/<kbd>e</kbd>
        + <kbd>z</kbd>/<kbd>b</kbd> to `undo`/`redo` instead of <kbd>u</kbd>/<kbd>⇧</kbd><kbd>u</kbd>
        + <kbd>⇧</kbd><kbd>z</kbd>/<kbd>⇧</kbd><kbd>b</kbd> to `earlier`/`later` instead of <kbd>⌥</kbd><kbd>u</kbd>/<kbd>⌥</kbd><kbd>⇧</kbd><kbd>u</kbd>
        + <kbd>^</kbd><kbd>,</kbd>/<kbd>^</kbd><kbd>.</kbd> to `increment`/`decrement` instead of <kbd>^</kbd><kbd>a</kbd>/<kbd>^</kbd><kbd>x</kbd>
        + <kbd>⌥</kbd><kbd>1</kbd>/<kbd>2</kbd> to buffer ←→ navigation (`goto_previous_buffer`/`goto_next_buffer`)
        + <kbd>⌥</kbd><kbd>3</kbd>/<kbd>4</kbd> to jumplist ←→ navigation  (`jump_backward`/`jump_forward`)
    - To use <kbd>⌥</kbd> when you don't need the word-jump functions (that are useful in the `Extend/Select` mode), so the multi-cursor mode uses <kbd>⌥</kbd>+cursor:
        - <kbd>⌥</kbd><kbd>k</kbd>/<kbd>l</kbd> to select down/up (`copy_selection_on_next_line`/`copy_selection_on_prev_line`)
        - <kbd>⌥</kbd><kbd>j</kbd>/<kbd>;</kbd> to shift selection back/forward (`rotate_selections_backward`/`rotate_selections_forward`)
        - bonus: quick selection correction without releasing the modifier with <kbd>⌥</kbd><kbd>z</kbd> (backup <kbd>⌥</kbd><kbd>u</kbd>) (`remove_primary_selection`)
        - <kbd>⌥</kbd><kbd>⇧</kbd><kbd>z</kbd> (backup <kbd>⌥</kbd><kbd>i</kbd>) to undo all selection (`keep_primary_selection`)
        - unrelated bonus: <kbd>⌥</kbd>+<kbd>q</kbd>/<kbd>w</kbd>/<kbd>e</kbd> to extend by word without entering the `Extend/Select` mode (`extend_prev_word_start`/`extend_next_word_end`/`extend_next_word_start`)
    - To group various inserts together
        - <kbd>i</kbd> `insert_mode`/`prepend_to_line`
        - <kbd>o</kbd> `append_mode`/`append_to_line`
        - <kbd>u</kbd>/<kbd>⇧</kbd><kbd>u</kbd> `open_below`/`open_above` 
