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
      /*cartItems.map((p)=>{
        let idCartItem = p[0].id;
        console.log(idCartItem)
        if(idCartItem.includes(item[0].id)){
          alert('SI');
        }else{
          alert('NO');
        }
      })*/
      
      
      /*if (cartItems.some(product => product[0].id === item.id)) {
       const copy = [...cartItems];
        const repeteadIndex = cartItems.findIndex(
          product => product[0].titulo === item.titulo
        );
        copy[repeteadIndex] = {
          ...copy[repeteadIndex],
          //qty: qty
          qty: copy[repeteadIndex].qty + qty
        };
        setCartItems(copy);
      } else {
        setCartItems([...cartItems, { ...item, qty }]);
      }*/
      setTotal(total + (qty * item[0].precio));
      setCartItems([...cartItems,{...item,qty}]);
    }

    const addToCart = (item,qty) => {
        addItem (item, qty);
        addCount(qty);
     };

     const deleteItem = (list) => {
      setCartItems(list);
     }
     

    return(
        <CartContext.Provider value={{cartCount, cartItems, addToCart, total, deleteItem}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

