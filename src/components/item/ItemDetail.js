import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect} from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
import {useCartContext} from '../context/Context';

function ItemDetail(){
    
    const {itemID} = useParams();
    const [product, setProduct] = useState([]);
    const [qty, setQty] = useState(1);
    const [mostrarBtn, setMostrarBtn] = useState(true);

    const { addToCart } = useCartContext();

    const onAdd = (form) => {
        form.preventDefault();
        setQty(form.target[0].value);
    }

    const terminarCompra = () => {
        setMostrarBtn(!mostrarBtn);
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
        getProduct();
    });

    return (
        <div>
        <h1>ITEM DETAIL</h1>
        {product.map(e =>{
            return (
                <div key={e.id}>
                    {!mostrarBtn && <button className='btn btn-secondary' type='button' onClick={()=>addToCart(product,qty)} disabled={mostrarBtn}>
                        <Link className="nav-link" to='/Carrito' style={{color:'white'}}>
                            Agregaste {qty} items al carro - Terminar Compra
                        </Link>
                    </button>}
                    <h1>{e.titulo}</h1>
                    <h4>${e.precio}M</h4>
                    <img src={e.imgUrl} alt={e.alt} style={{width:'300px',height:'300px'}}/>
                    <h2>{e.descripcion}</h2>
                    <h3>{'Categoria: '+e.categoria}</h3>
                     <ItemCount 
                        stock={e.stock} 
                        initial={e.initial}
                        onAdd={onAdd}
                        terminarCompra={terminarCompra}
                        mostrarBtn={mostrarBtn}
                  />
                </div>
            )
        })}
        </div>
    );
}

export default ItemDetail;
