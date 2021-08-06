import React from 'react';
 
function ItemDet(props){

    return (
        <div>
            <h1>ITEM DETAIL</h1>
            <div key={props.id}>
                <h1>{props.titulo}</h1>
                <h4>${props.precio}M</h4>
                <img src={props.imgUrl} alt={props.alt} style={{width:'300px',height:'300px'}}/>
                <h2>{props.descripcion}</h2>
                <h3>{'Categoria: '+props.categoria}</h3>
            </div>
        </div>
    );
}

export default ItemDet;
