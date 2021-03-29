import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
<<<<<<< HEAD
    const storagedCart = localStorage.getItem('@RocketShoes:cart');
=======
    const storagedCart = localStorage.getItem('@RocketShoes:cart')
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
<<<<<<< HEAD
       const updatedCart = [...cart];
       const productExists = updatedCart.find(product => product.id === productId);

       const stock = await api.get(`/stock/${productId}`);

       const stockAmount = stock.data.amount;
       const currentAmount = productExists ? productExists.amount : 0;
       const amount = currentAmount + 1;

       if (amount > stockAmount) {
         toast.error('Quantidade solicitada fora de estoque');
         return;
       }

       if (productExists) {
          productExists.amount = amount;
       } else {
          const product = await api.get(`/products/${productId}`);

          const newProduct = {
            ...product.data,
            amount: 1
          }

          updatedCart.push(newProduct);
       }

       setCart(updatedCart);
       localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));

    } catch {
       toast.error('Erro na adição do produto');
=======
      const productAlreadyInCart = cart.find(product => product.id === productId)

      if(!productAlreadyInCart) {
        const { data: product } = await api.get<Product>(`products/${productId}`)
        const { data: stock } = await api.get<Stock>(`stock/${productId}`)

        if(stock.amount > 0) {
          setCart([...cart, {...product, amount: 1}])
          localStorage.setItem('@RocketShoes:cart', JSON.stringify([...cart, {...product, amount: 1}]))
          toast('Adicionado')
          return;
        }
      }

      if(productAlreadyInCart) {
        const { data: stock } = await api.get(`stock/${productId}`)

        if (stock.amount > productAlreadyInCart.amount) {
          const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
            ...cartItem,
            amount: Number(cartItem.amount) + 1
          } : cartItem)
  
          setCart(updatedCart)
          localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
          return;
        } else {
          toast.error('Quantidade solicitada fora de estoque')
        }
      }
    } catch {
      toast.error('Erro na adição do produto')
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1
    }
  };

  const removeProduct = (productId: number) => {
    try {
<<<<<<< HEAD
       const updatedCart = [...cart];
       const productIndex = updatedCart.findIndex(product => product.id === productId);

       if (productIndex >= 0) {
          updatedCart.splice(productIndex, 1);
          setCart(updatedCart);
          localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
       } else {
          throw Error();
       }
    } catch {
       toast.error('Erro na remoção do produto');
=======
      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      if(!productExists) {
        toast.error('Erro na remoção do produto');
        return
      }

      const updatedCart = cart.filter(cartItem => cartItem.id !== productId)
      setCart(updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na remoção do produto');
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
<<<<<<< HEAD
       if (amount <= 0) {
         return;
       }

       const stock = await api.get(`/stock/${productId}`);

       const stockAmount = stock.data.amount;

       if (amount > stockAmount) {
         toast.error('Quantidade solicitada fora de estoque');
         return;
       } 

       const updatedCart = [...cart];
       const productExists = updatedCart.find(product => product.id === productId);

       if (productExists) {
         productExists.amount = amount;
         setCart(updatedCart);
         localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
       } else {
         throw Error();
       }

    } catch {
       toast.error('Erro na alteração de quantidade do produto');
=======
      if(amount < 1){
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const response = await api.get(`/stock/${productId}`);
      const productAmount = response.data.amount;
      const stockIsFree = amount > productAmount

      if(stockIsFree) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      const productExists = cart.some(cartProduct => cartProduct.id === productId)
      if(!productExists) {
        toast.error('Erro na alteração de quantidade do produto');
        return
      }

      const updatedCart = cart.map(cartItem => cartItem.id === productId ? {
        ...cartItem,
        amount: amount
      } : cartItem)
      setCart(updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
>>>>>>> 11c7e8669011fb881e77c7d7ca1f9ff23933ffe1
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}