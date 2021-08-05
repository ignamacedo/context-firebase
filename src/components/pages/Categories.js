import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Item from '../items/Item';

function Categories(){

    const {categoriaID} = useParams();

    const [productosCategoria, setProductosCategoria] = useState([]);

    const getItemsCategoria = async() =>{
        const data = await fetch(`http://localhost:4000/product/category/${categoriaID}`);
        const responseData = await data.json();
        return new Promise((res, rej) => {
            setTimeout(() => {
              res(setProductosCategoria(responseData));
            },);
          });
    }

    useEffect(()=>{
        getItemsCategoria();
    },[categoriaID]);

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