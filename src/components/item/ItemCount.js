import React, {useState} from 'react';

function ItemCount(props){

    const [cantidad, setCantidad] = useState(props.initial);
    
    return(
        <div>
            <form onSubmit={(data) => props.onAdd(data)}>
                <input type='number' className='form-control' style={{width:'40%',textAlign:'center'}} disabled value={cantidad}/>
                <button className='btn btn-secondary' type='button' onClick={() => {setCantidad((cantidad > props.initial)? cantidad - 1 : cantidad)}}> - </button>
                <button className='btn btn-secondary' type='button' onClick={() => {setCantidad((cantidad < props.stock)? cantidad + 1 : cantidad)}}> + </button>
                <button className='btn btn-primary' type='submit' >Agregar al carrito</button>
            </form>
        </div>
    );
}

export default ItemCount;