/* eslint-disable no-unused-vars */
import './App.css';

import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import PokemonCard from './components/PokemonCard';
import PokemonDetailsModal from './components/PokemonDetailsModal';
import { pokemonService } from './services/pokemon.service';

function App() {
  const [currentData, setCurrentData] = useState(
    pokemonService.pokemonList?.slice(0, 19),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pokemonModalDetails, setPokemonModalDetails] = useState({});
  function handlePagination(page, pageSize) {
    setCurrentData(
      pokemonService.pokemonList?.slice(pageSize * (page - 1), page * pageSize),
    );
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  async function handleCardClick(name) {
    if (name === pokemonModalDetails?.pokemonDetails?.name) {
      setPokemonModalDetails({ ...pokemonModalDetails, isOpen: true });
      return;
    }
    const res = await pokemonService.getPokemonDetails(name);
    if (res.pokemonDetails) {
      setPokemonModalDetails({
        isOpen: true,
        pokemonDetails: res.pokemonDetails,
      });
    }
  }

  function toggleDetailsModal() {
    setPokemonModalDetails({ ...pokemonModalDetails, isOpen: false });
  }
  useEffect(() => {
    pokemonService.getAllPokemon('?limit=100&offset=0');
  }, []);

  return (
    <>
      <div className="App">
        {currentData?.map(pokemon => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <Pagination
        pageSize={pageSize}
        current={currentPage}
        onChange={handlePagination}
        total={pokemonService?.pokemonList?.length}
        onShowSizeChange={handlePagination}
        className="pagination_container"
      />
      {pokemonModalDetails.isOpen && (
        <PokemonDetailsModal
          details={pokemonModalDetails}
          onClose={toggleDetailsModal}
        />
      )}
    </>
  );
}

export default App;
