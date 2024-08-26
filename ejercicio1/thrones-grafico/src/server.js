import express from 'express';
import fetch from 'node-fetch';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Crear una instancia de la aplicación Express
const app = express();
const port = 8080;

// Obtener el nombre del archivo actual y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al directorio 'data' dentro de 'src'
const dataDir = path.join(__dirname, 'data');
const personajesFilePath = path.join(dataDir, 'personajes.json');

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Definir ruta de la api
const API_URL= 'https://thronesapi.com/api/v2/characters'

// Middleware para analizar el cuerpo de las solicitudes POST como JSON
app.use(express.json());

// Ruta para obtener información de Ned Stark desde una API externa
app.get('/api/ned-stark', async (req, res) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error('Error al hacer la solicitud a la API:', response.statusText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const characters = await response.json();
        const nedStark = characters.find(character => character.fullName === 'Ned Stark');
        if (nedStark) {
            res.json(nedStark);
        } else {
            res.status(404).send('Ned Stark no encontrado en la API'); 
        }
    } catch (error) {
        console.error('Error al recuperar la información de Ned Stark:', error);
        res.status(500).send('Error al recuperar la información de Ned Stark'); 
    }
});

// Ruta para recuperar todos los personajes de la API y guardarlos en un archivo
app.get('/api/all-characters', async (req, res) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error('Error al hacer la solicitud a la API:', response.statusText);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const characters = await response.json();
        console.log('Ruta del archivo de personajes:', personajesFilePath);
        await fsPromises.writeFile(personajesFilePath, JSON.stringify(characters, null, 2), 'utf8');
        res.json(characters);
    } catch (error) {
        console.error('Error al recuperar todos los personajes:', error);
        res.status(500).send('Error al recuperar todos los personajes');
    }
});

// Ruta para obtener solo los personajes de la familia Stark desde el archivo JSON
app.get('/api/stark-family', async (req, res) => {
    try {
        const data = await fsPromises.readFile(personajesFilePath, 'utf8');
        const characters = JSON.parse(data); 
        const starkFamily = characters.filter(character => character.family === 'House Stark');
        res.json(starkFamily);
    } catch (error) {
        console.error('Error al leer el archivo de personajes:', error);
        res.status(404).send('Archivo no encontrado o error al leer el archivo');
    }
});

// Ruta para agregar un nuevo personaje al archivo JSON
app.post('/api/add-character', async (req, res) => {
    const newCharacter = req.body; 
    try {
        const data = await fsPromises.readFile(personajesFilePath, 'utf8');
        const characters = JSON.parse(data);
        characters.push(newCharacter); 
        await fsPromises.writeFile(personajesFilePath, JSON.stringify(characters, null, 2), 'utf8');
        res.json(newCharacter); 
    } catch (error) {
        console.error('Error al agregar personaje:', error);
        res.status(404).send('Archivo no encontrado o error al agregar personaje'); 
    }
});

// Ruta para eliminar personajes con ID mayor a 25 del archivo JSON
app.delete('/api/remove-characters', async (req, res) => {
    try {
        const data = await fsPromises.readFile(personajesFilePath, 'utf8');
        let characters = JSON.parse(data); 
        const removedCharacters = characters.filter(character => character.id > 25);
        const removedIds = removedCharacters.map(character => character.id);
        characters = characters.filter(character => character.id <= 25);
        await fsPromises.writeFile(personajesFilePath, JSON.stringify(characters, null, 2), 'utf8');
        res.json({
            message: 'Personajes con ID mayor a 25 eliminados. Lista actualizada:',
            remainingCharacters: characters,
            removedIds: removedIds
        }); 
    } catch (error) {
        console.error('Error al eliminar personajes:', error);
        res.status(404).send('Archivo no encontrado o error al eliminar personajes'); 
    }
});

// Iniciar el servidor en el puerto
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
