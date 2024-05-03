import React, {useState} from 'react'
import PokemonList from './PokemonList';

function App() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmandar"])
  return (
    <PokemonList pokemon={pokemon} />
  );
}

export default App; 
