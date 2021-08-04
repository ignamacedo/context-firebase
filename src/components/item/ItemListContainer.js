import React, { useEffect, useState } from 'react';
import Item from './Item';

const ItemListContainer = (props) => {

  const [items,setItems] = useState([]);

  useEffect(()=>{
    getItems();
  },[]);
  
 
 const getItems = async() =>{
    const data = await fetch('http://localhost:4000/products');
    const responseData = await data.json();
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(setItems(responseData));
      },2000);
    });
  }
  
  return(
    <div>
     <div className="container-fluid">
        <div className="row">
          <h1>Productos</h1>
          {(items.length === 0) ? 
            <p>LOADING....</p>
            :
            items.map((item) => (
              <Item key={item.id} item={item}/>
            ))
            }
        </div>
      </div>
    </div>
    );
}

export default ItemListContainer;