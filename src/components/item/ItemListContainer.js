import React, { useEffect, useState } from 'react';
//import {ItemList} from './ItemList';
import Item from './Item';
//import { Link } from 'react-router-dom';

const ItemListContainer = (props) => {

  const [items,setItems] = useState([]);

  useEffect(()=>{
    getItems();
    //ItemList().then(res => setItems(res));
  },[]);
  
  //si es asyncronica tengo que esperar a que se resuelva la llamada al archivo local (tambien puede ser una llamada rmeota y se trabaja d ela misma manera)
  /*const getItems = async() =>{
    //espero que la data se fetchee
    const data = await fetch('../JSON/DataList.json');
    //aplico metodo JSON() para extraer la respuesta a la peticion
    //responseData, es la data obtenida pero convertida para poder extraer los datos
    //si no uso el await antes de convertirlo, no va a esperar a que se resuelva la peticion para convertitlo
    //ya que lo intentaria a resolverlo en el primer momento sin esperar
    //tira undefined si no agrego await
    const responseData = await data.json();
    //console.log('Soy la data del JSON', responseData);
    setItems(responseData);
  }*/

//para lanzar el servidor hago
  //me ubico en la carpeta Server 
  //ejecuto npx nodemon
  //depsues dlevanto el propyecto

  //terminar de ver AfterClass0719 00:21:45

  //URL params al hacer click en un producto de la lista d eproductos uso URL params para redireccionar
  //y voisualiozar los datos de un producto!
  //http://localhost:4000/product/1

  
  const getItems = async() =>{
    //const data = await fetch('../JSON/DataList.json');
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
              <Item item={item}/>
            ))
            }
        </div>
      </div>
    </div>
    );
}

export default ItemListContainer;