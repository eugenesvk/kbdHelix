// import './css/kbdHelixFont.sass';
import * as std	from './std.js';
const p        	= std.p 	; // helper console log
const pp       	= std.pp	; // helper print var names, must be passed as {objects}
const pt       	= std.pt	; // helper print var's type and var's value

console.log("@kbdHelixFont.js: empty message to suppress emtpy chunk warning");
//  how to do shims for the old versions in js?
// import { library, icon } from '@fortawesome/fontawesome-svg-core'
// import { faCamera } from '@fortawesome/free-solid-svg-icons'

// library.add(faCamera)

// const camera = icon({ prefix: 'fas', iconName: 'camera' })
// var camera2 = window.FontAwesome.icon({ prefix: 'fas', iconName: 'camera' })
// export { noAuto$1 as noAuto, config$1 as config, library$1 as library, dom$1 as dom, parse$1 as parse, findIconDefinition$1 as findIconDefinition, toHtml$1 as toHtml, icon, layer, text, counter, api };

// works, but no treeshaking!!!
//import '@fortawesome/fontawesome-free/js/solid.js'
//// import '@fortawesome/fontawesome-free/js/regular.js' // single huge svg icons
//// import '@fortawesome/fontawesome-free/js/brands.js'
//import '@fortawesome/fontawesome-free/js/fontawesome.min.js'
//import '@fortawesome/fontawesome-free/js/v4-shims.min.js'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
// import { faUserAstronaut, faCamera, faCameraRotate} from '@fortawesome/free-solid-svg-icons' // dupe names
import * as faS from '@fortawesome/free-solid-svg-icons' // import everything to list an icon name only once in use
import * as faR from '@fortawesome/free-regular-svg-icons' // import everything to list an icon name only once in use
import {faUserAstronaut} from '@fortawesome/free-solid-svg-icons' // import everything to list an icon name only once in use

// can't library.add only some keys from variables likely due to to Object shape tree-shaking https://github.com/rollup/rollup/issues/2201
// const v = 'faUserAstronaut'
// library.add(faS['faUserAstronaut']) //
// library.add(faS.faUserAstronaut) //
// library.add(faS[v]) // THIS breaks tree shaking and all of faS/faR is included

const icons = ['faUserAstronaut', 'faCamera', 'faCameraRotate','faClock']
for (const icon of icons) { // (icon in faS) or .hasOwnProperty causes all the icons to be included!!!
 if (icon.faS !== undefined) {
   const icnS = faS[icon]
   pp({icnS})
   library.add(faS[icon]) //
   library.add(faS[`faUserAstronaut`]) //
 }
 if (icon.faR !== undefined) {
   const icnR = faR[icon]
   pp({icnR})
   library.add(faR[icon]) //
 }
}
library.add(faS['faUserAstronaut'],faS.faCamera) // tree shaker removes the unneded imports

// // Override exising icon
// var faListOldStyle = {
//   prefix  	: 'fas',
//   iconName	: 'list-old-style',
//   icon    	: [1568, 1568, [], // replace 1568, 1568 with your SVG viewbox
//     'e001', // e001 is the unicode point which represents this custom icon. Increment this value for other icons
//     'M256 1312v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm1536 768v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5zm-1536-1152v192q0 13-9.5 22.5t-22.5 9.5h-192q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h192q13 0 22.5 9.5t9.5 22.5zm1536 768v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1344q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1344q13 0 22.5 9.5t9.5 22.5z']
//     // ↑replace 'M256...' with your single-path SVG
// }
// let faUserAstronautO = { ...faS.faUserAstronaut }; // need to shallow clone to avoid overriding
// faUserAstronautO.iconName = "user-astronaut-o"
// faUserAstronautO.icon = faS.faCamera.icon
// pp({faUserAstronautO})
// library.add(faListOldStyle, faUserAstronautO) // tree shaker removes the unneded imports


dom.watch() // replace existing <i> with <svg>; set up a MutationObserver to continue doing this as the DOM changes
