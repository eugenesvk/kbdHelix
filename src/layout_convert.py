import re

def getUserKeymap(keymap_len):
  # to use custom keymaps (non-QWERTY/non-Latin) in command mode
  # 1. add "lower"/"upper" keymaps below that match the position of QWERTY symbols
  # 2. Run command "NeoVintageous: Generate non-QWERTY key bindings"
  keymap = {
    #qwerty	      `12 34567890-=\ qwertyuiop[] asdfghjkl;' zxcvbnm,./
    "low"  	: R'''ё12 34567890-=\ йцукенгшщзхъ фывапролджэ ячсмитьбю.''',
    #qwerty	      ~!@ #$%^&*()_+| QWERTYUIOP{} ASDFGHJKL:" ZXCVBNM<>?
    "upp"  	: R'''Ё!@ #$%^&*()_+/ ЙЦУКЕНГШЩЗХЪ ФЫВАПРОЛДЖЭ ЯЧСМИТЬБЮ?''',
    # ↑ remap only unique non-Latin keys, leave symbols as is not to lose them in Latin layout
  }
  low = re.sub(r'\s','',keymap["low"])
  upp = re.sub(r'\s','',keymap["upp"])
  if not (ln := len(low)) == keymap_len:
    msg_error = f"keymap setting should have '{keymap_len}' characters, not '{ln}'"
    print(msg_error)
    return
  return({"low":low,"upp":upp}) # None to disable

class Symbol:
  def __init__(self, name=''):
    self.name = f"Symbol({name})"
  def __repr__(self):
    return self.name

from enum import Enum
class lyt(Enum):
  qwerty      = Symbol('qwerty')
  dvorak      = Symbol('dvorak')
  colemak     = Symbol('colemak')
  workman     = Symbol('workman')
  asset       = Symbol('asset')
  colemak_dh  = Symbol('colemak_dh')
  neo2        = Symbol('neo2')
  ru_pc       = Symbol('ru_pc')
  ru_mac      = Symbol('ru_mac')
  user        = Symbol('user')

class LayoutConverter:
  def __init__(self):
    self.isUser   = False
    layout_str        = {
      lyt.qwerty      :{'low' : R'''`1234567890-=\ qwertyuiop[] asdfghjkl;' zxcvbnm,./'''
       ,                'upp' : R'''~!@#$%^&*()_+| QWERTYUIOP{} ASDFGHJKL:" ZXCVBNM<>?'''},
      lyt.dvorak      :{'low' : R'''`1234567890[]\ ',.pyfgcrl/= aoeuidhtns- ;qjkxbmwvz'''
       ,                'upp' : R'''~!@#$%^&*(){}| "<>PYFGCRL?+ AOEUIDHTNS_ :QJKXBMWVZ'''},
      lyt.colemak     :{'low' : R'''`1234567890-=\ qwfpgjluy;[] arstdhneio' zxcvbkm,./'''
       ,                'upp' : R'''~!@#$%^&*()_+| QWFPGJLUY:{} ARSTDHNEIO" ZXCVBKM<>?'''},
      lyt.workman     :{'low' : R'''`1234567890-=\ qdrwbjfup;[] ashtgyneoi' zxmcvkl,./'''
       ,                'upp' : R'''~!@#$%^&*()_+| QDRWBJFUPP{} ASHTGYNEOI" ZXMCVKL<>?'''},
      lyt.asset       :{'low' : R'''`1234567890-=\ qwjfgypul;[] asetdhnior' zxcvbkm,./'''
       ,                'upp' : R'''~!@#$%^&*()_+| QWJFGYPUL;{} ASETDHNIO:" ZXCVBKM<>?'''},
      lyt.colemak_dh  :{'low' : R'''`1234567890-=\ qwfpbjluy;[] arstgkneio' zxcdvmh,./'''
       ,                'upp' : R'''~!@#$%^&*()_+| QWFPBJLUY:{} ARSTGKNEIO" ZXCDVMH<>?'''},
      lyt.neo2        :{'low' : R'''^1234567890-`\ xvlcwkhgfqß´ uiaeosnrtdy üöäpzbm,.j'''
       ,                'upp' : R'''ˇ°§ℓ»«$€„“”—¸| XVLCWKHGFQẞ˜ UIAEOSNRTDY ÜÖÄPZBM–•J'''},
      lyt.ru_pc       :{'low' : R'''ё1234567890-=\ йцукенгшщзхъ фывапролджэ ячсмитьбю.'''
       ,                'upp' : R'''Ё!"№;%:?*()_+/ ЙЦУКЕНГШЩЗХЪ ФЫВАПРОЛДЖЭ ЯЧСМИТЬБЮ,'''},
      lyt.ru_mac      :{'low' : R''']1234567890-=ё йцукенгшщзхъ фывапролджэ ячсмитьбю/'''
       ,                'upp' : R'''[!"№;%,.;()_+Ё ЙЦУКЕНГШЩЗХЪ ФЫВАПРОЛДЖЭ ЯЧСМИТЬБЮ?'''},
    }
    for k,v in layout_str.items():
      v['low'] = v['low'].replace(' ','')
      v['upp'] = v['upp'].replace(' ','')
    keymap_len  = len(layout_str[lyt.qwerty]['low'])

    userKeymap = getUserKeymap(keymap_len)
    if userKeymap:
      layout_str[lyt.user] = userKeymap
      self.isUser = True

    translations = dict() # generate translation dictionaries for use in str.translate(dict)
    for   layout_from in layout_str:
      translations[layout_from] = dict()
      for layout_to   in layout_str:
        string_from = layout_str[layout_from  ]['low'] + layout_str[layout_from ]['upp']
        string_to   = layout_str[layout_to    ]['low'] + layout_str[layout_to   ]['upp']
        translations[layout_from][layout_to] =  str.maketrans(string_from, string_to)
    self.layout_str   = layout_str
    self.layouts      = list(layout_str.keys())
    self.translations = translations

  def convert(self, src, layout_from, layout_to):
    translations  = self.translations
    layouts       = self.layouts
    if not layout_from in layouts: # todo: or fail silently and return src?
      msg_error = f"'{layout_from}' invalid, must be one of '{layouts}')"
      print(msg_error)
      return None
    if not layout_to   in layouts:
      msg_error = f"'{layout_to}' invalid, must be one of '{layouts}')"
      print(msg_error)
      return None
    return src.translate(translations[layout_from][layout_to])
