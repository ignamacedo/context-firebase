import React, { useContext, useState } from 'react';

export const CartContext = React.createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({children}) =>{
    const [cartCount, setCartCount] = useState(0);
    const items = [];

    const updateCartCount = (cant) =>{
        setCartCount();
    }

    return(
        <CartContext.Provider value={{items, cartCount}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

