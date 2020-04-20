import axios from "axios";
const config = require('../configs/config.json');

export default class CharactersController {

  static getCharacters() {
    return new Promise((resolve, reject) => {
      axios.get(`${config.api.url}/characters?apikey=${config.api.key}&limit=100`)
        .then(result => resolve(result)).catch(result => reject(result));
    })
  }

  static getCharacter(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.api.url}/characters/${id}?apikey=${config.api.key}&limit=40`)
        .then(result => resolve(result)).catch(result => reject(result));
    })
  }

  static getSeriesByCharacterID(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${config.api.url}/characters/${id}/series?apikey=${config.api.key}&limit=40`)
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