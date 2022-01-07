# Changelog
All notable changes to this project will be documented in this file

[unreleased]: https://github.com/eugenesvk/kbdHelix/compare/0.1.0...HEAD
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

[0.1.0]: https://github.com/eugenesvk/kbdHelix/releases/tag/0.1.0
## [0.1.0]
