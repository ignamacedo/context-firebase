import React,{ useState, useEffect} from 'react';
import { useParams } from 'react-router';
import ItemCount from './ItemCount';
import ItemDetail from './ItemDetail';
import { Link } from 'react-router-dom';
import {useCartContext} from '../context/Context';
import { getFireStore } from '../../firebase/firebase';

function ItemDetailContainer(){
    
    const {itemID} = useParams();
    const [product, setProduct] = useState([]);
    const [qty, setQty] = useState(1);
    const [mostrarBtn, setMostrarBtn] = useState(true);
    const [btn, setBnt] = useState(false);

    const { addToCart } = useCartContext();

    const onAdd = (form) => {
        form.preventDefault();
        setQty(form.target[0].value);
    }

    const terminarCompra = () => {
        setBnt(true);
        if(mostrarBtn){
            setMostrarBtn(!mostrarBtn);
        }
    }

    const getProduct = () => {
        const firestore = getFireStore();
        const collection = firestore.collection("ItemCollection");
        let query = collection.doc(itemID).get();
        query
            .then(doc=>{
                product.push(doc.data());
                setProduct([...product]);
            });
    }

    useEffect(()=>{
        getProduct();
    },[]);

    return (
        <div>
            {product.map(e =>{
                return (
                    <div key={e.id}>
                    {!mostrarBtn && <button className='btn btn-secondary' type='button' onClick={()=>addToCart(product,qty)} disabled={mostrarBtn}>
                        <Link className="nav-link" to='/Carrito' style={{color:'white'}}>
                            Agregaste {qty} items al carro - Terminar Compra
                        </Link>
                    </button>}
                    <ItemDetail 
                        id={e.id}
                        titulo={e.titulo}
                        precio={e.precio}
                        imgUrl={e.imgUrl}
                        alt={e.alt}
                        descripcion={e.descripcion}
                        categoria={e.categoria}
                    />
                    <ItemCount 
                        stock={e.stock} 
                        initial={e.initial}
                        onAdd={onAdd}
                        terminarCompra={terminarCompra}
                        mostrarBtn={mostrarBtn}
                  />
                    </div>
                )
            })}
        </div>
    );
}

export default ItemDetailContainer;
