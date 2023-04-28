import './css/kbdHelixFont.sass';

console.log("@kbdHelixFont.js: empty message to suppress emtpy chunk warning");

import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

library.add(faCamera)

const camera = icon({ prefix: 'fas', iconName: 'camera' })
