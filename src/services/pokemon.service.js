/* eslint-disable no-console */
import { BehaviorSubject } from 'rxjs';

import { fetchWrapper } from '../utils';

const pokemonSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('pokemon')),
);

export const pokemonService = {
  pokemon: pokemonSubject.asObservable(),
  get pokemonList() {
    return pokemonSubject?.value?.results;
  },
  getAllPokemon,
  getPokemonDetails,
};

async function getAllPokemon(url) {
  try {
    const pokemon = await fetchWrapper.get(url || '/');
    pokemonSubject.next(pokemon);
    localStorage.setItem('pokemon', JSON.stringify(pokemon));
  } catch (error) {
    console.error({ error });
  }
}

async function getPokemonDetails(name) {
  try {
    const pokemonDetails = await fetchWrapper.get(`/${name}`);
    return { pokemonDetails };
  } catch (error) {
    console.error({ error });
    return { error };
  }
}
