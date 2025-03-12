import { useState, useEffect } from "react";
import styles from "./Formulario.module.css";

function Formulario() {
  // Estado para el nombre del Pokémon, los datos de la API y los posibles errores
    const [pokemonName, setPokemonName] = useState("");//USESTATE forzar renderizado
    const [pokemonApi, setPokemonApi] = useState(null);//null nos permite manejar el error
    const [error, setError] = useState("");
    const[loading, setLoading]= useState (false)//lo ponemos false hasta que se active la carga

    // función que se ejecuta al enviar el formulario
    const handleSubmit = (e) => {
        //e.preventDefault();

        // lipia error anterior
        setError("");
        setPokemonApi(null);

        // búsqueda en la API con el nombre del Pokémon
        if (pokemonName.trim()) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Pokémon no encontrado");// ERROR para cuando metemos nombre que no está en API
            }
            return response.json();
            })
            .then((data) => {
            setPokemonApi(data); // Guardamos los datos del Pokémon en el estado
            })
            .catch((err) => {
            setError(err.message); // Capturamos el error y lo mostramos
            });
        } else { // ERROR para cuando le damos a buscar sin haber metido nombre en el input
        setError("Por favor, ingresa el nombre de un Pokémon.");
        }
    };
    useEffect (()=>{//cada vez que cambie el valor del input y cuando hay conicidencia pues me muestra el pokénmos sin darle yo a buscar
        pokemonName && handleSubmit ()
    },[pokemonName])

    return (
        <>
        <form  className={styles.Formulario}>
            <label htmlFor="pokemon"></label>
            <input
            type="text"
            id="pokemon"
            name="pokemon"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}//cuando cambie vas a ejecutar ....x --e.target.value (valor del input) es decir cada letra
            placeholder="Ingresa el nombre del Pokémon"
            />
        </form>

        {/* si hay error lo muestra*/}
        {error && <p>{error}</p>}

        {/* si hay pokémon lo muestra */}
        {pokemonApi && (
            <div className="card">
            <h2>{pokemonApi.name}</h2>
            <img
                src={pokemonApi.sprites.other["official-artwork"].front_default}
                alt={pokemonApi.name}
            />
            </div>
            )}
        </>
    );
    }

    export default Formulario;


    /*REACT
    HEADER-FORMULARIO-FOOTER
    si hacemos algun cambio react sólo modifica lo que hemos añadido, el resto lo deja igual
    -useState es el estado del componente, lo que hace es que se pinte el pokemon que estmos buscando
    -useEffect cuando se carga en componente, se ejecuta si tener ningún evento externo.[corchetes vacíos] se ejecuta una sóla vez. Si 
    poinemos dentro de los corchetes pokemonName, cada vez que cambie el pokémon se va a ejecutar lo que esté dentro del useEffect (hook)

    
    
    */




















