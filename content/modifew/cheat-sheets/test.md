+++
title      	= "modiƒew cheat sheets"
description	= "Major mode: Normal"
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
  {{ include_file_coloc_sub (file="kle/helix-keymap-modifew-m1NOR.html.tmpl") }}
</div>


## Misc {#misc}

Direct links to pages with only the cheat cheets (custom layouts in a `#hash` also work):

|Layout→</br>Mode↓|qwerty|dvorak|colemak|colemak_dh|workman|neo2|asset|
|:-|:-|:-|:-|:-|:-|:-|:-|
|{{ url_hash (name="all"        	, url="@/modifew/cheat-sheets/all.md"        	, hash="") }}|{{ url_hash (name="link"            	, url="@/modifew/cheat-sheets/all.md"        	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/all.md"        	, hash="#asset") }}|
|{{ url_hash (name="m1NOR"      	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#m1NOR") }}|{{ url_hash (name="link"      	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m1NOR.md"      	, hash="#asset") }}|
|{{ url_hash (name="m2INS"      	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#m2INS") }}|{{ url_hash (name="link"      	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m2INS.md"      	, hash="#asset") }}|
|{{ url_hash (name="m3SEL"      	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#m3SEL") }}|{{ url_hash (name="link"      	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/m3SEL.md"      	, hash="#asset") }}|
|{{ url_hash (name="nGoTo"      	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#nGoTo") }}|{{ url_hash (name="link"      	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nGoTo.md"      	, hash="#asset") }}|
|{{ url_hash (name="nMatch"     	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#nMatch") }}|{{ url_hash (name="link"     	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nMatch.md"     	, hash="#asset") }}|
|{{ url_hash (name="nSpace"     	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#nSpace") }}|{{ url_hash (name="link"     	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nSpace.md"     	, hash="#asset") }}|
|{{ url_hash (name="nUnimpaired"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#nUnimpaired") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nUnimpaired.md"	, hash="#asset") }}|
|{{ url_hash (name="nView"      	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#nView") }}|{{ url_hash (name="link"      	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nView.md"      	, hash="#asset") }}|
|{{ url_hash (name="nWindow"    	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#nWindow") }}|{{ url_hash (name="link"    	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#qwerty") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#dvorak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#colemak") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#colemak_dh") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#workman") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#neo2") }}|{{ url_hash (name="link"	, url="@/modifew/cheat-sheets/nWindow.md"    	, hash="#asset") }}|

<hr />
