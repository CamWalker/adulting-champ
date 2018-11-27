import { observable, decorate, action } from 'mobx';
import _ from 'lodash';

const storage = window.localStorage;

class Store {
  constructor() {
    const savedExamResults = storage.getItem('adultingChamp');
    if (savedExamResults) {
      this.examResults = JSON.parse(savedExamResults);
    } else {
      this.examResults = {};
    }
  }

  setExamResult = (exam, key, value, points) => {
    _.set(this.examResults, [exam, key], value);
  }

  save = () => {
    console.log('saving to local storage');
    storage.setItem('adultingChamp', JSON.stringify(this.examResults));
  }
}

decorate(Store, {
  examResults: observable,
  setExamResult: action,
  save: action,
});




export default new Store();