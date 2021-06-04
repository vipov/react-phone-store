import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCaretSquareDown, FaTimesCircle} from 'react-icons/fa';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Details from './components/Details';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import {Switch, Link, Route} from "react-router-dom"
import Modal from './components/Modal'
export default class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Modal/>
      </>
    )
  }
}


