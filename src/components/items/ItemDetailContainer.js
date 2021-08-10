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
 
    /*const getProduct = async () =>{
        let data = await fetch(`http://localhost:4000/product/${itemID}`);
        const responseData = await data.json();
        return new Promise((res, rej) => {
        setTimeout(() => {
            res(setProduct(responseData));
        },2000);
        });
    }*/

    /*useEffect(() => {
        const firestore = getFireStore();
        //console.log(firestore);
        const col = firestore.collection("ItemCollection");
        //console.log(col);
        const condicion = col.where('id', '==', 3); //itemID
        //console.log(condicion);
        condicion.get().then((qs) => {
            if(qs.size === 0){
                console.log('vacio');
            }
            setProduct(qs.docs.map(doc => doc.data())); 
        })
    },[]);*/

    /*useEffect(() => {
        //getProduct();
        const firestore = getFireStore();
        //console.log(firestore);
        const collection = firestore.collection("ItemCollection");
        //console.log(collection);
        const condicion = collection.where('id', '==', 4); //itemID
        //console.log(condicion);
        const query = condicion.get();
        //console.log(query);
        query.then((res)=>{
            res.forEach(doc => {
            product.push(doc.data());
            setProduct([...product]); 
            //console.log(doc.data());
          });
        });
    },[]);*/

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
              if(itemID === documento.id){
                  product.push(documento.data());
                  setProduct([...product]);
                  //console.log(documento.data());
              }
            });
        });
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
