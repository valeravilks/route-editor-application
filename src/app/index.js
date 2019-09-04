import React from "react";
import withStore from '~/hocs/withStore';
import Dnd from '~c/list-dnd';

import { YMaps, Map, GeoObject, Placemark, Polyline } from 'react-yandex-maps';
import { Button } from 'react-bootstrap';

class App extends React.Component {

    input = React.createRef();
    ref = [];

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

        // var placemark = new ymaps.Placemark([55.75, 37.61], {
        //     balloonContent: '&lt;img src="http://img-fotki.yandex.ru/get/6114/82599242.2d6/0_88b97_ec425cf5_M" /&gt;',
        //     iconContent: "Azerbaijan"
        // }, {
        //     preset: "islands#yellowStretchyIcon",
        //     // Disabling the close balloon button.
        //     balloonCloseButton: false,
        //     // The balloon will open and close when the placemark icon is clicked.
        //     hideIconOnBalloonOpen: false,
        //     draggable: true
        // });
        // this.map.geoObjects.add(placemark);
        // placemark.events.add('click', function(){
        //     console.log('Клик');
        // })




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

    // placeMarkEvent = (ref, index) => {
    //     if(ref){
    //         ref.events.add('dragend', (rez) => {
    //             console.log('drag' + index);
    //         })
    //     }
    //
    // }

    end = (index) => {
        if(this.refs){
            this.refs.events.add('dragend', res => {
                let point = res.originalEvent.target.geometry._coordinates;
                this.props.stores.api.geoDeCode.points(point[1], point[0])
                    .then(rez => {
                        let points_s = rez.response.GeoObjectCollection.featureMember[0].GeoObject;
                        // let p = points_s.Point.pos;
                        let p = rez.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.Point.pos;
                        let mass = p.split(' ');
                        let name_s = points_s.description;
                        this.props.stores.maps.pointerUpdate(name_s, [mass[1], mass[0]], index);
                    })
            });

            this.refs.events.add('balloonopen', res => {
                this.refs.properties.set('balloonContent', "Идет загрузка данных...");
                let point = this.refs.geometry.getCoordinates();
                // console.log(point);
                this.props.stores.api.geoDeCode.points(point[1], point[0])
                    .then(rez => {
                        let points_s = rez.response.GeoObjectCollection.featureMember[0].GeoObject;
                        let name_s = points_s.description;
                        this.refs.properties.set('balloonContent', name_s);
                    })
            });

        }
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
            // console.log(index);
            return  <Placemark key={index}
                               geometry={point['point']}
                               options={{draggable: true, openEmptyBalloon: true, balloonPanelMaxMapArea: 0}}
                               // properties={{hintContent: "Москва - Берлин"}}
                               // instanceRef={ref => this.end(ref, index)}
                               instanceRef={ref => this.refs = ref}
                               onLoad={(e) => this.end(index)}
            />
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
                               onKeyUp={this.pressKey}
                        />
                        <Dnd/>
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
                                instanceRef={map => this.map = map}
                                // instanceRef={ref => this.placeMarkEvent(ref)}
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