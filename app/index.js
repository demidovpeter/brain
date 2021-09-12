import * as React from 'react';
// redux
import {Provider} from 'react-redux';
import configureStore from './configureStore';
// nav
import {Navigation} from 'react-native-navigation';
import {routes} from './routes';
// UI
import ItemListScreen from './screens/ItemList/ItemListScreen';
import NewItemScreen from './screens/NewItem/NewItemScreen';
import { Provider as PaperProvider } from 'react-native-paper';

/** Create Redux store */
export const store = configureStore();

/** Register screens */
Navigation.registerComponent(
    `com.brain.ItemListScreen`,
    () => (props) =>
        <Provider store={store}>
            <PaperProvider>
                <ItemListScreen {...props} />
            </PaperProvider>
        </Provider>,
    () => ItemListScreen,
);

Navigation.registerComponent(
    `com.brain.NewItemScreen`,
    () => (props) =>
        <Provider store={store}>
            <PaperProvider>
                <NewItemScreen {...props} />
            </PaperProvider>
        </Provider>,
    () => NewItemScreen,
);

/** Setup navigation stack  */
Navigation.events().registerAppLaunchedListener(async () => {
    await Navigation.setRoot(routes);
});
