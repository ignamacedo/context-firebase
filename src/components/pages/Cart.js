import React, {useState }  from 'react';
import { useCartContext} from '../context/Context';
import { Link } from 'react-router-dom';

function Cart(){

    //falta renderizar cuando un elemento se elmina de la lista
    const { cartItems, total, deleteItemContext} = useCartContext();
    const [cartList, setCartList] = useState(cartItems);

    const eliminarItemCart = (item) =>{
      const copia = [...cartList];
      const index = cartList.findIndex(p => p[0].id === item[0].id);
      copia.splice(index,1);
      setCartList(copia);
    
      deleteItemContext(item);
    }

    return (
      <div>
        <h1>Cart</h1>
        {(cartList.length === 0) ? 
            <div>
            <h5 className="alert alert-dark" style={{textAlign:'center'}}>TODAVIA NO HAY PRODUCTOS EN EL CARRITO</h5>
            <button className='btn btn-secondary' type='button'>
              <Link className="nav-link" to='/Productos' style={{color:'white'}}>
                Ver Productos
              </Link>
            </button>
            </div>

            :
            <div>
              <div style={{textAlign:'center'}}>
              <h2 className="alert alert-dark" style={{textAlign:'center'}}>TOTAL: ${total}M</h2>
              <button className='btn btn-secondary' type='button'>
                <Link className="nav-link" to='/Productos' style={{color:'white'}}>
                  Continuar Comprando
                </Link>
              </button>
              </div>

              <div className="container-fluid">
              <div className="row">
              {cartList.map((p,i) => (
                <div key={i} className="col">
                  <div className='card text-white bg-dark mb-3' style={{width:'18rem',overflow:'hidden'}}>
                    <img className='card-img-top'src={p[0].imgUrl} alt={p[0].alt} style={{width:'350px',height:'270px'}}/>
                    <div className='card-body'>
                      <h5 className='card-title'>{p[0].titulo}</h5>
                      <p className='card-text'>Cantidad: {p.qty}</p>
                      </div>
                      <ul className='list-group list-group-flush'>
                        <li className='list-group-item' style={{textAlign:'center'}}>${p[0].precio}M</li>
                        <li style={{textAlign:'center'}}><button onClick={()=>{eliminarItemCart(p)}} className="btn btn-danger" >Quitar Item de la Lista</button></li>
                      </ul>
                      
                </div>
                </div>
              ))}
              </div></div>
            </div>
            }
        
      
        
      </div>
    );
}

export default Cart;