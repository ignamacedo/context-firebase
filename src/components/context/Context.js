import React, { useContext, useState } from 'react';

export const CartContext = React.createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({children}) =>{
    //const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item,qty) => {
        if (cartItems.some(product => product.titulo === item.titulo)) {
          const copy = [...cartItems];
          const repeteadIndex = cartItems.findIndex(
            product => product.titulo === item.titulo
          );
          copy[repeteadIndex] = {
            ...copy[repeteadIndex],
            qty: copy[repeteadIndex].qty + qty
          };
          setCartItems(copy);
        } else {
          setCartItems([...cartItems, { ...item, qty }]);
        }
       
      
       /* cartItems.push(item[item.findIndex(item.id)]);
        console.log(cartItems);
      
        setCartItems(cartItems);*/
      };

    return(
        <CartContext.Provider value={{/*cartCount,*/ cartItems, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

