import { Context } from 'koa';
import * as heroService from '../services/hero';

export const getAll = async (ctx: Context, next: () => void) => {
  ctx.state.data = await heroService.getAll();
  await next();
};

export const getById = async (ctx: Context, next: () => void) => {
  const id: number = ctx.params.id;
  ctx.state.data = await heroService.getById(id);
  await next();
};

export const addHero = async (ctx: Context, next: () => void) => {
  const hero = {
    name: ctx.request.body.name,
  };
  ctx.state.data = await heroService.addHero(hero);
  console.log('ctx.state', ctx.state);
  await next();
};

export const updateHero = async (ctx: Context, next: () => void) => {
  const id: number = ctx.params.id;
  const hero = {
    name: ctx.request.body.name,
  };
  ctx.state.data = await heroService.updateHero(id, hero);
  await next();
};

export const deleteHero = async (ctx: Context, next: () => void) => {
  const id: number = ctx.params.id;
  ctx.state.data = await heroService.deleteHero(id);
  await next();
};
