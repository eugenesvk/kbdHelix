+++
title      	= "Cheat sheets"
description	= "Cheat sheets only without design description"

redirect_to	= "modifew/cheat-sheets/all"	# redirect when a user lands on the section, used to organize pages w/o `404`, e.g. "documentation/content/overview"

draft              	= false        	# only loaded if the `--drafts` is passed to `zola build`/`serve`/`check`
render             	= true         	# section homepage (false to use the section to organize pages)
sort_by            	= "weight"     	# |none¦date¦update_date¦title¦title_bytes¦weight¦slug
weight             	= 0            	# used by parent to order its subsections (↓val=↑higher priority)
template           	= "index.html" 	# template to render this section page
page_template      	= "keymap.html"	# template for ALL pages below the section, recursively
paginate_by        	= 0            	# № of pages to be displayed per paginated page 0 disable
paginate_path      	= "page"       	# path used by the paginated page with number appended |page/1|
paginate_reversed  	= false        	# pagination will happen in a reversed order
insert_anchor_links	= "left"       	# insert a link for each header, override default with `anchor-link.html` @ `templates`. |none¦left¦right¦heading¦(anchor text=full heading)
in_search_index    	= true         	# add section pages to search (if `build_search_index`)
transparent        	= false        	# pass its pages on to the parent section. Useful when the section shouldn't split up the parent section, like sections for each year under a posts section
#aliases           	= []           	# when moving content but want to redirect previous URLs to the  current one.  array of paths, not URLs
#generate_feed     	= false        	# create a section feed (@section's root), excludes sub-sections
[extra]            	               	# Your own data
list_pages = false
+++
