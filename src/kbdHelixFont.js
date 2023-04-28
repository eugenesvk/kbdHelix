import './css/kbdHelixFont.sass';

console.log("@kbdHelixFont.js: empty message to suppress emtpy chunk warning");

// import { library, icon } from '@fortawesome/fontawesome-svg-core'
// import { faCamera } from '@fortawesome/free-solid-svg-icons'

// library.add(faCamera)

// const camera = icon({ prefix: 'fas', iconName: 'camera' })
// var camera2 = window.FontAwesome.icon({ prefix: 'fas', iconName: 'camera' })
// export { noAuto$1 as noAuto, config$1 as config, library$1 as library, dom$1 as dom, parse$1 as parse, findIconDefinition$1 as findIconDefinition, toHtml$1 as toHtml, icon, layer, text, counter, api };

import { library, dom } from '@fortawesome/fontawesome-svg-core'
// import { faUserAstronaut, faCamera, faCameraRotate} from '@fortawesome/free-solid-svg-icons'
import * as faS from '@fortawesome/free-solid-svg-icons' // import everything to list an icon name only once in use

library.add(faS.faUserAstronaut,faS.faCamera) // tree shaker removes the unneded imports

dom.watch() // replace existing <i> with <svg>; set up a MutationObserver to continue doing this as the DOM changes
