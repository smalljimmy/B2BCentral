import React from 'react';
import {Container} from 'amazonui-react-elements/elements';
import TitleSection from './titleSection';
import DataSection from './dataSection';
import {appMounted} from '../actions/appActions';
import {getDynamicChildren} from '../util/reactHelpers';
import {checkObjectHasProperty} from '../util/util';

export default class B2BCentral extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.renderableChildren = {};
        this.renderableChildren.TitleSection = TitleSection;
        this.renderableChildren.DataSection = DataSection;

        this._renderChildrenFromManifest = this._renderChildrenFromManifest.bind(this);
    }

    componentDidMount() {
        appMounted();
    }

    _renderChildrenFromManifest() {
        return this.props.manifest.children.map((childElement) => {
            if (checkObjectHasProperty(this.renderableChildren, childElement.type)) {
                const type = this.renderableChildren[childElement.type];
                return React.createElement(type, childElement.props, getDynamicChildren(type, childElement));
            }
            return null;
        });
    }

    render() {
        return (
            <Container>
                {this._renderChildrenFromManifest(this.props.manifest)}
            </Container>
        );
    }
}

B2BCentral.propTypes = {
    manifest: React.PropTypes.object,
    marketplaceId: React.PropTypes.string,
};

B2BCentral.childContextTypes = {
    marketplaceId: React.PropTypes.string,
};
