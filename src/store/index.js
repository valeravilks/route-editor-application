import mapStore from './map';
import * as geoDeCode from '~/api/geodecode';


class RootStore{
    constructor(){
        this.api = {
            geoDeCode,
        };

        this.storage = localStorage;
        this.maps = new mapStore(this);


    }    
}

export default new RootStore();