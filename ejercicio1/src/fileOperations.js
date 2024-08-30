import fs from 'fs';
import path from 'path';

// Ruta al archivo JSON donde se guardan los personajes
const filePath = path.resolve('../data/personajes.json');

// Ejercicio 1.3: Función para guardar personajes en el archivo JSON
export function saveCharacters(characters) {
    fs.writeFileSync(filePath, JSON.stringify(characters, null, 2), 'utf8'); 
}

// Ejercicio 1.4: Función para leer personajes desde el archivo JSON
export function readCharacters() {
    if (fs.existsSync(filePath)) { 
        const data = fs.readFileSync(filePath, 'utf8'); 
        return JSON.parse(data); 
    } else {
        return []; 
    }
}

// Ejercicio 1.4.a: Función para mostrar la familia Stark
export function showStarkFamily(characters) {
    return characters.filter(character => character.family === 'House Stark'); 
}

// Ejercicio 1.4.b: Función para agregar un nuevo personaje
export function addCharacter(character) {
    const characters = readCharacters(); 
    characters.push(character);
    saveCharacters(characters); 
}

// Ejercicio 1.4.c: Función para eliminar personajes con ID mayor a 25
export function removeCharactersWithIdGreaterThan25() {
    let characters = readCharacters();
    characters = characters.filter(character => character.id <= 25); 
    saveCharacters(characters); 
}
