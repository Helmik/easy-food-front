import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import PlaceService from '../../services/placeService';
import Style from '../../scenes/styles';
import './dashboard.css';

const placeService = new PlaceService();
export default class Dashboard extends Component {
    constructor() {
        super();
        let places = this.getPlaces();
        this.state = {
            snackbarOpen: false,
            snackbarMessage: '',
            places,
        }
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.getPlaces = this.getPlaces.bind(this);
    }
    getPlaces() {
        placeService.getAll()
            .then(data => {
                this.setState({places: data});
                this.render();
                return data;
            })
            .catch(err => {
                this.setState({snackbarMessage: 'We could not get places list.'});
                this.setState({snackbarOpen: true});
                return null;
            });
    }
    handleSnackbarClose() {
        this.setState({snackbarOpen: false});
    }
    handleExpandChange(index) {
        let places = this.state.places;
        places[index].expanded = !!!places[index].expanded;
        this.setState({places,})
    }
    render() {
        let renderPlaces = [];
        if(this.state.places){
             this.state.places.forEach( (place, index) => {
                 renderPlaces.push( (
                        <Card expanded={this.state.places[index].expanded} onExpandChange={this.handleExpandChange(index)}>
                            <CardHeader
                                title={place.name}
                                subtitle={place.address}
                            />
                            <CardText>
                                <Toggle
                                    toggled={this.state.places[index].expanded}
                                    onToggle={this.handleExpandChange(index)}
                                />
                            </CardText>
                        </Card>
                    )
                )
             })
        }
        return (
            <div className="places-container">
                <div className="places">
                    {renderPlaces}
                </div>
                <div className="map">2237472364726487236847263874238746</div>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={Style.dangerAlert}
                />
            </div>
        );
    }

    /*render() {
        placeService.getAll()
            .then(data => {
                console.log(data);
                return getRender(data);
            })
            .catch(err => {
                this.setState({snackbarMessage: 'We could not get places list.'});
                this.setState({snackbarOpen: true});
                return getRender(undefined);
            });

        function getRender(places) {
            let renderPlaces = '';
            if(places) {
                places.map(place => {
                    return (
                        <div>{place.name}</div>
                    );
                });
            }
            return (
                <div className="places-container">
                    <div className="places">
                        {renderPlaces}
                    </div>
                    <div className="map">2237472364726487236847263874238746</div>
                    <Snackbar
                        open={this.state.snackbarOpen}
                        message={this.state.snackbarMessage}
                        autoHideDuration={4000}
                        onRequestClose={this.handleSnackbarClose}
                        bodyStyle={Style.dangerAlert}
                    />
                </div>
            )
        }
    }*/
}