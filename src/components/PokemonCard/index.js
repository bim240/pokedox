import { StyledPokemonCard } from './StyledPokemonCard';

function PokemonCard({ name, onClick }) {
  return (
    <StyledPokemonCard onClick={() => onClick(name)}> {name}</StyledPokemonCard>
  );
}

export default PokemonCard;
