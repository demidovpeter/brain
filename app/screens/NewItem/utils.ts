import {Item} from "../../modules/items/types";
import _ from "lodash";


/**
 * Create new item ID
 * In this approach it's incremented the greatest one through existed
 */
export function getNewItemID(items: Array<Item>) {
    if (!items.length) {
        return 1
    }

    const lastItem = _.maxBy(items, 'id') as Item
    return lastItem.id + 1
}

/** Initial form */
export function getEmptyForm(items: Array<Item>) {

    const newItemId = getNewItemID(items)
    return {
        id: newItemId,
        name: '',
        description: '',
        price: '',
    }
}
