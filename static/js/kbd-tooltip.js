import { convert, gLyt, lyt } from "/js/layout-convert.js";
window.onload=function(){ // optional since it depends on the way in which you fire events
const range = (start, stop, step=1) => Array.from(
  {length: (stop - start) / step + 1},
  (_, i) => start + (i * step));

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

// const key_cap_id = range(0, 8); // top 9 key labels only
const key_cap_id = [0,2,4,6,8]; // but we only need corners + center
const modifew_modes_pre	= '#keyboard.modifew-'
const modifew_modes    	= ['m1NOR','m2INS','m3SEL','nGoTo','nMatch','nSpace','nUnimpaired','nView','nWindow','nHelp']
const modifew_mode_sym 	= new Map(Object.entries({'m1NOR':'Ⓝ','m2INS':'ⓘ','m3SEL':'Ⓢ'
  ,                    	  'nGoTo':'☰⮊' ,'nMatch':'☰🧩' ,'nSpace':'☰␠','nUnimpaired':''
  ,                    	  'nView':'☰👁','nWindow':'☰🗔','nHelp':'☰?'}))
const keylabel_path    	= '#keyboard-bg .key .keycap .keylabels .keylabel'
const key_lbl_class    	= 'keylabel10'

const key_modi = new Map(Object.entries({0:'⇧',2:'⇧⎇',4:'⎈',6:'',8:'⎇'}));
// console.log(key_modi.get('0'));
const keytest = new Map();
keytest.set('b', new Map(Object.entries({0:'⇧b',2:'⇧⎇b',4:'b4',6:'b6',8:'b8'})));
// console.log(keytest.get('b'));
const key_cap_sym = new Map();
if (key_cap_sym.has('a')) {
  console.log('not')
};

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
      if (i === 0) { return; };
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
};
//
modifew_modes.map(m => {
  const mode = modifew_modes_pre + m;
  // console.log('mode=¦',m,'¦'); //dbg
  key_cap_id.map(lbl_id => { // register hovers for the top 9 key labels only
    const lbl_id_s = lbl_id.toString();
    document.querySelectorAll(mode+' '+keylabel_path  + '.keylabel'+lbl_id_s).forEach((el, ind, listObj) => {
      const thisLbl 	= el.innerText;
      const siblings	= getSiblings(el);
      let keyLbl    	= '';
      siblings.map(x => { // find a key label
        if (x.classList.contains(key_lbl_class)) { keyLbl = x.innerText; } })
      if (keyLbl){        // now that we know key label, store all cap symbols for this key
        const keylbl = keyLbl[0].toLowerCase(); // take only the first label (number keys have duplicate 1!)
        if (key_cap_sym.has(keylbl)) { // avoid looping for cap symbols if we already have them
        } else {
          key_cap_sym.set(keylbl, new Map());
          const el_all = siblings.concat(el);
          el_all.map(x => {
            let lbl_cls	= '';
            x.classList.forEach(xcl => {
              if (reLblClass.test(xcl)) {
                lbl_cls = xcl.match(reLblClass)[1] };
            });
            key_cap_sym.get(keylbl).set(lbl_cls,x.innerText);
          });
          // console.log('stored keymap for',keylbl,'¦=¦',key_cap_sym.get(keylbl));
        };
        // Generate tooltip table
        let tt_div  	= document.createElement('div');
        let tt_table	= document.createElement('table');
        tt_table.classList.add('styled-table');
        tt_div.appendChild(tt_table);
        const tooltip_header	= `${modifew_mode_sym.get(m)} ${keyLbl}`
        const table_header  	= ['m','o','d','Key','Sym','Command']
        setTableHead(tt_table, table_header)
        let tooltip_text	= tooltip_header;
        const cLytLbl   	= gLyt.lbl;  // reads layout only at page load
        key_cap_id.map(lbl_id => {
          const lbl_id_s   	 = lbl_id.toString();
          const key_mod    	 = key_modi.get(lbl_id_s);
          const key_lbl    	 = convert(keylbl,'qwerty',lyt[cLytLbl]);
          const key_sym    	 = key_cap_sym.get(keylbl).get(lbl_id_s) || '';
          const key_command	 = keytest.get(    keylbl).get(lbl_id_s);
          if (key_command) {
            let row     	= tt_table.insertRow();
            let row_data	= []
            modi_list.map(mod => {
              if (key_mod.includes(mod))	{ row_data.push(mod);
              } else                    	{ row_data.push(''); }; });
            row_data.push(key_lbl);
            row_data.push(key_sym);
            row_data.push(key_command);
            row_data.map(c	=> {
              let cell = row.insertCell();
              let txt = document.createTextNode(c);
              cell.appendChild(txt);
            });
          };
        });

        // add tooltip listeners
        el.ttt                         	= tt_div           	; //
        el.lbl                         	= keylbl           	; // add lbl/cLytLbl to allow ↓ callbacks to use it
        el.cLytLbl                     	= cLytLbl             	; // current layout
        el.addEventListener("mouseover"	, tooltip_1, false)	; // show tooltip
        el.addEventListener("mouseout" 	, tooltip_0, false)	; // hide
        el.addEventListener("click"    	, tooltip_0, false)	; // disable on click
      };
    }, "myThisArgOut");
  });
});
}
