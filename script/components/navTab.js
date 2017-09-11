import React from 'react';
import {Box} from 'amazonui-react-elements/elements';
import Badge from './badge';

/**
 * Class representing the tab in Nav.
 *
 * Contains Tab title and data snapshot
 */
export default class NavTab extends React.Component {
    /**
     * Renders the Tab component.
     *
     * @returns {XML}
     */
    render() {
        const selected = this.props.isActive ? 'active-class' : '';
        const boxClass = `tab clickable ${selected}`;

        return (
            <Box cssClass={boxClass} data-id={this.props.title} onClick={this.props.onNavRequested}>
                <a className="nav-tab-title">{this.props.title}</a>
                {this.props.status &&
                <Badge content={this.props.status} type={this.props.badgeType} />
                }
                {this.props.subTitle &&
                <p className="nav-tab-sub-title">{this.props.subTitle}</p>
                }
            </Box>
        );
    }
}

/**
 * InboundTab proptypes provide type validation on props.
 */
NavTab.propTypes = {
    title: React.PropTypes.string.isRequired,
    subTitle: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    badgeType: React.PropTypes.string,
    status: React.PropTypes.string,
    onNavRequested: React.PropTypes.func,
};
