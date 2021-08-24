import React, { useState, useEffect } from 'react';
import { getFireStore } from '../../firebase/firebase';
import { Link } from 'react-router-dom';

function Home(){
    
    const[itemCategorias, setItemCategorias] = useState([]);
    const[categorias, setCategorias] = useState([]);

    useEffect(() => {
        getItemCategorias();
    },[]);

    const getItemCategorias = () => {
        const firestore = getFireStore();
        const collection = firestore.collection("ItemCollection");
        let query = collection.get();
        query
            .then(res=>{
                res.forEach(doc=>{
                    if(!(categorias.includes(doc.data().categoria))){
                        categorias.push(doc.data().categoria);
                        setCategorias([...categorias]);
                        itemCategorias.push(doc.data());
                        setItemCategorias([...itemCategorias]);
                    }
                })
               
            });
    }
    
    return(
        <div>
            <h1 style={{textAlign:'center'}}>Bienvenidos a Cosmos Store</h1>
            <div className="card-group" style={{alignItems:'center',justifyContent:'center'}}>
            {itemCategorias.map((item) => (
               <div key={item.id} className="card text-white bg-dark mb-3" style={{maxWidth:'20rem',overflow:'hidden'}}>
                     <div className="card-body" style={{textAlign:'center'}}>
                     <Link to={`/Productos/Categoria/${item.categoria}`} className='nav-link' style={{color:'white'}}>
                        <h5 className="card-title">{item.categoria}</h5>
                    </Link>
                    </div>
                    <img className="card-img-top img-responsive" src={item.imgUrl} alt={item.alt} style={{width:'800px',height:'600px'}}/>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Home;
