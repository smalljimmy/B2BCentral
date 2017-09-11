import React from 'react';
import {GridRow} from 'amazonui-react-elements/elements';
import TitlePanel from './titlePanel';
import HMDPanel from './HMDPanel';

/**
 * Class representing the panel section of the page for the title/header.
 *
 * Contains the Title and Search Bar.
 */
export default class TitleSection extends React.Component {
    /**
     * Renders the TitlePanel component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <GridRow>
                <TitlePanel {...this.props.titlePanel} />
            </GridRow>
        );
    }
}

/**
 * TitlePanel proptypes provide type validation on props.
 */
TitleSection.propTypes = {
    titlePanel: React.PropTypes.object,
};
