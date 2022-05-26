import './App.css';

import { Pagination } from 'antd';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';

import PokemonCard from './components/PokemonCard';
import PokemonDetailsModal from './components/PokemonDetailsModal';
import SearchPokemon from './components/SearchPokemon';
import { pokemonService } from './services/pokemon.service';

function App() {
  const allPokemon = pokemonService.pokemonList;
  const [currentAllPokemonList, setCurrentAllPokemonList] =
    useState(allPokemon);
  const [currentData, setCurrentData] = useState(
    currentAllPokemonList?.slice(0, 19),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pokemonModalDetails, setPokemonModalDetails] = useState({});
  function handlePagination(page, pageSize) {
    setCurrentData(
      currentAllPokemonList?.slice(pageSize * (page - 1), page * pageSize),
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
  function handleSearch({ target: { value } }) {
    if (value) {
      setCurrentAllPokemonList(
        allPokemon?.filter(pokemon => pokemon?.name?.includes(value)),
      );
    } else {
      setCurrentAllPokemonList(allPokemon);
    }
  }

  function toggleDetailsModal() {
    setPokemonModalDetails({ ...pokemonModalDetails, isOpen: false });
  }

  useEffect(() => {
    setCurrentData(currentAllPokemonList.slice(0, 19));
    setCurrentPage(1);
  }, [currentAllPokemonList]);

  useEffect(() => {
    pokemonService.getAllPokemon('?limit=100&offset=0');
  }, []);

  return (
    <>
      <SearchPokemon onSearch={handleSearch} />
      <div className="App">
        {currentData.length ? (
          currentData?.map(pokemon => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              onClick={handleCardClick}
            />
          ))
        ) : (
          <Empty description={'No pokemon found'} />
        )}
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
