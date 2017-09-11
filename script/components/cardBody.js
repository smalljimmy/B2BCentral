import React from 'react';

import {Box} from 'amazonui-react-elements/elements';

/**
 * Class representing the body of a card.
 */
export default class CardBody extends React.PureComponent {
    /**
     * Renders the CardBody component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <Box cssClass="cardBody">
                {this.props.children}
            </Box>
        );
    }
}

/**
 * CardBody proptypes provide type validation on props.
 */
CardBody.propTypes = {
    children: React.PropTypes.node,
};
