/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports en-US lauguage.
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-query
 **/

'use strict';

const Alexa = require('alexa-sdk');
const where = require('node-where');

const languages = require('./languages');
const schedule = require('./schedule');

const GAME_STATES = {
    DOCTOR: '_DOCTORMODE' // Asking query querys.
};

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL)


const sessionHandlers = {
    'LaunchRequest': function () {
        this.emit('QuestionIntent');
    },

    // Register a new user (phone/deviceId) pair using the current Alexa device..
    'RegisterIntent': function () {
        const self = this;
        // TODO: prompt the user for a query.
        const message = this.t('QUESTION_MESSAGE')
        self.response.speak(message).listen(message);
        self.emit(":responseReady");
    },
    'ScheduleIntent': function(relative) {
        const self = this;
        let message = "";
        if (relative) {
            message = `Your ${relative}'s problem could be bad, you may be interested in consulting a doctor nearby`;
        } else {
            message = `Could be bad, you may be interested in consulting a doctor nearby`;
        }
        console.log('whereintent', message);
        self.response.speak(message).listen(message);
        self.emit(':responseReady');
    },

    /* Amazon intents below */

    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes['speechOutput']).listen(this.attributes['repromptText']);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const askMessage = newGame ? this.t('ASK_MESSAGE_DOCTOR') : this.t('REPEAT_DOCTOR_MESSAGE') + this.t('STOP_MESSAGE');
        const speechOutput = this.t('HELP_MESSAGE', GAME_LENGTH) + askMessage;
        const repromptText = this.t('HELP_REPROMPT') + askMessage;

        this.response.speak(speechOutput).listen(repromptText);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        const speechOutput = this.t('STOP_MESSAGE');
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = this.t('DOCTOR_UNHANDLED', ANSWER_COUNT.toString());
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log(`Session ended in query state: ${this.event.request.reason}`);
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languages.languageString;
    alexa.registerHandlers(sessionHandlers);
    alexa.execute();
};
