+++
title      	= "Major mode: Normal Ⓝ"
description	= ""
date       	= 2023-03-10
#updated   	= # last updated date of the post

draft          	= false        	# only loaded if the `--drafts` is passed to `zola build`/`serve`/`check`
template       	= "keymap.html"	# template to render this section page
weight         	= 2            	# used by parent to order its subsections (↓val=↑higher priority)
#slug          	= ""           	# use instead of the filename to make the URL
#path          	= ""           	# overrides both `slug` and the filename, sections' path won't be used
#authors       	= []           	# used as the page's author in the default feed template.
in_search_index	= true         	# add section pages to search (if `build_search_index`)
#aliases       	= []           	# when moving content but want to redirect previous URLs to the  current one.  array of paths, not URLs

[taxonomies] # keys need to match `config.toml`, values=array[String objects], e.g. #tags = ["rust", "web"]

[extra] # Your own data
+++

<div id=buttons><span class="inline text">Change keyboard layout to:</span>
  <button class="btn" id=btn_qwerty    	type=button>QWERTY</button>
  <button class="btn" id=btn_dvorak    	type=button>Dvorak</button>
  <button class="btn" id=btn_colemak   	type=button>Colemak</button>
  <button class="btn" id=btn_colemak_dh	type=button>Colemak DH</button>
  <button class="btn" id=btn_workman   	type=button>Workman</button>
  <button class="btn" id=btn_neo2      	type=button>Neo2</button>
</div>

<div id="modifew-m1NOR" class="keyboard" tabindex=0 style="display: inline-flex;">
  {{include_file_coloc_sub (file="kle/helix-keymap-modifew-m1NOR.html.tmpl")}}
</div>
