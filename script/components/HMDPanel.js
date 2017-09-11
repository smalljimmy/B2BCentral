import React from 'react';
import {Link} from 'amazonui-react-elements/elements';
import StringUtil from "../util/stringUtil";

/**
 * Class representing the panel of How's Me Driving(HMD)
 */
export default class HMDPanel extends React.Component {

    /**
     * Opens the HMD 2.0 feedback tab.
     * @private
     */
    _openHmd() {
        // get the trigger tab element (blue feedback tab on the bottom right)
        let triggerTab =document.getElementById("hmd2-trigger-tab");
        if (triggerTab) {
            // the trigger tab has a child anchor element, we need to click it to expand the feedback window
            let anchor = triggerTab.getElementsByTagName("a");
            if (anchor.length > 0) {
                anchor[0].click();
            }
        }
    }	

    /**
     * Renders the HMD panel component.
     * @returns {XML}
     */
    render() {
        return (
        	<a className="a-link-normal" onMouseDown={this._openHmd}>{StringUtil.getString('b2bcentral_desktop_hmd_link')}</a>
        );
    }
}

