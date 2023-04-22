import { swc }     	from 'rollup-plugin-swc3';
import urlResolve  	from 'rollup-plugin-url-resolve';
import { ViteToml }	from 'vite-plugin-toml';

const isDev	= true; // ↓ swap true/false in Dev to eg, avoid minification
const pT   	= isDev ? false : true 	; // pT = production True
const pF   	= isDev ? true  : false	;

export default [{
  input         	: ["src/kbdHelix.js"],
  output        	: [{dir:"static/js"}],
  plugins       	: [urlResolve(), ViteToml(),
    swc(        	{
      include   	: /\.[mc]?[jt]sx?$/	, //|/\.[mc]?[jt]sx?$/|
      exclude   	: /node_modules/   	, //|/node_modules/   |
      tsconfig  	: 'tsconfig.json'  	, //|'tsconfig.json'  |
      jsc       	: {
        target  	: "es5",
        loose   	: false,
        parser  	: {
          syntax	: "ecmascript",
          jsx   	: false,
        }       	,
        minify  	: {compress:pT,mangle:pT},
      },
     }),]
},
];
