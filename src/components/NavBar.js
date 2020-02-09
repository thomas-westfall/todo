import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AllTodos.css';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-fixed-top">
            <Link className="btn btn-primary" to='/home'>Home</Link>
            <Link className="btn btn-light" to='/create'>+</Link>
          </nav>
        )
    }
}

export default NavBar;