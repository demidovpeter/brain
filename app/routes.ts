import {MAIN_COLOR, WHITE_COLOR} from "./utils/styles";

export const routes = {
    root: {
        bottomTabs: {
            id: 'BOTTOM_TABS_LAYOUT',
            children: [
                {
                    stack: {
                        id: 'LIST_TAB',
                        children: [
                            {
                                component: {
                                    id: 'LIST_SCREEN',
                                    name: `com.brain.ItemListScreen`,
                                },
                            },
                        ],
                        options: {
                            bottomTab: {
                                icon: require('./assets/img/shop.png'),
                                iconColor: WHITE_COLOR
                            },
                            topBar: {
                                background: {
                                    color: MAIN_COLOR
                                },
                                title: {
                                    text: 'STORE',
                                    color: WHITE_COLOR
                                }
                            }
                        },
                    },
                },
                {
                    stack: {
                        id: 'NEW_ITEM_TAB',
                        children: [
                            {
                                component: {
                                    id: 'NEW_ITEM_SCREEN',
                                    name: `com.brain.NewItemScreen`,
                                },
                            },
                        ],
                        options: {
                            bottomTab: {
                                icon: require('./assets/img/add.png'),
                            },
                            topBar: {
                                background: {
                                    color: MAIN_COLOR
                                },
                                title: {
                                    text: 'ADD NEW ITEM',
                                    color: WHITE_COLOR
                                }
                            }
                        },
                    },
                },
            ],
            options: {
                bottomTabs: {
                    backgroundColor: MAIN_COLOR,
                },
                statusBar: {
                    backgroundColor: MAIN_COLOR,
                    visible: true
                }
            }
        },
    },
}
