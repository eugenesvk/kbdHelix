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

  let div = document.createElement('table');
  div.innerHTML = ttt;
  const x	= div.getElementsByClassName('styled-table'); //.rows;
  console.log('type=¦',typeof(x), x);
  console.log('type=¦',typeof(ttt), ttt);
  // Array.from(x).forEach(function(row) {
    // const cell_val = row.cells[3].innerHTML;
    // row.cells[3].innerHTML = '××';
    // console.log('cell_val=¦',convert(cell_val,'qwerty',lyt[gLyt.lbl]),'¦')
  // });
  // ttBox.innerHTML	= div.innerHTML;
  ttBox.innerHTML   	= ttt;
  ttBox.style.visibility = "visible"; });
const tooltip_0 = (() => {
  ttBox.style.visibility = "hidden" ; });
const modi_list = ['⇧','⎈','⎇']; // add ◆ when it's supported
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
        // Generate tooltip text
        let tt_div          	= document.createElement('div');
        let tt_table        	= document.createElement('table');
        const tooltip_header	= `${modifew_mode_sym.get(m)} ${keyLbl}`
        const columns       	= ['m','o','d','Key','Sym','Command']
        let table_header    	= '<table class="styled-table"><thead><tr>'
          columns.map(col   	=> {
            table_header    	+= `<th>${col}</th>`});
        table_header        	+= '</tr></thead><tbody>'
        const table_footer  	= `</tbody></table>`
        let tooltip_text    	= tooltip_header + table_header;
        key_cap_id.map(lbl_id => {
          const lbl_id_s   	 = lbl_id.toString();
          const key_mod    	 = key_modi.get(lbl_id_s);
          // const key_lbl 	 = ((keylbl) => {convert(keylbl,'qwerty',lyt[gLyt.lbl])});
          // const key_lbl 	 = keylbl ; //+fn1();//+ lyt('q'); // layout_convert('q', 'qwerty', 'dvorak');
          const key_lbl    	 = convert(keylbl,'qwerty',lyt[gLyt.lbl]);
          const key_sym    	 = key_cap_sym.get(keylbl).get(lbl_id_s) || '';
          const key_command	 = keytest.get(    keylbl).get(lbl_id_s);
          if (key_command) {
            tooltip_text     	+= `<tr>`;
            modi_list.map(mod	=> {
              if (key_mod.includes(mod)) {
                tooltip_text	+= `<td>${mod}</td>`;
              } else {
                tooltip_text	+= `<td></td>`;
              };
              });
            tooltip_text	+= `<td>${key_lbl}</td>`;
            tooltip_text	+= `<td>${key_sym}</td>`;
            tooltip_text	+= `<td>${key_command}</td>`;
            tooltip_text	+= `</tr>`; };
        });
        tooltip_text	+= table_footer;

        // add tooltip listeners
        el.lbl                         	= keylbl           	; // add lbl to allow ↓ callback functions to us it
        el.ttt                         	= tooltip_text     	; //
        el.addEventListener("mouseover"	, tooltip_1, false)	; // show tooltip
        el.addEventListener("mouseout" 	, tooltip_0, false)	; // hide
        el.addEventListener("click"    	, tooltip_0, false)	; // disable on click
      };
    }, "myThisArgOut");
  });
});
}
