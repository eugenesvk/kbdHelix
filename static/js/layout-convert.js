export let gLyt = { lbl: "q" };
const layout_string = {
  'qwerty'    	: String.raw`\`-=`+`qwertyuiop[]`+`asdfghjkl;'`+`zxcvbnm,./` + `!@#$%^&*()_+`+`QWERTYUIOP{}ASDFGHJKL:"ZXCVBNM<>?'`,
  'dvorak'    	: String.raw`\`[]`+`',.pyfgcrl/=`+`aoeuidhtns-`+`;qjkxbmwvz` + `!@#$%^&*(){}`+`"<>PYFGCRL?+AOEUIDHTNS_:QJKXBMWVZ'`,
  'colemak'   	: String.raw`\`-=`+`qwfpgjluy;[]`+`arstdhneio'`+`zxcvbkm,./` + `!@#$%^&*()_+`+`QWFPGJLUY:{}ARSTDHNEIO"ZXCVBKM<>?'`,
  'workman'   	: String.raw`\`-=`+`qdrwbjfup;[]`+`ashtgyneoi'`+`zxmcvkl,./` + `!@#$%^&*()_+`+`QDRWBJFUPP{}ASHTGYNEOI"ZXMCVKL<>?'`,
  'asset'     	: String.raw`\`-=`+`qwjfgypul;[]`+`asetdhnior'`+`zxcvbkm,./` + `!@#$%^&*()_+`+`QWJFGYPUL;{}ASETDHNIO:"ZXCVBKM<>?'`,
  'colemak_dh'	: String.raw`\`-=`+`qwfpbjluy;[]`+`arstgkneio'`+`zxcdvmh,./` + `!@#$%^&*()_+`+`QWFPBJLUY:{}ARSTGKNEIO"ZXCDVMH<>?'`,
  'neo2'      	: String.raw`^-\`` +`xvlcwkhgfqß´`+`uiaeosnrtdy`+`üöäpzbm,.j` + `°§ℓ»«$€„“”—¸`+`XVLCWKHGFQẞ˜UIAEOSNRTDYÜÖÄPZBM–•J`,
};
export const lyt = {
  'q':'qwerty','w':'workman','d':'dvorak','c':'colemak','a':'asset','cdh':'colemak_dh','n':'neo2',
  'qwerty':'q','workman':'w','dvorak':'d','colemak':'c','asset':'a','colemak_dh':'cdh','neo2':'n'};
const button_name   	= ["btn_qwerty","btn_dvorak","btn_colemak","btn_colemak_dh","btn_workman","btn_neo2",];
const btn_prefix_len	= "btn_".length
const buttons       	= document.getElementsByClassName("btn"); // get a list of buttons to style later
const class_clicked 	= 'layout_button_clicked'; // class that applies a colored border
const btn_default   	= 'btn_qwerty'; // default layout before any button is clicked

export function convert(src, from, to) {
  let ret         	= '';
  const layoutFrom	= layout_string[from];
  const layoutTo  	= layout_string[to];
  for (var i = 0; i < src.length; i++) {
    ret += layoutTo.charAt(layoutFrom.indexOf(src.charAt(i))) || src.charAt(i);
  }
  return ret;
}
const changeElementLayoutTo = ((layoutTo) => { // change kbd elements (have layout attribute)
  gLyt.lbl = layoutTo;
  for (let el of document.querySelectorAll("*[lyt]")) {
    const layoutFrom	= el.getAttribute("lyt");
    const thisKey   	= el.textContent;
    if (layoutFrom === layoutTo) {
    } else {
      el.textContent	= convert(thisKey, lyt[layoutFrom], lyt[layoutTo]) || thisKey;
      el.setAttribute("lyt", layoutTo);
    }
  }
});
const changeKLELayoutTo = ((layoutFrom,layoutTo) => { // change labels of the KLE keymaps (no attribute)
  for (let el of document.querySelectorAll("div.keylabel.keylabel10.textsize2 > div")) {
    if (layoutFrom === layoutTo) {
    } else {
      const thisLbl	= el.textContent;
      let conv_l = (thisLbl === 'ẞ' ? 'ß' : thisLbl.toLowerCase())
      let conv   = convert(conv_l, lyt[layoutFrom], lyt[layoutTo])
      let conv_u = (conv === 'ß' ? 'ẞ' : conv.toUpperCase())
      el.textContent	= conv_u || thisLbl;
    }
  }
});

button_name.forEach(((x) => { // x=button id, e.g., 'btn_qwerty'
  document.getElementById(x).addEventListener("click", function() {
    const layoutTo = lyt[x.slice(btn_prefix_len)];	// 'btn_Qwerty' → Q → Qwerty
    changeElementLayoutTo(layoutTo);                  	// change kbd buttons to ↑

    let btn_active = btn_default;
    for (var i = 0; i < button_name.length; i++) {
      let button_i = document.getElementsByClassName("btn")[i];
      if (button_i.classList.contains(class_clicked)) {	// find last clicked button
        btn_active = button_i.id;                      	// ...store its layout
        button_i.classList.remove(class_clicked);      	// ...and remove its color border ()
      }
    }

    this.classList.add(class_clicked); // add color border to the clicked button

    const layoutForm = lyt[btn_active.slice(btn_prefix_len)];	// 'btn_Qwerty' → Q → Qwerty
    changeKLELayoutTo(layoutForm, layoutTo)
  }, false);
}));
changeElementLayoutTo(gLyt.lbl);
