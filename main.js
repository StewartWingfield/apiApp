const apiUrl = "https://pokeapi.co/api/v2/pokemon/"
const game = document.getElementById('game')

let isPaused = true
let firstPick
let matches

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const loadPokemon = async () => {
    const randomIds = new Set();
    while(randomIds.size < 8){
        const randomNumber = Math.ceil(Math.random() * 900);
        randomIds.add(randomNumber);
    }
    const pokePromises = [...randomIds].map(id => fetch(apiUrl + id))
    const results = await Promise.all(pokePromises);
    return await Promise.all(results.map(res => res.json()));
}

const resetGame = () => {
    
    game.innerHTML = ''
    isPaused = true
    firstPick = null
    matches = 0
    setTimeout(async () => {
        const pokemon = await loadPokemon()
        displayPokemon([...pokemon, ...pokemon])
        isPaused = false
    }, 200);
}

const displayPokemon = (pokemon) => {
    pokemon.sort(_ => Math.random() - 0.5);
    const pokemonHTML = pokemon.map(pokemon => {
        const type = pokemon.types[0].type.name || 'normal'
        const color = colors[type]
        return `
          <div class="card" onclick="clickCard(event)" data-pokename="${pokemon.name}" style="background-color:${color};">
            <div class="front ">
            </div>
            <div class="back rotated" style="background-color:${color};">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"  />
            <h2>${pokemon.name}</h2>
            </div>
        </div>
    `}).join('');
    game.innerHTML = pokemonHTML;
} 

const clickCard = (event) => {
    const pokemonCard = event.currentTarget
    const [front, back] = getFrontAndBackFromCard(pokemonCard)

    if(front.classList.contains('rotated') || isPaused) return

    isPaused = true
    front.classList.toggle('rotated')
    back.classList.toggle('rotated')
    if (!firstPick) {
        firstPick = pokemonCard
        isPaused = false
    } else {
        const secondPokemonName = pokemonCard.dataset.pokename
        const firstPokemonName = firstPick.dataset.pokename

        if(firstPokemonName !== secondPokemonName) {
            const [firstFront, firstBack] = getFrontAndBackFromCard(firstPick)
            setTimeout(() => {
                rotateElements([front, back, firstFront, firstBack])
                firstPick = null
                isPaused = false
            }, 500);
        } else {
            matches++
            if (matches === 8) {
                console.log("Congrats you won!")
            }
            firstPick = null
            isPaused = false
        }
    }
    
}

const rotateElements = (elements) => {
    if(typeof elements !== 'object' || !elements.length) return;
    elements.forEach(element => element.classList.toggle('rotated'))
}

const getFrontAndBackFromCard = (card) => {
    const front = card.querySelector(".front")
    const back = card.querySelector(".back")
    return [front, back]
}


resetGame()






















/* window.onload = () => {
    getPokemon()
} */

/* const getPokemon = async () => {
    try {
        const res = await fetch(apiUrl) 
        const data = await res.json()
        console.log(data.results)
        pokemon = data.results
    } catch (err) {
        console.log(err)
    }

} */

/* const getPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(res => res.json())
    .then(pokeData => {
        pokemon = pokeData
       // console.log(pokemon)

        displayPokemon(pokeData) 

    })
}  */

/* const displayPokemon = (pokeData) => {
    console.log(pokeData.name)
} */
//console.log(pokemon.name)

/* const getPokemon = async () => {
    const pokeIds = new Set()
    while(pokeIds.size < 8) {
        const randomNumber = Math.floor(Math.random() * 800)
        pokeIds.add(randomNumber)
    }
    const pokeIdsArray = [...pokeIds]   
    for (let i = 0; i < pokeIdsArray.length; i++) {
        const res = await fetch(apiUrl + pokeIdsArray[i])
        const data = await res.json()
        pokemon.push(data)
       // console.log(pokemon)
    }}
    console.log(pokemon) */

/* const resetGame = async () => {
    const pokemon = await getPokemon()
    getPokemon([...pokemon, ...pokemon])
}


resetGame() */
