import mapStore from './map';


class RootStore{
    constructor(){
        this.storage = localStorage;
        this.maps = new mapStore(this);
    }    
}

export default new RootStore();