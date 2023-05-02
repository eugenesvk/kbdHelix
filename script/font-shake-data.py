#!/usr/bin/env python
# read all content, find unique symbols, generate a list of hex codes of those that are also part of the fonts
import os, sys, io, time
import re
from pathlib import Path

script_dir 	= Path(__file__).parent
srcFdPath  	= Path(f'{script_dir}/../content' ).resolve(strict=True)
srcFontPath	= Path(f'{script_dir}/../src/font').resolve(strict=True)
font_files 	= [
  'noto-sans-symbols-2-symbols-400-normal.woff2',
  'noto-sans-symbols-symbols-400-normal.woff2']
outFdPath  	= Path(f'{script_dir}/../src/font').resolve(strict=True)
outSubset  	= 'font-shake-subset'
outSubset_f	= Path(f"{outFdPath}/{outSubset}")
def checkIfExists():
  for font_f in font_files:
    if not (path_to_font := Path(f"{srcFontPath}/{font_f}")).is_file():
      print(f'⚠ was expecting a file at "{path_to_font}"')
      return False
  if not outFdPath.is_dir():
    print(  f'⚠ was expecting a folder at "{outFdPath}"')
    return False
  if outSubset_f.is_file():
    overwrite = input(f'Subset file "{outSubset}" already exists at "{outFdPath}", overwrite (y)? ')
    if not (overwrite == 'y' or overwrite == ''):
      print(f'⚠ not overwriting the output subset "{outSubset}"')
      return False
  return True

if not checkIfExists():
  sys.exit(1)

# 1 Get all unique chars in the symbols fonts except for some low number ones like alphachars etc that should not be substituted with the symbols fonts
fontCharRange = { # fc-query --format='%{charset}\n' @(f) # unicode numbers
  'Noto Sans Symbols': ['20 23 2a 30-39 41-5a 61-7a a0 2022 20dd-20e0 20e2-20e4 2160-2183 2185-2188 218a-218b 2190-2199 2300-230f 2311-2315 2317 231c-231f 2322-2323 2329-232a 232c-2335 237c 2380-2394 2396-239a 23af 23be-23cd 23d0-23db 23e2-23e8 2460-24ff 25cc 260a-260d 2613 2624-262f 2638-263b 263d-2653 2669-267e 2690-269d 26a2-26a9 26ad-26bc 26ce 26e2-26ff 271d-2721 2776-2793 2921-2922 1f100-1f10c 1f110-1f16c 1f170-1f190 1f19b-1f1ac 1f546-1f549 1f54f 1f610 1f700-1f773'],
  'Noto Sans Symbols 2': ['20 23 2a 30-39 41-5a 61-7a 7f a0 2022 20e2-20e3 21af 21e6-21f0 21f3 2218-2219 2299 22c4-22c6 2316 2318 231a-231b 2324-2328 232b 237b 237d-237f 2394 23ce-23cf 23e9-23ea 23ed-23ef 23f1-2426 2440-244a 25a0-2609 260e-2612 2614-2623 2630-2637 263c 2654-2668 267f-268f 269e-26a1 26aa-26ac 26bd-26cd 26cf-26e1 2700-2704 2706-2709 270b-271c 2722-2727 2729-274b 274d 274f-2753 2756-2775 2794 2798-27af 27b1-27be 2800-28ff 2981 29bf 29eb 2b00-2b0d 2b12-2b2f 2b4d-2b73 2b76-2b95 2b97-2bfd 2bff 4dc0-4dff fff9-fffb 10140-1018e 10190-1019c 101a0 101d0-101fd 102e0-102fb 10e60-10e7e 1d2e0-1d2f3 1d300-1d356 1d360-1d378 1f000-1f02b 1f030-1f093 1f0a0-1f0ae 1f0b1-1f0bf 1f0c1-1f0cf 1f0d1-1f0f5 1f30d-1f30f 1f315 1f31c 1f321-1f32c 1f336 1f378 1f37d 1f393-1f39f 1f3a7 1f3ac-1f3ae 1f3c2 1f3c4 1f3c6 1f3ca-1f3ce 1f3d4-1f3e0 1f3ed 1f3f1-1f3f3 1f3f5-1f3f7 1f408 1f415 1f41f 1f426 1f43f 1f441-1f442 1f446-1f449 1f44c-1f44e 1f453 1f46a 1f47d 1f4a3 1f4b0 1f4b3 1f4b9 1f4bb 1f4bf 1f4c8-1f4cb 1f4da 1f4df 1f4e4-1f4e6 1f4ea-1f4ed 1f4f7 1f4f9-1f4fb 1f4fd-1f4fe 1f503 1f507-1f50a 1f50d 1f512-1f513 1f53e-1f545 1f54a 1f550-1f579 1f57b-1f594 1f597-1f5a3 1f5a5-1f5fa 1f650-1f67f 1f687 1f68d 1f691 1f694 1f698 1f6ad 1f6b2 1f6b9-1f6ba 1f6bc 1f6c6-1f6cb 1f6cd-1f6cf 1f6d3-1f6d7 1f6e0-1f6ea 1f6f0-1f6f3 1f6f7-1f6fc 1f780-1f7d8 1f7e0-1f7eb 1f800-1f80b 1f810-1f847 1f850-1f859 1f860-1f887 1f890-1f8ad 1f8b0-1f8b1 1f93b 1f946 1fa00-1fa53 1fa60-1fa6d 1fa70-1fa74 1fa78-1fa7a 1fa80-1fa86 1fa90-1faa8 1fab0-1fab6 1fac0-1fac2 1fad0-1fad6 1fb00-1fb92 1fb94-1fbca 1fbf0-1fbf9'],
}

from itertools import chain
def stRange(srng):
  splits = srng.split('-')
  return (int(splits[0],16), int(splits[-1],16))
def getCharsFromFont(fontCharRange):
  charRanges = set()
  for font, fontCharRanges in fontCharRange.items():
    for fontCharRangeString in fontCharRanges:
      for fontCharRange in fontCharRangeString.split(' '):
        charRanges.add(stRange(fontCharRange))
  charsAll = set(chain(*(range(start, end+1) for start, end in charRanges)))

  charRangesExString = '0-2000     33-33' # up to General Punctuation
  charRangesEx = set()
  for charRange in re.split(' +',charRangesExString):
    charRangesEx.add(stRange(charRange))
  charsEx = set(chain(*(range(start, end+1) for start, end in charRangesEx)))

  chars = charsAll - charsEx
  return chars

chIDs_Font = getCharsFromFont(fontCharRange)

# 2 Get all unique chars used in all the content files
def scantree(path):
  """Recursively yield DirEntry objects for given directory."""
  for entry in os.scandir(path):
    if entry.is_dir(follow_symlinks=False):
      yield from scantree(entry.path)
    else:
      yield entry

char_code_list = list()
charUnique  = set()
if srcFdPath.exists():
  if srcFdPath.is_dir():
    print(f"reading all files in {srcFdPath} to find unique characters...")
    for  entry in scantree(srcFdPath):
      if entry.is_file():
        print(f'"{entry.name}"', end=' ')
        with open(entry, "r", encoding="utf-8") as f:
          source = f.read()
          charUniqueFile = set(source) # a set of unique chars in this file
          charUnique |= charUniqueFile
    print('')
  else:
    print(f"error: expected a folder at {srcFdPath}")
else:
  print(  f"error: expected a valid path at {srcFdPath}")

# charUnique = {'⸨','⇞','⤹','ℹ','/','T','%','⎁','3','⌂','ᵡ','⇱','*','S','🅁','7','M','🅂','≝','⇪','ᵏ','◆','#','⭢','⮒','5','ƒ','〈','⚠','🂲','&','⌥','↑','I','⌚','R','l','⮊','n','🙈','k','⌘','␣',"'",'✎','✋','4','💡','J','\t','🕖','₋',':','›','☔','w','ω','⭰','⸙','"','⎯','𝕫','Ⓐ','−','b','(','⌦','◎','🢗','⧛','–','⇛','🤙','🧬','🗘','t','@','⎋','⊕','🗋','⭿','₂','🗔','B','\ufeff','⟲','⭥','🡽','Z','.','🄻','¦','-','⎌','↓','▶','ⓘ','🕮','🎮','[','~','⇚','O','🢔','®','⟪','🯶','⧚','👆','📋','️','W','⨝',')','«','—','🖰','_','Ⓒ','Y','🎭','✄','☝','⏹','\\','🄸','┃','`','⎘','🧩','🯆','↷','🌐','⛅','🡢','🖫','䷖','「','☰','🛈','\n','₇','P','🄲','🔎','⎈','“','N','ↄ','😲','⭣','🌍','🯲','💻','␌','0','⭡','^','Ⓢ','ʸ','K','🏠','🠾','’','C','A','x','¶','⇟','🔄','α','🯴','🏍','⭠','🢖','⟳','↪','⇧','🂱','◀','𝔸','v',']','ℂ','Ⓝ','🏕','','f',';','🕱','🙥','c','y','🯱','=','━','𝕒','🠵','‹','🄳','͜','‗','🏌','⏺','⎗','🖈','🯵','🚲','📆','🖕','🗍','<','⌃','⤸','🯅','⮀','·','q','🆔','₁','8','6','🏟','o','+','X','🗐','∞','⏾','⭾','r','🏔','ₛ','📖','🗁','🡼','⤉','⌨','⎇','>','␠','﹖','❚','🠷','⤞','g','|','G','L','␤','2','⛓','🡱','🔣','🨄','👍','9','⏎','←','⊖','⤈','☾','$','🯇','🌈','z','⎀','🚦','V','?',',','Q','τ','👁','🐿','🯉','🡭','⇋','▋','∀','̡','💾','🗗','№','×','📽','🠼','⁁','1','▲','⮋','p','{','🂳','ℱ','🛪','!','⇝','✁','→','H','i','【','₃','}','⤝','⭱','h','u','🞽','a','↠','🛠','s','🂮','F','⭳','𝖗','\u200d','⟫','␜','d','🧪','j','m','▼','D','Δ','⯧','💍','〔','🏻','⭲','⇲','🟨','🯳','e','E','⌫','U','‘','⛙'}
charUnique -= {''} # empty char has no ord
chIDs_Doc = set(chain(ord(char) for char in charUnique))

# 3 Get all unique chars used in all the content files that are also in the symbols font
chIDs_Both   	= chIDs_Font & chIDs_Doc
ch_Both      	= set(chain(chr(chID) for chID in chIDs_Both))
chIDs_BothHex	= set(chain('{:x}'.format(chID) for chID in chIDs_Both))
# print(chIDs_Both)
# print(chIDs_BothHex)

# 4 Write a space-separated list of hex codes
chIDs_BothHex_joined = ' '.join(sorted(chIDs_BothHex))

with open(outSubset_f, "w", encoding="utf-8") as f:
  print(chIDs_BothHex_joined, file=f)
  print(f'🎉 Wrote all unique hex codes to "{outSubset}" at "{outFdPath}"')
