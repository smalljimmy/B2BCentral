import React from 'react';
import {Container} from 'amazonui-react-elements/elements';
import {setHeightToParent} from '../../util/util.js';

/**
 * Class representing the snapshot view section of a card.
 *
 * Contains information about the specific card, displaying data passed from parent.
 */
export default class Snapshot extends React.Component {
    /**
     * When the component has mounted we set the height of the columns
     */
    componentDidMount() {
        setHeightToParent('.b2bCent-card:not(".minimized") .b2bCent-snapshot > .a-row > .a-column');
    }

    /**
     * Renders the Snapshot component.
     *
     * @returns {XML}
     */
    render() {
        return (
            <Container cssClass="b2bCent-snapshot">
                {this.props.children}
            </Container>
        );
    }
}

/**
 * Snapshot proptypes provide type validation on props.
 */
Snapshot.propTypes = {
    children: React.PropTypes.node,
};
