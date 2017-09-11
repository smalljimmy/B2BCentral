// Common functionality to ensure that card IDs are unique
export function namespaceCardId(id) {
    let newId = id.replace(/[ ',.\/\\]/g, ''); // Remove characters we don't want
    newId = newId.charAt(0).toLowerCase() + newId.slice(1); // Lowercase first letter
    return `card-${newId}`;
}

// Make the element given by sizzle rule the same height as its parent
let readjustHeightId = 0;
export function setHeightToParent(rule) {
    P.when('A', 'ready').execute(`fullHeight${readjustHeightId++}`, (A) => {
        // Set each height to parent
        A.$(rule).each(function height() {
            A.$(this).height(A.$(this).parent().height());
        });
        // Do this again on resize
        A.$(window).resize(() => {
            A.$(rule).each(function height() {
                A.$(this).height('auto');
            });
            A.$(rule).each(function height() {
                A.$(this).height(A.$(this).parent().height());
            });
        });
    });
}

export function getPathValue(obj, path, any) {
    const keys = path.split('.');
    let cur:any = o;
    for(let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if(cur === null || !checkObjectHasProperty(cur, key)) {
            return defaultValue;
        }
        cur = cur[key];
    }
    return cur;
}

/**
 * Verifies that the given obj contains the given prop.
 * @param obj The object to check.
 * @param prop The prop the obj should contain
 * @returns boolean Whether the obj contains the given prop.
 */
export function checkObjectHasProperty(obj, prop) {
    return ({}).hasOwnProperty.call(obj, prop);
}

/**
 * Retrieves the locale that is bound to the dom.
 * @returns {string}
 */
function getLocaleFromDom() {
    const element = document.getElementById('localeValue');
    return element ? element.getAttribute('data-locale') : null;
}

export function getLocale() {
    const locale = getLocaleFromDom();
    if(locale){
        return locale.replace('_','-');
    }
    return locale;
}

/**
 * Sets the locale on the given moment instance.
 * @param moment Instance of moment to set locale for
 */
export function setMomentLocale(moment) {
    const locale = getLocale();
    if (moment.locale && locale) {
        moment.locale(locale);
    }
}

export function valueExists(value) {
    return typeof value !== 'undefined' && value !== null;
}

export const RequestStatus = {
    SUCCESS: 'success',
    FAILURE: 'error',
    PENDING: 'pending'
}