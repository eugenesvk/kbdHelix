import { gLyt, lyt, Case 	,
  convert, convertCaseLyt	,
  getCaseLyt }           	from "/js/layout-convert.js";
import modifew           	from '../config/modifew.json' assert {type: 'json'}

export const addEvtLis = // addEvtLis(domElement, 'click', this.myfunction.bind(this));
  (   el,   evtNm, callback, opts=false) => {
  if (el && evtNm){
    const lisNm = 'listener:' + evtNm;
    const isAttached =           el.getAttribute(lisNm       );
    if (isAttached !== 'true') { el.setAttribute(lisNm,'true');
      el.addEventListener(evtNm, (evt) => {callback(evt);}, opts);
  }}};
export const rmEvtLis = // rmEvtLis(domElement, 'click', this.myfunction);
  (   el,   evtNm, callback) => {
  if (el && evtNm) {
    el.removeEventListener(evtNm, callback);}};

window.onload=function(){ // optional since it depends on the way in which you fire events
const range = (start, stop, step=1) => Array.from(
  {length: (stop - start) / step + 1},
  (_, i) => start + (i * step));
function strip(x, chars) {
  let start	= 0;
  let end  	= x.length - 1;
  while (chars.indexOf(x[start]) >= 0) {start += 1;}
  while (chars.indexOf(x[end  ]) >= 0) {end   -= 1;}
  return x.substr(start, end - start + 1);
}
String.prototype.strip = function (chars) { return strip(this, chars); };
function joinsep(sep,...strings) { // join non-empty strings with a separator
  return Array.prototype.slice.call(strings).filter(Boolean).join(sep);
}
function sortAZ(str) { return [...str].sort((a, b) => a.localeCompare(b)).join(''); }
String.prototype.sort = function () { return sortAZ(this); };

const modi_list         	= ['⇧','⎈','⎇']; // add ◆ when it's supported
const mode_list         	= ['☰␜','☰⟪','🌐','☰®','⧛ℂ','ℂ⧚','⧛☰','☰⧛'];
// const keyCapLblIDs   	= range(0, 8)  	; // top 9 key labels only
const keyCapLblIDs      	= [0,  2,4,6,8]	; // but we only need corners + center
const keyCapLblIDs_ins  	= [0,1,2,4,6,8]	; // and sometimes top
const keyCapLblIDs_sp   	= [0,  2,4,6,8]	;
const keyCapLblIDs_unimp	= [0,  2,  6,8]	;
const modifew_modes_pre 	= '#keyboard.modifew-';
const modifew_modes     	= ['m1NOR','m2INS','m3SEL','nGoTo','nMatch','nSpace','nUnimpaired','nView','nWindow','nHelp'];
const lbl_modi          	= new Map([[0,'⇧'],          [2,'⎇⇧'],[4,'⎈'],[6,''],[8,'⎇']]); // maps key label ID to a modifier it represents
const lbl_modi_ins      	= new Map([[0,'⇧'],[1,'⎈⇧'],[2,'⎇⇧'],[4,'⎈'],[6,''],[8,'⎇']]);
const lbl_modi_sp       	= new Map([[0,'☰␜'],         [2,'☰⟪'],[4,'🌐'],[6,''],[8,'☰®']]); // to a submode...
const lbl_modi_unimp    	= new Map([[0,'⧛ℂ'],         [2,'ℂ⧚'],          [6,'⧛☰'],[8,'☰⧛']]);
function lbl_modi_n(n)  	{
  return                	 new Map([[n,'']]);}
const modifew_mode_sym = {
  'm1NOR'      	: {'icon':'Ⓝ'  	, 'path':'keys.normal'      	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
  'm2INS'      	: {'icon':'ⓘ'  	, 'path':'keys.insert'      	, 'modi':lbl_modi_ins  	, 'id':keyCapLblIDs_ins},
  'm3SEL'      	: {'icon':'Ⓢ'  	, 'path':'keys.select'      	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
  'nGoTo'      	: {'icon':'☰⮊' 	, 'path':'keys.normal.g'    	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
  'nMatch'     	: {'icon':'☰🧩' 	, 'path':'keys.normal.n'    	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
  'nSpace'     	: {'icon':'☰␠' 	, 'path':'keys.normal.space'	, 'modi':lbl_modi_sp   	, 'id':keyCapLblIDs_sp},
  'nUnimpaired'	: {'icon':'⧛☰⧚'	, 'path':'keys.normal.['    	, 'modi':lbl_modi_unimp	, 'id':keyCapLblIDs_unimp},
  'nView'      	: {'icon':'☰👁' 	, 'path':'keys.normal.p'    	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
  'nWindow'    	: {'icon':'☰🗔' 	, 'path':'keys.normal.C-w'  	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
  'nHelp'      	: {'icon':'☰?' 	, 'path':'keys.normal.F1'   	, 'modi':lbl_modi      	, 'id':keyCapLblIDs},
};
const modifew_mode_sub_sym = {
  'nSpace':{
    'File'    	: {'icon':'☰␜'	, 'path':'keys.normal.space.f'	, 'modi':lbl_modi_n(0)	, 'id':[0]},
    'Bracket' 	: {'icon':'☰⟪'	, 'path':'keys.normal.space.d'	, 'modi':lbl_modi_n(2)	, 'id':[2]},
    'LSP'     	: {'icon':'🌐' 	, 'path':'keys.normal.space.u'	, 'modi':lbl_modi_n(4)	, 'id':[4]},
    'Register'	: {'icon':'☰®'	, 'path':'keys.normal.space.r'	, 'modi':lbl_modi_n(8)	, 'id':[8]},
  },
  'nUnimpaired':{
    'ConfigON'   	: {'icon':'⧛ℂ'	, 'path':'keys.normal.[.c'	, 'modi':lbl_modi_n(0)	, 'id':[0]},
    'ConfigOFF'  	: {'icon':'ℂ⧚'	, 'path':'keys.normal.].c'	, 'modi':lbl_modi_n(2)	, 'id':[2]},
    'UnimpairedL'	: {'icon':'⧛☰'	, 'path':'keys.normal.['  	, 'modi':lbl_modi_n(6)	, 'id':[6]},
    'UnimpairedR'	: {'icon':'☰⧚'	, 'path':'keys.normal.]'  	, 'modi':lbl_modi_n(8)	, 'id':[8]},
  }
};
const keylabel_path	= '#keyboard-bg .key .keycap .keylabels .keylabel';
const key_lbl_class	= 'keylabel10';

function getNestedPath(xpth, map){
  const pth = xpth.split('.');
  return pth.reduce((a, b) => a[b], map);
}
function getModeKeys(mode, mode_sym = modifew_mode_sym, prefixNm = ''){
  const path2icon	= mode + '.icon';
  const path2path	= mode + '.path';
  const path2modi	= mode + '.modi';
  const path2id  	= mode + '.id';
  const path2keys	= getNestedPath(path2path,mode_sym);
  const keys     	= getNestedPath(path2keys,modifew);
  const icon     	= getNestedPath(path2icon,mode_sym);
  const modis    	= getNestedPath(path2modi,mode_sym);
  const ids      	= getNestedPath(path2id,mode_sym);
  let chord;
  if (prefixNm) { //
    const prefixNm_mirr = prefixNm.replace('[',']'); // fix for unimpaired having two [] keys
    chord	= path2keys.replace(prefixNm,'').replace(prefixNm_mirr,'').strip('.');
  } else {
    chord	= '';
  }
  return [keys,icon,modis,ids, chord];
}

const keySymbLblMod	= new Map([['⎈','C-'], ['⎇','A-'], ['⇧','S-']]);
const keySymbLbl   	= new Map([['⏎','ret'],['↩','ret'],
  ['␠','space'],['␣','space'],
  ['⌦','del'],['␡','del'],
  ['␈','backspace'],['⌫','backspace'],
  ['▼','down'],['▲','up'],['◀','left'],['▶','right'],
  ['⇟','pagedown'],['⇞','pageup'],
  ['⇤','home'],['⭰','home'],['⤒','home'],['⇱','home'],['↖','home'],
  ['⭲','end'],['⇥','end'],['⤓','end'],['⇲','end'],['↘','end'],
]);


function keyLblToSymbMod(key_user) { // replace key modifiers with symbols A-A → ⎇⇧a
  keySymbLblMod.forEach((v, k) => { // replace with symbols
    const reV = RegExp(v, 'i');
    if (reV.test(key_user)) {
      key_user = key_user.replace(reV,k);}
  });
  const reLastChar	= new RegExp('(?<![a-z])(.)$', 'i');
  if (reLastChar.test(key_user)) {
    const lastChar = key_user.match(reLastChar)[1];
    if (getCaseLyt(lastChar,'qwerty') === Case.U) { // replace caps
      key_user = key_user.replace(reLastChar,'⇧'+convertCaseLyt(lastChar, 'qwerty', Case.l));
    }
  }
  // key_user = key_user.replace(/([A-Z])/,'⇧$1').toLowerCase();

  return key_user;
}
function keySymbToLbl(key_symb) { // ⏎ to ret (keySymbLbl = ['⏎','ret']
  keySymbLblMod.forEach((v, k) => {
    const reK = RegExp(k, 'i');
    if (reK.test(key_symb)) {key_symb = key_symb.replace(reK,v);} });
  keySymbLbl.forEach((v, k) => {
    const reK = RegExp(k+'$', 'i');
    if (reK.test(key_symb)) {key_symb = key_symb.replace(reK,v);} });
  return key_symb;
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
function isValidLblPos(el, validPos) {
  let retVal = false;
  validPos.map(pos_id => {
    const key_lbl_class = `keylabel${pos_id}`;
    if (el.classList.contains(key_lbl_class)) {
      retVal = true ; } });
  return retVal;
}
let getSiblingKeyCaps = function (e, ids) { // get only valid sibling keycap elements
  let siblings = [];
  if(!e.parentNode) { return siblings; }
  let sibling  = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e &&
        (sibling.innerText || sibling.innerHTML) && // keycap label exists...
        isValidLblPos(sibling, ids) ) { // ... and is one of the valid label positions
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
function getKeyCombo(k_in, keymap, lbl_modis=lbl_modi, chord='') { // for 'b' at each label id: {'0'=>{…},...
  // from {B:..lower, A-tab:move, C-b:...upper, b:no_op} to
  // get ⇧=>...lower,             ⎈=>...upper ''=>no_op
  const k = keySymbToLbl(k_in).toLowerCase();
  const K = convertCaseLyt(k, 'qwerty', Case.U) || k; // test match for > when .
  let key_fmt, cmd;
  let keyCombo = new Map();
  function setKeyComboItem(modi,lbl_id) {
    if (key_fmt.sort() === lbl_modis.get(lbl_id).sort()) {
      keyCombo.set(lbl_id,{'modi':key_fmt, 'cmd':cmd, 'chord':chord});
    }
  }
  const reLastk	= reLastLetter(k);
  const reLastK	= reLastLetter(K);
  for (const key_from in keymap) {
    if (reLastk.test(key_from) || reLastK.test(key_from)) { // match either > or .
      key_fmt	= keyLblToSymbMod(key_from).replace(reLastk,'');
      cmd    	= keymap[key_from];
      lbl_modis.forEach(setKeyComboItem);
    }
  }
  return keyCombo;
}

const reLblClass = new RegExp(String.raw`keylabel(\d{1,2})`);

// Add tooltip scaffolding
const delayShow        	= 500          	; // show tooltip after this ms has passed     hovering
const delayHide        	= 500          	; // hide tooltip after this ms has passed not hovering
const timerIdMap       	= new WeakMap()	; // store keycap tooltip timers
const table_header     	= ['m','o','d','Key','Sym','Command'];
const ttKeyColI        	= table_header.indexOf('Key');
const ttBox            	= document.createElement("div");
 ttBox.id              	= "keycap_tooltip_modi_cmd";
 ttBox.style.visibility	= "hidden"; // hide till mouse over
document.body.appendChild(ttBox);

const tooltip_1 = ((evt, elAttached) => {
  const type         	= evt.type;
  // const elAttached	= evt.currentTarget	; // el to which the event handler has been attached
  const elOccured    	= evt.target       	; // el on which the event occurred and which may be its descendant
  const boundBox     	= elOccured.getBoundingClientRect(); // get hover element position
  const X            	= boundBox.right;
  const Y            	= boundBox.bottom;
  ttBox.style.left   	= `${X + 5}px`; // move tooltip to the hover element
  ttBox.style.top    	= `${Y + 5}px`;
  const ttt          	= elAttached.ttt;
  const lbl          	= elAttached.lbl;
  const cLytLbl      	= elAttached.cLytLbl;
  const tr           	= ttt.getElementsByClassName('styled-table')[0].rows;
  if (cLytLbl !== gLyt.lbl) { // layout changed
    Array.from(tr).forEach(function(row,i) {
      if (i === 0) { return; } // skip table header
      row.cells[ttKeyColI].innerHTML = convert(lbl,'qwerty',lyt[gLyt.lbl]);
      evt.currentTarget.cLytLbl = gLyt.lbl;
    });
  }
  ttBox.innerHTML	= ttt.innerHTML;
  ttBox.style.visibility = "visible";
});
const tooltip_0 = (() => {ttBox.style.visibility = "hidden"; });
function getMouseEventHandler(evtHandler, delay) {
  return (evt) => { // ({target: el})
    const elOccured 	= evt.target;
    const elAttached	= evt.currentTarget; //currentTarget is only available while the event is being handled, so if we pass evt, it won't be available downstream
    let timerId = timerIdMap.get(elOccured) ?? 0;
    clearTimeout(timerId);
    timerId = setTimeout(() => evtHandler(evt, elAttached), delay);
    timerIdMap.set(elOccured, timerId);
  };
}
const ttShowDelay	= getMouseEventHandler(tooltip_1, delayShow); //showTooltip
const ttHideDelay	= getMouseEventHandler(tooltip_0, delayHide); //hideTooltip
const ttHide     	= getMouseEventHandler(tooltip_0, 0);

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

function storeKeyCap(keylbl, keyCaps) {
  let keyCapSym =       new Map() ;
  keyCapSym.set(keylbl, new Map());
  keyCaps.map(x => {
    let lbl_cls;
    x.classList.forEach(xcl => {
      if (reLblClass.test(xcl)) {
        lbl_cls = parseInt(xcl.match(reLblClass)[1]); } // get label ID from class name (6 from keylabel6)
    });
    if        (x.innerText) { keyCapSym.get(keylbl).set(lbl_cls,x.innerText);
    } else if (x.innerHTML) { keyCapSym.get(keylbl).set(lbl_cls,'�'       );}
  });
  return keyCapSym;
}
function mergeSubmodes(m, keylbl) {
  let keyCombos = new Map();
  const subModes = modifew_mode_sub_sym[m];
  for (const [subNm, subMode] of Object.entries(subModes)) {
    const path2path	= m +'.'+ 'path';
    const prefix = getNestedPath(path2path,modifew_mode_sym);
    const [keymap, mIcon, lbl_modis, capIDs, chord] = getModeKeys(subNm, subModes, prefix);
    const keyCombo = getKeyCombo(keylbl, keymap, lbl_modis, chord);
    keyCombos = new Map([...keyCombos, ...keyCombo]);
  }
  return keyCombos;
}
modifew_modes.map(m => {
  const mode = modifew_modes_pre + m;
  // pt('mode=¦'+mode+'¦');
  document.querySelectorAll(mode+' '+keylabel_path  + '.'+key_lbl_class).forEach((el, ind, listObj) => {
    const keyLbl	= el.innerText.trim();
    if (keyLbl && keyLbl !== 'mods') { // now that we know key label, store all cap symbols for this key
      const [keymap, mIcon, lbl_modis, capIDs, chord] = getModeKeys(m);
      const cLytLbl  	= gLyt.lbl                     	; // reads layout only at page LOAD
      const keylbl   	= keyLbl[0].toLowerCase()      	; // take only the 1st label (number keys have duplicate 1!)
      const keyCaps  	= getSiblingKeyCaps(el, capIDs)	; // get all keycaps with valid labels in valid positions
      const keyCapSym	= storeKeyCap(keylbl, keyCaps) 	; // store all valid keycap symbols
      const keyComboM	= getKeyCombo(keylbl, keymap, lbl_modis, chord); // {0:'⇧'=>'switch_to_lowercase'>..}

      let keyCombo;
      if (m in modifew_mode_sub_sym) { // add submodes in place of modifiers
        const keyCombos_sub = mergeSubmodes(m, keylbl);
        keyCombo = new Map([...keyComboM, ...keyCombos_sub]);
      } else {
        keyCombo = keyComboM;
      }

      // Generate tooltip table
      let tt_div  	= document.createElement('div');
      let tt_table	= document.createElement('table');
      tt_table.classList.add('styled-table');
      const tooltip_header	= `${mIcon} ${keyLbl}`;
      tt_div.innerHTML    	= tooltip_header;
      tt_div.appendChild(tt_table);
      setTableHead(tt_table, table_header);
      let showTT	= false; // hide empty tooltips (header without rows)
      capIDs.map(lbl_id => {
        if (!keyCombo.has(lbl_id)) { return; } // break sequence as no combos for this label
        const key_mod_cmd	 = keyCombo.get(lbl_id);
        const key_mod    	 = key_mod_cmd.modi;
        const key_cmd    	 = key_mod_cmd.cmd;
        const key_chord  	 = key_mod_cmd.chord;
        if (key_cmd      	=== 'no_op') { return; } // break sequence if an empty command
        const key_lbl    	 = convert(keylbl,'qwerty',lyt[cLytLbl]);
        const key_sym    	 = keyCapSym.get(keylbl).get(lbl_id) || '';
        if (key_cmd && key_sym) {
          showTT      	= true; // tooltip not empty, show
          let row     	= tt_table.insertRow();
          let row_data	= [];
          if (key_mod) { modi_list.map(mod => {
            if (key_mod.includes(mod))	{ row_data.push(mod);
            } else                    	{ row_data.push('' ); } });
          } else                      	{
            const modeSym = lbl_modis.get(lbl_id);
            if (modeSym)	{ row_data.push(modeSym);
            } else      	{ row_data.push(''  );}
            row_data.push('');
            if (key_chord)	{ row_data.push(key_chord);
            } else        	{ row_data.push(''  );}
          }
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
      if (!showTT) {return;}
      const keycap  	= el.closest(".keylabels"); // find the labels group
      keycap.ttt    	= tt_div 	; // tooltip table div
      keycap.lbl    	= keylbl 	; // add lbl/cLytLbl to allow ↓ callbacks to use it
      keycap.cLytLbl	= cLytLbl	; // current layout
      // add tooltip listeners (once)
      timerIdMap.set(keycap         	, 0          	       ); // store timer
      addEvtLis(keycap, 'mouseenter'	, ttShowDelay	, false); // show tooltip
      addEvtLis(keycap, 'mouseleave'	, ttHideDelay	, false); // hide
      addEvtLis(keycap, 'click'     	, ttHide     	, false); // disable on click
      }
    });
  });
};
