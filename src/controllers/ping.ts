import { Context } from 'koa';

export const ping = async (ctx: Context, next: () => void) => {
  console.log('ping');
  ctx.state.message = 'success';
  ctx.state.data = `pong!`;
  await next();
};
