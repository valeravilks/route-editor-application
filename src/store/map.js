import {observable, computed, action} from 'mobx';
import arrayMove from 'array-move';

export default class{
    constructor(rootStore){
        this.rootStore = rootStore;
        this.geoDeCode = rootStore.api.geoDeCode.remote;
    }

    @observable pointer = [];

    @action pointerPush(value){
        if(!this.pointer.some(el => el['name'] === value)){
            this.geoDeCoders(value).then(res => {
                this.pointer.push({
                    name: value,
                    point: res
               });
            });
        }
    }

    @action pointerUpdate(name, point, index){
        this.pointer[index] = {
            name, point
        };
    }

    @action pointerRemove(value){
        this.pointer.splice(value, 1);
    }

    @action pointerSort(oldIndex, newIndex){
        this.pointer = arrayMove(this.pointer, oldIndex, newIndex);
    }

    @observable suggest = {};

    @action setSuggest(suggestObj){
        this.suggest = suggestObj;
    }

    @action geoDeCoders(value){
        return this.geoDeCode(value).then(res => {
            let point = res['response']['GeoObjectCollection']['featureMember']['0']['GeoObject']['Point']['pos'];
            let massPoint = point.split(' ');
            let newMass = massPoint.map(el => +el);
            newMass.reverse();
            return newMass;
        });
    }



}