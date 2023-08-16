const apiUrl = "https://pokeapi.co/api/v2/pokemon/"

const getPokemon = async () => {
    const pokeIds = new Set()
    while(pokeIds.size < 10) {
        const randomNumber = Math.floor(Math.random() * 800)
        pokeIds.add(randomNumber)
    } 

    const pokeIdsArray = [...pokeIds]
    for (let i = 0; i < pokeIdsArray.length; i++) {
    const res = await fetch(apiUrl + pokeIdsArray[i])
    const pokemon = await res.json()
    console.log(pokemon)

    
}}

const showPokemon = (pokemon) => {
    pokemon.sort( _ => Math.random() - 0.5)
    pokemon.map(pokemon => {
        return `
        <div class ="card">
            <h3>${pokemon.name}
        </div>`
    }).join('')
}

const resetGame = async () => {
    const pokemon = await getPokemon ()
    getPokemon([...pokemon, ...pokemon])
}
getPokemon()