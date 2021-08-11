import React, { useContext, useState } from 'react';

export const CartContext = React.createContext();

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({children}) =>{
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const addCount = (qty) => {
      setCartCount(Number(cartCount) + Number(qty));
    }
    const addItem = (item, qty) =>{
      if(cartItems.some(p => p[0].id === item[0].id)){
        const copia = [...cartItems];
        const index = cartItems.findIndex(p => p[0].id === item[0].id);
        //console.log(index);
        //console.log(copia[index]);
        copia[index] = {...copia[index], qty: Number(copia[index].qty) + Number(qty)};
        setCartItems(copia);
        //console.log(cartItems);
      }else{
        setCartItems([...cartItems,{...item,qty}]);
      }
      setTotal(total + (qty * item[0].precio));
    }

    const addToCart = (item,qty) => {
        addItem (item, qty);
        addCount(qty);
     };

     const deleteItemContext = (item) => {
      const copia = [...cartItems];
      const index = cartItems.findIndex(p => p[0].id === item[0].id);
      const cantCartDelete = copia[index].qty;
      setCartCount(cartCount - cantCartDelete);
      copia.splice(index,1);
      setCartItems(copia);
     }

     const limpiarLista = () => {
      setCartCount(0);
      setCartItems([]);
     };

    return(
        <CartContext.Provider value={{cartCount, cartItems, addToCart, total, deleteItemContext, limpiarLista}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

