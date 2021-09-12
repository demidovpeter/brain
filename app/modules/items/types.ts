/**
 * Constants
 */

export const PIN_ITEM = 'items.PIN_ITEM'
export const SET_ITEMS = 'items.SET_ITEMS'

/**
 * Types
 */

export type Item = {
    id: number
    name: string
    description: string
    price: number
}
/**
 * Action Interface
 */

interface PinItem {
    type: typeof PIN_ITEM
    payload: {
        pinnedId: number
    }
}

interface SetItems {
    type: typeof SET_ITEMS
    payload: Array<Item>
}


/**
 * Action functions
 */

export interface PinItemFunc {
    (pinnedId: number): PinItem
}

export interface SetItemsFunc {
    (data: Array<Item>): SetItems
}

/**
 * Module action types
 */

export type ItemTypes = PinItem | SetItems

/**
 * State interface
 */

export interface ItemsState  {
    items: Array<Item>
    pinnedId: number
}
