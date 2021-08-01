import React from 'react';
import { useCartContext } from '../context/Context';

function Cart(){

    const { cartItems } = useCartContext();
    console.log(cartItems);
    return (
      <div>
        <h1>Cart</h1>
        {(cartItems.length === 0) ? 
            <h5>TODAVIA NO HAY PRODUCTOS EN EL CARRITO</h5>
            :
            cartItems.map((item,i) => (
              <div>
                <h1>{item.titulo}</h1>
                <h4>{'Cantidad: '+item.qty}</h4>
                <h4>{item[i].precio}</h4>
                <img src={item[i].imgUrl} alt={item[i].alt} style={{width:'300px',height:'300px'}}/>
                <h2>{item[i].descripcion}</h2>
                <h3>{'Categoria: '+item[i].categoria}</h3>
              </div>
            ))
            }
        
      
        
      </div>
    );
}

export default Cart;