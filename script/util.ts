import {resolve}      	from 'node:path'
import {bgCyan, black}	from 'kolorist'

export const port  	= parseInt(process.env.PORT || '') || 1111
export const r     	= (...args: string[]) => resolve(__dirname, '..', ...args)
export const isProd	= process.env.NODE_ENV === 'production'
export const isDev 	= !isProd
export const isWin 	= process.platform === "win32";

export function log(name: string, message: string) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message)
}
