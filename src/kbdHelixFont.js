import './css/kbdHelixFont.sass';

console.log("@kbdHelixFont.js: empty message to suppress emtpy chunk warning");

// import { library, icon } from '@fortawesome/fontawesome-svg-core'
// import { faCamera } from '@fortawesome/free-solid-svg-icons'

// library.add(faCamera)

// const camera = icon({ prefix: 'fas', iconName: 'camera' })
// var camera2 = window.FontAwesome.icon({ prefix: 'fas', iconName: 'camera' })

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faUserAstronaut, faCamera } from '@fortawesome/free-solid-svg-icons'

// We are only using the user-astronaut icon
library.add(faUserAstronaut, faCamera)

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch()