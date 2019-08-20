import mapStore from './map';
import geoCode from '~/api/geodecode';


class RootStore{
    constructor(){
        this.storage = localStorage;
        this.maps = new mapStore(this);
        this.geoCode = geoCode;
    }    
}

export default new RootStore();