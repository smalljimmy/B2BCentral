# B2BCentralApp

* [Overview](#overview)
    * [Configuration](#configuration)
    * [Bootstrap](#bootstrap)
* [Development](#development)
    * [Getting started](#getting-started)
    * [Making your first change](#making-your-first-change)

# Overview
B2BCentralApp is a [React](https://facebook.github.io/react/) based single page web application that provides Sellers with a centralized B2B seller management experience. It is consumed as an AUI asset by B2BCentralWebServer.

## Configuration
TODO:

## Bootstrap
The B2BCentralApp is rendered in a browser via the process outlined below:

1. A Seller is redirected to or visits [B2B Central](https://sellercentral.amazon.com/B2BCentral).
2. The [Mons Control Plane](https://w.amazon.com/index.php/Seller_Central/Mons) receives the request, constructs the [Mons Context](https://w.amazon.com/index.php/Seller_Central/Mons/Protocol#Mons_Context), binds it to the request headers, and forwards the request to [B2BCentralWebServer](https://code.amazon.com/packages/B2BCentralWebServer/trees/mainline).
3. The web server handles the request on IndexController::index. It makes a request to the [B2BCentralManifestService](https://code.amazon.com/packages/B2BCentralManifestService/trees/mainline) with portions of the Mons Context to retrieve a manifest object that prescribes page layout and data bindings. The manifest is bound to the index view.
4. During build time, all B2BCentralApp JavaScript assets are built into bundle and vendor bundle assets which the web server consumes.
5. The browser receives the response. bundle.js binds the React application to the dom using react-dom and the root App component renders.

## AUI
B2BCentralApp uses [AUI](https://aui.amazon.com/) for UI consistency via the [AmazonUIReactElements](https://code.amazon.com/packages/NodeJS-AmazonUIReactElements/trees/mainline) package. The AmazonUIReactElements package translates all of the AUI elements to React components, however **note that AUI does not support this package and it will need to be updated manually if AUI is updated**. Despite this, our use of AUI should be consistent with the AUI documentation including the [12-column grid system](https://aui.amazon.com/design/building_blocks_overview/desktop#grid) and [elements/components](https://aui.amazon.com/explore/elements).

# Development
As a prerequisite, you should have a [B2BCentralWebServer](https://code.amazon.com/packages/B2BCentralWebServer/trees/mainline) environment set up to consume the assets your are developing in this package.

## Getting started
###Workspace setup
```
brazil ws create --name B2BCentral --versionset B2BCentralWebServer/mainline
cd B2BCentral
brazil ws use -p B2BCentralWebServer
brazil ws use -p B2BCentralFunctionalTests
brazil ws use -p B2BCentralApp
```
###Javascript auto-complete for your IDE (optional)
Note that the brazil-build command below may fail -- that's fine, libsass won't work correctly on some OSX machines.

To get local javascript packages, on your local machine, do the following:
```
cd src/B2BCentralApp
brazil-build
```

Then to get IntelliJ to see the libraries:
1. Open the project
2. Right-click the B2BCentralApp/build folder and select 'exclude'.
3. Right-click the B2BCentral/src/B2BCentralApp/build/private/tmp/brazil-path/testbuild.configfarm.lib/lib/commonjs folder and select 'Cancel exclusion'.
4. Right-click the B2BCentral/src/B2BCentralApp/build/private/tmp/brazil-path/testbuild.configfarm.lib/lib/commonjs folder and select 'Resources Root'.


###On dev desktop
TODO:

## Making your first change
TODO:
