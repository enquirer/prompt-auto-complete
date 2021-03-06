'use strict';

var states = require('./states');
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('autocomplete', require('..'));
var questions = [
  {
    type: 'autocomplete',
    name: 'from',
    message: 'Select a state to travel from',
    source: searchStates
  },
  {
    type: 'autocomplete',
    name: 'to',
    message: 'Select a state to travel to',
    source: searchStates
  }
];

enquirer.ask(questions)
  .then(function(answers) {
    console.log(answers);
  });

function searchStates(answers, input) {
  return new Promise(function(resolve) {
    resolve(states.filter(filter(input)));
  });
}

function filter(input) {
  return function(state) {
    return new RegExp(input, 'i').exec(state) !== null;
  };
}
