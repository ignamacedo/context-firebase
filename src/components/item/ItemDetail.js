import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect, useContext} from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
//import contexto from '../context/Context';

function ItemDetail(){
    
    const {itemID} = useParams();
    
    const [cart,setCart] = useState([]);
    const [product, setProduct] = useState([]);

    //let {item, validoCart} = useContext(contexto);

    const clickTerminarCompra = () =>{
        //validoCart();
    }

    const onAdd = (form) => {
        form.preventDefault();

        mostrarBtnComprar();

        let itemAdd = [];
        {product.map(e =>{
            itemAdd = {
                producto:e.titulo,
                imgUrl:e.imgUrl,
                precio:e.precio,
                cantidad:form.target[0].value
            }
            setCart([...cart,itemAdd]);
        })}
        
        console.log(itemAdd);
    }

    const mostrarBtnComprar = () => {
        document.getElementById('btnTerminarCompra').style.display = 'block';
    } 

    const getProduct = async () =>{
        let data = await fetch(`http://localhost:4000/product/${itemID}`);
        const responseData = await data.json();
        return new Promise((res, rej) => {
        setTimeout(() => {
            res(setProduct(responseData));
        },2000);
        });
    }

    useEffect(() => {
        getProduct()
    },)



    return (
        <div>
        <h1>ITEM DETAIL</h1>
        {product.map(e =>{
            return (
                <div>
                    <button className='btn btn-secondary' type='button' style={{display:'none'}} id='btnTerminarCompra' onClick={clickTerminarCompra}>
                        <Link className="nav-link" to='/Carrito' style={{color:'white'}}>
                            Terminar mi Compra
                        </Link>
                    </button>
                    <h1>{e.titulo}</h1>
                    <h4>{e.precio}</h4>
                    <img src={e.imgUrl} alt={e.alt} style={{width:'300px',height:'300px'}}/>
                    <h2>{e.descripcion}</h2>
                    <h3>{'Categoria: '+e.categoria}</h3>
                     <ItemCount 
                        stock={e.stock} 
                        initial={e.initial}
                        onAdd={onAdd}
                  />
                </div>
            )
        })}
        </div>
    );
}

export default ItemDetail;
