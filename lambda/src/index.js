/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports en-US lauguage.
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-query
 **/

'use strict';

const Alexa = require('alexa-sdk');

const languages = require('./languages');
// const schedule = require('./schedule');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL)

const sessionHandlers = {
    'LaunchRequest': function () {
        const self = this;
        const message = self.t('WELCOME_MESSAGE') + " " + self.t('HELP_MESSAGE');
        self.response.speak(message).listen(message);
        self.emit(":responseReady");
    },

    // Register a new user (phone/deviceId) pair using the current Alexa device..
    'RegisterIntent': function () {
        const self = this;
        // TODO: implement (grab info from intent).
        const message = "";
        self.response.speak(message).listen(message);
        self.emit(':responseReady');

    },
    // Schedule a new text message on behalf of the current alexa device owner.
    'ScheduleIntent': function(relative) {
        const self = this;
        // TODO: implement (grab info from intent).
        const message = "";
        self.response.speak(message).listen(message);
        self.emit(':responseReady');
    },

    /* Amazon intents below */

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');

        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('CANCEL_MESSAGE'));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const speechOutput = this.t('UNHANDLED_MESSAGE');
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languages.languageString;
    alexa.registerHandlers(sessionHandlers);
    alexa.execute();
};
