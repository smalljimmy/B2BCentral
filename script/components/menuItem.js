import React from 'react';

/**
 * Dropdown for all the card actions
 */
export default class MenuItem extends React.Component {
    render() {
        const noop = (e) => { e.stopPropagation(); };
        const onClick = this.props.disabled ? noop : this.props.action;
        const disabledClass = this.props.disabled ? 'disabled' : '';

        return (
            <div className={`menu-item clickable ${this.props.className} ${disabledClass}`} onClick={onClick}>
                {this.props.children}
            </div>
        );
    }
}

/**
 * Menu proptypes provide type validation on props
 * @type {{
 *  disabled: bool indicating if this menu item is disabled,
 *  children: 1+ any element,
 *  action: a function that should be invoked if this menu item is clicked(while not disabled),
 *  className css classname to give the menu Item
 * }}
 */
MenuItem.propTypes = {
    disabled: React.PropTypes.bool,
    children: React.PropTypes.node.isRequired,
    action: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
};
