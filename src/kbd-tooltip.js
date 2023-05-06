import { gLyt, lyt, Case 	,
  convert, convertCaseLyt	,
  getCaseLyt }           	from "./layout-convert.js";
import modifew           	from "../static/config/modifew.toml";
// import modifew        	from 'https://raw.githubusercontent.com/eugenesvk/kbdHelix/modifew/config/modifew.toml';
import Bowser            	from "bowser";
import * as std          	from './std.js';
std.extendProtos();

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
let isMobile = false;
const browser = Bowser.getParser(window.navigator.userAgent);
const isOld_iPhone    = browser.satisfies({mobile :{safari:'<=10'  }});
const isOld_IObserver = browser.satisfies({mobile :{safari:'<=12.0'}} // seems to work on 12.1 despite caniuse?
  ,                                       {desktop:{safari:'<=12.0',chrome:'<=57'}});
const isOld_LookBehind= browser.satisfies({mobile :{safari:'<=16.3'}}
  ,                                       {desktop:{safari:'<=16.3',chrome:'<=61'}});

if (/Android|iPhone/i.test(navigator.userAgent)) { isMobile = true; }
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
const modifew_modes_pre 	= 'modifew-';
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
const keylabel_path	= '.keyboard-bg .key .keycap .keylabels .keylabel';
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


function reLastChar() { // get the regex that matches last char, but not word
  const rePattern = std.regexp`
    ([a-z])?	【?<lookbehind> matches 'tab' for 'b', so ignore the next match】
    (.)     	【?<lastchar>】
    $`;
  return new RegExp(rePattern,'i');
}
function keyLblToSymbMod(key_user) { // replace key modifiers with symbols A-A → ⎇⇧a
  keySymbLblMod.forEach((v, k) => { // replace with symbols
    const reV = RegExp(v, 'i');
    if (reV.test(key_user)) {
      key_user = key_user.replace(reV,k);}
  });
  const reLastCh	= reLastChar();
  const matchCh 	= key_user.match(reLastCh);
  if (matchCh) {
    // const gch  	= matchCh.groups;
    const gch_pre 	= matchCh[1]; //gch.lookbehind;
    const gch_last	= matchCh[2]; //gch.lastchar;
    // if (( gch ) && // match last char
    if (gch_pre === undefined) { // but only if it's not part of a word
      if (getCaseLyt(gch_last,'qwerty') === Case.U) { // replace caps
        key_user = key_user.replace(reLastCh,'⇧'+convertCaseLyt(gch_last, 'qwerty', Case.l));
      }
    }
  }

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
// document.querySelectorAll('.keyboard .keyboard-bg .keylabels .keylabel10').forEach((el, ind, listObj) => {
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

const p 	= std.p 	; // helper console log
const pp	= std.pp	; // helper print var names, must be passed as {objects}
const pt	= std.pt	; // helper print var's type and var's value

function reLastLetter(letter) { // get the regex that matches 'b' but not 'tab' for 'b' or 'B'
  const rePattern = std.regexp`
    ([a-z])?              	【?<lookbehind> matches 'tab' for 'b', so ignore the next match】
    (${std.escRe(letter)})	【?<lastchar>】
    $`;
  return new RegExp(rePattern,'i');
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
    const matchk	= key_from.match(reLastk);
    const matchK	= key_from.match(reLastk);
    let [gk,gK,gk_pre,gK_pre,gk_last,gK_last,] = [null,null,null,null,null,null];
    if (matchk)	{
      // gk    	= matchk.groups;
      gk_pre   	= matchk[1];// gk.lookbehind;
      gk_last  	= matchk[2];// gk.lastchar;
    }          	//
    if (matchK)	{
      // gK    	= matchK.groups;
      gK_pre   	= matchK[1]; //gK.lookbehind;
      gK_last  	= matchK[2]; //gK.lastchar;
    }          	//
    // if (( gk                   ||  gK   ) && // match either . or >
    if ((matchk || matchK) && // match either . or >
        (gk_pre === undefined) && (gK_pre === undefined) ){ // but only if they're not part of a word
      key_fmt	= keyLblToSymbMod(key_from).replace(reLastk,''); // and replace . (labels don't have >)
      cmd    	= keymap[key_from];
      lbl_modis.forEach(setKeyComboItem);
    }
  }
  return keyCombo;
}

const reLblClass = new RegExp(String.raw`keylabel(\d{1,2})`);

// Add tooltip scaffolding
let delayShow, delayHide;
if (isMobile)     	{
  delayShow       	= 0	; // show tooltip right away, there is no hovering
  delayHide       	= 0	; //
} else            	{
  delayShow       	= 500	; // show tooltip after this ms has passed     hovering
  delayHide       	= 300	; // hide tooltip after this ms has passed not hovering
}                 	//
const timerIdMap  	= new WeakMap()	; // store keycap tooltip timers
const table_header	= ['m','o','d','K⃣','Sym','Command'];
const ttKeyColI   	= table_header.indexOf('K⃣');

function hideAllTooltips() {
  document.querySelectorAll(".keycap_tooltip_modi_cmd").forEach((el, ind, listObj) => {
    el.style.display = 'none';
  });
}
function tooltipToggle(el) { // accepts keycap elements
  const ttBox	= el.querySelector(".keycap_tooltip_modi_cmd");
  const currentStyle = ttBox.style.display;
  if       	(currentStyle === 'block') { tooltip_0(el);
  } else if	(currentStyle === 'none' ) { tooltip_1(el, 'key');
  } else if	(currentStyle === ''     ) { tooltip_1(el, 'key');}
}
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top   	>= 0                                                       	&&
    rect.left  	>= 0                                                       	&&
    rect.bottom	<= (window.innerHeight || document.documentel.clientHeight)	&&
    rect.right 	<= (window.innerWidth  || document.documentel.clientWidth)
  );
}
if (isMobile) { // phones don't auto hide tooltips, so hide previous tooltips on any click
  document.addEventListener("touchstart", function(evt) {
    const elOccured = evt.target;
    let inKeyboard = false;
    document.querySelectorAll(".keyboard").forEach((el, ind, listObj) => {
      if (el.contains(elOccured)) {inKeyboard = true; }
    });
    if (inKeyboard === false ) { hideAllTooltips(); }
  },{capture:false,passive:true});
} else { // and non-phones can use keyboard to toggle tooltips
  document.addEventListener("keydown", (evt) => {
    if (evt.isComposing || evt.keyCode === 229 || evt.repeat) { hideAllTooltips(); return; }
    const key_phys = evt.code;
    const esc = ['Escape','Space'];
    esc.map(esck => { if (key_phys === esck) { hideAllTooltips(); return; } });
    const key_log = evt.key;
    if (evt.shiftKey) {
      const k = convertCaseLyt(key_log, lyt[gLyt.lbl], Case.l);
      for (const mode of modifew_modes) {
        const modeTTs = tooltips.get(mode);
        if (modeTTs.has(k)) {
          const elTT = modeTTs.get(k);
          if (isInViewport(elTT))	{ tooltipToggle(elTT); break;
          } else                 	{                      continue; }
        }
      }
    }
  });
}

let timeTouchBeg = new Date();
function isTouchTap(dur=0.2) {
  const timeTouchEnd = new Date();
  const ms = 1000;
  const timeTouchDiff = (timeTouchEnd - timeTouchBeg) / ms;
  if (timeTouchDiff < dur) {return true;} else {return false;}
}
const tooltip_1 = ((el, type='click') => {
  if (isMobile || type==='key') { // phones/keyboards don't auto hide tooltips, so hide previous tooltips
    hideAllTooltips();
  }
  if (isMobile) {
    const isTap = isTouchTap(0.2);
    if (!isTap) {return;} // only trigger on taps, not scrolls
  }
  const ttBox       	= el.querySelector(".keycap_tooltip_modi_cmd");
  const boundBox    	= el.getBoundingClientRect(); // get hover element position
  const X           	= boundBox.right;
  const Y           	= boundBox.bottom;
  if (isMobile)     	{
    ttBox.style.left	= `0px`; // move tooltip to the hover, but don't waste space to the left
  } else            	{
    ttBox.style.left	= `${X + 5}px`; // move tooltip to the hover element
  }                 	//
  ttBox.style.top   	= `${Y + 5}px`;
  const tr          	= ttBox.getElementsByClassName('styled-table')[0].rows;
  const hd_lbl      	= ttBox.getElementsByClassName('styled-table-header-label')[0];
  if (ttBox.curLytLbl !== gLyt.lbl) { // layout changed, convert table elements
    hd_lbl.innerHTML = convert(ttBox.keyLbl,'qwerty',lyt[gLyt.lbl]);
    Array.from(tr).forEach(function(row,i) {
      if (i === 0) { return; } // skip table header
      row.cells[ttKeyColI].innerHTML = convert(ttBox.keylbl,'qwerty',lyt[gLyt.lbl]);
      ttBox.curLytLbl = gLyt.lbl;
    });
  }
  ttBox.style.display = 'block';
});
const tooltip_0 = ((el) => {
  const ttBox = el.querySelector(".keycap_tooltip_modi_cmd");
  ttBox.style.display = 'none';
});
function getMouseEventHandler(evtHandler, delay) {
  return (evt) => { // ({target: el})
    const elAttached	= evt.currentTarget	; // el to which the event handler has been attached; currentTarget  only available while the event is being handled, so if we pass evt, it won't be available downstream
    const elOccured 	= evt.target       	; // el on which the event occurred and which may be its descendant
    let timerId = timerIdMap.get(elOccured) ?? 0;
    clearTimeout(timerId);
    timerId = setTimeout(()=>evtHandler(elAttached), delay);
    timerIdMap.set(elOccured, timerId);
  };
}
const ttShowDelay	= getMouseEventHandler(tooltip_1, delayShow);
const ttHideDelay	= getMouseEventHandler(tooltip_0, delayHide);
const ttHide     	= getMouseEventHandler(tooltip_0, 0);
function hTouchBeg(evt) {
  timeTouchBeg = new Date();
}

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

const ttBox         	= document.createElement("div");
 ttBox.id           	= "useragent";
 ttBox.style.display	= "block"; // hide till mouse over
 ttBox.style.left   	= `20px`; // move tooltip to the hover element
 ttBox.style.top    	= `20px`;
 ttBox.style.width  	= `100px`;
 ttBox.style.height 	= `100px`;
 ttBox.style.color  	= `red`;
 // ttBox.innerText 	= navigator.userAgent
 // ttBox.innerHTML 	= `<div>asflkjsal;fjsfl;</div>`
 ttBox.style.color  	= `red`;
document.body.appendChild(ttBox);

const tooltips = new Map(); // store all toolip divs here in a mode sub-map

function addToolips_Keycap(m, el) {
  const mode = '#'+modifew_modes_pre + m;
  const keyLbl	= el.innerText.trim();
  if (keyLbl && keyLbl !== 'mods') { // now that we know key label, store all cap symbols for this key
    const [keymap, mIcon, lbl_modis, capIDs, chord] = getModeKeys(m);
    const curLytLbl	= gLyt.lbl                     	; // reads layout only at page LOAD
    const keylbl   	= keyLbl[0].toLowerCase()      	; // take only the 1st label (number keys have duplicate 1!)
    const keyCaps  	= getSiblingKeyCaps(el, capIDs)	; // get all keycaps with valid labels in valid positions
    const keyCapSym	= storeKeyCap(keylbl, keyCaps) 	; // store all valid keycap symbols
    const keyComboM	= getKeyCombo(keylbl, keymap, lbl_modis, chord); // {0:'⇧'=>'switch_to_lowercase'>..}
    // if (keyCaps.length === 0) { // hide keycaps with no keylabels
      // if(el.parentNode && el.parentNode.parentNode) { el.parentNode.parentNode.style.display = 'none'; return;}}

    let keyCombo;
    if (m in modifew_mode_sub_sym) { // add submodes in place of modifiers
      const keyCombos_sub = mergeSubmodes(m, keylbl);
      keyCombo = new Map([...keyComboM, ...keyCombos_sub]);
    } else {
      keyCombo = keyComboM;
    }

    // Generate tooltip table
    let tt_div    	= document.createElement('div');
    let tt_headIcn	= document.createElement('span');
    let tt_headLbl	= document.createElement('span');
    let tt_table  	= document.createElement('table');
    tt_headIcn.classList.add('styled-table-header-icon');
    tt_headLbl.classList.add('styled-table-header-label');
    tt_table .classList.add('styled-table');
    tt_headIcn.innerHTML	= mIcon + ' ';
    tt_headLbl.innerHTML	= keyLbl;
    tt_div.appendChild(tt_headIcn);
    tt_div.appendChild(tt_headLbl);
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
      const key_lbl    	 = convert(keylbl,'qwerty',lyt[curLytLbl]);
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
    const keycap         	= el.closest(".keylabels"); // find the labels group
    const ttBox          	= document.createElement("div")	; // create tooltip box
     // ttBox.id         	= `tt:${mode}:${keyLbl}`       	;
     ttBox.classList.add(	'keycap_tooltip_modi_cmd')     	;
     ttBox.innerHTML     	= tt_div.innerHTML             	; // make tooltip show our table
     ttBox.keyLbl        	= keyLbl                       	; // add label/layout data to allow dynamic changes
     ttBox.keylbl        	= keylbl                       	; //
     ttBox.curLytLbl     	= curLytLbl                    	; //
    keycap.appendChild(  	  ttBox)                       	; // add tooltip to the keycap
    tooltips.get(m)      	.set(keylbl, keycap)           	; // add keycap to global map to toggle with keyboard
    // add tooltip listeners (once)
    timerIdMap.set(keycap           	, 0          	       ); // store timer
    if (isMobile)                   	{            	// permashow on a phone unless toched elsewhere
      addEvtLis(keycap, 'touchstart'	, hTouchBeg  	, {capture:false,passive:true}); // show tooltip
      addEvtLis(keycap, 'touchend'  	, ttShowDelay	, {capture:false,passive:true}); // show tooltip
    } else                          	{            	//
      addEvtLis(keycap, 'mouseenter'	, ttShowDelay	, false); // show tooltip
      addEvtLis(keycap, 'mouseleave'	, ttHideDelay	, false); // hide
      addEvtLis(keycap, 'click'     	, ttHide     	, false); // disable on click
    }
  }
}
function addTooltips_Keymap(keymap) {
  const keymap_id	= keymap.id;
  const m        	= keymap_id.replace(modifew_modes_pre,'');
  document.querySelectorAll('#'+keymap_id+' '+keylabel_path  + '.'+key_lbl_class).forEach((el, ind, listObj) => {
    addToolips_Keycap(m, el);
    });
}

if (isOld_IObserver) { // old devices without observer, add keymap right away
  modifew_modes.map(mode => {                  	// m1NOR m2INS m3SEL...
    const keymap_id = modifew_modes_pre + mode;	// modifew-m1NOR
    tooltips.set(mode, new Map());
    const keymap = document.getElementById(keymap_id);
    if (keymap) { addTooltips_Keymap(keymap) }
    });
} else { // add keymap only after the keyboard is visible
  const obsAddToolips = (changes, observer) => {
    changes.forEach(change => {
      const target = change.target;
      if ((change.intersectionRatio > 0)) {
        addTooltips_Keymap(target);
        observer.unobserve(target)
      }
    })
  }
  const observerCfg = {
    root      	: null,
    rootMargin	: "0%",
    threshold 	: 0.1 // fire when 10% of the keymap is visible
  }
  const observer = new IntersectionObserver(obsAddToolips, observerCfg)

  modifew_modes.map(mode => {                  	// m1NOR m2INS m3SEL...
    const keymap_id = modifew_modes_pre + mode;	// modifew-m1NOR
    tooltips.set(mode, new Map());
    const keymap = document.getElementById(keymap_id);
    if (keymap) { observer.observe(keymap) }
    });
  }
};
