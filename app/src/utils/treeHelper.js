import { some, forEach, concat } from 'lodash';

/**
 *
 * @param tree
 *
 * @returns {Array}
 */
export const getChildrenIds = function(tree) {
    if (!Array.isArray(tree) || tree.length  === 0) {
        return [];
    }

    let result = [];
    forEach(tree, (item) => {
        result = concat(result, getChildrenIds(item.children));
        result.push(item.id);
    });

    return result;
};

/**
 * Returns array of ids(root and children) for searchable node
 *
 * @param tree
 * @param searchId
 *
 * @returns {Array}
 */
export const getToggleIds = function(tree, searchId) {
    let result = [];

    some(tree, (item) => {
        if (item.id === searchId) {
            result = getChildrenIds(item.children);
            result.push(item.id);

            return true;
        }

        if (!item.children || item.children.length === 0) {
            return false;
        }

        const nextLevel = getToggleIds(item.children, searchId);

        if (0 !== nextLevel.length) {
            result = nextLevel;

            return true;
        }

        return false;
    });

    return result;
};
