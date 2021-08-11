import React, { useState, useEffect } from 'react'; 
import CartWidget from './CartWidget';
import logo from '../../img/logo.png';
import { Link, NavLink } from 'react-router-dom'
import { useCartContext} from '../context/Context';
import { getFireStore } from '../../firebase/firebase';

function NavBar(){

const { cartCount } = useCartContext();
const [categorias, setCategorias] = useState([]) ;


const getCategorias = () => {
    const firestore = getFireStore();
    const collection = firestore.collection("ItemCollection");
    let query = collection.get();
    query
        .then(res=>{
            res.forEach(doc=>{
                if(!(categorias.includes(doc.data().categoria))){
                    //console.log(doc.data());
                    categorias.push(doc.data().categoria);
                    setCategorias([...categorias]);
                }
            })
           
        });
    }

    useEffect(()=>{
        getCategorias();
    },[]);

    return(
        
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">Inicio</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/Productos' className="nav-link dropdown-toggle">Productos</Link>
                        <ul>
                            {categorias.map((c)=>(
                                    <li key ={c}>
                                        <NavLink className='nav-link dropdown-item' to={`/Productos/Categoria/${c}`} activeClassName='activo'>{c}</NavLink>   
                                    </li>
                                ))
                           }
                        </ul>
                    </li>
                    <li className="nav-item">
                    <Link to="/MasDeCosmos" className="nav-link">Mas de Cosmos</Link>
                    </li>
                </ul>
            </div>
            <div className="mx-auto order-0">
                <a className="navbar-brand" href="/">
                    <img src={logo} width="41" height="41" alt="Logo"/>
                    Cosmos Store
                </a>
            </div>
            <div></div>
            <div className="navbar-collapse collapse w-100 order-2 dual-collapse2 justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <button className="btn btn-dark">
                        <Link to="/Carrito" className="nav-link"><CartWidget qty={cartCount}/></Link> 
                    </button>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
