import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Item from '../items/Item';
import { getFireStore } from '../../firebase/firebase';

function Categories(){

    const {categoriaID} = useParams();
    const [productosCategoria, setProductosCategoria] = useState([]);

    useEffect(()=>{
        getItemsCategoria();
        vaciarLista();
    },[categoriaID]);

    const getItemsCategoria = () => {
        const firestore = getFireStore();
        const collection = firestore.collection("ItemCollection");
        const query = collection.get(); 
        query.then((resultado)=>{
          resultado.forEach(documento => {
              if(categoriaID === documento.data().categoria){
                productosCategoria.push(documento.data());
                setProductosCategoria([...productosCategoria]);
              }
            });
        });
    }

    const vaciarLista = () => {
        setProductosCategoria(productosCategoria.splice(0,productosCategoria.length));
    }

    return(
        <div>
            <h1>Categoria {categoriaID}</h1>
            
            <div className="container-fluid">
            <div className="row">
            {(productosCategoria.length === 0) ? 
                <p>LOADING....</p>
                :
                productosCategoria.map((e) => (
                    <div  key={e.id} className="col">
                        <Item key={e.id} item={e}/>
                    </div>
                ))
            }
            </div>
            </div>
        </div>
    );
}

export default Categories;