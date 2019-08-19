import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    render() {
        return (
            <div>
                <Map google={this.props.google} zoom={14}>
                    <Marker
                            name={'Current location'} />

                    <InfoWindow onClose={()=>{}}>
                        <div>
                            <h1>123</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBBs6rd4SMS61JsrnnuythUhPH1rUQO450"
})(MapContainer)