import React, { useState, useEffect } from 'react'
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';
function App() {
  
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmandar"])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [prevPageUrl, setPrevPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).
    then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    }).catch(e => {
      if (axios.isCancel(e)) {
        console.log('Request canceled', e.message);  
      } else {
        setLoading(false); 
        console.error('An error occurred', e);
      }
    });

    return () => {
      cancel && cancel(); 
    }

  }, [currentPageUrl])
  
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  if(loading) return "Loading.."
 
  return (
   <>
    <PokemonList pokemon={pokemon} />
    <Pagination>
      gotoNextPage = {nextPageUrl ? gotoNextPage : null}
      gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}
    </Pagination>
    
    </>
  );
}

export default App; 
