/**
 * Returns the renderable children of the given type for the given manifest element.
 * @param type The type of component.  Expected to have createRenderableChildrenElements function.
 * @param manifestElement The manifest chunk to check.
 * @returns {*}  All renderable children.
 */
export function getDynamicChildren(type, manifestElement) {
    let children = null;
    if (typeof type.createRenderableChildrenElements === 'function') {
        children = type.createRenderableChildrenElements(manifestElement);
    }

    return children;
}
