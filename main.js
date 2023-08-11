const apiUrl = "https://pokeapi.co/api/v2/pokemon/"

const randomPokemon = async () => {
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

randomPokemon()