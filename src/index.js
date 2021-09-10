import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import anime from 'animejs/lib/anime.es.js'
import CurrencyService from './service';

let signAni = anime({
  targets:'#sign',
  translateY: -50,
  rotate: 360,
  duration:3000,
  delay: anime.stagger(100),
  direction: 'alternate',
  loop:true,
  easing: 'easeInOutElastic',
});


signAni.play();

function displayResults(response, startCountry) {
  if (!response.result) {
    $("#errorDisplay").html('Please input a valid currency');
  }else{
    const countryCode = $('#countryId :selected').val();
    const amount = $("#moneyNum").val();
    const conversionRate = response.conversion_rates[countryCode];
    const convertedResult = Math.round(100 * (amount * conversionRate)) / 100;
    if (amount < 0) {
      $("#errorDisplay").html('Please input a positive money amount');
    }
    else if (response.result === "success") {
      $("#grandTotal").html(`Converted Amount: ${convertedResult}`);
      $("#results").html(`${amount} ${startCountry} => ${countryCode}: ${convertedResult}`);
      $("#conversionRate").html(`current conversion rate: ${conversionRate}`);
    }
    else {
      $("#errorDisplay").html(`there was an error: ${response.error}`);
    }
  }
  $('#postConvert').removeClass('hidden');
  $("#moneyNum").val('');
}

function clearFields(){
  $("#results").html('');
  $("#conversionRate").html('');
  $("#errorDisplay").html('');
  $("#grandTotal").html('');
}


$(document).ready(function () {

  $('#exBtn').click(function () {
    const startCountry = $('#startCountry :selected').val();
    clearFields();
    CurrencyService.getMoney(startCountry)
      .then(function (response) {
        displayResults(response, startCountry);
      });
  });
});