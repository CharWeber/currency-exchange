import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import CurrencyService from './service';

function displayResults(response, startCountry) {
  const countryCode = $('#countryId :selected').val();
  const amount = $("#moneyNum").val();
  $("#moneyNum").val('');
  if (amount<0){
    $("#errorDisplay").html('Please input a positive money amount')
    $("#results").html('')
    $("#conversionRate").html('')
  }
  else if (response.result === "success") {
    const conversionRate = response.conversion_rates[countryCode];
    const convertedResult = Math.round(100 * (amount * conversionRate)) / 100;
    $("#results").html(`${amount} ${startCountry} => ${countryCode}: ${convertedResult}`)
    $("#conversionRate").html(`current conversion rate: ${conversionRate}`)
    $("#errorDisplay").html('')
  }
  else {
    $("#errorDisplay").html(`there was an error: ${response.error}`)
    $("#results").html('')
    $("#conversionRate").html('')
  }
  $('#postConvert').removeClass('hidden')
}


$(document).ready(function () {

  $('#exBtn').click(function () {
    const startCountry = $('#startCountry :selected').val();
    CurrencyService.getMoney(startCountry)
      .then(function (response) {
        displayResults(response, startCountry);
      })
  });
});