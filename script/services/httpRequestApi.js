import * as Util from "../util/util";

/**
 *  Allowable responseTypes
 */
export const ResponseType = {
    JSON: 'application/json',
};

/**
 * This method processes the response from XMLHttpRequest send.
 * @param xhr The request object
 * @param successFunction The function to invoke if successful Ajax call.
 * @param errorFunction The function to invoke if unsuccessful Ajax call.
 */
function processResponse(xhr, successFunction, errorFunction) {
    const XHR_READY_STATE = 4;
    const XHR_OK_RESPONSE_CODE = 200;
    if (xhr.readyState === XHR_READY_STATE) {
        if (xhr.status === XHR_OK_RESPONSE_CODE) {
            if (typeof successFunction === 'function') {
                successFunction(xhr.responseText);
            }
            else {
                // TODO Report via CSM
            }
        }
        else {
            if (typeof errorFunction === 'function') {
                errorFunction();
            }
            else {
                // TODO Report via CSM
            }
        }
    }
}

/**
 * Get the token embedded in the page which we need to send along with each request
 * to avoid CSRF explots.
 */
function getToken() {
    return document.getElementsByName('token')[0].value;
}

function getLocale() {
	return null | Util.getMonsContext().locale;
}


/**
 * Makes an ajax request to arbiter to get response.
 * @param url The url to make the ajax request to.
 * @param successFunction The function to invoke if successful Ajax call.
 * @param errorFunction The function to invoke if unsuccessful Ajax call.
 */
export function getHttpResponse(resource, successFunction, errorFunction, responseType, params = {}) {
    let queryParam = "?";
    
    //append parameter list
    for (var key in params) {
    	if (params.hasOwnProperty(key)) {
    		queryParam +=  `${key}=${encodeURIComponent(params[key])}&`;
    	}
    }
    queryParam += `token=${getToken()}` + `&locale=${this._locale}`;
    
    //debug
    if (process.env.NODE_ENV !== 'production') {
    	queryParam += '&isDebug=true';
    }
    
    
    // construct uri
    let uri = resource + queryParam
    
    // build & send xhr
    const xhr = new XMLHttpRequest();
    xhr.open('GET', uri, true);
    if (responseType) {
        xhr.setRequestHeader('Accept', responseType);
    }
    xhr.onload = () => {
        processResponse(xhr, successFunction, errorFunction);
    };
    xhr.onerror = errorFunction;
    xhr.send();
}
