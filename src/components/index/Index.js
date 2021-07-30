import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../navBar/NavBar';
import Home from '../pages/Home';
import ItemListContainer from '../item/ItemListContainer';
import Categories from '../pages/Categories';
import ItemDetail from '../item/ItemDetail';
import MasDeCosmos from '../pages/MasDeCosmos';
import Cart from '../pages/Cart';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CartProvider, { CartContext } from '../context/Context';

function Index(){
    return(
        <div>
            <CartProvider>
            <Router>
                <NavBar/>
                <Switch>
                    <Route path={'/'} exact component={Home}/>
                    <Route path={'/Productos'} exact component={ItemListContainer}/>
                    <Route path={'/MasDeCosmos'} exact component={MasDeCosmos}/>
                    <Route path={'/Productos/Categoria/:categoriaID'} exact component={Categories}/>
                    <Route path={'/Detalle/:itemID'} exact component={ItemDetail}/>
                    <Route path={'/Carrito'} exact component={Cart}/>
                </Switch>
            </Router>
            </CartProvider>
        </div>
        
    );
}

export default Index;