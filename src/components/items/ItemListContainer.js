import React, { useEffect, useState } from 'react';
import Item from './Item';
import { getFireStore } from '../../firebase/firebase';

const ItemListContainer = (props) => {

  const [items,setItems] = useState([]);

  useEffect(()=>{
    //getItems();
    const firestore = getFireStore();
    //console.log(firestore);
    const collection = firestore.collection("ItemCollection");
    //console.log(collection);
    const query = collection.get(); 
    query.then((resultado)=>{
      //console.log(resultado);
      //console.log(resultado.docs);
      resultado.forEach(documento => {
        //console.log(documento.data());
        items.push(documento.data());
         setItems([...items]);
      });
    });
  },[]);
  
 /*const getItems = async() =>{
    const data = await fetch('http://localhost:4000/products');
    const responseData = await data.json();
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(setItems(responseData));
      },2000);
    });
  }*/
  
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