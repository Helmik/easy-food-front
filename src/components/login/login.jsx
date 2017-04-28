import React, {Component} from 'react';
import './login.css';
import hamburguerImg from './assets/images/hamburguer.jpg';
import meatImg from './assets/images/meat.jpg';
import pizzaImg from './assets/images/pizza.jpg';
import wingsImg from './assets/images/wings.jpg';
import LoginService from '../../services/loginService';
import Style from '../../scenes/styles';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const loginService = new LoginService();

export default class Login extends Component {
    constructor() {
        super();
        const images = [hamburguerImg, meatImg, pizzaImg, wingsImg];
        let imageInterval = setInterval(() => this.selectImage(images), 3500);
        this.state = {
            image: pizzaImg,
            username: '',
            password: '',
            open: false,
            imageInterval,
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }
    render() {
        let style = {
            margin: "12px 0px",
        }
        return (
            <div id="background-image" className="container" style={{backgroundImage: 'url('+ this.state.image + ')'}}>
                <div className="login-container">
                    <TextField
                        hintText="Username"
                        floatingLabelText="Username"
                        onChange={this.onChangeUsername}
                    /><br />
                    <TextField
                        hintText="Password"
                        floatingLabelText="Password"
                        type="password"
                        onChange={this.onChangePassword}
                    />
                    <div>
                        <div>
                            <RaisedButton label="Login" primary={true} style={style} onTouchTap={this.login}/>
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={this.state.open}
                    message={'Username or password incorrect.'}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={Style.dangerAlert}
                />
            </div>
        );
    }
    onChangePassword(event) {
        this.setState({password: event.target.value});
    }
    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    handleSnackbarClose() {
        this.setState({open: false});
    }
    login(event) {
        loginService.login(this.state.username, this.state.password)
            .then(response => {
                localStorage.setItem('token', response.id);
                localStorage.setItem('userId', response.userId);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({open: true});
            });
    }
    selectImage(imagesArray) {
        if(document.getElementById('background-image')){
            let index = Math.floor(Math.random()*imagesArray.length);
            this.setState({
                image: imagesArray[index]
            })
        } else {
            clearInterval(this.state.imageInterval);
        }
    }
}