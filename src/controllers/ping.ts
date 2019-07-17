import { Context } from 'koa';
import * as packageJson from '../../package.json';

export const ping = async (ctx: Context, next: () => void) => {
  console.log('ping');
  const version = (packageJson as any).version;
  ctx.state.message = 'success';
  ctx.state.data = `pong! version: ${version}`;
  await next();
};
