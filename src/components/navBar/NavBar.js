import React, { useContext } from 'react'; 
import CartWidget from './CartWidget';
import logo from '../../img/logo.png';
import { Link, NavLink } from 'react-router-dom'
import { CartContext, useCartContext} from '../context/Context';

function NavBar(){

/*const { items } = useContext(CartContext);
console.log(items);*/
const { items, cartCount } = useCartContext();

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
                            <li>
                                <NavLink className="nav-link dropdown-item" to='/Productos/Categoria/estrellas' activeClassName='activo'>Estrellas</NavLink>   
                            </li>
                            <li>
                                <NavLink className="nav-link dropdown-item" to='/Productos/Categoria/planetas' activeClassName='activo'>Planetas</NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link dropdown-item" to='/Productos/Categoria/satelites' activeClassName='activo'>Satelites</NavLink>
                            </li>
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
                        {cartCount} <Link to="/Carrito" className="nav-link"><CartWidget/></Link> 
                    </button>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
