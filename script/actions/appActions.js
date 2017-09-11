import {AppConstants} from '../constants/appConstants';
import AppDispatcher from '../dispatcher/appDispatcher';

/**
 * Generates an action which indicates that the App component has been mounted
 * and makes asynchronous calls to get initial data for the app.
 */
export function appMounted() {
    AppDispatcher.handleAction({
        type: AppConstants.APP_MOUNTED,
    });
}

/**
 * Generates an action which indicates that the page has been scrolled below the title.
 * @param belowTitle   A boolean representing whether we are below the title section.
 */
export function isBelowTitle(belowTitle) {
    AppDispatcher.handleAction({
        type: AppConstants.BELOW_TITLE,
        belowTitle,
    });
} 
