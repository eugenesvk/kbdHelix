export let gLyt = { lbl: "q" };
const layout_string = {
  'qwerty.low'    	: String.raw`${"`"}1234567890-=`     +`qwertyuiop[]`+`asdfghjkl;'`+`zxcvbnm,./`,
  'qwerty.upp'    	: String.raw     `~!@#$%^&*()_+`     +`QWERTYUIOP{}`+`ASDFGHJKL:"`+`ZXCVBNM<>?`,
  'dvorak.low'    	: String.raw`${"`"}1234567890[]`     +`',.pyfgcrl/=`+`aoeuidhtns-`+`;qjkxbmwvz`,
  'dvorak.upp'    	: String.raw     `~!@#$%^&*(){}`     +`"<>PYFGCRL?+`+`AOEUIDHTNS_`+`:QJKXBMWVZ`,
  'colemak.low'   	: String.raw`${"`"}1234567890-=`     +`qwfpgjluy;[]`+`arstdhneio'`+`zxcvbkm,./`,
  'colemak.upp'   	: String.raw     `~!@#$%^&*()_+`     +`QWFPGJLUY:{}`+`ARSTDHNEIO"`+`ZXCVBKM<>?`,
  'workman.low'   	: String.raw`${"`"}1234567890-=`     +`qdrwbjfup;[]`+`ashtgyneoi'`+`zxmcvkl,./`,
  'workman.upp'   	: String.raw     `~!@#$%^&*()_+`     +`QDRWBJFUPP{}`+`ASHTGYNEOI"`+`ZXMCVKL<>?`,
  'asset.low'     	: String.raw`${"`"}1234567890-=`     +`qwjfgypul;[]`+`asetdhnior'`+`zxcvbkm,./`,
  'asset.upp'     	: String.raw     `~!@#$%^&*()_+`     +`QWJFGYPUL;{}`+`ASETDHNIO:"`+`ZXCVBKM<>?`,
  'colemak_dh.low'	: String.raw`${"`"}1234567890-=`     +`qwfpbjluy;[]`+`arstgkneio'`+`zxcdvmh,./`,
  'colemak_dh.upp'	: String.raw     `~!@#$%^&*()_+`     +`QWFPBJLUY:{}`+`ARSTGKNEIO"`+`ZXCDVMH<>?`,
  'neo2.low'      	: String.raw     `^1234567890-${"`"}`+`xvlcwkhgfqß´`+`uiaeosnrtdy`+`üöäpzbm,.j`,
  'neo2.upp'      	: String.raw     `ˇ°§ℓ»«$€„“”—¸`     +`XVLCWKHGFQẞ˜`+`UIAEOSNRTDY`+`ÜÖÄPZBM–•J`,
};
export const layouts = {'qwerty':'q','dvorak':'d','colemak':'c','colemak_dh':'cdh','workman':'w','neo2':'n','asset':'a'};
const button_name	= [];
export const lyt 	= {}; // q:qwerty, qwerty:q
for (const [lytName, lytAbbrv] of Object.entries(layouts)) {
  layout_string[lytName] = layout_string[lytName+'.low'] + layout_string[lytName+'.upp'];
  button_name.push('btn_'+lytName);
  lyt[lytName] 	= lytAbbrv;
  lyt[lytAbbrv]	= lytName;
}
const btn_prefix_len	= "btn_".length;
const buttons       	= document.getElementsByClassName("btn")	; // get a list of buttons to style later
const class_clicked 	= 'layout_button_clicked'               	; // class that applies a colored border
const btn_default   	= 'btn_qwerty'                          	; // default layout before any button is clicked

export const Case = Object.freeze({
  l	: Symbol("lower"),
  U	: Symbol("upper"),
});
function isLowerCaseLyt(str,lyt) { return layout_string[lyt+'.low'].includes(str);}
function isUpperCaseLyt(str,lyt) { return layout_string[lyt+'.upp'].includes(str);}
export function getCaseLyt(str,lyt) {
  if       	(isLowerCaseLyt(str,lyt))	{ return Case.l;
  } else if	(isUpperCaseLyt(str,lyt))	{ return Case.U;
  } else   	                         	{ return null;}
}
export function convertCaseLyt(char, lytNm='qwerty', CaseTo=null) {
  let caseCurrent	= getCaseLyt(char, lytNm);
  if (!caseCurrent) {return;}
  let lyt_from, lyt_to;
  switch (CaseTo) {
    case Case.U: // to upper
      lyt_from	= layout_string[lytNm+'.low'] ;
      lyt_to  	= layout_string[lytNm+'.upp'] ;
      break;
    case Case.l: // to lower
      lyt_from	= layout_string[lytNm+'.upp'] ;
      lyt_to  	= layout_string[lytNm+'.low'] ;
      break;
    default: // swap case
      switch (caseCurrent) {
        case Case.U: // to lower
          lyt_from	= layout_string[lytNm+'.upp'] ;
          lyt_to  	= layout_string[lytNm+'.low'] ;
          break;
        case Case.l: // to upper
          lyt_from	= layout_string[lytNm+'.low'] ;
          lyt_to  	= layout_string[lytNm+'.upp'] ;
          break;
        default:
          return;
      }
  }
  return lyt_to.charAt(lyt_from.indexOf(char)) || char;
}

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
      let conv_l = (thisLbl === 'ẞ' ? 'ß' : thisLbl.toLowerCase());
      let conv   = convert(conv_l, lyt[layoutFrom], lyt[layoutTo]);
      let conv_u = (conv === 'ß' ? 'ẞ' : conv.toUpperCase());
      el.textContent	= conv_u || thisLbl;
    }
  }
});

button_name.forEach(((x) => { // x=button id, e.g., 'btn_qwerty'
  const btn = document.getElementById(x);
  if (btn) {
    btn.addEventListener("click", function() {
    const layoutTo = lyt[x.slice(btn_prefix_len)];	// 'btn_Qwerty' → Q → Qwerty
    changeElementLayoutTo(layoutTo);              	// change kbd buttons to ↑

    let btn_active = btn_default;
    for (var i = 0; i < button_name.length; i++) {
      let btn_i = document.getElementsByClassName("btn")[i];
      if (btn_i && btn_i.classList.contains(class_clicked)) {	// find last clicked button
        btn_active = btn_i.id;                               	// ...store its layout
        btn_i.classList.remove(class_clicked);               	// ...and remove its color border ()
      }
    }

    this.classList.add(class_clicked); // add color border to the clicked button

    const layoutForm = lyt[btn_active.slice(btn_prefix_len)];	// 'btn_Qwerty' → Q → Qwerty
    changeKLELayoutTo(layoutForm, layoutTo)
  }, false);}
}));
changeElementLayoutTo(gLyt.lbl);
