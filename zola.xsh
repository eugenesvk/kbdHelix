#!/usr/bin/env xonsh

from xonsh.platform	import (  # check OS
  ON_WINDOWS, ON_LINUX, ON_DARWIN, ON_WSL)

if ON_DARWIN:
  myip = $(ipconfig getifaddr en0).strip()
  print(f'myip={myip}')
  zola serve --interface 0.0.0.0 --base-url @(myip)
else:
  print("zola LAN support for your system has not been added yet, running regular zola serve")
  zola serve
