import { convert, gLyt, lyt }	from "/js/layout-convert.js";
import modifew               	from '../config/modifew.json' assert {type: 'json'}
window.onload=function(){ // optional since it depends on the way in which you fire events
const range = (start, stop, step=1) => Array.from(
  {length: (stop - start) / step + 1},
  (_, i) => start + (i * step));

// const keyCapLblIDs = range(0, 8); // top 9 key labels only
const keyCapLblIDs = [0,2,4,6,8]; // but we only need corners + center
const modifew_modes_pre	= '#keyboard.modifew-';
const modifew_modes    	= ['m1NOR','m2INS','m3SEL','nGoTo','nMatch','nSpace','nUnimpaired','nView','nWindow','nHelp'];
const lbl_modi = new Map([[0,'⇧'],[2,'⎇⇧'],[4,'⎈'],[6,''],[8,'⎇']]); // maps key label ID to a modifier it represents
const modifew_mode_sym = {
  'm1NOR'      	: {'icon':'Ⓝ'  	, 'path':'keys.normal'      	, 'modi':lbl_modi },
  'm2INS'      	: {'icon':'ⓘ'  	, 'path':'keys.insert'      	, 'modi':lbl_modi },
  'm3SEL'      	: {'icon':'Ⓢ'  	, 'path':'keys.select'      	, 'modi':lbl_modi },
  'nGoTo'      	: {'icon':'☰⮊' 	, 'path':'keys.normal.g'    	, 'modi':lbl_modi },
  'nMatch'     	: {'icon':'☰🧩' 	, 'path':'keys.normal.n'    	, 'modi':lbl_modi },
  'nSpace'     	: {'icon':'☰␠' 	, 'path':'keys.normal.space'	, 'modi':lbl_modi },
  'nUnimpaired'	: {'icon':'⧛☰⧚'	, 'path':'keys.normal.['    	, 'modi':lbl_modi },
  'nView'      	: {'icon':'☰👁' 	, 'path':'keys.normal.p'    	, 'modi':lbl_modi },
  'nWindow'    	: {'icon':'☰🗔' 	, 'path':'keys.normal.C-w'  	, 'modi':lbl_modi },
  'nHelp'      	: {'icon':'☰?' 	, 'path':'keys.normal.F1'   	, 'modi':lbl_modi}
};
const keylabel_path	= '#keyboard-bg .key .keycap .keylabels .keylabel';
const key_lbl_class	= 'keylabel10';

function getNestedPath(xpth, map=modifew_mode_sym){
  const pth = xpth.split('.');
  return pth.reduce((a, b) => a[b], map);
}
function getModeKeys(mode){
  const path2icon	= mode + '.icon';
  const path2path	= mode + '.path';
  const path2keys	= getNestedPath(path2path,modifew_mode_sym);
  const keys     	= getNestedPath(path2keys,modifew);
  const icon     	= getNestedPath(path2icon,modifew_mode_sym);
  return [keys,icon];
}

function _parse_key_user(key_user) { // replace key modifiers with symbols A-A → ⎇⇧a
  const _key_symb	= new Map(Object.entries({
    '⎈':'C-','⎇':'A-',}));

  _key_symb.forEach((v, k) => { // replace with symbols
    if (key_user.includes(v)) {
      key_user = key_user.replace(v,k);}
  });
  key_user = key_user.replace(/([A-Z])/,'⇧$1').toLowerCase(); // replace caps

  return key_user;
}

// my button
// document.querySelectorAll('#keyboard #keyboard-bg .keylabels .keylabel10').forEach((el, ind, listObj) => {
let getSiblings = function (e) {
  let siblings = [];
  if(!e.parentNode) { return siblings; }
  let sibling  = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) { siblings.push(sibling);}
    sibling = sibling.nextSibling;
  }
  return siblings;
};
function isValidLblPos(el, validPos = keyCapLblIDs) {
  let retVal = false;
  validPos.map(pos_id => {
    const key_lbl_class = `keylabel${pos_id}`;
    if (el.classList.contains(key_lbl_class)) {
      retVal = true ; } });
  return retVal;
}
let getSiblingKeyCaps = function (e) { // get only valid sibling keycap elements
  let siblings = [];
  if(!e.parentNode) { return siblings; }
  let sibling  = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e &&
        sibling.innerText && // keycap label exists...
        isValidLblPos(sibling) ) { // ... and is one of the top 5 (corners + center)
      siblings.push(sibling); }
    sibling = sibling.nextSibling;
  }
  return siblings;
};


function escRe  (string) { return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); } // $& = whole string
function escRepl(string) { return string.replace(/\$/g                , '$$$$'); }
function p(...items) { // helper console log
  console.log(...items); }
function pp(...items) { // helper print var names, must be passed as {objects}
  for (const item of items) {
    const [iName]	= Object.keys(item);
    const iVal   	= item[iName];
    const iT     	= typeof(iVal);
    console.log(`${iName}(${iT})=¦`,iVal,'¦'); }
 }
function pt(...items) { // helper print var's type and var's value
  for (const item of items) { console.log(typeof(item),item); } }

function reLastLetter(letter) { // get the regex that matches 'b' but not 'tab' for 'b' or 'B'
  return new RegExp('(?<![a-z])'+escRe(letter)+'$', 'i');
}
function getKeyCombo(k_in, keys, modi=lbl_modi) { // for 'b' get ⇧=>switch_to_lowercase, ⎈=>switch_to_uppercase ''=>no_op at each label respectively: {'0' => {…}, '4' => {…}, '6' => {…}}
  // from {B:..lower, A-tab:move, C-b:...upper, b:no_op}
  const k = k_in.toLowerCase();
  let key_fmt, cmd;
  let keyCombo = new Map();
  function setKeyComboItem(modi,lbl_id) {
    if (key_fmt === lbl_modi.get(lbl_id)) {
      keyCombo.set(lbl_id,{'modi':key_fmt, 'cmd':cmd});
    }
  }
  const reLastK = reLastLetter(k);
  for (const key in keys) {
    if (reLastK.test(key)) {
      key_fmt	= _parse_key_user(key).replace(new RegExp(escRe(k)+'$'),'');
      cmd    	= keys[key];
      lbl_modi.forEach(setKeyComboItem);
    }
  }
  return keyCombo;
}

const reLblClass = new RegExp(String.raw`keylabel(\d{1,2})`);

// Add tooltip scaffolding
const ttBox            	= document.createElement("div");
 ttBox.id              	= "keycap_tooltip_modi_cmd";
 ttBox.style.visibility	= "hidden"; // hide till mouse over
document.body.appendChild(ttBox);

const tooltip_1 = ((evt) => {
  const boundBox  	= evt.target.getBoundingClientRect(); // get hover element position
  const X         	= boundBox.left;
  const Y         	= boundBox.top;
  ttBox.style.left	= `${X + 45}px`; // move tooltip to the hover element
  ttBox.style.top 	= `${Y + 45}px`;
  const ttt       	= evt.currentTarget.ttt;
  const lbl       	= evt.currentTarget.lbl;
  const cLytLbl   	= evt.currentTarget.cLytLbl;
  const tr        	= ttt.getElementsByClassName('styled-table')[0].rows;
  if (cLytLbl !== gLyt.lbl) {
    // console.log('layout changed',cLytLbl,gLyt.lbl);
    Array.from(tr).forEach(function(row,i) {
      if (i === 0) { return; }
      const cell_val = row.cells[3].innerHTML;
      row.cells[3].innerHTML = convert(lbl,'qwerty',lyt[gLyt.lbl]);
      // console.log('cell_val=¦',convert(ttt.lbl, cell_val,'qwerty',lyt[gLyt.lbl]),'¦')
      evt.currentTarget.cLytLbl = gLyt.lbl;
    });
  }
  ttBox.innerHTML	= ttt.innerHTML;
  ttBox.style.visibility = "visible"; });
const tooltip_0 = (() => {
  ttBox.style.visibility = "hidden" ; });
const modi_list = ['⇧','⎈','⎇']; // add ◆ when it's supported
function setTableHead(table, keys) {
  let tHd	= table.createTHead();
  let row	= tHd.insertRow();
  keys.map(key => {
    let th 	= document.createElement("th");
    let txt	= document.createTextNode(key);
    th.appendChild(txt);
    row.appendChild(th);
  });
}

const key_cap_sym = new Map();
modifew_modes.map(m => {
  const mode = modifew_modes_pre + m;
  // pt('mode=¦'+mode+'¦');
  document.querySelectorAll(mode+' '+keylabel_path  + '.'+key_lbl_class).forEach((el, ind, listObj) => {
    const keyLbl    	= el.innerText;
    const key_cap_el	= [];

    if (keyLbl) { // now that we know key label, store all cap symbols for this key
      const keylbl 	= keyLbl[0].toLowerCase(); // take only the 1st label (number keys have duplicate 1!)
      const keyCaps	= getSiblingKeyCaps(el); // get all keycaps with valid labels and one of 5 valid positions
      // pp({mode},{keyCaps},{keylbl});

      if (key_cap_sym.has(keylbl)) { // avoid looping for cap symbols if we already have them
      } else {
        key_cap_sym.set(keylbl, new Map());
        keyCaps.map(x => {
          let lbl_cls	= '';
          x.classList.forEach(xcl => {
            if (reLblClass.test(xcl)) {
              lbl_cls = xcl.match(reLblClass)[1]; }
          });
          key_cap_sym.get(keylbl).set(lbl_cls,x.innerText);
        });
        // p('stored keymap for=¦',keylbl,'¦',key_cap_sym.get(keylbl));
      }
      // Generate tooltip table
      const [keys, keyIcon]	= getModeKeys(m);
      let tt_div           	= document.createElement('div');
      let tt_table         	= document.createElement('table');
      tt_table.classList.add('styled-table');
      const tooltip_header	= `${keyIcon} ${keyLbl}`;
      tt_div.innerHTML    	= tooltip_header;
      const table_header  	= ['m','o','d','Key','Sym','Command'];
      tt_div.appendChild(tt_table);
      setTableHead(tt_table, table_header);
      const cLytLbl  	= gLyt.lbl;  // reads layout only at page load
      const key_combo	= getKeyCombo(keylbl, keys); // {0:'⇧'=>'switch_to_lowercase'>..}
      keyCapLblIDs.map(lbl_id => {
        const lbl_id_s	 = lbl_id.toString();
        if (!key_combo.has(lbl_id)) { return; } // break sequence as no combos for this label
        const key_mod_cmd	 = key_combo.get(lbl_id);
        const key_mod    	 = key_mod_cmd.modi;
        const key_cmd    	 = key_mod_cmd.cmd;
        const key_lbl    	 = convert(keylbl,'qwerty',lyt[cLytLbl]);
        const key_sym    	 = key_cap_sym.get(keylbl).get(lbl_id_s) || '';
        if (key_cmd) {
          let row     	= tt_table.insertRow();
          let row_data	= [];
          modi_list.map(mod => {
            if (key_mod === mod)	{ row_data.push(mod);
            } else              	{ row_data.push(''); } });
          row_data.push(key_lbl);
          row_data.push(key_sym);
          row_data.push(key_cmd);
          row_data.map(c	=> {
            let cell = row.insertCell();
            let txt = document.createTextNode(c);
            cell.appendChild(txt);
          });
        }
      });

      // Add tooltip data/listeners to the whole key
      const keycap = el.closest(".keylabels").closest(".keycap"); // find the grandparent keycap element
      keycap.ttt    	= tt_div 	; // tooltip table div
      keycap.lbl    	= keylbl 	; // add lbl/cLytLbl to allow ↓ callbacks to use it
      keycap.cLytLbl	= cLytLbl	; // current layout
      // add tooltip listeners
      keycap.addEventListener("mouseover"	, tooltip_1, false)	; // show tooltip
      keycap.addEventListener("mouseout" 	, tooltip_0, false)	; // hide
      keycap.addEventListener("click"    	, tooltip_0, false)	; // disable on click
      }
    });
  });
};
