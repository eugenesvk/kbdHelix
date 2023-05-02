import {Font, woff2}	from 'fonteditor-core';
import fs           	from 'fs';
import * as std     	from '../src/std.js';

const p 	= std.p 	; // helper console log
const pp	= std.pp	; // helper print var names, must be passed as {objects}
const pt	= std.pt	; // helper print var's type and var's value

const args = process.argv
// pp({args})

const fontPath  	= process.argv[2];
const savePath  	= process.argv[3];
const subset_hex	= fs.readFileSync(process.argv[4]).toString().split(' ');
const subset    	= subset_hex.map(name => parseInt(name, 16));
// pp({subset_hex})
// pp({subset})
woff2.init().then(() => {
  const buffer	= fs.readFileSync(fontPath);
  const font  	= Font.create(buffer, { // read woff2
    type      	: 'woff2',
    hinting   	: true,
    subset    	: subset,
  });
  const fontObject	= font.get();
  const keys      	= Object.keys(fontObject);
  // pp({keys})
  const buffer_out	= font.write({
    type          	: 'woff2',
    hinting       	: true,
  });
  fs.writeFileSync(savePath, buffer_out);
});
