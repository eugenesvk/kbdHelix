import {isProd,r,rr}       	from './script/util'
import { swc }             	from 'rollup-plugin-swc3';
import urlResolve          	from 'rollup-plugin-url-resolve';
import { ViteToml }        	from 'vite-plugin-toml';
import postcss             	from 'rollup-plugin-postcss';
import postcssOKLabFunction	from '@csstools/postcss-oklab-function';
import purgecss            	from '@fullhuman/postcss-purgecss';
import copy                	from 'rollup-plugin-copy'; // copy fonts
import {nodeResolve}       	from '@rollup/plugin-node-resolve'; // reference npm module files

export default [
  {
  input         	: ["src/kbdHelix.js"],
  output        	: [{dir:"static/js"}],
  plugins       	: [urlResolve(), ViteToml(), nodeResolve(),
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
        minify  	: {compress:isProd,mangle:isProd},
      }         	,
     })         	,
  ]},
  {
  input       	: ["src/css/kbdHelix.sass"],
  output      	: [{dir:"sass/css/build"}],
  plugins     	: [
    postcss(  	{
      minimize	: isProd,
      extract 	: r('sass/css/build/_kbdHelix.css'),
      plugins 	: [postcssOKLabFunction()]
    })        	,
  ]},
  {
  input       	: ["src/css/kbdHelixFont.sass"],
  output      	: [{dir:"sass/css/build"}],
  plugins     	: [
    postcss(  	{
      minimize	: isProd,
      extract 	: r('sass/css/build/_kbdHelixFont.css'),
      plugins 	: [
        purgecss({content:['./content/**/*.html.tmpl','./content/**/*.md']}),
      ]
    }),
    copy({copyOnce:true, targets:[
      {src 	: [`${rr('@fontsource/noto-sans-symbols-2')}/../files/noto-sans-symbols-2-symbols-400-normal.woff2`],
       dest	: 'src/font'},
      {src 	: [`${rr('@fontsource/noto-sans-symbols')}/../files/noto-sans-symbols-symbols-400-normal.woff2`],
       dest	: 'src/font'}
      ]    	,
    })
  ]},
];
