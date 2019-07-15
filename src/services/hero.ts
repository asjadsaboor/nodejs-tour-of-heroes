import * as boom from 'boom';
import * as joi from 'joi';
import * as heroesRepo from '../repositories/hero';
import { Hero } from '../entities/hero';
import { IHeroRequest } from '../interfaces/hero';
import { validate } from '../validations/index';
import * as joiSchema from '../validations/schemas/index';

export const getAll = async () => {
  return heroesRepo.getAll();
};

export const getById = async (id: number) => {
  const hero = await heroesRepo.getById(id);
  if (!hero) {
    throw boom.notFound('Hero not found');
  }
  return hero;
};

export const addHero = async (payload: IHeroRequest) => {
  await validate(payload, joiSchema.addHero);
  const hero = new Hero();
  hero.name = payload.name;
  const savedHero = await heroesRepo.upsert(hero);
  return savedHero;
};

export const updateHero = async (id: number, payload: IHeroRequest) => {
  await joi.validate({ ...payload, id }, joiSchema.updateHero);
  const hero = await getById(id);
  hero.name = payload.name;
  const savedHero = await heroesRepo.upsert(hero);
  return savedHero;
};

export const deleteHero = async (id: number) => {
  await getById(id);
  await heroesRepo.deleteById(id);
  return { success: true };
};
