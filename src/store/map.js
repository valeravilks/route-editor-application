import {observable, computed, action} from 'mobx';

export default class{
    constructor(rootStore){
        this.rootStore = rootStore;
    }

    @observable pointer = [1,2];

    @observable suggest = {};

    @action setSuggest(suggestObj){
        this.suggest = suggestObj;
    }

}