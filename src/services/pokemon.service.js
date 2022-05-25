import { BehaviorSubject } from 'rxjs';

import { fetchWrapper } from '../utils';

const pokemonSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('pokemon')),
);

export const pokemonService = {
  pokemon: pokemonSubject.asObservable(),
  get pokemonList() {
    return pokemonSubject.value.results;
  },
  getAllPokemon,
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
