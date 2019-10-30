const { getRequest } = require("./api");
const { POKE_API_URL } = require("../constants/api");

const getEvolutionChain = async (evolutionChainUrl = "") => {
    try {
        const response = await getRequest(evolutionChainUrl);
        return response;
    } catch (error) {
        return error;
    }
};

const getSpecies = async (pokedexNumber = "") => {
    try {
        const requestUrl = `${POKE_API_URL}/pokemon-species/${pokedexNumber}`;
        const response = await getRequest(requestUrl);
        return response;
    } catch (error) {
        return error;
    }
};

const isRequestSpeciesFinalEvolution = (evolutionChain, requestedSpeciesName) => {
    const requestedSpecies = evolutionChain.find(({ name }) => name === requestedSpeciesName);
    return !(requestedSpecies && requestedSpecies.canEvolve);
};

/**
 *
 * @param {Array} evolutionChain
 * @param {Object} requestedSpecies
 */
const orderEvolutionChain = (evolutionChain, requestedSpecies) => {
    const { name: requestedSpeciesName } = requestedSpecies;
    const { evolves_from_species: evolvesFromSpecies } = requestedSpecies;
    const evolvesFromSpeciesName = evolvesFromSpecies ? evolvesFromSpecies.name : "";

    return evolutionChain.filter((evolution) => {
        const isNotCurrentSpecies = requestedSpeciesName !== evolution.name;
        const isNotPreviousSpecies = evolvesFromSpeciesName !== evolution.name;
        return (isNotCurrentSpecies && isNotPreviousSpecies);
    }).map(({ name }) => name);
};

/**
 * Recursively flatten the array that is returned from the PokeAPI endpoint.
 * @param {Array} evolutionChain
 */
const flattenEvolutionChain = (evolutionChain) => (
    evolutionChain.reduce((accumulator, evolution) => {
        const { evolves_to: evolvesTo, species } = evolution;

        accumulator.push({ name: species.name, canEvolve: !!evolvesTo.length });

        if (evolvesTo.length > 0) {
            const nestedEvolutionChain = flattenEvolutionChain(evolvesTo);
            return [...accumulator, ...nestedEvolutionChain];
        }

        return accumulator;
    }, [])
);

/**
 * This service is for returning a species evolution chain
 * @param {String} pokedexNumber
 *
 * Example:
    // Get the evolved forms of Poliwag
    getOrderEvolutionChain("60");
    -> [
        { name: 'poliwhirl', canEvolve: true },
        { name: 'poliwrath', canEvolve: false },
        { name: 'politoed', canEvolve: false }
    ]

    // Get the evolved forms of Poliwhirl
    getOrderEvolutionChain("61");
    -> [
        { name: 'poliwrath', canEvolve: false },
        { name: 'politoed', canEvolve: false }
    ]

    // Get the evolved forms of Poliwrath
    getOrderEvolutionChain("62");
    -> []
 */
const getOrderedEvolutionChain = async (pokedexNumber = "1") => {
    const requestedSpecies = await getSpecies(pokedexNumber);
    const { chain } = await getEvolutionChain(requestedSpecies.evolution_chain.url);
    const flattenedChain = flattenEvolutionChain(chain.evolves_to);
    const initialEvolution = { name: chain.species.name, canEvolve: !!chain.evolves_to.length };
    const completeChain = [initialEvolution, ...flattenedChain];
    const orderedChain = orderEvolutionChain(completeChain, requestedSpecies);
    const isFinalEvolution = isRequestSpeciesFinalEvolution(completeChain, requestedSpecies.name);
    return !isFinalEvolution ? orderedChain : [];
};

module.exports = {
    getOrderedEvolutionChain,
    getEvolutionChain,
    getSpecies,
};
