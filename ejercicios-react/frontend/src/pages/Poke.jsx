import { useEffect, useState } from "react";
import PokeCard from "@components/PokeCard.jsx";

const Poke = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    let isCancelled = false;

    const loadPokemons = async () => {
      const promises = [];

      // Crear todas las promesas de fetch en paralelo
      for (let id = 1; id <= 20; id++) {
        promises.push(
          fetch(`${BASE_URL}${id}`)
            .then((response) => response.json())
            .catch((error) => {
              console.error(`Error al obtener pokemon ${id}: ${error}`);
              return null;
            })
        );
      }

      // Esperar a que todas las peticiones terminen
      const results = await Promise.all(promises);

      // Solo actualizar si el componente sigue montado
      if (!isCancelled) {
        // Filtrar errores (null) y actualizar estado UNA SOLA VEZ
        setPokemonData(results.filter((pokemon) => pokemon !== null));
      }
    };

    loadPokemons();

    // Cleanup: evitar actualización si el componente se desmonta
    return () => {
      isCancelled = true;
    };
  }, []);

  if (!pokemonData) {
    return <div>Cargando Pokémon...</div>;
  }

  return pokemonData.map((pokemon, id) => (
    <PokeCard key={id} pokemon={pokemon} />
  ));
};

export default Poke;
