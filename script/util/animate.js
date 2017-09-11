let scrollIntervalId = null;
function _clearScroll() {
    window.clearInterval(scrollIntervalId);
    scrollIntervalId = null;
}

/**
 *  _scrollAnimated animates a scroll action a certain distance over a certain amount of time
 *
 * scrollDist: scrolls down this many pixels, scrolls up if negative
 * duration: time in milliseconds it takes to scroll (lenght of animation)
 * interval: time in milliseconds between each scroll step (defaults to 15 if not provided)
 * @private
 */
export function animateScroll(scrollDist, duration, interval) {
    // Clear current scroll if there is one
    if (scrollIntervalId !== null) {
        _clearScroll();
    }
    const intervalInMS = typeof interval === 'number' ? interval : 15;
    const scrollStep = Math.floor((scrollDist) / (duration / intervalInMS));
    const destination = window.scrollY + scrollDist;
    scrollIntervalId = window.setInterval(() => {
        // Stop scroll if at very top or bottom
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight
            && scrollStep > 0) || (window.scrollY === 0 && scrollStep < 0)) {
            _clearScroll();
        }
        // Scroll if necessary, otherwise clear scroll
        if (Math.abs(window.scrollY - destination) > Math.abs(scrollStep)) {
            window.scrollBy(0, scrollStep);
        }
        else {
            _clearScroll();
        }
    }, intervalInMS);
}

let slideId = 0;
function slide(methodName, elements, timeIn, easeType, callback) {
    P.when('A', 'ready').execute(`slide${slideId++}`, (A) => {
        // Only slide if we are not already animating
        if (!A.$(elements).hasClass('animating')) {
            // Add animating class when starting
            A.$(elements).addClass('animating');
            A[methodName](A.$(elements), timeIn, easeType, () => {
                // Remove animating class when done
                A.$(elements).removeClass('animating');
                // Call provided callback if it is a defined function
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }
    });
}

export function slideToggle(elements, timeIn, easeType, callback) {
    slide('slideToggle', elements, timeIn, easeType, callback);
}

export function slideUp(elements, timeIn, easeType, callback) {
    slide('slideUp', elements, timeIn, easeType, callback);
}

export function slideDown(elements, timeIn, easeType, callback) {
    slide('slideDown', elements, timeIn, easeType, callback);
}
