import {observable, computed, action} from 'mobx';

export default class{
    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @observable pointer = [];

    @action pointerPush(value){
        if(!this.pointer.some(el => el['name'] === value['name'])){

            let massPoint = value['point'].split(' ');
            let newMass = massPoint.map(el => +el);
            newMass.reverse();

            this.pointer.push({
                name: value['name'],
                point: newMass
            });
        }
    }

    @action pointerRemove(value){
        this.pointer.splice(value, 1);
    }

    @observable suggest = {};

    @action setSuggest(suggestObj){
        this.suggest = suggestObj;
    }

}