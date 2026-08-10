import { Product } from "../types/products";

export function addOrIncreaseProduct(
    selectedProducts: Product[],
    product: Product
) {

    const existingProduct = selectedProducts.find(
        p => p.productName === product.productName
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        selectedProducts.push(product);
    }
}