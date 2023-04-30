import {createRequire}	from 'node:module';
import {resolve}      	from 'node:path'
import {bgCyan, black}	from 'kolorist'
import {fileURLToPath}	from 'url';
import {dirname}      	from 'path';
const __filename      	= fileURLToPath(import.meta.url);
const __dirname       	= dirname(__filename);

export const port  	= parseInt(process.env.PORT || '') || 1111
export const r     	= (...args: string[]) => resolve(__dirname, '..', ...args)
export const rr    	= (request, ...opts) => createRequire(import.meta.url).resolve(request, ...opts)
export const isProd	= process.env.NODE_ENV === 'production'
export const isDev 	= !isProd
export const isWin 	= process.platform === "win32";

export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message)
}
