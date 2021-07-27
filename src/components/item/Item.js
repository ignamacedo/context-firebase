import React from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {

    const onAdd = (form) => {
        //evita comportamientos por defecto HTML, no recarga la pagina con el submit
        form.preventDefault();
        if(form.target[0].value === 1){
            alert('Se agrego ' + form.target[0].value + ' item');
        }else{
            alert('Se agregaron ' + form.target[0].value + ' items');
        }
    }
    
  
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
                    <li className='list-group-item' style={{textAlign:'center'}}>{item.precio}</li>
                </ul>
                <div className='card-body'>
                    <ItemCount 
                        stock={item.stock} 
                        initial={item.initial}
                        onAdd={onAdd}
                  />
                </div>
            </div>
        </div>
    
    );
}

export default Item;