import React from 'react';
import ReactDom from 'react-dom';
import MenuItem from './menuItem';
import {slideUp, slideDown} from '../util/animate.js';


/**
 * Dropdown menu
 */
export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this._wrapMenuItemElementAction = this._wrapMenuItemElementAction.bind(this);
        this._openMenu = this._openMenu.bind(this);
        this._closeMenu = this._closeMenu.bind(this);
    }

    /**
     * Responsible for opening the menu.
     */
    _openMenu() {
        const dropdownMenuElement = ReactDom.findDOMNode(this.refs.dropdown);
        const slideToggleMillis = 250;
        slideDown(dropdownMenuElement, slideToggleMillis, 'ease-out', () => {
            dropdownMenuElement.focus();
        });
    }

    /**
     * Responsible for closing the menu.
     **/
    _closeMenu() {
        const dropdownMenuElement = ReactDom.findDOMNode(this.refs.dropdown);
        const slideToggleMillis = 250;
        slideUp(dropdownMenuElement, slideToggleMillis, 'ease-out');
    }

    /**
      * Clones the menu item and then modifies the action of the menu item to call the default
      * action if applicable and then call _closeMenu. This is so that we can close the menu
      * when a menu item is clicked.
      */
    _wrapMenuItemElementAction(element) {
        return React.cloneElement(element, {
            action: () => {
                if (!element.props.disabled) {
                    this._closeMenu();
                }
                if (element.props.action) {
                    element.props.action();
                }
            },
        });
    }

    render() {
        const button = (
            <span
                onClick={this._openMenu}
                className="menu-button clickable chevron chevron-down"
            />
        );

        /**
         * To enable closing the dropdown when the user clicks outside of the dropdown we put input focus onto
         * the dropdown and that way if input focus ever leaves the onBlur event will be fired and we'll handle it.
         * To enable focusing the dropdown, tabIndex has to be set. tabIndex is set to -1 to prevent the dropdown from
         * being focusable via the tab key.
         **/
        const dropdown = (
            <div
                tabIndex="-1"
                onBlur={this._closeMenu}
                className="menu-dropdown"
                style={{display: 'none'}}
                ref="dropdown"
            >
                {React.Children.map(this.props.children, this._wrapMenuItemElementAction)}
            </div>
        );

        return (
            <div className={`menu ${this.props.className}`}>
                {button}
                {dropdown}
            </div> 
        );
    }
}

/**
 * Menu proptypes provide type validation on props
 * @type {{children: 0+ <MenuItem>s, className: css classname to give the menu}}
 */
Menu.propTypes = {
    children: (props, propName, componentName) => {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, (child) => {
            if (child.type !== MenuItem) {
                error = new Error(`'${componentName}' children should be of type 'MenuItem'.`);
            }
        });

        return error;
    },
    className: React.PropTypes.string,
};
