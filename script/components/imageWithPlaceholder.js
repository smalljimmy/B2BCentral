import React from 'react';

/**
 * Class representing an image, providing a placeholder if necessary.
 */
export default class ImageWithPlaceholder extends React.Component {
    /**
     * Constructs an instance of the ImageWithPlaceholder component.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            imageExists: false,
        };

        this._checkImageExistence = this._checkImageExistence.bind(this);
    }

    /**
     * Checks that the imageUrl is correct on component mount.
     */
    componentDidMount() {
        this._checkImageExistence(this.props.src);
    }

    /**
     * If the src changes, recheck if the image resolves.
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.src !== nextProps.src) {
            this._checkImageExistence(nextProps.src);
        }
    }

    /**
     * Check if the product image does not exist to change the UI if this is the case.
     * @private
     */
    _checkImageExistence(imageSrc) {
        if (!imageSrc) {
            this.setState({imageExists: false});
            return;
        }
        const img = new Image();
        img.onerror = () => {
            this.setState({imageExists: false});
        };
        img.onload = () => {
            this.setState({imageExists: true});
        };
        img.src = imageSrc;
    }

    /**
     * Renders the ImageWithPlaceholder component.
     *
     * @returns {XML}
     */
    render() {
        const image = this.state.imageExists ? (
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                />
            ) : (<p>Image Not Available</p>);
        return image;
    }
}

/**
 * ImageWithPlaceholder proptypes provide type validation on props.
 */
ImageWithPlaceholder.propTypes = {
    alt: React.PropTypes.string,
    src: React.PropTypes.string,
};
