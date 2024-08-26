import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

// Crear una instancia de la aplicación Express
const app = express();
const port = 3000;

// Middleware para servir archivos estáticos (si es necesario)
app.use(express.static('public'));

// Middleware para analizar el cuerpo de las solicitudes POST como JSON
app.use(express.json());
app.use(cors());

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Error fetching products');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// Ruta para obtener productos con límite
app.get('/api/products/limit', async (req, res) => {
    const { limit } = req.query;
    try {
        const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
        if (!response.ok) throw new Error('Error fetching limited products');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching limited products');
    }
});

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
    const newProduct = req.body;
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        if (!response.ok) throw new Error('Error adding product');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

// Ruta para obtener un producto por ID
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Error fetching product');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching product');
    }
});

// Ruta para eliminar un producto por ID
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error deleting product');
        res.json({ message: `Product with ID ${id} deleted successfully` });
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
});

// Iniciar el servidor en el puerto
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
