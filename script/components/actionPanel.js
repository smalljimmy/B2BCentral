import React from 'react';
import ReactDOM from 'react-dom';
import {Box, BoxGroup, Heading} from 'amazonui-react-elements/elements';
import MenuButton from './actionButton';
import Immutable from 'immutable';

/**
 * Class representing the panel section of the page for the Actions.
 *
 * Contains the Recommended Actions.
 */
export default class ActionPanel extends React.Component {
    /**
     * Constructs an instance of ActionPanel with props.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            showAllButtons: false,
        };

        this._onScroll = this._onScroll.bind(this);
        this._showAllButtons = this._showAllButtons.bind(this);
        this._showMinButtons = this._showMinButtons.bind(this);
    }

    /**
     * Binds a scroll listener for page scroll.
     */
    componentDidMount() {
        window.addEventListener('scroll', this._onScroll);
    }

    /**
     * Unbinds the scroller listener for page scroll.
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this._onScroll);
    }

    /**
     * Responsible for handling the window scroll event. This will determine what the top position of the action
     * panel should be.
     */
    _onScroll() {
        const offset = 15;
        const containerTop = ReactDOM.findDOMNode(this.refs.container).getBoundingClientRect().top;
        const top = containerTop > 0 ? 0 : (-containerTop) + offset;
        this.setState({
            top,
        });
    }

    _createMenuButtons() {
        const minButtonsShown = 5;
        const shownButtons = this.state.showAllButtons ? this.props.actions.size : minButtonsShown;

        const actions = this.props.actions.map((action, index) => {
            if (index < shownButtons) {
                return (
                    <MenuButton
                        key={action.getIn(['mainAction', 'title'])}
                        mainAction={action.get('mainAction')}
                        dropdownActions={action.get('dropdownActions')}
                    />
                );
            }
            return null;
        });

        return actions;
    }

    /**
     * Show all action buttons.
     * @private
     */
    _showAllButtons() {
        this.setState({showAllButtons: true});
    }

    /**
     * Show min action buttons.
     * @private
     */
    _showMinButtons() {
        this.setState({showAllButtons: false});
    }

    /**
     * Renders the ActionPanel component.
     *
     * @returns {XML}
     */
    render() {
        const style = {
            top: this.state.top,
        };
        // TODO: Translate these strings
        const showText = this.state.showAllButtons ?
            'See less' : 'See more';
        const onClick = this.state.showAllButtons ?
            this._showMinButtons : this._showAllButtons;

        return (
            <div
                id="b2bCent-actionPanel"
                ref="container"
            >
                <BoxGroup style={style}>
                    <Box cssClass="actionsPanel">
                        <Heading headingLevel={2}>Action center</Heading>
                        {this._createMenuButtons()}
                        <span className="link clickable" onClick={onClick}>{showText}</span>
                    </Box>
                </BoxGroup>
            </div>
        );
    }
}

/**
 * ActionPanel proptypes provide type validation on props.
 * @type {{
 *      actions: Immutable.List of actions to display
 *      {
 *          mainAction: {
 *              title: title of the action in the dropdown,
 *              onClick: function to call when action is clicked,
 *          },
 *          dropdownActions: {
 *              title: title of the action in the dropdown,
 *              onClick: function to call when action is clicked,
 *          },
 *     },
 *     width: width of the action panel column,
 * }}
 */
ActionPanel.propTypes = {
    actions: React.PropTypes.instanceOf(Immutable.List),
    width: React.PropTypes.number,
};

ActionPanel.defaultProps = {
    actions: new Immutable.List(),
};
