import React from "react";
import withStore from '~/hocs/withStore';

import { YMaps, Map, GeoObject, Placemark } from 'react-yandex-maps';

const mapState = {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
};

class App extends React.Component {

    onSaggest = ymaps => {
        this.ymaps = ymaps;
        let suggestView = new this.ymaps.SuggestView(document.getElementById('suggest'), {
            provider: {
                suggest: (request, options) => this.ymaps.suggest(request)
            }
        });

        suggestView.events.add("select", function(e){
            console.log(e.get("item")["value"])
        });

        this.props.stores.maps.setSuggest(suggestView);
    };

    addItem = (e) => {

    };

    render() {
        let renderPoint = this.props.stores.maps.pointer.map((point) => {
            return <li key={point}>{point}</li>
        });
        return (
            <div className="container m-5">
                <button onClick={this.addItem}>sss</button>
                <div className="row">
                    <div className="col-6">
                        <input
                               type='text'
                               className="form-control"
                               id="suggest"
                               onBlur={(e) => this.addItem(e)}
                        />
                        <ul>
                            {renderPoint}
                        </ul>

                    </div>
                    <div className="col-6 h123">
                        <YMaps query={{ load: "package.full" }}>
                            <Map
                                state={mapState}
                                onLoad={this.onSaggest}
                            />
                        </YMaps>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStore(App);