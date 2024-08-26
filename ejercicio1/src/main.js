import { getNedStark, getAllCharacters } from './fetchThronesData.js';
import { saveCharacters, readCharacters, showStarkFamily, addCharacter, removeCharactersWithIdGreaterThan25 } from './fileOperations.js';

async function main() {
    // Ejercicio 1.1: Recuperar la información del personaje "Ned Stark"
    const nedStark = await getNedStark();
    console.log('Información de Ned Stark:', nedStark);

    // Ejercicio 1.2: Recuperar todos los personajes disponibles
    const allCharacters = await getAllCharacters();
    console.log('Todos los personajes recuperados:', allCharacters);

    // Ejercicio 1.3: Persistir el resultado de la segunda consulta localmente en un archivo JSON
    saveCharacters(allCharacters); 

    // Ejercicio 1.4: Leer el archivo local de personajes y realizar las operaciones requeridas
    const charactersFromFile = readCharacters();

    // Ejercicio 1.4.a: Mostrar por consola los personajes de la familia Stark
    console.log('Familia House Stark:', showStarkFamily(charactersFromFile));

    // Ejercicio 1.4.b: Agregar un nuevo personaje y sobrescribir el archivo original
    const newCharacter = {
        id: charactersFromFile.length + 1,
        firstName: 'Robb',
        lastName: 'Stark',
        fullName: 'Robb Stark',
        title: 'King in the North',
        family: 'House Stark',
        image: 'https://path/to/image.jpg',
        imageUrl: 'https://path/to/image.jpg'
    };
    addCharacter(newCharacter); // Agrega el nuevo personaje al archivo JSON
    console.log('Personaje agregado:', newCharacter); // Muestra el nuevo personaje agregado en la consola

    // Ejercicio 1.4.c: Eliminar los personajes cuyo ID sea mayor a 25 y sobrescribir el archivo original
    removeCharactersWithIdGreaterThan25(); 
    console.log('Personajes con ID mayor a 25 eliminados.'); 
}

main();
