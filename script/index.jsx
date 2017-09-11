import {render} from 'react-dom';
import React from 'react';
import {staticManifest} from './mocks/manifest';
import B2BCentral from './components/b2bCentral';

import '../style/style.less';

function getMarketplaceIdFromDom() {
    return document.getElementById('marketplaceId').dataset.marketplaceId;
}

function getManifestFromDom() {
    return staticManifest();
}



// Render B2BCentral to the page.
render(
    <B2BCentral marketplaceId={getMarketplaceIdFromDom()} manifest={getManifestFromDom()} />,
    document.getElementById('b2bCentralApp')
);
