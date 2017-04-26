import React, {Component} from 'react';

import './login.css';
import hamburguerImg from './assets/images/hamburguer.jpg'
import meatImg from './assets/images/meat.jpg'
import pizzaImg from './assets/images/pizza.jpg'
import wingsImg from './assets/images/wings.jpg'
import { Button, Input, FormGroup, Label } from 'reactstrap';

export default class Login extends Component {
    constructor() {
        super();
        const images = [hamburguerImg, meatImg, pizzaImg, wingsImg];
        this.state = {
            image: pizzaImg,
            username: '',
            password: ''
        }
        setInterval(() => this.selectImage(images), 3500);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        return (
            <div className="container" style={{backgroundImage: 'url('+ this.state.image + ')'}}>
                <div className="login-container">
                    <FormGroup>
                        <Label>Username</Label>
                        <Input placeholder="Username" value={this.state.username} onChange={this.onChangeUsername}/>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Password" onClick={this.login} value={this.state.password} onChange={this.onChangePassword}/>
                    </FormGroup>
                    <div>
                        <Button color="primary" onClick={this.login}>Login</Button>
                    </div>
                </div>
            </div>
        );
    }
    onChangePassword(event) {
        this.setState({password: event.target.value});
    }
    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    login(evemt) {
        console.log(this.state);
    }

    selectImage(imagesArray) {
        let index = Math.floor(Math.random()*imagesArray.length);
        this.setState({
            image: imagesArray[index]
        })
    }
}