// import * as std from './std.js';
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function escRe(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
} // $& = whole string
function escRepl(string) {
    return string.replace(/\$/g, "$$$$");
}
RegExp.esc = escRe;
RegExp.escrepl = escRepl;
function regexp(strings) {
    for(var _len = arguments.length, vars = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        vars[_key - 1] = arguments[_key];
    }
    // Reconstruct the original string
    var strings_raw = strings.raw; // .raw allows use of \d instead of \\d)
    var str_orig = strings_raw[0];
    for(var i = 0; i < vars.length; i++){
        str_orig += vars[i] + strings_raw[i + 1];
    }
    var comment_beg = "【"; // 【comment】, alternatives? 〈comment〉「comment」 ‹comment›
    var comment_end = "】";
    var STX = String.fromCharCode(0x0002);
    var ETX = String.fromCharCode(0x0003);
    var _obj;
    var deCommentMap = (_obj = {}, _define_property(_obj, comment_beg.repeat(2), [
        comment_beg
    ]), _define_property(_obj, comment_end.repeat(2), [
        comment_end
    ]), _define_property(_obj, comment_beg, [
        STX
    ]), _define_property(_obj, comment_end, [
        ETX
    ]), _obj);
    var reComment = new RegExp(STX + "[^".concat(ETX, "]*") + ETX, "g");
    return new RegExp(str_orig.mapRepl(deCommentMap) // replace pairs with singles and singles with control chars that delimit comments
    .replace(reComment, "") //
    .replace(/\s+/g, ""));
}
function replaceMap(replMap) {
    var reProps = [];
    for(var prop in replMap){
        reProps.push(RegExp.esc(prop));
    }
    var reCombo = new RegExp(reProps.join("|"), "g");
    return this.replace(reCombo, function(match) {
        return replMap[match];
    });
}
String.prototype.mapRepl = replaceMap;
function extendProtos() {
    String.prototype.mapRepl = replaceMap;
    RegExp.esc = escRe;
    RegExp.escrepl = escRepl;
}

function _array_like_to_array$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes$1(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterable_to_array_limit$1(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array$1(arr, i) {
    return _array_with_holes$1(arr) || _iterable_to_array_limit$1(arr, i) || _unsupported_iterable_to_array$1(arr, i) || _non_iterable_rest$1();
}
function _tagged_template_literal$1(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
function _unsupported_iterable_to_array$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array$1(o, minLen);
}
function _templateObject$1() {
    var data = _tagged_template_literal$1([
        "",
        "1234567890-="
    ]);
    _templateObject$1 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject1$1() {
    var data = _tagged_template_literal$1([
        "~!@#$%^&*()_+"
    ]);
    _templateObject1$1 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject2$1() {
    var data = _tagged_template_literal$1([
        "",
        "1234567890[]"
    ]);
    _templateObject2$1 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject3() {
    var data = _tagged_template_literal$1([
        "~!@#$%^&*(){}"
    ]);
    _templateObject3 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject4() {
    var data = _tagged_template_literal$1([
        "",
        "1234567890-="
    ]);
    _templateObject4 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject5() {
    var data = _tagged_template_literal$1([
        "~!@#$%^&*()_+"
    ]);
    _templateObject5 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject6() {
    var data = _tagged_template_literal$1([
        "",
        "1234567890-="
    ]);
    _templateObject6 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject7() {
    var data = _tagged_template_literal$1([
        "~!@#$%^&*()_+"
    ]);
    _templateObject7 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject8() {
    var data = _tagged_template_literal$1([
        "",
        "1234567890-="
    ]);
    _templateObject8 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject9() {
    var data = _tagged_template_literal$1([
        "~!@#$%^&*()_+"
    ]);
    _templateObject9 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject10() {
    var data = _tagged_template_literal$1([
        "",
        "1234567890-="
    ]);
    _templateObject10 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject11() {
    var data = _tagged_template_literal$1([
        "~!@#$%^&*()_+"
    ]);
    _templateObject11 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject12() {
    var data = _tagged_template_literal$1([
        "^1234567890-",
        ""
    ]);
    _templateObject12 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject13() {
    var data = _tagged_template_literal$1([
        "ˇ\xb0\xa7ℓ\xbb\xab$€„“”—\xb8"
    ]);
    _templateObject13 = function _templateObject() {
        return data;
    };
    return data;
}
var gLyt = {
    lbl: "q"
};
var layout_string = {
    "qwerty.low": String.raw(_templateObject$1(), "`") + "qwertyuiop[]" + "asdfghjkl;'" + "zxcvbnm,./",
    "qwerty.upp": String.raw(_templateObject1$1()) + "QWERTYUIOP{}" + 'ASDFGHJKL:"' + "ZXCVBNM<>?",
    "dvorak.low": String.raw(_templateObject2$1(), "`") + "',.pyfgcrl/=" + "aoeuidhtns-" + ";qjkxbmwvz",
    "dvorak.upp": String.raw(_templateObject3()) + '"<>PYFGCRL?+' + "AOEUIDHTNS_" + ":QJKXBMWVZ",
    "colemak.low": String.raw(_templateObject4(), "`") + "qwfpgjluy;[]" + "arstdhneio'" + "zxcvbkm,./",
    "colemak.upp": String.raw(_templateObject5()) + "QWFPGJLUY:{}" + 'ARSTDHNEIO"' + "ZXCVBKM<>?",
    "workman.low": String.raw(_templateObject6(), "`") + "qdrwbjfup;[]" + "ashtgyneoi'" + "zxmcvkl,./",
    "workman.upp": String.raw(_templateObject7()) + "QDRWBJFUPP{}" + 'ASHTGYNEOI"' + "ZXMCVKL<>?",
    "asset.low": String.raw(_templateObject8(), "`") + "qwjfgypul;[]" + "asetdhnior'" + "zxcvbkm,./",
    "asset.upp": String.raw(_templateObject9()) + "QWJFGYPUL;{}" + 'ASETDHNIO:"' + "ZXCVBKM<>?",
    "colemak_dh.low": String.raw(_templateObject10(), "`") + "qwfpbjluy;[]" + "arstgkneio'" + "zxcdvmh,./",
    "colemak_dh.upp": String.raw(_templateObject11()) + "QWFPBJLUY:{}" + 'ARSTGKNEIO"' + "ZXCDVMH<>?",
    "neo2.low": String.raw(_templateObject12(), "`") + "xvlcwkhgfq\xdf\xb4" + "uiaeosnrtdy" + "\xfc\xf6\xe4pzbm,.j",
    "neo2.upp": String.raw(_templateObject13()) + "XVLCWKHGFQẞ˜" + "UIAEOSNRTDY" + "\xdc\xd6\xc4PZBM–•J"
};
var layouts = {
    "qwerty": "q",
    "dvorak": "d",
    "colemak": "c",
    "colemak_dh": "cdh",
    "workman": "w",
    "neo2": "n",
    "asset": "a"
};
var button_name = [];
var lyt = {}; // q:qwerty, qwerty:q
var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
try {
    for(var _iterator = Object.entries(layouts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
        var _step_value = _sliced_to_array$1(_step.value, 2), lytName = _step_value[0], lytAbbrv = _step_value[1];
        layout_string[lytName] = layout_string[lytName + ".low"] + layout_string[lytName + ".upp"];
        button_name.push("btn_" + lytName);
        lyt[lytName] = lytAbbrv;
        lyt[lytAbbrv] = lytName;
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally{
    try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
        }
    } finally{
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}
var btn_prefix_len = "btn_".length;
document.getElementsByClassName("btn"); // get a list of buttons to style later
var class_clicked = "layout_button_clicked"; // class that applies a colored border
var btn_default = "btn_qwerty"; // default layout before any button is clicked
// Check if default layout should be changed based on user's url hash
var _window_location = window.location, hash = _window_location.hash;
var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
try {
    for(var _iterator1 = Object.entries(layouts)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
        var _step_value1 = _sliced_to_array$1(_step1.value, 2), layout = _step_value1[0], lyt1 = _step_value1[1];
        if (hash.includes(layout)) {
            gLyt.lbl = lyt1;
            btn_default = "btn_".concat(layout);
        }
    }
} catch (err) {
    _didIteratorError1 = true;
    _iteratorError1 = err;
} finally{
    try {
        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
            _iterator1.return();
        }
    } finally{
        if (_didIteratorError1) {
            throw _iteratorError1;
        }
    }
}
var Case = Object.freeze({
    l: Symbol("lower"),
    U: Symbol("upper")
});
function isLowerCaseLyt(str, lyt) {
    return layout_string[lyt + ".low"].includes(str);
}
function isUpperCaseLyt(str, lyt) {
    return layout_string[lyt + ".upp"].includes(str);
}
function getCaseLyt(str, lyt) {
    if (isLowerCaseLyt(str, lyt)) {
        return Case.l;
    } else if (isUpperCaseLyt(str, lyt)) {
        return Case.U;
    } else {
        return null;
    }
}
function convertCaseLyt(char) {
    var lytNm = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "qwerty", CaseTo = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var caseCurrent = getCaseLyt(char, lytNm);
    if (!caseCurrent) {
        return;
    }
    var lyt_from, lyt_to;
    switch(CaseTo){
        case Case.U:
            lyt_from = layout_string[lytNm + ".low"];
            lyt_to = layout_string[lytNm + ".upp"];
            break;
        case Case.l:
            lyt_from = layout_string[lytNm + ".upp"];
            lyt_to = layout_string[lytNm + ".low"];
            break;
        default:
            switch(caseCurrent){
                case Case.U:
                    lyt_from = layout_string[lytNm + ".upp"];
                    lyt_to = layout_string[lytNm + ".low"];
                    break;
                case Case.l:
                    lyt_from = layout_string[lytNm + ".low"];
                    lyt_to = layout_string[lytNm + ".upp"];
                    break;
                default:
                    return;
            }
    }
    return lyt_to.charAt(lyt_from.indexOf(char)) || char;
}
function convert(src, from, to) {
    var ret = "";
    var layoutFrom = layout_string[from];
    var layoutTo = layout_string[to];
    for(var i = 0; i < src.length; i++){
        ret += layoutTo.charAt(layoutFrom.indexOf(src.charAt(i))) || src.charAt(i);
    }
    return ret;
}
var changeElementLayoutTo = function(layoutTo) {
    gLyt.lbl = layoutTo;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = document.querySelectorAll("*[lyt]")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var el = _step.value;
            var layoutFrom = el.getAttribute("lyt");
            var thisKey = el.textContent;
            if (layoutFrom === layoutTo) {} else {
                el.textContent = convert(thisKey, lyt[layoutFrom], lyt[layoutTo]) || thisKey;
                el.setAttribute("lyt", layoutTo);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};
var changeKLELayoutTo = function(layoutFrom, layoutTo) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = document.querySelectorAll("div.keylabel.keylabel10.textsize2 > div")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var el = _step.value;
            if (layoutFrom === layoutTo) {} else {
                var thisLbl = el.textContent;
                var conv_l = thisLbl === "ẞ" ? "\xdf" : thisLbl.toLowerCase();
                var conv = convert(conv_l, lyt[layoutFrom], lyt[layoutTo]);
                var conv_u = conv === "\xdf" ? "ẞ" : conv.toUpperCase();
                el.textContent = conv_u || thisLbl;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};
button_name.forEach(function(x) {
    var btn = document.getElementById(x);
    if (btn) {
        btn.addEventListener("click", function() {
            var layoutTo = lyt[x.slice(btn_prefix_len)]; // 'btn_Qwerty' → Q → Qwerty
            changeElementLayoutTo(layoutTo); // change kbd buttons to ↑
            var btn_active = btn_default;
            for(var i = 0; i < button_name.length; i++){
                var btn_i = document.getElementsByClassName("btn")[i];
                if (btn_i && btn_i.classList.contains(class_clicked)) {
                    btn_active = btn_i.id; // ...store its layout
                    btn_i.classList.remove(class_clicked); // ...and remove its color border ()
                }
            }
            this.classList.add(class_clicked); // add color border to the clicked button
            var layoutFrom = lyt[btn_active.slice(btn_prefix_len)]; // 'btn_Qwerty' → Q → Qwerty
            changeKLELayoutTo(layoutFrom, layoutTo);
        }, false);
    }
});
changeElementLayoutTo(gLyt.lbl);
if (gLyt.lbl !== "q") {
    changeKLELayoutTo("q", gLyt.lbl);
}

var modifew = {
  keys: {
    normal: {
      "1": "goto_previous_buffer",
      "2": "goto_next_buffer",
      "3": "jump_backward",
      "4": "jump_forward",
      "6": "delete_char_forward",
      "7": "align_selections",
      "8": "search_selection",
      "C-q": ":quit!",
      "C-u": "no_op",
      "A-C": "no_op",
      "A-(": "no_op",
      "A-)": "no_op",
      "A-K": "no_op",
      "C-i": "no_op",
      b: "no_op",
      "~": "no_op",
      "A-`": "no_op",
      R: "command_palette",
      "C-o": "file_picker",
      "C-O": "file_picker_in_current_directory",
      "C-s": [
        "commit_undo_checkpoint",
        ":write"
      ],
      "C-n": ":new",
      c: "yank",
      "C-c": "yank_main_selection_to_clipboard",
      C: "yank_main_selection_to_clipboard",
      "A-c": "yank_joined_to_clipboard",
      "A-\\": "shell_pipe_to",
      j: "move_line_down",
      k: "move_line_up",
      l: "move_char_left",
      ";": "move_char_right",
      m: "half_page_down",
      ",": "half_page_up",
      "C-j": "page_down",
      "C-k": "page_up",
      a: "extend_to_line_start",
      A: "extend_to_line_end",
      "C-home": "goto_file_start",
      "C-end": "goto_last_line",
      "C-S-tab": "goto_previous_buffer",
      "C-tab": "goto_next_buffer",
      "C-pageup": "goto_previous_buffer",
      "C-pagedown": "goto_next_buffer",
      "A-pageup": "jump_backward",
      "A-pagedown": "jump_forward",
      "A-1": "goto_previous_buffer",
      "A-2": "goto_next_buffer",
      "A-3": "jump_backward",
      "A-4": "jump_forward",
      d: "move_prev_word_start",
      f: "move_next_word_end",
      "A-d": "move_prev_word_end",
      "A-f": "move_next_word_start",
      D: "move_prev_long_word_start",
      F: "move_next_long_word_end",
      "A-D": "move_prev_long_word_start",
      "A-F": "move_next_long_word_start",
      "C-d": [
        "move_prev_long_word_start",
        "extend_prev_word_start",
        "extend_next_word_start"
      ],
      "C-f": "move_next_long_word_start",
      "C-left": "move_prev_long_word_start",
      "C-right": "move_next_long_word_start",
      "A-left": "move_prev_word_end",
      "A-right": "move_next_word_start",
      ":": "command_mode",
      "{": "goto_prev_paragraph",
      "}": "goto_next_paragraph",
      ">": "search_prev",
      "?": "search_next",
      r: "repeat_last_motion",
      w: "find_next_char",
      W: "find_prev_char",
      "A-w": "find_till_char",
      "A-W": "till_prev_char",
      S: "rsearch",
      s: "search",
      ".": "search_prev",
      "/": "search_next",
      "*": "search_selection",
      e: "select_mode",
      "C-a": [
        "save_selection",
        "select_all"
      ],
      "A-down": "copy_selection_on_next_line",
      "A-up": "copy_selection_on_prev_line",
      "S-left": "extend_char_left",
      "S-down": "extend_line_down",
      "S-up": "extend_line_up",
      "S-right": "extend_char_right",
      "A-g": "jumplist_picker",
      "C-g": "save_selection",
      G: "save_selection",
      J: "extend_line_below",
      "A-r": "extend_line",
      E: "extend_to_line_bounds",
      "A-e": [
        "select_mode",
        "move_next_word_end",
        "move_prev_word_start",
        "search_selection",
        "make_search_word_bounded",
        "extend_search_next",
        "normal_mode"
      ],
      "A-j": "copy_selection_on_next_line",
      "A-k": "copy_selection_on_prev_line",
      "A-l": "select_prev_sibling",
      "A-;": "select_next_sibling",
      M: "shrink_selection",
      "<": "expand_selection",
      "A-s": "select_regex",
      N: "split_selection",
      "A-n": "split_selection_on_newline",
      "'": "collapse_selection",
      "A-'": "flip_selections",
      "A-a": "flip_selections",
      "A-A": "flip_selections",
      "A-p": "ensure_selections_forward",
      "A-m": "rotate_selections_forward",
      "A-,": "rotate_selections_backward",
      "A-u": "remove_primary_selection",
      "A-i": "keep_primary_selection",
      "A-U": "no_op",
      K: "keep_selections",
      L: "remove_selections",
      "A-Z": [
        "keep_primary_selection",
        "collapse_selection"
      ],
      minus: "trim_selections",
      _: "merge_consecutive_selections",
      "A-del": "delete_word_forward",
      "C-del": [
        "extend_next_long_word_end",
        "delete_selection"
      ],
      "A-backspace": "delete_word_backward",
      "C-backspace": [
        "extend_prev_long_word_start",
        "delete_selection"
      ],
      "S-del": "delete_selection_noyank",
      "S-ret": [
        "open_below",
        "normal_mode"
      ],
      ret: [
        "open_above",
        "normal_mode"
      ],
      "C-ret": ":reflow",
      x: "delete_selection",
      "A-x": "delete_selection_noyank",
      h: "delete_char_backward",
      H: "delete_char_forward",
      "A-h": "delete_word_backward",
      "A-H": "delete_word_forward",
      "C-h": [
        "move_prev_long_word_start",
        "delete_selection"
      ],
      "C-x": [
        "yank_main_selection_to_clipboard",
        "delete_selection"
      ],
      backspace: "delete_char_backward",
      X: "join_selections",
      "A-X": "join_selections_space",
      del: "delete_char_forward",
      t: "replace",
      T: "replace_with_yanked",
      "A-t": "replace_selections_with_clipboard",
      B: "switch_to_lowercase",
      "C-b": "switch_to_uppercase",
      "A-.": "unindent",
      "A-/": "indent",
      q: "record_macro",
      Q: "replay_macro",
      "\"": "select_register",
      i: "insert_mode",
      o: "append_mode",
      I: "open_above",
      O: "open_below",
      u: "undo",
      y: "redo",
      U: "earlier",
      Y: "later",
      "C-y": "redo",
      v: "paste_after",
      "C-v": "paste_clipboard_after",
      V: "paste_before",
      "C-z": "undo",
      "C-Z": "redo",
      "A-I": [
        "split_selection_on_newline",
        "insert_at_line_start"
      ],
      "A-O": [
        "split_selection_on_newline",
        "insert_at_line_end"
      ],
      "(": "rotate_selection_contents_backward",
      ")": "rotate_selection_contents_forward",
      "&": "align_selections",
      "=": "format_selections",
      z: "toggle_comments",
      "C-/": "toggle_comments",
      "C-m": "decrement",
      "C-,": "increment",
      "\\": ":toggle soft-wrap.enable",
      "C-l": "suspend",
      $: "shell_keep_pipe",
      "!": "shell_insert_output",
      "@": "shell_append_output",
      "A-!": "shell_append_output",
      F1: {
        F2: ":tree-sitter-scopes",
        F3: ":tree-sitter-subtree",
        c: ":character-info"
      },
      "`": {
        "`": "switch_case",
        j: "switch_to_lowercase",
        k: "switch_to_uppercase"
      },
      p: {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      P: {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      Z: {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      g: {
        "1": "goto_previous_buffer",
        "2": "goto_next_buffer",
        "3": "jump_backward",
        "4": "jump_forward",
        p: "no_op",
        b: "jumplist_picker",
        a: "goto_first_nonwhitespace",
        s: "goto_line_end",
        h: "goto_line_start",
        g: "goto_file_start",
        j: "goto_last_line",
        k: "goto_file_start",
        l: "goto_prev_paragraph",
        ";": "goto_next_paragraph",
        ".": "goto_prev_paragraph",
        "/": "goto_next_paragraph",
        f: "goto_file",
        m: "goto_window_bottom",
        ",": "goto_window_top",
        n: "goto_window_center",
        D: "goto_declaration",
        d: "goto_definition",
        F12: "goto_definition",
        i: "goto_implementation",
        t: "goto_implementation",
        r: "goto_reference",
        e: "goto_type_definition",
        y: "goto_type_definition",
        c: "goto_last_accessed_file",
        v: "goto_last_modified_file",
        u: "goto_last_modification"
      },
      n: {
        n: "match_brackets",
        ".": "match_brackets",
        "/": "match_brackets",
        i: "surround_add",
        t: "surround_replace",
        x: "surround_delete",
        e: "select_textobject_around",
        a: "select_textobject_inner"
      },
      "C-w": {
        v: "no_op",
        F: "no_op",
        "C-s": "no_op",
        "C-v": "no_op",
        j: "jump_view_down",
        k: "jump_view_up",
        l: "jump_view_left",
        ";": "jump_view_right",
        "C-j": "jump_view_down",
        "C-k": "jump_view_up",
        "C-l": "jump_view_left",
        "C-;": "jump_view_right",
        "C-down": "jump_view_down",
        "C-up": "jump_view_up",
        "C-left": "jump_view_left",
        "C-right": "jump_view_right",
        e: "rotate_view_reverse",
        "C-e": "rotate_view_reverse",
        a: "rotate_view_reverse",
        w: "rotate_view",
        "C-w": "rotate_view",
        s: "rotate_view",
        f: "vsplit",
        "C-f": "vsplit",
        m: "hsplit",
        "C-m": "hsplit",
        h: "goto_file_hsplit",
        "C-h": "goto_file_hsplit",
        g: "goto_file_vsplit",
        "C-g": "goto_file_vsplit",
        q: "wclose",
        "C-q": "wclose",
        o: "wonly",
        "C-o": "wonly",
        x: "wonly",
        "C-x": "wonly",
        down: "jump_view_down",
        up: "jump_view_up",
        left: "jump_view_left",
        right: "jump_view_right"
      },
      space: {
        "6": "switch_to_uppercase",
        ret: "command_mode",
        F: "file_picker_in_current_directory",
        c: "yank_main_selection_to_clipboard",
        x: [
          "yank_main_selection_to_clipboard",
          "delete_selection"
        ],
        p: "no_op",
        P: "no_op",
        Y: "no_op",
        S: "no_op",
        r: "command_palette",
        ";": "command_mode",
        j: "extend_line",
        k: "keep_selections",
        l: "remove_selections",
        s: "select_regex",
        a: [
          "save_selection",
          "select_all"
        ],
        h: [
          "kill_to_line_start",
          "kill_to_line_end"
        ],
        g: "save_selection",
        e: "extend_to_line_bounds",
        t: "replace_with_yanked",
        R: "rename_symbol",
        o: "hover",
        y: "code_action",
        "/": "global_search",
        v: "paste_clipboard_after",
        n: "split_selection",
        b: "switch_to_lowercase",
        "'": "flip_selections",
        "\\": "shell_pipe",
        m: {
          m: "symbol_picker",
          ",": "workspace_symbol_picker"
        },
        ",": {
          ",": "diagnostics_picker",
          m: "workspace_diagnostics_picker"
        },
        f: {
          j: [
            "commit_undo_checkpoint",
            ":write"
          ],
          k: "file_picker",
          f: "buffer_picker",
          s: [
            "commit_undo_checkpoint",
            ":write"
          ],
          S: [
            "commit_undo_checkpoint",
            ":write-all"
          ],
          "A-s": ":update",
          a: "goto_last_accessed_file",
          v: "goto_last_modified_file",
          o: "file_picker",
          n: ":new",
          "`": ":reload",
          "~": ":reload-all",
          p: ":config-open-workspace",
          ",": "file_picker_in_current_buffer_directory",
          O: "file_picker_in_current_buffer_directory",
          q: {
            r: ":buffer-close-all",
            f: ":buffer-close",
            v: ":buffer-close-others",
            e: ":quit-all",
            d: ":quit",
            w: ":write-quit-all",
            s: ":write-quit",
            u: ":write-quit-all",
            j: ":write-quit",
            ";": ":cquit",
            q: {
              r: ":buffer-close-all!",
              f: ":buffer-close!",
              v: ":buffer-close-others!",
              e: ":quit-all!",
              d: ":quit!",
              w: ":write-quit-all!",
              s: ":write-quit!",
              u: ":write-quit-all!",
              j: ":write-quit!",
              ";": ":cquit!"
            }
          },
          x: {
            r: ":buffer-close-all",
            f: ":buffer-close",
            v: ":buffer-close-others",
            e: ":quit-all",
            d: ":quit",
            w: ":write-quit-all",
            s: ":write-quit",
            u: ":write-quit-all",
            j: ":write-quit",
            ";": ":cquit",
            x: {
              r: ":buffer-close-all!",
              f: ":buffer-close!",
              v: ":buffer-close-others!",
              e: ":quit-all!",
              d: ":quit!",
              w: ":write-quit-all!",
              s: ":write-quit!",
              u: ":write-quit-all!",
              j: ":write-quit!",
              ";": ":cquit!"
            }
          }
        },
        i: {
          i: "select_register",
          t: "replace_selections_with_clipboard",
          x: "join_selections",
          v: "paste_clipboard_before",
          c: "yank_joined_to_clipboard",
          j: ":sort",
          k: ":rsort"
        },
        w: {
          v: "no_op",
          F: "no_op",
          "C-s": "no_op",
          "C-v": "no_op",
          j: "jump_view_down",
          k: "jump_view_up",
          l: "jump_view_left",
          ";": "jump_view_right",
          "C-j": "jump_view_down",
          "C-k": "jump_view_up",
          "C-l": "jump_view_left",
          "C-;": "jump_view_right",
          "C-down": "jump_view_down",
          "C-up": "jump_view_up",
          "C-left": "jump_view_left",
          "C-right": "jump_view_right",
          e: "rotate_view_reverse",
          "C-e": "rotate_view_reverse",
          a: "rotate_view_reverse",
          w: "rotate_view",
          "C-w": "rotate_view",
          s: "rotate_view",
          f: "vsplit",
          "C-f": "vsplit",
          m: "hsplit",
          "C-m": "hsplit",
          h: "goto_file_hsplit",
          "C-h": "goto_file_hsplit",
          g: "goto_file_vsplit",
          "C-g": "goto_file_vsplit",
          q: "wclose",
          "C-q": "wclose",
          o: "wonly",
          "C-o": "wonly",
          x: "wonly",
          "C-x": "wonly",
          down: "jump_view_down",
          up: "jump_view_up",
          left: "jump_view_left",
          right: "jump_view_right"
        },
        u: {
          q: "no_op",
          w: "no_op",
          u: "remove_primary_selection",
          i: "keep_primary_selection",
          o: ":character-info",
          j: "goto_next_change",
          k: "goto_prev_change",
          l: "goto_first_change",
          ";": "goto_last_change",
          b: ":reset-diff-change",
          a: "goto_prev_parameter",
          s: "goto_next_parameter",
          d: "goto_prev_function",
          f: "goto_next_function",
          z: "goto_prev_comment",
          x: "goto_next_comment",
          c: "goto_prev_class",
          v: "goto_next_class",
          t: "goto_prev_test",
          y: "goto_next_test",
          "'": ":format",
          p: "format_selections",
          m: "goto_next_diag",
          ",": "goto_prev_diag",
          ".": "goto_first_diag",
          "/": "goto_last_diag",
          g: "code_action",
          n: "rename_symbol",
          r: ":lsp-workspace-command",
          "\\": ":lsp-stop",
          "]": ":lsp-restart",
          h: ":toggle lsp.display-inlay-hints",
          e: "select_references_to_symbol_under_cursor",
          "[": "dap_restart"
        }
      },
      "[": {
        j: "goto_prev_change",
        h: "goto_first_change",
        d: "goto_prev_diag",
        g: "goto_first_diag",
        f: "goto_prev_function",
        s: "goto_prev_class",
        a: "goto_prev_parameter",
        "/": "goto_prev_comment",
        z: "goto_prev_comment",
        t: "goto_prev_test",
        p: "goto_prev_paragraph",
        "[": "goto_prev_paragraph",
        ".": "goto_prev_paragraph",
        space: "add_newline_above",
        m: [
          "extend_to_line_bounds",
          "delete_selection",
          "move_line_up",
          "paste_before"
        ],
        c: {
          q: ":set auto-save true",
          w: ":set auto-format true",
          e: ":set line-number absolute",
          r: ":set soft-wrap true",
          t: ":set search.wrap-around true",
          a: ":set auto-completion true",
          s: ":set search.smart-case true",
          g: ":set indent-guides.render true",
          z: ":set completion-replace true",
          c: ":set true-color true",
          h: ":set cursorline true",
          j: ":set cursorcolumn true",
          d: ":set auto-pairs true",
          i: ":set auto-info true",
          v: ":set middle-click-paste true",
          m: ":set mouse true",
          u: ":set undercurl true",
          p: ":set color-modes true",
          o: ":config-open",
          l: ":config-reload",
          " ": {
            " ": ":set whitespace.render.space all",
            b: ":set whitespace.render.nbsp all",
            tab: ":set whitespace.render.tab all",
            t: ":set whitespace.render.tab all",
            n: ":set whitespace.render.newline all",
            ret: ":set whitespace.render.newline all"
          },
          ".": {
            ".": ":set file-picker.hidden true",
            ",": ":set file-picker.ignore true",
            p: ":set file-picker.parents true",
            i: ":set file-picker.git-ignore true",
            g: ":set file-picker.git-global true",
            e: ":set file-picker.git-exclude true",
            l: ":set follow-links true",
            k: ":set deduplicate-links true"
          },
          y: {
            k: ":set lsp.enable true",
            p: ":set lsp.display-messages true",
            i: ":set lsp.auto-signature-help true",
            h: ":set lsp.display-inlay-hints true",
            d: ":set lsp.display-signature-help-docs true",
            s: ":set lsp.snippets true"
          }
        }
      },
      "]": {
        j: "goto_next_change",
        h: "goto_last_change",
        d: "goto_next_diag",
        g: "goto_last_diag",
        f: "goto_next_function",
        s: "goto_next_class",
        a: "goto_next_parameter",
        "/": "goto_next_comment",
        z: "goto_next_comment",
        t: "goto_next_test",
        p: "goto_next_paragraph",
        "]": "goto_next_paragraph",
        ".": "goto_next_paragraph",
        space: "add_newline_below",
        m: [
          "extend_to_line_bounds",
          "delete_selection",
          "goto_line_end",
          "paste_after"
        ],
        c: {
          q: ":set auto-save false",
          w: ":set auto-format false",
          e: ":set line-number relative",
          r: ":set soft-wrap false",
          t: ":set search.wrap-around false",
          a: ":set auto-completion false",
          s: ":set search.smart-case false",
          g: ":set indent-guides.render false",
          z: ":set completion-replace false",
          c: ":set false-color false",
          h: ":set cursorline false",
          j: ":set cursorcolumn false",
          d: ":set auto-pairs false",
          i: ":set auto-info false",
          v: ":set middle-click-paste false",
          m: ":set mouse false",
          u: ":set undercurl false",
          p: ":set color-modes false",
          o: ":config-open",
          l: ":config-reload",
          " ": {
            " ": ":set whitespace.render.space none",
            b: ":set whitespace.render.nbsp none",
            tab: ":set whitespace.render.tab none",
            t: ":set whitespace.render.tab none",
            n: ":set whitespace.render.newline none",
            ret: ":set whitespace.render.newline none"
          },
          ".": {
            ".": ":set file-picker.hidden false",
            ",": ":set file-picker.ignore false",
            p: ":set file-picker.parents false",
            i: ":set file-picker.git-ignore false",
            g: ":set file-picker.git-global false",
            e: ":set file-picker.git-exclude false",
            l: ":set follow-links false",
            k: ":set deduplicate-links false"
          },
          y: {
            k: ":set lsp.enable false",
            p: ":set lsp.display-messages false",
            i: ":set lsp.auto-signature-help false",
            h: ":set lsp.display-inlay-hints false",
            d: ":set lsp.display-signature-help-docs false",
            s: ":set lsp.snippets false"
          }
        }
      }
    },
    select: {
      "1": "goto_previous_buffer",
      "2": "goto_next_buffer",
      "3": "jump_backward",
      "4": "jump_forward",
      "6": "delete_char_forward",
      "7": "align_selections",
      "8": "search_selection",
      e: "normal_mode",
      "C-o": "file_picker",
      "C-O": "file_picker_in_current_directory",
      "C-s": [
        "commit_undo_checkpoint",
        ":write"
      ],
      "C-n": ":new",
      z: "toggle_comments",
      "C-/": "toggle_comments",
      "C-m": "decrement",
      "C-,": "increment",
      c: "yank",
      "C-c": "yank_main_selection_to_clipboard",
      C: "yank_main_selection_to_clipboard",
      "A-c": "yank_joined_to_clipboard",
      "A-\\": "shell_pipe_to",
      j: "extend_line_down",
      k: "extend_line_up",
      l: "extend_char_left",
      ";": "extend_char_right",
      m: "half_page_down",
      ",": "half_page_up",
      "C-j": "page_down",
      "C-k": "page_up",
      d: "extend_prev_word_start",
      f: "extend_next_word_end",
      "A-d": "extend_prev_word_end",
      "A-f": "extend_next_word_start",
      D: "extend_prev_long_word_start",
      F: "extend_next_long_word_end",
      "A-D": "extend_prev_long_word_start",
      "A-F": "extend_next_long_word_start",
      "C-left": "extend_prev_long_word_start",
      "C-right": "extend_next_long_word_start",
      "A-right": "extend_next_word_start",
      a: "extend_to_line_start",
      A: "extend_to_line_end",
      "{": "goto_prev_paragraph",
      "}": "goto_next_paragraph",
      ">": "extend_search_prev",
      "?": "extend_search_next",
      r: "repeat_last_motion",
      w: "extend_next_char",
      W: "extend_prev_char",
      "A-w": "extend_till_char",
      "A-W": "extend_till_prev_char",
      S: "rsearch",
      s: "search",
      ".": "extend_search_prev",
      "/": "extend_search_next",
      "C-home": "goto_file_start",
      "C-end": "goto_last_line",
      "C-S-tab": "goto_previous_buffer",
      "C-tab": "goto_next_buffer",
      "C-pageup": "goto_previous_buffer",
      "C-pagedown": "goto_next_buffer",
      "A-pageup": "jump_backward",
      "A-pagedown": "jump_forward",
      "A-1": "goto_previous_buffer",
      "A-2": "goto_next_buffer",
      "A-3": "jump_backward",
      "A-4": "jump_forward",
      "C-a": [
        "save_selection",
        "select_all"
      ],
      "A-down": "copy_selection_on_next_line",
      "A-up": "copy_selection_on_prev_line",
      "S-left": "extend_char_left",
      "S-down": "extend_line_down",
      "S-up": "extend_line_up",
      "S-right": "extend_char_right",
      "A-g": "save_selection",
      "C-g": "save_selection",
      G: "save_selection",
      J: "extend_line",
      E: "extend_to_line_bounds",
      "A-e": [
        "select_mode",
        "move_next_word_end",
        "move_prev_word_start",
        "search_selection",
        "make_search_word_bounded",
        "extend_search_next"
      ],
      "A-j": "copy_selection_on_next_line",
      "A-k": "copy_selection_on_prev_line",
      "A-l": "select_prev_sibling",
      "A-;": "select_next_sibling",
      M: "shrink_selection",
      "<": "expand_selection",
      "A-s": "select_regex",
      N: "split_selection",
      "A-n": "split_selection_on_newline",
      "'": "collapse_selection",
      "A-'": "flip_selections",
      "A-a": "flip_selections",
      "A-A": "flip_selections",
      "A-p": "ensure_selections_forward",
      "A-m": "rotate_selections_forward",
      "A-,": "rotate_selections_backward",
      "A-u": "remove_primary_selection",
      "A-i": "keep_primary_selection",
      "A-U": "no_op",
      K: "keep_selections",
      L: "remove_selections",
      "A-Z": [
        "keep_primary_selection",
        "collapse_selection",
        "exit_select_mode"
      ],
      minus: "trim_selections",
      _: "merge_consecutive_selections",
      "A-del": "delete_word_forward",
      "C-del": [
        "extend_next_long_word_end",
        "delete_selection"
      ],
      "A-backspace": "delete_word_backward",
      "C-backspace": [
        "extend_prev_long_word_start",
        "delete_selection"
      ],
      "S-del": "delete_selection_noyank",
      "S-ret": "open_below",
      ret: "open_above",
      "C-ret": ":reflow",
      x: "delete_selection",
      "A-x": "delete_selection_noyank",
      h: "delete_char_backward",
      H: "delete_char_forward",
      "A-h": "delete_word_backward",
      "A-H": "delete_word_forward",
      "C-h": [
        "extend_prev_long_word_start",
        "delete_selection"
      ],
      "C-x": [
        "yank_main_selection_to_clipboard",
        "delete_selection"
      ],
      backspace: "delete_char_backward",
      X: "join_selections",
      del: "delete_char_forward",
      t: "replace",
      T: "replace_with_yanked",
      B: "switch_case",
      "C-b": "switch_to_uppercase",
      "⎈": "switch_to_uppercase",
      "A-`": "switch_to_lowercase",
      "A-.": "unindent",
      "A-/": "indent",
      o: "append_mode",
      I: "open_above",
      O: "open_below",
      u: "undo",
      y: "redo",
      U: "earlier",
      Y: "later",
      "C-y": "redo",
      v: "paste_after",
      "C-v": "paste_clipboard_after",
      V: "paste_before",
      "C-z": "suspend",
      "C-Z": "redo",
      "(": "rotate_selection_contents_backward",
      ")": "rotate_selection_contents_forward",
      "@": "shell_append_output",
      F1: {
        F2: ":tree-sitter-scopes",
        F3: ":tree-sitter-subtree",
        c: ":character-info"
      },
      p: {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      P: {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      Z: {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      g: {
        "1": "goto_previous_buffer",
        "2": "goto_next_buffer",
        "3": "jump_backward",
        "4": "jump_forward",
        p: "no_op",
        b: "jumplist_picker",
        a: "goto_first_nonwhitespace",
        s: "goto_line_end",
        h: "goto_line_start",
        g: "goto_file_start",
        j: "goto_last_line",
        k: "goto_file_start",
        l: "goto_prev_paragraph",
        ";": "goto_next_paragraph",
        ".": "goto_prev_paragraph",
        "/": "goto_next_paragraph",
        f: "goto_file",
        m: "goto_window_bottom",
        ",": "goto_window_top",
        n: "goto_window_center",
        D: "goto_declaration",
        d: "goto_definition",
        F12: "goto_definition",
        i: "goto_implementation",
        t: "goto_implementation",
        r: "goto_reference",
        e: "goto_type_definition",
        y: "goto_type_definition",
        c: "goto_last_accessed_file",
        v: "goto_last_modified_file",
        u: "goto_last_modification"
      },
      n: {
        n: "match_brackets",
        ".": "match_brackets",
        "/": "match_brackets",
        i: "surround_add",
        t: "surround_replace",
        x: "surround_delete",
        e: "select_textobject_around",
        a: "select_textobject_inner"
      },
      "C-w": {
        v: "no_op",
        F: "no_op",
        "C-s": "no_op",
        "C-v": "no_op",
        j: "jump_view_down",
        k: "jump_view_up",
        l: "jump_view_left",
        ";": "jump_view_right",
        "C-j": "jump_view_down",
        "C-k": "jump_view_up",
        "C-l": "jump_view_left",
        "C-;": "jump_view_right",
        "C-down": "jump_view_down",
        "C-up": "jump_view_up",
        "C-left": "jump_view_left",
        "C-right": "jump_view_right",
        e: "rotate_view_reverse",
        "C-e": "rotate_view_reverse",
        a: "rotate_view_reverse",
        w: "rotate_view",
        "C-w": "rotate_view",
        s: "rotate_view",
        f: "vsplit",
        "C-f": "vsplit",
        m: "hsplit",
        "C-m": "hsplit",
        h: "goto_file_hsplit",
        "C-h": "goto_file_hsplit",
        g: "goto_file_vsplit",
        "C-g": "goto_file_vsplit",
        q: "wclose",
        "C-q": "wclose",
        o: "wonly",
        "C-o": "wonly",
        x: "wonly",
        "C-x": "wonly",
        down: "jump_view_down",
        up: "jump_view_up",
        left: "jump_view_left",
        right: "jump_view_right"
      },
      space: {
        "6": "switch_to_uppercase",
        ret: "command_mode",
        F: "file_picker_in_current_directory",
        c: "yank_main_selection_to_clipboard",
        x: [
          "yank_main_selection_to_clipboard",
          "delete_selection"
        ],
        p: "no_op",
        P: "no_op",
        Y: "no_op",
        S: "no_op",
        r: "command_palette",
        ";": "command_mode",
        j: "extend_line",
        k: "keep_selections",
        l: "remove_selections",
        s: "select_regex",
        a: [
          "save_selection",
          "select_all"
        ],
        h: [
          "kill_to_line_start",
          "kill_to_line_end"
        ],
        g: "save_selection",
        e: "extend_to_line_bounds",
        t: "replace_with_yanked",
        R: "rename_symbol",
        o: "hover",
        y: "code_action",
        "/": "global_search",
        v: "paste_clipboard_after",
        n: "split_selection",
        b: "switch_to_lowercase",
        "'": "flip_selections",
        "\\": "shell_pipe",
        m: {
          m: "symbol_picker",
          ",": "workspace_symbol_picker"
        },
        ",": {
          ",": "diagnostics_picker",
          m: "workspace_diagnostics_picker"
        },
        f: {
          j: [
            "commit_undo_checkpoint",
            ":write"
          ],
          k: "file_picker",
          f: "buffer_picker",
          s: [
            "commit_undo_checkpoint",
            ":write"
          ],
          S: [
            "commit_undo_checkpoint",
            ":write-all"
          ],
          "A-s": ":update",
          a: "goto_last_accessed_file",
          v: "goto_last_modified_file",
          o: "file_picker",
          n: ":new",
          "`": ":reload",
          "~": ":reload-all",
          p: ":config-open-workspace",
          ",": "file_picker_in_current_buffer_directory",
          O: "file_picker_in_current_buffer_directory",
          q: {
            r: ":buffer-close-all",
            f: ":buffer-close",
            v: ":buffer-close-others",
            e: ":quit-all",
            d: ":quit",
            w: ":write-quit-all",
            s: ":write-quit",
            u: ":write-quit-all",
            j: ":write-quit",
            ";": ":cquit",
            q: {
              r: ":buffer-close-all!",
              f: ":buffer-close!",
              v: ":buffer-close-others!",
              e: ":quit-all!",
              d: ":quit!",
              w: ":write-quit-all!",
              s: ":write-quit!",
              u: ":write-quit-all!",
              j: ":write-quit!",
              ";": ":cquit!"
            }
          },
          x: {
            r: ":buffer-close-all",
            f: ":buffer-close",
            v: ":buffer-close-others",
            e: ":quit-all",
            d: ":quit",
            w: ":write-quit-all",
            s: ":write-quit",
            u: ":write-quit-all",
            j: ":write-quit",
            ";": ":cquit",
            x: {
              r: ":buffer-close-all!",
              f: ":buffer-close!",
              v: ":buffer-close-others!",
              e: ":quit-all!",
              d: ":quit!",
              w: ":write-quit-all!",
              s: ":write-quit!",
              u: ":write-quit-all!",
              j: ":write-quit!",
              ";": ":cquit!"
            }
          }
        },
        i: {
          i: "select_register",
          t: "replace_selections_with_clipboard",
          x: "join_selections",
          v: "paste_clipboard_before",
          c: "yank_joined_to_clipboard",
          j: ":sort",
          k: ":rsort"
        },
        w: {
          v: "no_op",
          F: "no_op",
          "C-s": "no_op",
          "C-v": "no_op",
          j: "jump_view_down",
          k: "jump_view_up",
          l: "jump_view_left",
          ";": "jump_view_right",
          "C-j": "jump_view_down",
          "C-k": "jump_view_up",
          "C-l": "jump_view_left",
          "C-;": "jump_view_right",
          "C-down": "jump_view_down",
          "C-up": "jump_view_up",
          "C-left": "jump_view_left",
          "C-right": "jump_view_right",
          e: "rotate_view_reverse",
          "C-e": "rotate_view_reverse",
          a: "rotate_view_reverse",
          w: "rotate_view",
          "C-w": "rotate_view",
          s: "rotate_view",
          f: "vsplit",
          "C-f": "vsplit",
          m: "hsplit",
          "C-m": "hsplit",
          h: "goto_file_hsplit",
          "C-h": "goto_file_hsplit",
          g: "goto_file_vsplit",
          "C-g": "goto_file_vsplit",
          q: "wclose",
          "C-q": "wclose",
          o: "wonly",
          "C-o": "wonly",
          x: "wonly",
          "C-x": "wonly",
          down: "jump_view_down",
          up: "jump_view_up",
          left: "jump_view_left",
          right: "jump_view_right"
        },
        u: {
          q: "no_op",
          w: "no_op",
          u: "remove_primary_selection",
          i: "keep_primary_selection",
          o: ":character-info",
          j: "goto_next_change",
          k: "goto_prev_change",
          l: "goto_first_change",
          ";": "goto_last_change",
          b: ":reset-diff-change",
          a: "goto_prev_parameter",
          s: "goto_next_parameter",
          d: "goto_prev_function",
          f: "goto_next_function",
          z: "goto_prev_comment",
          x: "goto_next_comment",
          c: "goto_prev_class",
          v: "goto_next_class",
          t: "goto_prev_test",
          y: "goto_next_test",
          "'": ":format",
          p: "format_selections",
          m: "goto_next_diag",
          ",": "goto_prev_diag",
          ".": "goto_first_diag",
          "/": "goto_last_diag",
          g: "code_action",
          n: "rename_symbol",
          r: ":lsp-workspace-command",
          "\\": ":lsp-stop",
          "]": ":lsp-restart",
          h: ":toggle lsp.display-inlay-hints",
          e: "select_references_to_symbol_under_cursor",
          "[": "dap_restart"
        }
      },
      "[": {
        j: "goto_prev_change",
        h: "goto_first_change",
        d: "goto_prev_diag",
        g: "goto_first_diag",
        f: "goto_prev_function",
        s: "goto_prev_class",
        a: "goto_prev_parameter",
        "/": "goto_prev_comment",
        z: "goto_prev_comment",
        t: "goto_prev_test",
        p: "goto_prev_paragraph",
        "[": "goto_prev_paragraph",
        ".": "goto_prev_paragraph",
        space: "add_newline_above",
        m: [
          "extend_to_line_bounds",
          "delete_selection",
          "move_line_up",
          "paste_before"
        ],
        c: {
          q: ":set auto-save true",
          w: ":set auto-format true",
          e: ":set line-number absolute",
          r: ":set soft-wrap true",
          t: ":set search.wrap-around true",
          a: ":set auto-completion true",
          s: ":set search.smart-case true",
          g: ":set indent-guides.render true",
          z: ":set completion-replace true",
          c: ":set true-color true",
          h: ":set cursorline true",
          j: ":set cursorcolumn true",
          d: ":set auto-pairs true",
          i: ":set auto-info true",
          v: ":set middle-click-paste true",
          m: ":set mouse true",
          u: ":set undercurl true",
          p: ":set color-modes true",
          o: ":config-open",
          l: ":config-reload",
          " ": {
            " ": ":set whitespace.render.space all",
            b: ":set whitespace.render.nbsp all",
            tab: ":set whitespace.render.tab all",
            t: ":set whitespace.render.tab all",
            n: ":set whitespace.render.newline all",
            ret: ":set whitespace.render.newline all"
          },
          ".": {
            ".": ":set file-picker.hidden true",
            ",": ":set file-picker.ignore true",
            p: ":set file-picker.parents true",
            i: ":set file-picker.git-ignore true",
            g: ":set file-picker.git-global true",
            e: ":set file-picker.git-exclude true",
            l: ":set follow-links true",
            k: ":set deduplicate-links true"
          },
          y: {
            k: ":set lsp.enable true",
            p: ":set lsp.display-messages true",
            i: ":set lsp.auto-signature-help true",
            h: ":set lsp.display-inlay-hints true",
            d: ":set lsp.display-signature-help-docs true",
            s: ":set lsp.snippets true"
          }
        }
      },
      "]": {
        j: "goto_next_change",
        h: "goto_last_change",
        d: "goto_next_diag",
        g: "goto_last_diag",
        f: "goto_next_function",
        s: "goto_next_class",
        a: "goto_next_parameter",
        "/": "goto_next_comment",
        z: "goto_next_comment",
        t: "goto_next_test",
        p: "goto_next_paragraph",
        "]": "goto_next_paragraph",
        ".": "goto_next_paragraph",
        space: "add_newline_below",
        m: [
          "extend_to_line_bounds",
          "delete_selection",
          "goto_line_end",
          "paste_after"
        ],
        c: {
          q: ":set auto-save false",
          w: ":set auto-format false",
          e: ":set line-number relative",
          r: ":set soft-wrap false",
          t: ":set search.wrap-around false",
          a: ":set auto-completion false",
          s: ":set search.smart-case false",
          g: ":set indent-guides.render false",
          z: ":set completion-replace false",
          c: ":set false-color false",
          h: ":set cursorline false",
          j: ":set cursorcolumn false",
          d: ":set auto-pairs false",
          i: ":set auto-info false",
          v: ":set middle-click-paste false",
          m: ":set mouse false",
          u: ":set undercurl false",
          p: ":set color-modes false",
          o: ":config-open",
          l: ":config-reload",
          " ": {
            " ": ":set whitespace.render.space none",
            b: ":set whitespace.render.nbsp none",
            tab: ":set whitespace.render.tab none",
            t: ":set whitespace.render.tab none",
            n: ":set whitespace.render.newline none",
            ret: ":set whitespace.render.newline none"
          },
          ".": {
            ".": ":set file-picker.hidden false",
            ",": ":set file-picker.ignore false",
            p: ":set file-picker.parents false",
            i: ":set file-picker.git-ignore false",
            g: ":set file-picker.git-global false",
            e: ":set file-picker.git-exclude false",
            l: ":set follow-links false",
            k: ":set deduplicate-links false"
          },
          y: {
            k: ":set lsp.enable false",
            p: ":set lsp.display-messages false",
            i: ":set lsp.auto-signature-help false",
            h: ":set lsp.display-inlay-hints false",
            d: ":set lsp.display-signature-help-docs false",
            s: ":set lsp.snippets false"
          }
        }
      }
    },
    insert: {
      ";": {
        j: "normal_mode"
      },
      "C-p": "no_op",
      "A-b": "no_op",
      "C-o": "file_picker",
      "C-O": "file_picker_in_current_directory",
      "C-s": [
        "commit_undo_checkpoint",
        ":write"
      ],
      "C-n": ":new",
      "A-c": "yank",
      "C-c": "yank_main_selection_to_clipboard",
      "A-C": "yank_joined_to_clipboard",
      "A-|": "shell_pipe",
      "A-j": "move_line_down",
      "A-k": "move_line_up",
      "A-l": "move_char_left",
      "A-;": "move_char_right",
      "A-m": "half_page_down",
      "A-,": "half_page_up",
      "A-a": "extend_to_line_start",
      "A-A": "extend_to_line_end",
      "C-home": "goto_file_start",
      "C-end": "goto_last_line",
      "C-S-tab": "goto_previous_buffer",
      "C-tab": "goto_next_buffer",
      "C-pageup": "goto_previous_buffer",
      "C-pagedown": "goto_next_buffer",
      "A-pageup": "jump_backward",
      "A-pagedown": "jump_forward",
      "S-A-left": "extend_prev_word_start",
      "S-A-right": "extend_next_word_end",
      "S-C-left": "extend_prev_long_word_start",
      "S-C-right": "extend_next_long_word_start",
      "A-1": "goto_previous_buffer",
      "A-2": "goto_next_buffer",
      "A-3": "jump_backward",
      "A-4": "jump_forward",
      "A-d": "move_prev_word_start",
      "A-f": "move_next_word_end",
      "A-D": "move_prev_long_word_start",
      "A-F": "move_next_long_word_end",
      "C-d": [
        "move_prev_long_word_start",
        "extend_prev_word_start",
        "extend_next_word_start"
      ],
      "C-f": "move_next_long_word_start",
      "C-left": "move_prev_long_word_start",
      "C-right": "move_next_long_word_start",
      "A-left": "move_prev_word_end",
      "A-right": "move_next_word_start",
      "A-G": "command_mode",
      "A-:": "command_mode",
      "A->": "goto_prev_paragraph",
      "A-?": "goto_next_paragraph",
      "A-r": "repeat_last_motion",
      "A-w": "find_next_char",
      "A-W": "find_prev_char",
      "A-S": "rsearch",
      "A-s": "search",
      "A-.": "search_prev",
      "A-/": "search_next",
      "A-8": "search_selection",
      "A-e": "select_mode",
      "A-down": "copy_selection_on_next_line",
      "A-up": "copy_selection_on_prev_line",
      "S-left": "extend_char_left",
      "S-down": "extend_line_down",
      "S-up": "extend_line_up",
      "S-right": "extend_char_right",
      "C-g": "save_selection",
      "A-E": "extend_to_line_bounds",
      "C-e": [
        "select_mode",
        "move_next_word_end",
        "move_prev_word_start",
        "search_selection",
        "make_search_word_bounded",
        "extend_search_next",
        "insert_mode"
      ],
      "A-J": "extend_line_below",
      "A-%": "select_all",
      "A-M": "shrink_selection",
      "A-<": "expand_selection",
      "A-N": "split_selection",
      "A-S-down": "copy_selection_on_next_line",
      "A-S-up": "copy_selection_on_prev_line",
      "A-'": "collapse_selection",
      "A-K": "keep_selections",
      "A-L": "remove_selections",
      "A-minus": "trim_selections",
      "A-_": "merge_consecutive_selections",
      "S-ret": "open_below",
      "A-ret": "open_below",
      "C-ret": "open_below",
      ret: [
        "commit_undo_checkpoint",
        "insert_newline"
      ],
      backspace: "delete_char_backward",
      "C-l": "delete_char_backward",
      "C-;": "delete_char_forward",
      "A-6": "delete_char_forward",
      "A-H": "delete_char_forward",
      "A-del": "delete_word_forward",
      "C-del": [
        "extend_next_long_word_end",
        "delete_selection"
      ],
      "A-backspace": "delete_word_backward",
      "C-backspace": [
        "extend_prev_long_word_start",
        "delete_selection"
      ],
      "C-h": [
        "extend_prev_long_word_start",
        "delete_selection"
      ],
      "A-h": "delete_word_backward",
      "C-a": "kill_to_line_start",
      "C-A": "kill_to_line_end",
      "C-j": "kill_to_line_start",
      "C-k": "kill_to_line_end",
      "A-x": "delete_selection",
      del: "delete_selection",
      "S-del": "delete_selection_noyank",
      "A-X": "join_selections",
      "C-x": [
        "yank_main_selection_to_clipboard",
        "delete_selection"
      ],
      "A-t": "replace",
      "A-T": "replace_with_yanked",
      "C-/": "toggle_comments",
      "C-m": "decrement",
      "C-,": "increment",
      "C-i": "completion",
      "A-⎈": "switch_to_uppercase",
      "A-B": "switch_to_lowercase",
      "C-b": "switch_to_uppercase",
      "A-\"": "select_register",
      "A-I": "open_above",
      "A-O": "open_below",
      "A-u": "undo",
      "A-y": "redo",
      "A-U": "earlier",
      "A-Y": "later",
      "C-y": "redo",
      "A-v": "paste_after",
      "C-v": "paste_clipboard_after",
      "A-V": "paste_before",
      "C-z": "undo",
      "C-Z": "redo",
      "A-(": "rotate_selection_contents_backward",
      "A-)": "rotate_selection_contents_forward",
      "A-7": "align_selections",
      "A-&": "align_selections",
      "A-=": "format_selections",
      "A-$": "shell_keep_pipe",
      "A-!": "shell_insert_output",
      "A-@": "shell_append_output",
      "A-R": "command_palette",
      "A-\\": ":toggle soft-wrap.enable",
      "C-u": "signature_help",
      F1: {
        F2: ":tree-sitter-scopes",
        F3: ":tree-sitter-subtree",
        c: ":character-info"
      },
      "A-`": {
        "`": "switch_case",
        j: "switch_to_lowercase",
        k: "switch_to_uppercase",
        "A-`": "switch_case"
      },
      "A-p": {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      "A-P": {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      "A-Z": {
        z: "no_op",
        c: "no_op",
        t: "no_op",
        b: "no_op",
        "C-d": "no_op",
        "C-u": "no_op",
        "C-f": "no_op",
        "C-b": "no_op",
        u: "align_view_bottom",
        i: "align_view_top",
        n: "align_view_center",
        h: "align_view_middle",
        l: "align_view_middle",
        down: "scroll_down",
        up: "scroll_up",
        j: "scroll_down",
        k: "scroll_up",
        m: "half_page_down",
        ",": "half_page_up",
        J: "page_down",
        K: "page_up",
        "C-j": "page_down",
        "C-k": "page_up",
        pagedown: "page_down",
        pageup: "page_up"
      },
      "A-g": {
        "1": "goto_previous_buffer",
        "2": "goto_next_buffer",
        "3": "jump_backward",
        "4": "jump_forward",
        p: "no_op",
        b: "jumplist_picker",
        a: "goto_first_nonwhitespace",
        s: "goto_line_end",
        h: "goto_line_start",
        g: "goto_file_start",
        j: "goto_last_line",
        k: "goto_file_start",
        l: "goto_prev_paragraph",
        ";": "goto_next_paragraph",
        ".": "goto_prev_paragraph",
        "/": "goto_next_paragraph",
        f: "goto_file",
        m: "goto_window_bottom",
        ",": "goto_window_top",
        n: "goto_window_center",
        D: "goto_declaration",
        d: "goto_definition",
        F12: "goto_definition",
        i: "goto_implementation",
        t: "goto_implementation",
        r: "goto_reference",
        e: "goto_type_definition",
        y: "goto_type_definition",
        c: "goto_last_accessed_file",
        v: "goto_last_modified_file",
        u: "goto_last_modification"
      },
      "A-n": {
        n: "match_brackets",
        ".": "match_brackets",
        "/": "match_brackets",
        i: "surround_add",
        t: "surround_replace",
        x: "surround_delete",
        e: "select_textobject_around",
        a: "select_textobject_inner"
      },
      "C-w": {
        v: "no_op",
        F: "no_op",
        "C-s": "no_op",
        "C-v": "no_op",
        j: "jump_view_down",
        k: "jump_view_up",
        l: "jump_view_left",
        ";": "jump_view_right",
        "C-j": "jump_view_down",
        "C-k": "jump_view_up",
        "C-l": "jump_view_left",
        "C-;": "jump_view_right",
        "C-down": "jump_view_down",
        "C-up": "jump_view_up",
        "C-left": "jump_view_left",
        "C-right": "jump_view_right",
        e: "rotate_view_reverse",
        "C-e": "rotate_view_reverse",
        a: "rotate_view_reverse",
        w: "rotate_view",
        "C-w": "rotate_view",
        s: "rotate_view",
        f: "vsplit",
        "C-f": "vsplit",
        m: "hsplit",
        "C-m": "hsplit",
        h: "goto_file_hsplit",
        "C-h": "goto_file_hsplit",
        g: "goto_file_vsplit",
        "C-g": "goto_file_vsplit",
        q: "wclose",
        "C-q": "wclose",
        o: "wonly",
        "C-o": "wonly",
        x: "wonly",
        "C-x": "wonly",
        down: "jump_view_down",
        up: "jump_view_up",
        left: "jump_view_left",
        right: "jump_view_right"
      },
      "A-space": {
        "6": "switch_to_uppercase",
        ret: "command_mode",
        F: "file_picker_in_current_directory",
        c: "yank_main_selection_to_clipboard",
        x: [
          "yank_main_selection_to_clipboard",
          "delete_selection"
        ],
        p: "no_op",
        P: "no_op",
        Y: "no_op",
        S: "no_op",
        r: "command_palette",
        ";": "command_mode",
        j: "extend_line",
        k: "keep_selections",
        l: "remove_selections",
        s: "select_regex",
        a: [
          "save_selection",
          "select_all"
        ],
        h: [
          "kill_to_line_start",
          "kill_to_line_end"
        ],
        g: "save_selection",
        e: "extend_to_line_bounds",
        t: "replace_with_yanked",
        R: "rename_symbol",
        o: "hover",
        y: "code_action",
        "/": "global_search",
        v: "paste_clipboard_after",
        n: "split_selection",
        b: "switch_to_lowercase",
        "'": "flip_selections",
        "\\": "shell_pipe",
        m: {
          m: "symbol_picker",
          ",": "workspace_symbol_picker"
        },
        ",": {
          ",": "diagnostics_picker",
          m: "workspace_diagnostics_picker"
        },
        f: {
          j: [
            "commit_undo_checkpoint",
            ":write"
          ],
          k: "file_picker",
          f: "buffer_picker",
          s: [
            "commit_undo_checkpoint",
            ":write"
          ],
          S: [
            "commit_undo_checkpoint",
            ":write-all"
          ],
          "A-s": ":update",
          a: "goto_last_accessed_file",
          v: "goto_last_modified_file",
          o: "file_picker",
          n: ":new",
          "`": ":reload",
          "~": ":reload-all",
          p: ":config-open-workspace",
          ",": "file_picker_in_current_buffer_directory",
          O: "file_picker_in_current_buffer_directory",
          q: {
            r: ":buffer-close-all",
            f: ":buffer-close",
            v: ":buffer-close-others",
            e: ":quit-all",
            d: ":quit",
            w: ":write-quit-all",
            s: ":write-quit",
            u: ":write-quit-all",
            j: ":write-quit",
            ";": ":cquit",
            q: {
              r: ":buffer-close-all!",
              f: ":buffer-close!",
              v: ":buffer-close-others!",
              e: ":quit-all!",
              d: ":quit!",
              w: ":write-quit-all!",
              s: ":write-quit!",
              u: ":write-quit-all!",
              j: ":write-quit!",
              ";": ":cquit!"
            }
          },
          x: {
            r: ":buffer-close-all",
            f: ":buffer-close",
            v: ":buffer-close-others",
            e: ":quit-all",
            d: ":quit",
            w: ":write-quit-all",
            s: ":write-quit",
            u: ":write-quit-all",
            j: ":write-quit",
            ";": ":cquit",
            x: {
              r: ":buffer-close-all!",
              f: ":buffer-close!",
              v: ":buffer-close-others!",
              e: ":quit-all!",
              d: ":quit!",
              w: ":write-quit-all!",
              s: ":write-quit!",
              u: ":write-quit-all!",
              j: ":write-quit!",
              ";": ":cquit!"
            }
          }
        },
        i: {
          i: "select_register",
          t: "replace_selections_with_clipboard",
          x: "join_selections",
          v: "paste_clipboard_before",
          c: "yank_joined_to_clipboard",
          j: ":sort",
          k: ":rsort"
        },
        w: {
          v: "no_op",
          F: "no_op",
          "C-s": "no_op",
          "C-v": "no_op",
          j: "jump_view_down",
          k: "jump_view_up",
          l: "jump_view_left",
          ";": "jump_view_right",
          "C-j": "jump_view_down",
          "C-k": "jump_view_up",
          "C-l": "jump_view_left",
          "C-;": "jump_view_right",
          "C-down": "jump_view_down",
          "C-up": "jump_view_up",
          "C-left": "jump_view_left",
          "C-right": "jump_view_right",
          e: "rotate_view_reverse",
          "C-e": "rotate_view_reverse",
          a: "rotate_view_reverse",
          w: "rotate_view",
          "C-w": "rotate_view",
          s: "rotate_view",
          f: "vsplit",
          "C-f": "vsplit",
          m: "hsplit",
          "C-m": "hsplit",
          h: "goto_file_hsplit",
          "C-h": "goto_file_hsplit",
          g: "goto_file_vsplit",
          "C-g": "goto_file_vsplit",
          q: "wclose",
          "C-q": "wclose",
          o: "wonly",
          "C-o": "wonly",
          x: "wonly",
          "C-x": "wonly",
          down: "jump_view_down",
          up: "jump_view_up",
          left: "jump_view_left",
          right: "jump_view_right"
        },
        u: {
          q: "no_op",
          w: "no_op",
          u: "remove_primary_selection",
          i: "keep_primary_selection",
          o: ":character-info",
          j: "goto_next_change",
          k: "goto_prev_change",
          l: "goto_first_change",
          ";": "goto_last_change",
          b: ":reset-diff-change",
          a: "goto_prev_parameter",
          s: "goto_next_parameter",
          d: "goto_prev_function",
          f: "goto_next_function",
          z: "goto_prev_comment",
          x: "goto_next_comment",
          c: "goto_prev_class",
          v: "goto_next_class",
          t: "goto_prev_test",
          y: "goto_next_test",
          "'": ":format",
          p: "format_selections",
          m: "goto_next_diag",
          ",": "goto_prev_diag",
          ".": "goto_first_diag",
          "/": "goto_last_diag",
          g: "code_action",
          n: "rename_symbol",
          r: ":lsp-workspace-command",
          "\\": ":lsp-stop",
          "]": ":lsp-restart",
          h: ":toggle lsp.display-inlay-hints",
          e: "select_references_to_symbol_under_cursor",
          "[": "dap_restart"
        }
      },
      "A-[": {
        j: "goto_prev_change",
        h: "goto_first_change",
        d: "goto_prev_diag",
        g: "goto_first_diag",
        f: "goto_prev_function",
        s: "goto_prev_class",
        a: "goto_prev_parameter",
        "/": "goto_prev_comment",
        z: "goto_prev_comment",
        t: "goto_prev_test",
        p: "goto_prev_paragraph",
        "[": "goto_prev_paragraph",
        ".": "goto_prev_paragraph",
        space: "add_newline_above",
        m: [
          "extend_to_line_bounds",
          "delete_selection",
          "move_line_up",
          "paste_before"
        ],
        c: {
          q: ":set auto-save true",
          w: ":set auto-format true",
          e: ":set line-number absolute",
          r: ":set soft-wrap true",
          t: ":set search.wrap-around true",
          a: ":set auto-completion true",
          s: ":set search.smart-case true",
          g: ":set indent-guides.render true",
          z: ":set completion-replace true",
          c: ":set true-color true",
          h: ":set cursorline true",
          j: ":set cursorcolumn true",
          d: ":set auto-pairs true",
          i: ":set auto-info true",
          v: ":set middle-click-paste true",
          m: ":set mouse true",
          u: ":set undercurl true",
          p: ":set color-modes true",
          o: ":config-open",
          l: ":config-reload",
          " ": {
            " ": ":set whitespace.render.space all",
            b: ":set whitespace.render.nbsp all",
            tab: ":set whitespace.render.tab all",
            t: ":set whitespace.render.tab all",
            n: ":set whitespace.render.newline all",
            ret: ":set whitespace.render.newline all"
          },
          ".": {
            ".": ":set file-picker.hidden true",
            ",": ":set file-picker.ignore true",
            p: ":set file-picker.parents true",
            i: ":set file-picker.git-ignore true",
            g: ":set file-picker.git-global true",
            e: ":set file-picker.git-exclude true",
            l: ":set follow-links true",
            k: ":set deduplicate-links true"
          },
          y: {
            k: ":set lsp.enable true",
            p: ":set lsp.display-messages true",
            i: ":set lsp.auto-signature-help true",
            h: ":set lsp.display-inlay-hints true",
            d: ":set lsp.display-signature-help-docs true",
            s: ":set lsp.snippets true"
          }
        }
      },
      "A-]": {
        j: "goto_next_change",
        h: "goto_last_change",
        d: "goto_next_diag",
        g: "goto_last_diag",
        f: "goto_next_function",
        s: "goto_next_class",
        a: "goto_next_parameter",
        "/": "goto_next_comment",
        z: "goto_next_comment",
        t: "goto_next_test",
        p: "goto_next_paragraph",
        "]": "goto_next_paragraph",
        ".": "goto_next_paragraph",
        space: "add_newline_below",
        m: [
          "extend_to_line_bounds",
          "delete_selection",
          "goto_line_end",
          "paste_after"
        ],
        c: {
          q: ":set auto-save false",
          w: ":set auto-format false",
          e: ":set line-number relative",
          r: ":set soft-wrap false",
          t: ":set search.wrap-around false",
          a: ":set auto-completion false",
          s: ":set search.smart-case false",
          g: ":set indent-guides.render false",
          z: ":set completion-replace false",
          c: ":set false-color false",
          h: ":set cursorline false",
          j: ":set cursorcolumn false",
          d: ":set auto-pairs false",
          i: ":set auto-info false",
          v: ":set middle-click-paste false",
          m: ":set mouse false",
          u: ":set undercurl false",
          p: ":set color-modes false",
          o: ":config-open",
          l: ":config-reload",
          " ": {
            " ": ":set whitespace.render.space none",
            b: ":set whitespace.render.nbsp none",
            tab: ":set whitespace.render.tab none",
            t: ":set whitespace.render.tab none",
            n: ":set whitespace.render.newline none",
            ret: ":set whitespace.render.newline none"
          },
          ".": {
            ".": ":set file-picker.hidden false",
            ",": ":set file-picker.ignore false",
            p: ":set file-picker.parents false",
            i: ":set file-picker.git-ignore false",
            g: ":set file-picker.git-global false",
            e: ":set file-picker.git-exclude false",
            l: ":set follow-links false",
            k: ":set deduplicate-links false"
          },
          y: {
            k: ":set lsp.enable false",
            p: ":set lsp.display-messages false",
            i: ":set lsp.auto-signature-help false",
            h: ":set lsp.display-inlay-hints false",
            d: ":set lsp.display-signature-help-docs false",
            s: ":set lsp.snippets false"
          }
        }
      }
    }
  }
};

// NOTE: this list must be up-to-date with browsers listed in
// test/acceptance/useragentstrings.yml
const BROWSER_ALIASES_MAP = {
  'Amazon Silk': 'amazon_silk',
  'Android Browser': 'android',
  Bada: 'bada',
  BlackBerry: 'blackberry',
  Chrome: 'chrome',
  Chromium: 'chromium',
  Electron: 'electron',
  Epiphany: 'epiphany',
  Firefox: 'firefox',
  Focus: 'focus',
  Generic: 'generic',
  'Google Search': 'google_search',
  Googlebot: 'googlebot',
  'Internet Explorer': 'ie',
  'K-Meleon': 'k_meleon',
  Maxthon: 'maxthon',
  'Microsoft Edge': 'edge',
  'MZ Browser': 'mz',
  'NAVER Whale Browser': 'naver',
  Opera: 'opera',
  'Opera Coast': 'opera_coast',
  PhantomJS: 'phantomjs',
  Puffin: 'puffin',
  QupZilla: 'qupzilla',
  QQ: 'qq',
  QQLite: 'qqlite',
  Safari: 'safari',
  Sailfish: 'sailfish',
  'Samsung Internet for Android': 'samsung_internet',
  SeaMonkey: 'seamonkey',
  Sleipnir: 'sleipnir',
  Swing: 'swing',
  Tizen: 'tizen',
  'UC Browser': 'uc',
  Vivaldi: 'vivaldi',
  'WebOS Browser': 'webos',
  WeChat: 'wechat',
  'Yandex Browser': 'yandex',
  Roku: 'roku',
};

const BROWSER_MAP = {
  amazon_silk: 'Amazon Silk',
  android: 'Android Browser',
  bada: 'Bada',
  blackberry: 'BlackBerry',
  chrome: 'Chrome',
  chromium: 'Chromium',
  electron: 'Electron',
  epiphany: 'Epiphany',
  firefox: 'Firefox',
  focus: 'Focus',
  generic: 'Generic',
  googlebot: 'Googlebot',
  google_search: 'Google Search',
  ie: 'Internet Explorer',
  k_meleon: 'K-Meleon',
  maxthon: 'Maxthon',
  edge: 'Microsoft Edge',
  mz: 'MZ Browser',
  naver: 'NAVER Whale Browser',
  opera: 'Opera',
  opera_coast: 'Opera Coast',
  phantomjs: 'PhantomJS',
  puffin: 'Puffin',
  qupzilla: 'QupZilla',
  qq: 'QQ Browser',
  qqlite: 'QQ Browser Lite',
  safari: 'Safari',
  sailfish: 'Sailfish',
  samsung_internet: 'Samsung Internet for Android',
  seamonkey: 'SeaMonkey',
  sleipnir: 'Sleipnir',
  swing: 'Swing',
  tizen: 'Tizen',
  uc: 'UC Browser',
  vivaldi: 'Vivaldi',
  webos: 'WebOS Browser',
  wechat: 'WeChat',
  yandex: 'Yandex Browser',
};

const PLATFORMS_MAP = {
  tablet: 'tablet',
  mobile: 'mobile',
  desktop: 'desktop',
  tv: 'tv',
};

const OS_MAP = {
  WindowsPhone: 'Windows Phone',
  Windows: 'Windows',
  MacOS: 'macOS',
  iOS: 'iOS',
  Android: 'Android',
  WebOS: 'WebOS',
  BlackBerry: 'BlackBerry',
  Bada: 'Bada',
  Tizen: 'Tizen',
  Linux: 'Linux',
  ChromeOS: 'Chrome OS',
  PlayStation4: 'PlayStation 4',
  Roku: 'Roku',
};

const ENGINE_MAP = {
  EdgeHTML: 'EdgeHTML',
  Blink: 'Blink',
  Trident: 'Trident',
  Presto: 'Presto',
  Gecko: 'Gecko',
  WebKit: 'WebKit',
};

class Utils {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(regexp, ua) {
    const match = ua.match(regexp);
    return (match && match.length > 0 && match[1]) || '';
  }

  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(regexp, ua) {
    const match = ua.match(regexp);
    return (match && match.length > 1 && match[2]) || '';
  }

  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(regexp, ua, _const) {
    if (regexp.test(ua)) {
      return _const;
    }
    return void (0);
  }

  static getWindowsVersionName(version) {
    switch (version) {
      case 'NT': return 'NT';
      case 'XP': return 'XP';
      case 'NT 5.0': return '2000';
      case 'NT 5.1': return 'XP';
      case 'NT 5.2': return '2003';
      case 'NT 6.0': return 'Vista';
      case 'NT 6.1': return '7';
      case 'NT 6.2': return '8';
      case 'NT 6.3': return '8.1';
      case 'NT 10.0': return '10';
      default: return undefined;
    }
  }

  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(version) {
    const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
    v.push(0);
    if (v[0] !== 10) return undefined;
    switch (v[1]) {
      case 5: return 'Leopard';
      case 6: return 'Snow Leopard';
      case 7: return 'Lion';
      case 8: return 'Mountain Lion';
      case 9: return 'Mavericks';
      case 10: return 'Yosemite';
      case 11: return 'El Capitan';
      case 12: return 'Sierra';
      case 13: return 'High Sierra';
      case 14: return 'Mojave';
      case 15: return 'Catalina';
      default: return undefined;
    }
  }

  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(version) {
    const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
    v.push(0);
    if (v[0] === 1 && v[1] < 5) return undefined;
    if (v[0] === 1 && v[1] < 6) return 'Cupcake';
    if (v[0] === 1 && v[1] >= 6) return 'Donut';
    if (v[0] === 2 && v[1] < 2) return 'Eclair';
    if (v[0] === 2 && v[1] === 2) return 'Froyo';
    if (v[0] === 2 && v[1] > 2) return 'Gingerbread';
    if (v[0] === 3) return 'Honeycomb';
    if (v[0] === 4 && v[1] < 1) return 'Ice Cream Sandwich';
    if (v[0] === 4 && v[1] < 4) return 'Jelly Bean';
    if (v[0] === 4 && v[1] >= 4) return 'KitKat';
    if (v[0] === 5) return 'Lollipop';
    if (v[0] === 6) return 'Marshmallow';
    if (v[0] === 7) return 'Nougat';
    if (v[0] === 8) return 'Oreo';
    if (v[0] === 9) return 'Pie';
    return undefined;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(version) {
    return version.split('.').length;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(versionA, versionB, isLoose = false) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    const versionAPrecision = Utils.getVersionPrecision(versionA);
    const versionBPrecision = Utils.getVersionPrecision(versionB);

    let precision = Math.max(versionAPrecision, versionBPrecision);
    let lastPrecision = 0;

    const chunks = Utils.map([versionA, versionB], (version) => {
      const delta = precision - Utils.getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      const _version = version + new Array(delta + 1).join('.0');

      // 3) "9.0" -> ["000000000"", "000000009"]
      return Utils.map(_version.split('.'), chunk => new Array(20 - chunk.length).join('0') + chunk).reverse();
    });

    // adjust precision for loose comparison
    if (isLoose) {
      lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
    }

    // iterate in reverse order by reversed chunks array
    precision -= 1;
    while (precision >= lastPrecision) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }

      if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === lastPrecision) {
          // all version chunks are same
          return 0;
        }

        precision -= 1;
      } else if (chunks[0][precision] < chunks[1][precision]) {
        return -1;
      }
    }

    return undefined;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(arr, iterator) {
    const result = [];
    let i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i += 1) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(arr, predicate) {
    let i;
    let l;
    if (Array.prototype.find) {
      return Array.prototype.find.call(arr, predicate);
    }
    for (i = 0, l = arr.length; i < l; i += 1) {
      const value = arr[i];
      if (predicate(value, i)) {
        return value;
      }
    }
    return undefined;
  }

  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(obj, ...assigners) {
    const result = obj;
    let i;
    let l;
    if (Object.assign) {
      return Object.assign(obj, ...assigners);
    }
    for (i = 0, l = assigners.length; i < l; i += 1) {
      const assigner = assigners[i];
      if (typeof assigner === 'object' && assigner !== null) {
        const keys = Object.keys(assigner);
        keys.forEach((key) => {
          result[key] = assigner[key];
        });
      }
    }
    return obj;
  }

  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(browserName) {
    return BROWSER_ALIASES_MAP[browserName];
  }

  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(browserAlias) {
    return BROWSER_MAP[browserAlias] || '';
  }
}

/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */


const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;

const browsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(ua) {
      const browser = {
        name: 'Googlebot',
      };
      const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(ua) {
      const browser = {
        name: 'Opera',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(ua) {
      const browser = {
        name: 'Opera',
      };
      const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      const browser = {
        name: 'Samsung Internet for Android',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/Whale/i],
    describe(ua) {
      const browser = {
        name: 'NAVER Whale Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/MZBrowser/i],
    describe(ua) {
      const browser = {
        name: 'MZ Browser',
      };
      const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/focus/i],
    describe(ua) {
      const browser = {
        name: 'Focus',
      };
      const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/swing/i],
    describe(ua) {
      const browser = {
        name: 'Swing',
      };
      const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/coast/i],
    describe(ua) {
      const browser = {
        name: 'Opera Coast',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(ua) {
      const browser = {
        name: 'Opera Touch',
      };
      const version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      const browser = {
        name: 'Yandex Browser',
      };
      const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      const browser = {
        name: 'UC Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua) {
      const browser = {
        name: 'Maxthon',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      const browser = {
        name: 'Epiphany',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/puffin/i],
    describe(ua) {
      const browser = {
        name: 'Puffin',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      const browser = {
        name: 'Sleipnir',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      const browser = {
        name: 'K-Meleon',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/micromessenger/i],
    describe(ua) {
      const browser = {
        name: 'WeChat',
      };
      const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/qqbrowser/i],
    describe(ua) {
      const browser = {
        name: (/qqbrowserlite/i).test(ua) ? 'QQ Browser Lite' : 'QQ Browser',
      };
      const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      const browser = {
        name: 'Internet Explorer',
      };
      const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/\sedg\//i],
    describe(ua) {
      const browser = {
        name: 'Microsoft Edge',
      };

      const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua) {
      const browser = {
        name: 'Microsoft Edge',
      };

      const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      const browser = {
        name: 'Vivaldi',
      };
      const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      const browser = {
        name: 'SeaMonkey',
      };
      const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/sailfish/i],
    describe(ua) {
      const browser = {
        name: 'Sailfish',
      };

      const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/silk/i],
    describe(ua) {
      const browser = {
        name: 'Amazon Silk',
      };
      const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/phantom/i],
    describe(ua) {
      const browser = {
        name: 'PhantomJS',
      };
      const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      const browser = {
        name: 'SlimerJS',
      };
      const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const browser = {
        name: 'BlackBerry',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const browser = {
        name: 'WebOS Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/bada/i],
    describe(ua) {
      const browser = {
        name: 'Bada',
      };
      const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const browser = {
        name: 'Tizen',
      };
      const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      const browser = {
        name: 'QupZilla',
      };
      const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      const browser = {
        name: 'Firefox',
      };
      const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/electron/i],
    describe(ua) {
      const browser = {
        name: 'Electron',
      };
      const version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua) {
      const browser = {
        name: 'Miui',
      };
      const version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/chromium/i],
    describe(ua) {
      const browser = {
        name: 'Chromium',
      };
      const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      const browser = {
        name: 'Chrome',
      };
      const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/GSA/i],
    describe(ua) {
      const browser = {
        name: 'Google Search',
      };
      const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Android Browser */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const browser = {
        name: 'Android Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(ua) {
      const browser = {
        name: 'PlayStation 4',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(ua) {
      const browser = {
        name: 'Safari',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Something else */
  {
    test: [/.*/i],
    describe(ua) {
      /* Here we try to make sure that there are explicit details about the device
       * in order to decide what regexp exactly we want to apply
       * (as there is a specific decision based on that conclusion)
       */
      const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
      const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
      const hasDeviceSpec = ua.search('\\(') !== -1;
      const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
      return {
        name: Utils.getFirstMatch(regexp, ua),
        version: Utils.getSecondMatch(regexp, ua),
      };
    },
  },
];

var osParsersList = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(ua) {
      const version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
      return {
        name: OS_MAP.Roku,
        version,
      };
    },
  },

  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.WindowsPhone,
        version,
      };
    },
  },

  /* Windows */
  {
    test: [/windows /i],
    describe(ua) {
      const version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = Utils.getWindowsVersionName(version);

      return {
        name: OS_MAP.Windows,
        version,
        versionName,
      };
    },
  },

  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(ua) {
      const result = {
        name: OS_MAP.iOS,
      };
      const version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
      if (version) {
        result.version = version;
      }
      return result;
    },
  },

  /* macOS */
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
      const versionName = Utils.getMacOSVersionName(version);

      const os = {
        name: OS_MAP.MacOS,
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');

      return {
        name: OS_MAP.iOS,
        version,
      };
    },
  },

  /* Android */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
      const versionName = Utils.getAndroidVersionName(version);
      const os = {
        name: OS_MAP.Android,
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
      const os = {
        name: OS_MAP.WebOS,
      };

      if (version && version.length) {
        os.version = version;
      }
      return os;
    },
  },

  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua)
        || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua)
        || Utils.getFirstMatch(/\bbb(\d+)/i, ua);

      return {
        name: OS_MAP.BlackBerry,
        version,
      };
    },
  },

  /* Bada */
  {
    test: [/bada/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);

      return {
        name: OS_MAP.Bada,
        version,
      };
    },
  },

  /* Tizen */
  {
    test: [/tizen/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);

      return {
        name: OS_MAP.Tizen,
        version,
      };
    },
  },

  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: OS_MAP.Linux,
      };
    },
  },

  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: OS_MAP.ChromeOS,
      };
    },
  },

  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(ua) {
      const version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.PlayStation4,
        version,
      };
    },
  },
];

/*
 * Tablets go first since usually they have more specific
 * signs to detect.
 */

var platformParsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: 'bot',
        vendor: 'Google',
      };
    },
  },

  /* Huawei */
  {
    test: [/huawei/i],
    describe(ua) {
      const model = Utils.getFirstMatch(/(can-l01)/i, ua) && 'Nova';
      const platform = {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Huawei',
      };
      if (model) {
        platform.model = model;
      }
      return platform;
    },
  },

  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Nexus',
      };
    },
  },

  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Apple',
        model: 'iPad',
      };
    },
  },

  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Apple',
        model: 'iPad',
      };
    },
  },

  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Amazon',
        model: 'Kindle Fire HD 7',
      };
    },
  },

  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Amazon',
      };
    },
  },

  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
      };
    },
  },

  /* iPod/iPhone */
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i);
      const likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua) {
      const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Apple',
        model,
      };
    },
  },

  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Nexus',
      };
    },
  },

  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* BlackBerry */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'blackberry';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'BlackBerry',
      };
    },
  },

  /* Bada */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'bada';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* Windows Phone */
  {
    test(parser) {
      return parser.getBrowserName() === 'windows phone';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Microsoft',
      };
    },
  },

  /* Android Tablet */
  {
    test(parser) {
      const osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
      return parser.getOSName(true) === 'android' && (osMajorVersion >= 3);
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
      };
    },
  },

  /* Android Mobile */
  {
    test(parser) {
      return parser.getOSName(true) === 'android';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* desktop */
  {
    test(parser) {
      return parser.getOSName(true) === 'macos';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
        vendor: 'Apple',
      };
    },
  },

  /* Windows */
  {
    test(parser) {
      return parser.getOSName(true) === 'windows';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
      };
    },
  },

  /* Linux */
  {
    test(parser) {
      return parser.getOSName(true) === 'linux';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
      };
    },
  },

  /* PlayStation 4 */
  {
    test(parser) {
      return parser.getOSName(true) === 'playstation 4';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv,
      };
    },
  },

  /* Roku */
  {
    test(parser) {
      return parser.getOSName(true) === 'roku';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv,
      };
    },
  },
];

/*
 * More specific goes first
 */
var enginesParsersList = [
  /* EdgeHTML */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'microsoft edge';
    },
    describe(ua) {
      const isBlinkBased = /\sedg\//i.test(ua);

      // return blink if it's blink-based one
      if (isBlinkBased) {
        return {
          name: ENGINE_MAP.Blink,
        };
      }

      // otherwise match the version and return EdgeHTML
      const version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: ENGINE_MAP.EdgeHTML,
        version,
      };
    },
  },

  /* Trident */
  {
    test: [/trident/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Trident,
      };

      const version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Presto */
  {
    test(parser) {
      return parser.test(/presto/i);
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Presto,
      };

      const version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Gecko */
  {
    test(parser) {
      const isGecko = parser.test(/gecko/i);
      const likeGecko = parser.test(/like gecko/i);
      return isGecko && !likeGecko;
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Gecko,
      };

      const version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: ENGINE_MAP.Blink,
      };
    },
  },

  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.WebKit,
      };

      const version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },
];

/**
 * The main class that arranges the whole parsing process.
 */
class Parser {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(UA, skipParsing = false) {
    if (UA === void (0) || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }

    this._ua = UA;

    /**
     * @typedef ParsedResult
     * @property {Object} browser
     * @property {String|undefined} [browser.name]
     * Browser name, like `"Chrome"` or `"Internet Explorer"`
     * @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
     * @property {Object} os
     * @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
     * @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
     * @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
     * @property {Object} platform
     * @property {String|undefined} [platform.type]
     * platform type, can be either `"desktop"`, `"tablet"` or `"mobile"`
     * @property {String|undefined} [platform.vendor] Vendor of the device,
     * like `"Apple"` or `"Samsung"`
     * @property {String|undefined} [platform.model] Device model,
     * like `"iPhone"` or `"Kindle Fire HD 7"`
     * @property {Object} engine
     * @property {String|undefined} [engine.name]
     * Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`
     * @property {String|undefined} [engine.version] String version of the engine
     */
    this.parsedResult = {};

    if (skipParsing !== true) {
      this.parse();
    }
  }

  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }

  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(regex) {
    return regex.test(this._ua);
  }

  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};

    const browserDescriptor = Utils.find(browsersList, (_browser) => {
      if (typeof _browser.test === 'function') {
        return _browser.test(this);
      }

      if (_browser.test instanceof Array) {
        return _browser.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (browserDescriptor) {
      this.parsedResult.browser = browserDescriptor.describe(this.getUA());
    }

    return this.parsedResult.browser;
  }

  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    if (this.parsedResult.browser) {
      return this.parsedResult.browser;
    }

    return this.parseBrowser();
  }

  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getBrowser().name).toLowerCase() || '';
    }
    return this.getBrowser().name || '';
  }


  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }

  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    if (this.parsedResult.os) {
      return this.parsedResult.os;
    }

    return this.parseOS();
  }

  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};

    const os = Utils.find(osParsersList, (_os) => {
      if (typeof _os.test === 'function') {
        return _os.test(this);
      }

      if (_os.test instanceof Array) {
        return _os.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (os) {
      this.parsedResult.os = os.describe(this.getUA());
    }

    return this.parsedResult.os;
  }

  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(toLowerCase) {
    const { name } = this.getOS();

    if (toLowerCase) {
      return String(name).toLowerCase() || '';
    }

    return name || '';
  }

  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    if (this.parsedResult.platform) {
      return this.parsedResult.platform;
    }

    return this.parsePlatform();
  }

  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(toLowerCase = false) {
    const { type } = this.getPlatform();

    if (toLowerCase) {
      return String(type).toLowerCase() || '';
    }

    return type || '';
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};

    const platform = Utils.find(platformParsersList, (_platform) => {
      if (typeof _platform.test === 'function') {
        return _platform.test(this);
      }

      if (_platform.test instanceof Array) {
        return _platform.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (platform) {
      this.parsedResult.platform = platform.describe(this.getUA());
    }

    return this.parsedResult.platform;
  }

  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    if (this.parsedResult.engine) {
      return this.parsedResult.engine;
    }

    return this.parseEngine();
  }

  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getEngine().name).toLowerCase() || '';
    }
    return this.getEngine().name || '';
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};

    const engine = Utils.find(enginesParsersList, (_engine) => {
      if (typeof _engine.test === 'function') {
        return _engine.test(this);
      }

      if (_engine.test instanceof Array) {
        return _engine.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (engine) {
      this.parsedResult.engine = engine.describe(this.getUA());
    }

    return this.parsedResult.engine;
  }

  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();

    return this;
  }

  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return Utils.assign({}, this.parsedResult);
  }

  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(checkTree) {
    const platformsAndOSes = {};
    let platformsAndOSCounter = 0;
    const browsers = {};
    let browsersCounter = 0;

    const allDefinitions = Object.keys(checkTree);

    allDefinitions.forEach((key) => {
      const currentDefinition = checkTree[key];
      if (typeof currentDefinition === 'string') {
        browsers[key] = currentDefinition;
        browsersCounter += 1;
      } else if (typeof currentDefinition === 'object') {
        platformsAndOSes[key] = currentDefinition;
        platformsAndOSCounter += 1;
      }
    });

    if (platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes);
      const OSMatchingDefinition = Utils.find(platformsAndOSNames, name => (this.isOS(name)));

      if (OSMatchingDefinition) {
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);

        if (osResult !== void 0) {
          return osResult;
        }
      }

      const platformMatchingDefinition = Utils.find(
        platformsAndOSNames,
        name => (this.isPlatform(name)),
      );
      if (platformMatchingDefinition) {
        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);

        if (platformResult !== void 0) {
          return platformResult;
        }
      }
    }

    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers);
      const matchingDefinition = Utils.find(browserNames, name => (this.isBrowser(name, true)));

      if (matchingDefinition !== void 0) {
        return this.compareVersion(browsers[matchingDefinition]);
      }
    }

    return undefined;
  }

  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(browserName, includingAlias = false) {
    const defaultBrowserName = this.getBrowserName().toLowerCase();
    let browserNameLower = browserName.toLowerCase();
    const alias = Utils.getBrowserTypeByAlias(browserNameLower);

    if (includingAlias && alias) {
      browserNameLower = alias.toLowerCase();
    }
    return browserNameLower === defaultBrowserName;
  }

  compareVersion(version) {
    let expectedResults = [0];
    let comparableVersion = version;
    let isLoose = false;

    const currentBrowserVersion = this.getBrowserVersion();

    if (typeof currentBrowserVersion !== 'string') {
      return void 0;
    }

    if (version[0] === '>' || version[0] === '<') {
      comparableVersion = version.substr(1);
      if (version[1] === '=') {
        isLoose = true;
        comparableVersion = version.substr(2);
      } else {
        expectedResults = [];
      }
      if (version[0] === '>') {
        expectedResults.push(1);
      } else {
        expectedResults.push(-1);
      }
    } else if (version[0] === '=') {
      comparableVersion = version.substr(1);
    } else if (version[0] === '~') {
      isLoose = true;
      comparableVersion = version.substr(1);
    }

    return expectedResults.indexOf(
      Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose),
    ) > -1;
  }

  isOS(osName) {
    return this.getOSName(true) === String(osName).toLowerCase();
  }

  isPlatform(platformType) {
    return this.getPlatformType(true) === String(platformType).toLowerCase();
  }

  isEngine(engineName) {
    return this.getEngineName(true) === String(engineName).toLowerCase();
  }

  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(anything, includingAlias = false) {
    return this.isBrowser(anything, includingAlias) || this.isOS(anything)
      || this.isPlatform(anything);
  }

  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(anythings = []) {
    return anythings.some(anything => this.is(anything));
  }
}

/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */

/**
 * Bowser class.
 * Keep it simple as much as it can be.
 * It's supposed to work with collections of {@link Parser} instances
 * rather then solve one-instance problems.
 * All the one-instance stuff is located in Parser class.
 *
 * @class
 * @classdesc Bowser is a static object, that provides an API to the Parsers
 * @hideconstructor
 */
class Bowser {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(UA, skipParsing = false) {
    if (typeof UA !== 'string') {
      throw new Error('UserAgent should be a string');
    }
    return new Parser(UA, skipParsing);
  }

  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(UA) {
    return (new Parser(UA)).getResult();
  }

  static get BROWSER_MAP() {
    return BROWSER_MAP;
  }

  static get ENGINE_MAP() {
    return ENGINE_MAP;
  }

  static get OS_MAP() {
    return OS_MAP;
  }

  static get PLATFORMS_MAP() {
    return PLATFORMS_MAP;
  }
}

function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _tagged_template_literal(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _templateObject() {
    var data = _tagged_template_literal([
        "\n    ([a-z])?	【?<lookbehind> matches 'tab' for 'b', so ignore the next match】\n    (.)     	【?<lastchar>】\n    $"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject1() {
    var data = _tagged_template_literal([
        "\n    ([a-z])?              	【?<lookbehind> matches 'tab' for 'b', so ignore the next match】\n    (",
        ")	【?<lastchar>】\n    $"
    ]);
    _templateObject1 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject2() {
    var data = _tagged_template_literal([
        "keylabel(d{1,2})"
    ], [
        "keylabel(\\d{1,2})"
    ]);
    _templateObject2 = function _templateObject() {
        return data;
    };
    return data;
}
extendProtos();
var addEvtLis = function(el, evtNm, callback) {
    var opts = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    if (el && evtNm) {
        var lisNm = "listener:" + evtNm;
        var isAttached = el.getAttribute(lisNm);
        if (isAttached !== "true") {
            el.setAttribute(lisNm, "true");
            el.addEventListener(evtNm, function(evt) {
                callback(evt);
            }, opts);
        }
    }
};
window.onload = function() {
    var strip = function strip(x, chars) {
        var start = 0;
        var end = x.length - 1;
        while(chars.indexOf(x[start]) >= 0){
            start += 1;
        }
        while(chars.indexOf(x[end]) >= 0){
            end -= 1;
        }
        return x.substr(start, end - start + 1);
    };
    var sortAZ = function sortAZ(str) {
        return _to_consumable_array(str).sort(function(a, b) {
            return a.localeCompare(b);
        }).join("");
    };
    var lbl_modi_n = function lbl_modi_n(n) {
        return new Map([
            [
                n,
                ""
            ]
        ]);
    };
    var getNestedPath = function getNestedPath(xpth, map) {
        var pth = xpth.split(".");
        return pth.reduce(function(a, b) {
            return a[b];
        }, map);
    };
    var getModeKeys = function getModeKeys(mode) {
        var mode_sym = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : modifew_mode_sym, prefixNm = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
        var path2icon = mode + ".icon";
        var path2path = mode + ".path";
        var path2modi = mode + ".modi";
        var path2id = mode + ".id";
        var path2keys = getNestedPath(path2path, mode_sym);
        var keys = getNestedPath(path2keys, modifew);
        var icon = getNestedPath(path2icon, mode_sym);
        var modis = getNestedPath(path2modi, mode_sym);
        var ids = getNestedPath(path2id, mode_sym);
        var chord;
        if (prefixNm) {
            var prefixNm_mirr = prefixNm.replace("[", "]"); // fix for unimpaired having two [] keys
            chord = path2keys.replace(prefixNm, "").replace(prefixNm_mirr, "").strip(".");
        } else {
            chord = "";
        }
        return [
            keys,
            icon,
            modis,
            ids,
            chord
        ];
    };
    var reLastChar = function reLastChar() {
        var rePattern = regexp(_templateObject());
        return new RegExp(rePattern, "i");
    };
    var keyLblToSymbMod = function keyLblToSymbMod(key_user) {
        keySymbLblMod.forEach(function(v, k) {
            var reV = RegExp(v, "i");
            if (reV.test(key_user)) {
                key_user = key_user.replace(reV, k);
            }
        });
        var reLastCh = reLastChar();
        var matchCh = key_user.match(reLastCh);
        if (matchCh) {
            // const gch  	= matchCh.groups;
            var gch_pre = matchCh[1]; //gch.lookbehind;
            var gch_last = matchCh[2]; //gch.lastchar;
            // if (( gch ) && // match last char
            if (gch_pre === undefined) {
                if (getCaseLyt(gch_last, "qwerty") === Case.U) {
                    key_user = key_user.replace(reLastCh, "⇧" + convertCaseLyt(gch_last, "qwerty", Case.l));
                }
            }
        }
        return key_user;
    };
    var keySymbToLbl = function keySymbToLbl(key_symb) {
        keySymbLblMod.forEach(function(v, k) {
            var reK = RegExp(k, "i");
            if (reK.test(key_symb)) {
                key_symb = key_symb.replace(reK, v);
            }
        });
        keySymbLbl.forEach(function(v, k) {
            var reK = RegExp(k + "$", "i");
            if (reK.test(key_symb)) {
                key_symb = key_symb.replace(reK, v);
            }
        });
        return key_symb;
    };
    var isValidLblPos = function isValidLblPos(el, validPos) {
        var retVal = false;
        validPos.map(function(pos_id) {
            var key_lbl_class = "keylabel".concat(pos_id);
            if (el.classList.contains(key_lbl_class)) {
                retVal = true;
            }
        });
        return retVal;
    };
    var reLastLetter = function reLastLetter(letter) {
        var rePattern = regexp(_templateObject1(), escRe(letter));
        return new RegExp(rePattern, "i");
    };
    var getKeyCombo = function getKeyCombo(k_in, keymap) {
        var lbl_modis = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : lbl_modi, chord = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
        // from {B:..lower, A-tab:move, C-b:...upper, b:no_op} to
        // get ⇧=>...lower,             ⎈=>...upper ''=>no_op
        var k = keySymbToLbl(k_in).toLowerCase();
        var K = convertCaseLyt(k, "qwerty", Case.U) || k; // test match for > when .
        var key_fmt, cmd;
        var keyCombo = new Map();
        function setKeyComboItem(modi, lbl_id) {
            if (key_fmt.sort() === lbl_modis.get(lbl_id).sort()) {
                keyCombo.set(lbl_id, {
                    "modi": key_fmt,
                    "cmd": cmd,
                    "chord": chord
                });
            }
        }
        var reLastk = reLastLetter(k);
        reLastLetter(K);
        for(var key_from in keymap){
            var matchk = key_from.match(reLastk);
            var matchK = key_from.match(reLastk);
            var gk_pre = null, gK_pre = null;
            if (matchk) {
                // gk    	= matchk.groups;
                gk_pre = matchk[1]; // gk.lookbehind;
                matchk[2]; // gk.lastchar;
            } //
            if (matchK) {
                // gK    	= matchK.groups;
                gK_pre = matchK[1]; //gK.lookbehind;
                matchK[2]; //gK.lastchar;
            } //
            // if (( gk                   ||  gK   ) && // match either . or >
            if ((matchk || matchK) && // match either . or >
            gk_pre === undefined && gK_pre === undefined) {
                key_fmt = keyLblToSymbMod(key_from).replace(reLastk, ""); // and replace . (labels don't have >)
                cmd = keymap[key_from];
                lbl_modis.forEach(setKeyComboItem);
            }
        }
        return keyCombo;
    };
    var hideAllTooltips = function hideAllTooltips() {
        document.querySelectorAll(".keycap_tooltip_modi_cmd").forEach(function(el, ind, listObj) {
            el.style.display = "none";
        });
    };
    var tooltipToggle = function tooltipToggle(el) {
        var ttBox = el.querySelector(".keycap_tooltip_modi_cmd");
        var currentStyle = ttBox.style.display;
        if (currentStyle === "block") {
            tooltip_0(el);
        } else if (currentStyle === "none") {
            tooltip_1(el, "key");
        } else if (currentStyle === "") {
            tooltip_1(el, "key");
        }
    };
    var isInViewport = function isInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentel.clientHeight) && rect.right <= (window.innerWidth || document.documentel.clientWidth);
    };
    var isTouchTap = function isTouchTap() {
        var dur = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0.2;
        var timeTouchEnd = new Date();
        var ms = 1000;
        var timeTouchDiff = (timeTouchEnd - timeTouchBeg) / ms;
        if (timeTouchDiff < dur) {
            return true;
        } else {
            return false;
        }
    };
    var getMouseEventHandler = function getMouseEventHandler(evtHandler, delay) {
        return function(evt) {
            var elAttached = evt.currentTarget; // el to which the event handler has been attached; currentTarget  only available while the event is being handled, so if we pass evt, it won't be available downstream
            var elOccured = evt.target; // el on which the event occurred and which may be its descendant
            var _timerIdMap_get;
            var timerId = (_timerIdMap_get = timerIdMap.get(elOccured)) !== null && _timerIdMap_get !== void 0 ? _timerIdMap_get : 0;
            clearTimeout(timerId);
            timerId = setTimeout(function() {
                return evtHandler(elAttached);
            }, delay);
            timerIdMap.set(elOccured, timerId);
        };
    };
    var hTouchBeg = function hTouchBeg(evt) {
        timeTouchBeg = new Date();
    };
    var setTableHead = function setTableHead(table, keys) {
        var tHd = table.createTHead();
        var row = tHd.insertRow();
        keys.map(function(key) {
            var th = document.createElement("th");
            var txt = document.createTextNode(key);
            th.appendChild(txt);
            row.appendChild(th);
        });
    };
    var storeKeyCap = function storeKeyCap(keylbl, keyCaps) {
        var keyCapSym = new Map();
        keyCapSym.set(keylbl, new Map());
        keyCaps.map(function(x) {
            var lbl_cls;
            x.classList.forEach(function(xcl) {
                if (reLblClass.test(xcl)) {
                    lbl_cls = parseInt(xcl.match(reLblClass)[1]);
                } // get label ID from class name (6 from keylabel6)
            });
            if (x.innerText) {
                keyCapSym.get(keylbl).set(lbl_cls, x.innerText);
            } else if (x.innerHTML) {
                keyCapSym.get(keylbl).set(lbl_cls, "�");
            }
        });
        return keyCapSym;
    };
    var mergeSubmodes = function mergeSubmodes(m, keylbl) {
        var keyCombos = new Map();
        var subModes = modifew_mode_sub_sym[m];
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = Object.entries(subModes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = _sliced_to_array(_step.value, 2), subNm = _step_value[0], subMode = _step_value[1];
                var path2path = m + "." + "path";
                var prefix = getNestedPath(path2path, modifew_mode_sym);
                var _getModeKeys = _sliced_to_array(getModeKeys(subNm, subModes, prefix), 5), keymap = _getModeKeys[0], mIcon = _getModeKeys[1], lbl_modis = _getModeKeys[2], capIDs = _getModeKeys[3], chord = _getModeKeys[4];
                var keyCombo = getKeyCombo(keylbl, keymap, lbl_modis, chord);
                keyCombos = new Map(_to_consumable_array(keyCombos).concat(_to_consumable_array(keyCombo)));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return keyCombos;
    };
    var addToolips_Keycap = function addToolips_Keycap(m, el) {
        var keyLbl = el.innerText.trim();
        if (keyLbl && keyLbl !== "mods") {
            var _getModeKeys = _sliced_to_array(getModeKeys(m), 5), keymap = _getModeKeys[0], mIcon = _getModeKeys[1], lbl_modis = _getModeKeys[2], capIDs = _getModeKeys[3], chord = _getModeKeys[4];
            var curLytLbl = gLyt.lbl; // reads layout only at page LOAD
            var keylbl = keyLbl[0].toLowerCase(); // take only the 1st label (number keys have duplicate 1!)
            var keyCaps = getSiblingKeyCaps(el, capIDs); // get all keycaps with valid labels in valid positions
            var keyCapSym = storeKeyCap(keylbl, keyCaps); // store all valid keycap symbols
            var keyComboM = getKeyCombo(keylbl, keymap, lbl_modis, chord); // {0:'⇧'=>'switch_to_lowercase'>..}
            // if (keyCaps.length === 0) { // hide keycaps with no keylabels
            // if(el.parentNode && el.parentNode.parentNode) { el.parentNode.parentNode.style.display = 'none'; return;}}
            var keyCombo;
            if (m in modifew_mode_sub_sym) {
                var keyCombos_sub = mergeSubmodes(m, keylbl);
                keyCombo = new Map(_to_consumable_array(keyComboM).concat(_to_consumable_array(keyCombos_sub)));
            } else {
                keyCombo = keyComboM;
            }
            // Generate tooltip table
            var tt_div = document.createElement("div");
            var tt_headIcn = document.createElement("span");
            var tt_headLbl = document.createElement("span");
            var tt_table = document.createElement("table");
            tt_headIcn.classList.add("styled-table-header-icon");
            tt_headLbl.classList.add("styled-table-header-label");
            tt_table.classList.add("styled-table");
            tt_headIcn.innerHTML = mIcon + " ";
            tt_headLbl.innerHTML = keyLbl;
            tt_div.appendChild(tt_headIcn);
            tt_div.appendChild(tt_headLbl);
            tt_div.appendChild(tt_table);
            setTableHead(tt_table, table_header);
            var showTT = false; // hide empty tooltips (header without rows)
            capIDs.map(function(lbl_id) {
                if (!keyCombo.has(lbl_id)) {
                    return;
                } // break sequence as no combos for this label
                var key_mod_cmd = keyCombo.get(lbl_id);
                var key_mod = key_mod_cmd.modi;
                var key_cmd = key_mod_cmd.cmd;
                var key_chord = key_mod_cmd.chord;
                if (key_cmd === "no_op") {
                    return;
                } // break sequence if an empty command
                var key_lbl = convert(keylbl, "qwerty", lyt[curLytLbl]);
                var key_sym = keyCapSym.get(keylbl).get(lbl_id) || "";
                if (key_cmd && key_sym) {
                    showTT = true; // tooltip not empty, show
                    var row = tt_table.insertRow();
                    var row_data = [];
                    if (key_mod) {
                        modi_list.map(function(mod) {
                            if (key_mod.includes(mod)) {
                                row_data.push(mod);
                            } else {
                                row_data.push("");
                            }
                        });
                    } else {
                        var modeSym = lbl_modis.get(lbl_id);
                        if (modeSym) {
                            row_data.push(modeSym);
                        } else {
                            row_data.push("");
                        }
                        row_data.push("");
                        if (key_chord) {
                            row_data.push(key_chord);
                        } else {
                            row_data.push("");
                        }
                    }
                    row_data.push(key_lbl);
                    row_data.push(key_sym);
                    row_data.push(key_cmd);
                    row_data.map(function(c) {
                        var cell = row.insertCell();
                        var txt = document.createTextNode(c);
                        cell.appendChild(txt);
                    });
                }
            });
            // Add tooltip data/listeners to the whole key
            if (!showTT) {
                return;
            }
            var keycap = el.closest(".keylabels"); // find the labels group
            var ttBox = document.createElement("div"); // create tooltip box
            // ttBox.id         	= `tt:${mode}:${keyLbl}`       	;
            ttBox.classList.add("keycap_tooltip_modi_cmd");
            ttBox.innerHTML = tt_div.innerHTML; // make tooltip show our table
            ttBox.keyLbl = keyLbl; // add label/layout data to allow dynamic changes
            ttBox.keylbl = keylbl; //
            ttBox.curLytLbl = curLytLbl; //
            keycap.appendChild(ttBox); // add tooltip to the keycap
            tooltips.get(m).set(keylbl, keycap); // add keycap to global map to toggle with keyboard
            // add tooltip listeners (once)
            timerIdMap.set(keycap, 0); // store timer
            if (isMobile) {
                addEvtLis(keycap, "touchstart", hTouchBeg, {
                    capture: false,
                    passive: true
                }); // show tooltip
                addEvtLis(keycap, "touchend", ttShowDelay, {
                    capture: false,
                    passive: true
                }); // show tooltip
            } else {
                addEvtLis(keycap, "mouseenter", ttShowDelay, false); // show tooltip
                addEvtLis(keycap, "mouseleave", ttHideDelay, false); // hide
                addEvtLis(keycap, "click", ttHide, false); // disable on click
            }
        }
    };
    var addTooltips_Keymap = function addTooltips_Keymap(keymap) {
        var keymap_id = keymap.id;
        var m = keymap_id.replace(modifew_modes_pre, "");
        document.querySelectorAll("#" + keymap_id + " " + keylabel_path + "." + key_lbl_class).forEach(function(el, ind, listObj) {
            addToolips_Keycap(m, el);
        });
    };
    var isMobile = false;
    var browser = Bowser.getParser(window.navigator.userAgent);
    browser.satisfies({
        mobile: {
            safari: "<=10"
        }
    });
    var isOld_IObserver = browser.satisfies({
        mobile: {
            safari: "<=12.0"
        }
    } // seems to work on 12.1 despite caniuse?
    , {
        desktop: {
            safari: "<=12.0",
            chrome: "<=57"
        }
    });
    browser.satisfies({
        mobile: {
            safari: "<=16.3"
        }
    }, {
        desktop: {
            safari: "<=16.3",
            chrome: "<=61"
        }
    });
    if (/Android|iPhone/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    String.prototype.strip = function(chars) {
        return strip(this, chars);
    };
    String.prototype.sort = function() {
        return sortAZ(this);
    };
    var modi_list = [
        "⇧",
        "⎈",
        "⎇"
    ]; // add ◆ when it's supported
    // const keyCapLblIDs   	= range(0, 8)  	; // top 9 key labels only
    var keyCapLblIDs = [
        0,
        2,
        4,
        6,
        8
    ]; // but we only need corners + center
    var keyCapLblIDs_ins = [
        0,
        1,
        2,
        4,
        6,
        8
    ]; // and sometimes top
    var keyCapLblIDs_sp = [
        0,
        2,
        4,
        6,
        8
    ];
    var keyCapLblIDs_unimp = [
        0,
        2,
        6,
        8
    ];
    var modifew_modes_pre = "modifew-";
    var modifew_modes = [
        "m1NOR",
        "m2INS",
        "m3SEL",
        "nGoTo",
        "nMatch",
        "nSpace",
        "nUnimpaired",
        "nView",
        "nWindow",
        "nHelp"
    ];
    var lbl_modi = new Map([
        [
            0,
            "⇧"
        ],
        [
            2,
            "⎇⇧"
        ],
        [
            4,
            "⎈"
        ],
        [
            6,
            ""
        ],
        [
            8,
            "⎇"
        ]
    ]); // maps key label ID to a modifier it represents
    var lbl_modi_ins = new Map([
        [
            0,
            "⇧"
        ],
        [
            1,
            "⎈⇧"
        ],
        [
            2,
            "⎇⇧"
        ],
        [
            4,
            "⎈"
        ],
        [
            6,
            ""
        ],
        [
            8,
            "⎇"
        ]
    ]);
    var lbl_modi_sp = new Map([
        [
            0,
            "☰␜"
        ],
        [
            2,
            "☰⟪"
        ],
        [
            4,
            "\uD83C\uDF10"
        ],
        [
            6,
            ""
        ],
        [
            8,
            "☰\xae"
        ]
    ]); // to a submode...
    var lbl_modi_unimp = new Map([
        [
            0,
            "⧛ℂ"
        ],
        [
            2,
            "ℂ⧚"
        ],
        [
            6,
            "⧛☰"
        ],
        [
            8,
            "☰⧛"
        ]
    ]);
    var modifew_mode_sym = {
        "m1NOR": {
            "icon": "Ⓝ",
            "path": "keys.normal",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        },
        "m2INS": {
            "icon": "ⓘ",
            "path": "keys.insert",
            "modi": lbl_modi_ins,
            "id": keyCapLblIDs_ins
        },
        "m3SEL": {
            "icon": "Ⓢ",
            "path": "keys.select",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        },
        "nGoTo": {
            "icon": "☰⮊",
            "path": "keys.normal.g",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        },
        "nMatch": {
            "icon": "☰\uD83E\uDDE9",
            "path": "keys.normal.n",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        },
        "nSpace": {
            "icon": "☰␠",
            "path": "keys.normal.space",
            "modi": lbl_modi_sp,
            "id": keyCapLblIDs_sp
        },
        "nUnimpaired": {
            "icon": "⧛☰⧚",
            "path": "keys.normal.[",
            "modi": lbl_modi_unimp,
            "id": keyCapLblIDs_unimp
        },
        "nView": {
            "icon": "☰\uD83D\uDC41",
            "path": "keys.normal.p",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        },
        "nWindow": {
            "icon": "☰\uD83D\uDDD4",
            "path": "keys.normal.C-w",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        },
        "nHelp": {
            "icon": "☰?",
            "path": "keys.normal.F1",
            "modi": lbl_modi,
            "id": keyCapLblIDs
        }
    };
    var modifew_mode_sub_sym = {
        "nSpace": {
            "File": {
                "icon": "☰␜",
                "path": "keys.normal.space.f",
                "modi": lbl_modi_n(0),
                "id": [
                    0
                ]
            },
            "Bracket": {
                "icon": "☰⟪",
                "path": "keys.normal.space.d",
                "modi": lbl_modi_n(2),
                "id": [
                    2
                ]
            },
            "LSP": {
                "icon": "\uD83C\uDF10",
                "path": "keys.normal.space.u",
                "modi": lbl_modi_n(4),
                "id": [
                    4
                ]
            },
            "Register": {
                "icon": "☰\xae",
                "path": "keys.normal.space.r",
                "modi": lbl_modi_n(8),
                "id": [
                    8
                ]
            }
        },
        "nUnimpaired": {
            "ConfigON": {
                "icon": "⧛ℂ",
                "path": "keys.normal.[.c",
                "modi": lbl_modi_n(0),
                "id": [
                    0
                ]
            },
            "ConfigOFF": {
                "icon": "ℂ⧚",
                "path": "keys.normal.].c",
                "modi": lbl_modi_n(2),
                "id": [
                    2
                ]
            },
            "UnimpairedL": {
                "icon": "⧛☰",
                "path": "keys.normal.[",
                "modi": lbl_modi_n(6),
                "id": [
                    6
                ]
            },
            "UnimpairedR": {
                "icon": "☰⧚",
                "path": "keys.normal.]",
                "modi": lbl_modi_n(8),
                "id": [
                    8
                ]
            }
        }
    };
    var keylabel_path = ".keyboard-bg .key .keycap .keylabels .keylabel";
    var key_lbl_class = "keylabel10";
    var keySymbLblMod = new Map([
        [
            "⎈",
            "C-"
        ],
        [
            "⎇",
            "A-"
        ],
        [
            "⇧",
            "S-"
        ]
    ]);
    var keySymbLbl = new Map([
        [
            "⏎",
            "ret"
        ],
        [
            "↩",
            "ret"
        ],
        [
            "␠",
            "space"
        ],
        [
            "␣",
            "space"
        ],
        [
            "⌦",
            "del"
        ],
        [
            "␡",
            "del"
        ],
        [
            "␈",
            "backspace"
        ],
        [
            "⌫",
            "backspace"
        ],
        [
            "▼",
            "down"
        ],
        [
            "▲",
            "up"
        ],
        [
            "◀",
            "left"
        ],
        [
            "▶",
            "right"
        ],
        [
            "⇟",
            "pagedown"
        ],
        [
            "⇞",
            "pageup"
        ],
        [
            "⇤",
            "home"
        ],
        [
            "⭰",
            "home"
        ],
        [
            "⤒",
            "home"
        ],
        [
            "⇱",
            "home"
        ],
        [
            "↖",
            "home"
        ],
        [
            "⭲",
            "end"
        ],
        [
            "⇥",
            "end"
        ],
        [
            "⤓",
            "end"
        ],
        [
            "⇲",
            "end"
        ],
        [
            "↘",
            "end"
        ]
    ]);
    var getSiblingKeyCaps = function getSiblingKeyCaps(e, ids) {
        var siblings = [];
        if (!e.parentNode) {
            return siblings;
        }
        var sibling = e.parentNode.firstChild;
        while(sibling){
            if (sibling.nodeType === 1 && sibling !== e && (sibling.innerText || sibling.innerHTML) && // keycap label exists...
            isValidLblPos(sibling, ids)) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };
    var reLblClass = new RegExp(String.raw(_templateObject2()));
    // Add tooltip scaffolding
    var delayShow, delayHide;
    if (isMobile) {
        delayShow = 0; // show tooltip right away, there is no hovering
        delayHide = 0; //
    } else {
        delayShow = 500; // show tooltip after this ms has passed     hovering
        delayHide = 300; // hide tooltip after this ms has passed not hovering
    } //
    var timerIdMap = new WeakMap(); // store keycap tooltip timers
    var table_header = [
        "m",
        "o",
        "d",
        "K⃣",
        "Sym",
        "Command"
    ];
    var ttKeyColI = table_header.indexOf("K⃣");
    if (isMobile) {
        document.addEventListener("touchstart", function(evt) {
            var elOccured = evt.target;
            var inKeyboard = false;
            document.querySelectorAll(".keyboard").forEach(function(el, ind, listObj) {
                if (el.contains(elOccured)) {
                    inKeyboard = true;
                }
            });
            if (inKeyboard === false) {
                hideAllTooltips();
            }
        }, {
            capture: false,
            passive: true
        });
    } else {
        document.addEventListener("keydown", function(evt) {
            if (evt.isComposing || evt.keyCode === 229 || evt.repeat) {
                hideAllTooltips();
                return;
            }
            var key_phys = evt.code;
            var esc = [
                "Escape",
                "Space"
            ];
            esc.map(function(esck) {
                if (key_phys === esck) {
                    hideAllTooltips();
                    return;
                }
            });
            var key_log = evt.key;
            if (evt.shiftKey) {
                var k = convertCaseLyt(key_log, lyt[gLyt.lbl], Case.l);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = modifew_modes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var mode = _step.value;
                        var modeTTs = tooltips.get(mode);
                        if (modeTTs.has(k)) {
                            var elTT = modeTTs.get(k);
                            if (isInViewport(elTT)) {
                                tooltipToggle(elTT);
                                break;
                            } else {
                                continue;
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        });
    }
    var timeTouchBeg = new Date();
    var tooltip_1 = function(el) {
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "click";
        if (isMobile || type === "key") {
            hideAllTooltips();
        }
        if (isMobile) {
            var isTap = isTouchTap(0.2);
            if (!isTap) {
                return;
            } // only trigger on taps, not scrolls
        }
        var ttBox = el.querySelector(".keycap_tooltip_modi_cmd");
        var boundBox = el.getBoundingClientRect(); // get hover element position
        var X = boundBox.right;
        var Y = boundBox.bottom;
        if (isMobile) {
            ttBox.style.left = "0px"; // move tooltip to the hover, but don't waste space to the left
        } else {
            ttBox.style.left = "".concat(X + 5, "px"); // move tooltip to the hover element
        } //
        ttBox.style.top = "".concat(Y + 5, "px");
        var tr = ttBox.getElementsByClassName("styled-table")[0].rows;
        var hd_lbl = ttBox.getElementsByClassName("styled-table-header-label")[0];
        if (ttBox.curLytLbl !== gLyt.lbl) {
            hd_lbl.innerHTML = convert(ttBox.keyLbl, "qwerty", lyt[gLyt.lbl]);
            Array.from(tr).forEach(function(row, i) {
                if (i === 0) {
                    return;
                } // skip table header
                row.cells[ttKeyColI].innerHTML = convert(ttBox.keylbl, "qwerty", lyt[gLyt.lbl]);
                ttBox.curLytLbl = gLyt.lbl;
            });
        }
        ttBox.style.display = "block";
    };
    var tooltip_0 = function(el) {
        var ttBox = el.querySelector(".keycap_tooltip_modi_cmd");
        ttBox.style.display = "none";
    };
    var ttShowDelay = getMouseEventHandler(tooltip_1, delayShow);
    var ttHideDelay = getMouseEventHandler(tooltip_0, delayHide);
    var ttHide = getMouseEventHandler(tooltip_0, 0);
    var ttBox = document.createElement("div");
    ttBox.id = "useragent";
    ttBox.style.display = "block"; // hide till mouse over
    ttBox.style.left = "20px"; // move tooltip to the hover element
    ttBox.style.top = "20px";
    ttBox.style.width = "100px";
    ttBox.style.height = "100px";
    ttBox.style.color = "red";
    // ttBox.innerText 	= navigator.userAgent
    // ttBox.innerHTML 	= `<div>asflkjsal;fjsfl;</div>`
    ttBox.style.color = "red";
    document.body.appendChild(ttBox);
    var tooltips = new Map(); // store all toolip divs here in a mode sub-map
    if (isOld_IObserver) {
        modifew_modes.map(function(mode) {
            var keymap_id = modifew_modes_pre + mode; // modifew-m1NOR
            tooltips.set(mode, new Map());
            var keymap = document.getElementById(keymap_id);
            if (keymap) {
                addTooltips_Keymap(keymap);
            }
        });
    } else {
        var obsAddToolips = function(changes, observer) {
            changes.forEach(function(change) {
                var target = change.target;
                if (change.intersectionRatio > 0) {
                    addTooltips_Keymap(target);
                    observer.unobserve(target);
                }
            });
        };
        var observerCfg = {
            root: null,
            rootMargin: "0%",
            threshold: 0.1 // fire when 10% of the keymap is visible
        };
        var observer = new IntersectionObserver(obsAddToolips, observerCfg);
        modifew_modes.map(function(mode) {
            var keymap_id = modifew_modes_pre + mode; // modifew-m1NOR
            tooltips.set(mode, new Map());
            var keymap = document.getElementById(keymap_id);
            if (keymap) {
                observer.observe(keymap);
            }
        });
    }
};
