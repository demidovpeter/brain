import {Item} from "../../modules/items/types";
import _ from "lodash";
import {INITIAL_PINNED_ID} from "../../utils/constants";

export function getOrderedItemsList(items: Array<Item>, pinnedId: number): Array<Item> {
    /** Check if any item was pinned and if not than return items array as is  */
    if (pinnedId === INITIAL_PINNED_ID) {
        return items
    }

    /** Result array of items */
    let orderedList: Array<Item> = []
    const pinnedItem = _.find(items, item => {return item.id === pinnedId})
    /** Make sure that pinned item was found */
    if (typeof pinnedItem !== 'undefined') {
        orderedList.push(pinnedItem)
    }
    /** Add the rest into result */
    _.each(items, item => {
        if (item.id !== pinnedId) {
            orderedList.push(item)
        }
    })
    return orderedList
}

/** Implementation of search logic */
export function searchItems(items: Array<Item>, query: string): Array<Item> {
    let result: Array<Item> = []

    _.each(items, item => {
        if (_.includes(item.name.toLowerCase(), query) || _.includes(item.description.toLowerCase(), query)) {
            result.push(item)
        }
    })
    return result
}
