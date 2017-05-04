import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import {Card,
        CardHeader,
        CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import Toggle from 'material-ui/Toggle';
import PlaceService from '../../services/placeService';
import Style from '../../scenes/styles';
import './dashboard.css';

import GoogleMapReact from 'google-map-react';

const MapPoint = ({text}) => <div>{text}</div>;

const placeService = new PlaceService();
export default class Dashboard extends Component {
    constructor() {
        super();
        let places = this.getPlaces();
        this.state = {
            snackbarOpen: false,
            snackbarMessage: '',
            places
        }
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.getPlaces = this.getPlaces.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
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
    handleExpandChange(event, isInputChecked, element) {
        let index = event.target.id.split('-')[1];
        let places = this.state.places;
        places[index].expanded = !!!places[index].expanded;
        this.setState({places,})
    }


    render() {
        let defaultProps = {
            center: {lat: 19.041714, lng: -98.1995117},
            zoom: 12
        };
        let listPlaces = [];
        let renderPlaces = [];
        if(this.state.places) {
            this.state.places.forEach((place, index) => {
                place.expanded = !!place.expanded;
                listPlaces.push(
                    (
                        <Card expanded={place.expanded} key={place.id} id={place.id}>
                            <CardHeader
                                title={place.name}
                                subtitle={place.address}
                            />
                            <CardText>
                                <Toggle
                                    toggled={place.expanded}
                                    onToggle={this.handleExpandChange}
                                    key={'toggle' + place.id}
                                    id={'toggle-' + index}
                                />
                            </CardText>
                        </Card>
                    )
                );
                renderPlaces.push(
                    (<MapPoint
                        lat={place.location.lat}
                        lng={place.location.lng}
                        text={place.name}
                    />)
                );
            })
        }
        return (
            <div className="places-container max-height">
                <div className="places">
                    <Paper style={Style.maxHeight}>
                        {listPlaces}
                    </Paper>
                </div>
                <div className="map">
                    <GoogleMapReact
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        {renderPlaces}
                    </GoogleMapReact>
                </div>
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
}