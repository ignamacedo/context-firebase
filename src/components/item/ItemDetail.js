import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom'

function ItemDetail(){
    
    const {itemID} = useParams();
    const [cart,setCart] = useState([]);
    
    const [product, setProduct] = useState([]);

    const onAdd = (form) => {
        form.preventDefault();
        if(form.target[0].value === 1){
            alert('Se agrego ' + form.target[0].value + ' item');
        }else{
            alert('Se agregaron ' + form.target[0].value + ' items');
        }

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
                    <h1>{e.titulo}</h1>
                    <img src={e.imgUrl} alt={e.alt} style={{width:'600px',height:'600px'}}/>
                    <h2>{e.descripcion}</h2>
                    <h3>{'Categoria: '+e.categoria}</h3>
                    <h4>{e.precio}</h4>
                    <button className='btn btn-secondary' type='button' style={{display:'none'}} id='btnTerminarCompra'>
                        <Link className="nav-link" to={`/Carrito`}>
                            Terminar mi Compra
                        </Link>
                    </button>
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
