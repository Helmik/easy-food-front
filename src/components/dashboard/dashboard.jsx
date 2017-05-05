import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import {Card,
        CardHeader,
        CardActions,
        CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';
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
            places,
            lastSelected: undefined
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
    handleExpandChange(event) {
        let classes;
        let index;
        if(event.target.tagName === 'DIV'){
            classes = event.target.parentElement.className.split(' ');
        } else {
            classes = event.target.parentElement.parentElement.className.split(' ');
        }
        classes.forEach( class_ => {
            if(class_.indexOf('flatButton') >= 0) {
                index = class_.split('-')[1];
            }
        });
        if(index) {
            let places = this.state.places;
            places[index].expanded = !!!places[index].expanded;
            if(this.state.lastSelected && this.state.lastSelected !== index){
                places[this.state.lastSelected].expanded = false;
            }
            this.setState({lastSelected: index});
            this.setState({places,});
        }
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
                let avatar = "http://localhost:3000/api/Containers/" + place.id +"/download/logo.jpg?access_token=" + localStorage.getItem("token");
                let infoButton = place.expanded ? 'View less' : 'View more';
                listPlaces.push(
                    (
                        <Card expanded={place.expanded} key={'card' + place.id} id={place.id}>
                            <CardHeader
                                title={place.name}
                                subtitle={place.address}
                                avatar={avatar}
                            >
                                {/*<Toggle
                                    toggled={place.expanded}
                                    onToggle={this.handleExpandChange}
                                    key={'toggle' + place.id}
                                    id={'toggle-' + index}
                                />*/}
                            </CardHeader>
                            <CardText expandable={!place.expanded}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                            <CardActions>
                                <FlatButton label={infoButton} fullWidth={true} onTouchTap={this.handleExpandChange} className={'flatButton-' + index} key={'flatButton-' + index}/>
                            </CardActions>
                        </Card>
                    )
                );
                renderPlaces.push(
                    (<MapPoint
                        lat={place.location.lat}
                        lng={place.location.lng}
                        text={place.name}
                        key={'mapPoint' + place.id}
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
