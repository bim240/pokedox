import './App.css';

import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

import PokemonCard from './components/PokemonCard';
import { pokemonService } from './services/pokemon.service';

function App() {
  const [currentData, setCurrentData] = useState(
    pokemonService.pokemonList?.slice(0, 19),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  function handlePagination(page, pageSize) {
    setCurrentData(
      pokemonService.pokemonList?.slice(pageSize * (page - 1), page * pageSize),
    );
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  useEffect(() => {
    pokemonService.getAllPokemon('?limit=100&offset=0');
  }, []);

  return (
    <>
      <div className="App">
        {currentData?.map(pokemon => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
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
    </>
  );
}

export default App;
