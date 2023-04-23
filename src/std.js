// import * as std from './std.js';

export function escRe  (string) { return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); } // $& = whole string
export function escRepl(string) { return string.replace(/\$/g                , '$$$$'); }
RegExp.esc     = escRe;
RegExp.escrepl = escRepl;

export function stdtest() {
  console.log('aaaa');
}
export function regexp(strings, ...vars) { // write regex without \\, with whitespace, and 【comments】
  // Reconstruct the original string
  let strings_raw	= strings.raw; // .raw allows use of \d instead of \\d)
  let str_orig   	= strings_raw[0];
  for (let i = 0; i < vars.length; i++) { // vars get ${var} inerpolation values
    str_orig += vars[i] + strings_raw[i+1];
  }
  const comment_beg	= '【'; // 【comment】, alternatives? 〈comment〉「comment」 ‹comment›
  const comment_end	= '】';
  const STX = String.fromCharCode(0x0002);
  const ETX = String.fromCharCode(0x0003);
  const deCommentMap = { //
    [comment_beg.repeat(2)]	: [comment_beg]	, // [[ → [
    [comment_end.repeat(2)]	: [comment_end]	,
    [comment_beg]          	: [STX]        	, //  [ → control char
    [comment_end]          	: [ETX]        	,
  };
  const reComment	= new RegExp(STX +`[^${ETX}]*` + ETX, 'g');
  return new RegExp(str_orig
    .mapRepl(deCommentMap)	// replace pairs with singles and singles with control chars that delimit comments
    .replace(reComment,'')	//
    .replace(/\s+/g   ,''));
}
export function replaceMap(replMap) {
  let reProps = [];
  for (const prop in replMap) {
    reProps.push(RegExp.esc(prop)); }
  const reCombo = new RegExp(reProps.join('|'), "g");
  return this.replace(reCombo, function(match){
    return replMap[match];
  });
}
String.prototype.mapRepl = replaceMap;

export function extendProtos() {
  String.prototype.mapRepl = replaceMap;

  RegExp.esc     = escRe;
  RegExp.escrepl = escRepl;
}


export function p(...items) { // helper console log
  console.log(...items); }
export function pp(...items) { // helper print var names, must be passed as {objects}
  for (const item of items) {
    const [iName]	= Object.keys(item);
    const iVal   	= item[iName];
    const iT     	= typeof(iVal);
    console.log(`${iName}(${iT})=¦`,iVal,'¦'); }
}
export function pt(...items) { // helper print var's type and var's value
  for (const item of items) { console.log(typeof(item),item); } }
