import React from "react";
import Map from "~c/map";

export default class extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            123
                        </div>
                        <div className="col-6 h123">
                            <Map/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}