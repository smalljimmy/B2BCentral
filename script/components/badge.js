import Immutable from 'immutable';
import React from 'react';

/**
 * Enumeration of all valid badge types.
 */
export const BadgeType = Object.freeze({
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
    NEUTRAL: 'neutral',
});

/**
 * Mapping of BadgeType to css classNames.
 * @type Immutable.Map<BadgeType,string>
 * @private
 */
const _BadgeClassNames = Immutable.Map([
    [BadgeType.SUCCESS, 'badge-success'],
    [BadgeType.WARNING, 'badge-warning'],
    [BadgeType.INFO, 'badge-info'],
    [BadgeType.NEUTRAL, 'badge-neutral'],
]);

/**
 * Class which displays a badge.
 */
export default class Badge extends React.Component {
    /**
     * Given a BadgeType, return the css class to populate the badge with.
     * @private
     */
    _getCssClass(badgeType) {
        if (this.props.isCardHeaderBadge) {
            return `badge ${_BadgeClassNames.get(badgeType)} badge-card-header`;
        }
        return `badge ${_BadgeClassNames.get(badgeType)}`;
    }

    /**
     * Renders the Badge component.
     * @returns {XML}
     */
    render() {
        return (
            <span>
            { this.props.content ?
                <span className={this._getCssClass(this.props.type)}>{this.props.content}</span>
                : null }
            </span>
        );
    }
}

/**
 * Badge propTypes provide type validation on props
 * @type
 */
Badge.propTypes = {
    type: React.PropTypes.oneOf(_BadgeClassNames.keySeq().toArray()).isRequired,
    content: React.PropTypes.string.isRequired,
    isCardHeaderBadge: React.PropTypes.bool,
};
