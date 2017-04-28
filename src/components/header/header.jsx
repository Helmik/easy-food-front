import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

export default class Header extends Component{
    constructor() {
        super();
    }
    render() {
        return (
            <AppBar
                title="Easy food"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}