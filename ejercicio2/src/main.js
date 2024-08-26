import { getAllProducts, getLimitedProducts, addProduct, getProductById, deleteProductById } from './fetchProducts.js';

// Mostrar todos los productos
async function showAllProducts() {
    const products = await getAllProducts();
    console.log('=== Todos los productos ===');
    console.log(products);
}

// Mostrar productos limitados
async function showLimitedProducts(limit) {
    const products = await getLimitedProducts(limit);
    console.log('\n=== Productos limitados ===');
    console.log(products);
}

// Agregar un nuevo producto
async function createProduct() {
    const newProduct = {
        title: 'New Product',
        price: 19.99,
        description: 'This is a new product',
        category: 'electronics',
        image: 'https://via.placeholder.com/150',
        rating: {
            rate: 4.5,
            count: 10
        }
    };
    const product = await addProduct(newProduct);
    console.log('\n=== Producto agregado ===');
    console.log(product);
}

// Obtener un producto por ID
async function fetchProductById(id) {
    const product = await getProductById(id);
    console.log(`\n=== Producto con ID ${id} ===`);
    console.log(product);
}

// Eliminar un producto por ID
async function removeProductById(id) {
    const response = await deleteProductById(id);
    console.log(`\n=== Producto con ID ${id} eliminado ===`);
    console.log(response);
}

// Ejecutar las funciones
(async function main() {
    await showAllProducts();
    await showLimitedProducts(5);
    await createProduct();
    await fetchProductById(1);
    await removeProductById(1); 
})();