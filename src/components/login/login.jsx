import React, {Component} from 'react';

import './login.css';
import hamburguerImg from './assets/images/hamburguer.jpg'
import meatImg from './assets/images/meat.jpg'
import pizzaImg from './assets/images/pizza.jpg'
import wingsImg from './assets/images/wings.jpg'
import { Button } from 'reactstrap';

export default class Login extends Component {
    constructor() {
        super();
        const images = [hamburguerImg, meatImg, pizzaImg, wingsImg];
        this.state = {
            image: pizzaImg
        }
        setInterval(() => this.selectImage(images), 3500);
    }

    render() {
        return (
            <div className="container" style={{backgroundImage: 'url('+ this.state.image + ')'}}>
                <div className="login-container">
                    <div className="center-child">
                        <label className="text-content">User:</label>
                        <input type="text"/>
                    </div>
                    <div className="center-child">
                        <label className="text-content">Password:</label>
                        <input type="password"/>
                    </div>
                    <div>
                        <Button color="primary" size="sm">Login</Button>
                    </div>
                </div>
            </div>
        );
    }

    selectImage(imagesArray) {
        let index = Math.floor(Math.random()*imagesArray.length);
        this.setState({
            image: imagesArray[index]
        })
    }
}