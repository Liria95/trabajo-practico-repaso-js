import fetch from 'node-fetch';

// URL de la API de FakeStore
const API_URL = 'https://fakestoreapi.com/products';

// Punto 1: Recuperar la información de todos los productos (products)
export async function getAllProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error al recuperar los productos:', error);
    }
}

// Punto 2: Recuperar la información de un número limitado de productos (products)
export async function getLimitedProducts(limit) {
    try {
        const response = await fetch(`${API_URL}?limit=${limit}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error al recuperar productos limitados:', error);
    }
}

// Punto 3: Agregar un nuevo producto (product)
export async function addProduct(product) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
}

// Punto 4: Retornar un producto (product) según un “id” como parámetro
export async function getProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error al recuperar el producto por ID:', error);
    }
}

// Punto 5: Eliminar un producto (product)
export async function deleteProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}
