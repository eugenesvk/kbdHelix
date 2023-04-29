import path                	from 'path';
import { swc }             	from 'rollup-plugin-swc3';
import urlResolve          	from 'rollup-plugin-url-resolve';
import { ViteToml }        	from 'vite-plugin-toml';
import postcss             	from 'rollup-plugin-postcss';
import postcssOKLabFunction	from '@csstools/postcss-oklab-function';
import purgecss            	from '@fullhuman/postcss-purgecss';
import {nodeResolve}       	from '@rollup/plugin-node-resolve'; // reference npm module files

const isDev	= false; // ↓ swap true/false in Dev to eg, avoid minification
const pT   	= isDev ? false : true 	; // pT = production True
const pF   	= isDev ? true  : false	;

export default [
  {
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
      }         	,
     })         	,
    postcss(    	{
      minimize  	: pT,
      extract   	: path.resolve('static/js/css/kbdHelix.css'),
      plugins   	: [postcssOKLabFunction()]
    }),
  ]},
  {
  input       	: ["src/css/kbdHelixFont.sass"],
  output      	: [{dir:"static/css"}],
  plugins     	: [nodeResolve(),
    postcss(  	{
      minimize	: pT,
      extract 	: path.resolve('static/css/kbdHelixFont.css'),
      plugins 	: [
        purgecss({content:['./content/**/*.html.tmpl','./content/**/*.md']})]
    }),
  ]},
];
