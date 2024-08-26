import fetch from 'node-fetch';

const API_URL = 'https://thronesapi.com/api/v2/Characters';

// Ejercicio 1.1: Función para recuperar la información del personaje "Ned Stark"
export async function getNedStark() {
    try {
        const response = await fetch(API_URL);
        const characters = await response.json();
        // Busca el personaje con el nombre "Ned Stark"
        return characters.find(character => character.fullName === 'Ned Stark');
    } catch (error) {
        console.error('Error al recuperar la información de Ned Stark:', error);
    }
}

// Ejercicio 1.2: Función para recuperar todos los personajes disponibles
export async function getAllCharacters() {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error al recuperar todos los personajes:', error);
    }
}
