import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {

    return(
        
        <div className="col">
           
            <div className='card text-white bg-dark mb-3' style={{width:'18rem',overflow:'hidden'}}>
                <img className='card-img-top' src={item.imgUrl} alt={item.alt} style={{width:'350px',height:'270px'}}/>
                <div className='card-body'>
                <Link to={`/Detalle/${item.id}`}>
                   <h5 className='card-title'>{item.titulo}</h5>
                </Link>
                   <p className='card-text'>{item.descripcion}</p>
                    <p className='card-text'>{'Categoria: '+item.categoria}</p>
                </div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item' style={{textAlign:'center'}}>${item.precio}M</li>
                </ul>
            </div>
        </div>
    
    );
}

export default Item;