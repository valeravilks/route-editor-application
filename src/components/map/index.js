import React from "react";
import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';

export default class MapContainer extends React.Component {
    render() {
        return (
            <YMaps>
                <Map
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 3,
                    }}
                >
                <GeoObject
                    geometry={{
                        type: 'LineString',
                        coordinates: [[55.76, 37.64], [52.51, 13.38], [52.51, 30.38]],
                    }}
                    options={{
                        geodesic: true,
                        strokeWidth: 5,
                        strokeColor: '#F008',
                    }}
                />
                <Placemark geometry={[55.684758, 37.738521]} />
                </Map>
            </YMaps>
        );
    }
}
