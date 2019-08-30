import React from "react";
import withStore from '~/hocs/withStore';
import Dnd from '~c/dnd';

import { YMaps, Map, GeoObject, Placemark, Polyline } from 'react-yandex-maps';
import { Button } from 'react-bootstrap';

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
            let name = e.get("item").displayName;
            this.input.current.value = '';
            this.props.stores.maps.pointerPush(name);
        });
    };

    pressKey = (e) => {
        if(e.keyCode === 13){
            this.ymaps.suggest(this.input.current.value)
                .then((items) => {
                    let name = items[0].displayName;
                    this.props.stores.maps.pointerPush(name);
                });
            this.input.current.value = '';
        }
    }

    removeItem = (value) => {
        this.props.stores.maps.pointerRemove(value);
    };

    center = () => {
        if(this.props.stores.maps.pointer.length !== 0){
            return this.props.stores.maps.pointer[this.props.stores.maps.pointer.length - 1]['point']
        } else {
            return [55.751574, 37.573856]
        }
    }

    polygon = () => {
        return this.props.stores.maps.pointer.map(el => el['point'])
    }

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
                <Dnd/>
                <div className="row">
                    <div className="col-12">
                        <input
                               type='text'
                               placeholder="Новая точка маршрута"
                               className="form-control"
                               id="suggest"
                               ref={this.input}
                               onKeyUp={this.pressKey}
                        />
                        <ul>
                                {renderPoint}
                        </ul>

                    </div>
                    <div className="col-12 h123">
                        <YMaps query={{ load: "package.full" }}>
                            <Map
                                state={{
                                    center: this.center(),
                                    zoom: 10,
                                    controls: []
                                }}
                                onLoad={this.onSaggest}

                            >
                                {plaseMark}
                                <Polyline
                                    geometry={this.polygon()}
                                    options={{
                                        balloonCloseButton: false,
                                        strokeColor: '#000',
                                        strokeWidth: 4,
                                        strokeOpacity: 0.5,
                                    }}
                                />
                            </Map>
                        </YMaps>
                    </div>
                </div>

            </div>
        );
    }
}

export default withStore(App);