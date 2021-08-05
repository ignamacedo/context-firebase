import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../navBar/NavBar';
import Home from '../pages/Home';
import ItemListContainer from '../items/ItemListContainer';
import Categories from '../pages/../pages/Categories';
import ItemDetailContainer from '../items/ItemDetailContainer';
import MasDeCosmos from '../pages/MasDeCosmos';
import Cart from '../pages/Cart';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CartProvider from '../context/Context';

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
                        <Route path={'/Detalle/:itemID'} exact component={ItemDetailContainer}/>
                        <Route path={'/Carrito'} exact component={Cart}/>
                    </Switch>
                </Router>
            </CartProvider>
        </div>
        
    );
}

export default Index;