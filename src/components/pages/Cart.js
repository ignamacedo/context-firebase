import React, {useState }  from 'react';
import { useCartContext} from '../context/Context';
import { Link } from 'react-router-dom';
import { getFireStore } from '../../firebase/firebase';

function Cart(){

    const { cartItems, total, deleteItemContext, limpiarLista} = useCartContext();
    const [cartList, setCartList] = useState(cartItems);
    const [terminarCompra, setTerminarCompra] = useState(false);


    const eliminarItemCart = (item) =>{
      const copia = [...cartList];
      const index = cartList.findIndex(p => p[0].id === item[0].id);
      copia.splice(index,1);
      setCartList(copia);
    
      deleteItemContext(item);
    }

  const nuevaOrden = (form) => {
    form.preventDefault();
    
    const  orden = {
      buyer : {
          name : form.target[0].value, 
          phone : form.target[1].value, 
          email : form.target[2].value
    },
    orden : cartList,
    total : total,
    date : Date.now()
    }

    const firestore = getFireStore();
    const collection = firestore.collection("OrderCollector");
    const query = collection.add(orden);
    query
      .then((res)=>{
        //console.log(res);
        //console.log("Se creo la orden");
        setTerminarCompra(res.id);
        limpiarLista();
        setCartList([]);
      })
      .catch((err) =>{
        console.log(err);
      })
  };

    return (
      <div>
        <h1>
          Cart
        </h1>
        {terminarCompra && <div className="alert alert-success" role="alert">Confirmacion de compra: {terminarCompra}</div>} 
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
              <form onSubmit={(data) => {nuevaOrden(data)}}>
                <div style={{padding:'5px'}}>
                  <p style={{fontWeight:'bold'}}>Para finalizar la compra ingrese:</p>
                  <input type="text" style={{width:'250px'}} className="form-control" name="name" placeholder="Nombre" required/>
                  <input type="text" style={{width:'250px'}} className="form-control" name="phone" placeholder="Telefono" required/>
                  <input type="text" style={{width:'250px'}} className="form-control" name="email" placeholder="Email" required/>
                  <button className='btn btn-success' type='submit'>Finalizar Compra</button>
                </div>
              </form>
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
              </div>
              </div>
            </div>
            }
        
      
        
      </div>
    );
}

export default Cart;