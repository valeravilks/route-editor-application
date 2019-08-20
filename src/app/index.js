import React from "react";
import withStore from '~/hocs/withStore';

import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';
import { Button } from 'react-bootstrap';

const mapState = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
};

class App extends React.Component {
    input = React.createRef();

    onSaggest = ymaps => {
        this.ymaps = ymaps;
        let suggestView = new this.ymaps.SuggestView(document.getElementById('suggest'), {
            provider: {
                suggest: (request, options) => this.ymaps.suggest(request)
            }
        });

        suggestView.events.add("select", (e) => {
           // this.props.stores.maps.pointerPush(e.get("item")["value"]);
            let name = e.get("item")["value"];

            this.input.current.value = '';

            this.props.stores.geoCode(e.get("item")["value"]).then(res => {
                let point = res['response']['GeoObjectCollection']['featureMember']['0']['GeoObject']['Point']['pos'];

                this.props.stores.maps.pointerPush({
                    name: name,
                    point: point
                });
            })
        });
    };

    removeItem = (value) => {
        this.props.stores.maps.pointerRemove(value)
    };

    render() {
        let renderPoint = this.props.stores.maps.pointer.map((point, index) => {
            return <li key={index}>
                {point['name']}
                <Button variant="danger"
                        onClick={() => this.removeItem(index)}
                >-</Button>
            </li>
        });

        let plaseMark = this.props.stores.maps.pointer.map((point, index) => {
            return  <Placemark key={index} geometry={point['point']} />
        });

        return (
            <div className="container m-5">
                <div className="row">
                    <div className="col-12">
                        <input
                               type='text'
                               placeholder="Новая точка маршрута"
                               className="form-control"
                               id="suggest"
                               ref={this.input}
                        />
                        <ul>
                            {renderPoint}
                        </ul>

                    </div>
                    <div className="col-12 h123">
                        <YMaps query={{ load: "package.full" }}>
                            <Map
                                state={mapState}
                                onLoad={this.onSaggest}

                            >
                                {plaseMark}
                            </Map>

                        </YMaps>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStore(App);