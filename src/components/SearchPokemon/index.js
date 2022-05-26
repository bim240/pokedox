import { StyledSearchPokemon } from './StyledSearchPokemon';

function SearchPokemon({ onSearch }) {
  return (
    <StyledSearchPokemon
      placeholder="Type pokemon to search"
      onChange={onSearch}
    />
  );
}

export default SearchPokemon;
