export default class CurrencyService {
  static getMoney(){
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
    .then(function(response){
      if (response.result !== "success"){
        throw Error(result.errortype)
      }
      return response.json();
    })
    .catch(function(error){
      return error;
    })
  }
}