import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import ItemCount from './ItemCount';

function ItemDetail(){
    
    const {itemID} = useParams();
    
    const [product, setProduct] = useState([]);

    const onAdd = (form) => {
        //evita comportamientos por defecto HTML, no recarga la pagina con el submit
        form.preventDefault();
        if(form.target[0].value === 1){
            alert('Se agrego ' + form.target[0].value + ' item');
        }else{
            alert('Se agregaron ' + form.target[0].value + ' items');
        }
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
        
    }, )



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
