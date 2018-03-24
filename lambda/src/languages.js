/**
 * Strings resources for the app.
 */

const library = (function () {

    const languageString = {
        'en': {
            'translation': {
                'GAME_NAME': 'Send Me a Text',
                'WELCOME_MESSAGE': 'Welcome to Send Me a Text. ',
                'HELP_MESSAGE': `Register your phone number by saying 'register', then schedule texts by sayings something like 'text me to take out the garbage at 1pm. `,
                'CANCEL_MESSAGE': 'Ok, let\'s schedule again soon.',
                'NO_MESSAGE': 'Ok, we\'ll schedule another time. Goodbye!',
                'UNHANDLED_MESSAGE': 'Sorry I didn\'t get that, can you say that again? Or say help for more information.',
                'HELP_UNHANDLED': 'Say yes to continue, or no to end the game.',
                'START_UNHANDLED': 'Say start to start a new game.',
            },
        }
    };

    return {
        languageString: languageString
    }

})();
module.exports = library;