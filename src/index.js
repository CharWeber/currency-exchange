import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import CurrencyService from './service';

function displayResults(response, startCountry) {
  if (response.result === "success") {
    const countryCode = $('#countryId :selected').val();
    const amount = $("#moneyNum").val();
    const conversionRate = response.conversion_rates[countryCode];
    const convertedResult = Math.round(100*(amount * conversionRate))/100;
    $("#results").html(`${amount} ${startCountry} => ${countryCode}: ${convertedResult}`)
    $("#conversionRate").html(`current conversion rate: ${conversionRate}`)
  }
  else {
    $("#errorDisplay").html(`there was an error: ${response.error}`)
  }
}


$(document).ready(function () {

  $('#exBtn').click(function () {
    console.log('button clicked');
    const startCountry = $('#startCountry :selected').val();
    $("#usNum").val("");
    CurrencyService.getMoney(startCountry)
      .then(function (response) {
        displayResults(response, startCountry);
      })
  });
});