import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect} from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
import {useCartContext} from '../context/Context';

function ItemDetail(){
    
    const {itemID} = useParams();
    const [product, setProduct] = useState([]);
    const [qty, setQty] = useState();

    const { addToCart } = useCartContext();

    const onAdd = (form) => {
        form.preventDefault();

        mostrarBtnComprar();
        setQty(form.target[0].value);
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
    })



    return (
        <div>
        <h1>ITEM DETAIL</h1>
        {product.map(e =>{
            return (
                <div>
                    <button className='btn btn-secondary' type='button' style={{display:'none'}} id='btnTerminarCompra' onClick={()=>addToCart(product,qty)}>
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
