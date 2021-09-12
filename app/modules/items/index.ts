import storeData from "../../backend/data.json"
import {Item, ItemsState, ItemTypes, PIN_ITEM, SET_ITEMS, PinItemFunc, SetItemsFunc} from "./types";
import {INITIAL_PINNED_ID} from "../../utils/constants";
import {AppThunk} from "../index";
import _ from "lodash";

/**
 * Action Creators
 */

const pinItem: PinItemFunc = function (pinnedId) {
    return {
        type: PIN_ITEM,
        payload: { pinnedId }
    }
}

const setItems: SetItemsFunc = function (items) {
    return {
        type: SET_ITEMS,
        payload: items
    }
}

/**
 * Thunk
 */

export function setPinnedItemThunk(pinnedId: number): AppThunk {
    return async (dispatch, getState) => {
        /** Check item ID if press was made on already pinned item, in this case set pinned ID to default one */
        const currentlyPinnedItemId = getState().items.pinnedId
        const newPinnedId = currentlyPinnedItemId === pinnedId ? INITIAL_PINNED_ID : pinnedId
        dispatch(pinItem(newPinnedId))
    }
}

export function deleteItemThunk(itemId: number): AppThunk {
    return async (dispatch, getState) => {
        const items = getState().items.items
        /** Make sure if user is not going to remove pinned item, and if so, give to pinned ID default value  */
        const currentlyPinnedItemId = getState().items.pinnedId
        if (currentlyPinnedItemId === itemId) {
            dispatch(pinItem(INITIAL_PINNED_ID))
        }
        const updatedItemsList = _.filter(items, item => { return item.id !== itemId })
        dispatch(setItems(updatedItemsList))
    }
}

export function addNewItemThunk(item: Item): AppThunk {
    return async (dispatch, getState) => {
        let items = getState().items.items
        items.push(item)
        dispatch(setItems([...items]))
    }
}

/**
 * Reducer
 */

const initialState: ItemsState = {
    items: storeData,
    pinnedId: INITIAL_PINNED_ID
}

export function ItemsReducer(
    state = initialState,
    action: ItemTypes
): ItemsState {
    switch (action.type) {
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case PIN_ITEM:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
