import { StyledPokemonDetailsModal } from './StyledPokemonDetailsModal';

function PokemonDetailsModal(props) {
  const {
    details: { isOpen, pokemonDetails },
    onClose,
  } = props;
  const keys = ['name', 'base_experience', 'height', 'weight', 'order'];
  return (
    <StyledPokemonDetailsModal
      footer={null}
      title={'Pokemon Details'}
      onCancel={onClose}
      visible={isOpen}
      keyboard
    >
      {keys?.map((key, index) => (
        <p key={index}>
          {' '}
          <b> {key} : </b> {pokemonDetails[key]}
        </p>
      ))}
    </StyledPokemonDetailsModal>
  );
}

export default PokemonDetailsModal;
