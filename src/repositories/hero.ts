import { getRepository } from 'typeorm';
import { Hero } from '../entities/hero';

export const getAll = async () => {
  return getRepository(Hero).find();
};

export const getById = async (id: number) => {
  return getRepository(Hero).findOne({ id });
};

export const upsert = async (hero: Hero) => {
  return getRepository(Hero).save(hero);
};

export const updateById = async (id: number, heroes: Partial<Hero>) => {
  return getRepository(Hero).update({ id }, heroes);
};

export const deleteById = async (id: number) => {
  return getRepository(Hero).delete({ id });
};
