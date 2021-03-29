import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
<<<<<<< HEAD
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
=======
     sumAmount[product.id] = product.amount;
     return sumAmount;
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
<<<<<<< HEAD
      const response = await api.get<Product[]>('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }));

      setProducts(data);
=======
      const response = await api.get('products');
      const productsFormatted = response.data.map(function(product: Product){
        return { ...product, priceFormatted: formatPrice(product.price) }
      })
      setProducts(productsFormatted);
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
        <img src={product.image} alt={product.title} />
        <strong>{product.title}</strong>
<<<<<<< HEAD
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0} 
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
      
=======
        <span>{product.priceFormatted}</span>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={() => handleAddProduct(product.id)}
        >
          <div data-testid="cart-product-quantity">
            <MdAddShoppingCart size={16} color="#FFF" />
            {cartItemsAmount[product.id] || 0} 
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      ))}
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1
    </ProductList>
  );
};

export default Home;
