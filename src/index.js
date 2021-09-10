import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import CurrencyService from './service';

function displayResults(response, countryCode, amount) {
  if (response.result === "success") {
    const conversionRate = response.conversion_rates[countryCode];
    const convertedResult = amount * conversionRate;
    $("#results").html(`${amount} USD => ${countryCode}: ${convertedResult}`)
    $("#conversionRate").html(`current conversion rate: ${conversionRate}`)
  }
  else {
    $("#errorDisplay").html(`there was an error: ${response.error}`)
  }
}


$(document).ready(function () {

  $('#exBtn').click(function () {
    console.log('button clicked');
    const countryCode = $('#countryId :selected').val();
    const amount = $("#usNum").val();
    $("#usNum").val("");
    CurrencyService.getMoney()
      .then(function (response) {
        displayResults(response, countryCode, amount);
      })
  });
});