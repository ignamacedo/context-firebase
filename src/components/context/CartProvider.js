import React, {useState} from 'react';
import { Provider } from './Context';

function CartProvider({children}){

    const [cart, setCart] = useState();

    //validar que no acepte duplicados y que mantenga su consistencia
    const validoCart = (cart) => {
        console.log(cart);
    }

    return(
        <Provider value={{cart, validoCart}}>
            {children}
        </Provider>
    );
}

export default CartProvider;