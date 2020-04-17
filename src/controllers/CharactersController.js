import axios from "axios";
const config = require('../configs/config.json');

export default class CharactersController {

  static getCharacters() {
    return new Promise((resolve, reject) => {
      axios.get(`${config.api.url}/characters?apikey=${config.api.key}`)
        .then(result => resolve(result)).catch(result => reject(result));
    })
  }

  static searchCharacters() {
    return new Promise((resolve, reject) => {
      axios.get(`${config.api.url}/characters?apikey=${config.api.key}&nameStartsWith=`)
        .then(result => resolve(result)).catch(result => reject(result));
    })
  }
  
}