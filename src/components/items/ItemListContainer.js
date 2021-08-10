import React, { useEffect, useState } from 'react';
import Item from './Item';
import { getFireStore } from '../../firebase/firebase';

const ItemListContainer = (props) => {

  const [items,setItems] = useState([]);

  useEffect(()=>{
    const firestore = getFireStore();
    const collection = firestore.collection("ItemCollection");
    const query = collection.get(); 
    query.then((resultado)=>{
      resultado.forEach(documento => {
        items.push(documento.data());
         setItems([...items]);
      });
    });
  },[]);
  
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