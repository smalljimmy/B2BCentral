import React from 'react';
import {Heading, GridColumn} from 'amazonui-react-elements/elements';
import WelcomeBanner from './welcomeBanner';
import Carousel from './carousel';
import CardStoreBuilder from '../stores/cardStoreBuilder';
import CardActions from '../actions/cardActions';
import StringUtil from '../util/stringUtil';

/**
 * Class representing the panel section of the page for the title/header.
 */
export default class TitlePanel extends React.PureComponent {
    /**
     * Constructs an instance of TitlePanel with props.
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    /**
     * Renders the TitlePanel component.
     * @returns {XML}
     */
    render() {
        const heading = this.props.heading;
        const store = CardStoreBuilder.build(this.props.dataBindings);
        const actions = new CardActions('titlePanel', this.props.dataBindings);
        
        return (
            <GridColumn gridUnits={heading.width}>
                <Heading className="a-spacing-top-base inline-block" headingLevel={heading.level}>
                	{StringUtil.getString('b2bcentral_desktop_navigation_b2b')}
                </Heading>

                <WelcomeBanner />

                <Carousel store={store} actions={actions} {...this.props}/>

            </GridColumn>
        );
    }
}

/**
 * TitlePanel proptypes provide type validation on props.
 */
TitlePanel.propTypes = {
    heading: React.PropTypes.shape({
        width: React.PropTypes.number,
        cssClass: React.PropTypes.string,
        level: React.PropTypes.number,
    }),
};
