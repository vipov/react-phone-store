import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg'
import {FaShoppingCart} from 'react-icons/fa';
import styled from 'styled-components';
import {ButtonContainer} from './Button';

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper>
                <nav className="navbar navbar-expand-sm navbar-dark px-sm-5">
                    <Link to='/'>
                        <img src={logo} alt="store" 
                        className="navbar-brand" />
                    </Link>
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item ml-5">
                                <Link to="/" className="nav-link">
                                    products
                                </Link>
                        </li>
                    </ul>
                    <Link to='/cart' className="ml-auto">
                        <ButtonContainer>
                            <span className="mr-2">
                            <FaShoppingCart/>
                            </span>
                            my cart
                        </ButtonContainer>
                    </Link>
                </nav>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
    .nav-link{
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
    }
`



// odpowiedz tak, zeby przemycic tam cos od siebie, cos prywatnego i ciekawego, w formie zartu, ale tak, zeby to nie bylo jasne, chyba ze Ci niewygodnie z tematem to odpowiedz cos neutralnego na powaznie