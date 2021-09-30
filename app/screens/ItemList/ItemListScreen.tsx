import * as React from "react";
// UI
import {ScrollView, StyleSheet, View} from "react-native";
import ListItem from "../../components/ListItem/ListItem";
import {Button, Dialog, Paragraph, Portal, Searchbar, Title} from "react-native-paper";
//redux
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from "../../modules";
import {deleteItemThunk, setPinnedItemThunk} from "../../modules/items";
// rest
import _ from "lodash";
import {INITIAL_PINNED_ID} from "../../utils/constants";
import {searchItems, getOrderedItemsList} from "./utils";
import {MAIN_COLOR} from "../../utils/styles";

const mapState = (state: RootState) => ({
    items: state.items.items,
    pinnedId: state.items.pinnedId
})
const test = 2222
const mapDispatch = {
    setPinnedItemThunk,
    deleteItemThunk
}
type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState, mapDispatch)

const ItemListScreen = (props: PropsFromRedux) => {

    /**
     * Items that will be shown after searching
     * Initially all of them
     */
    const [listedItems, setListedItems] = React.useState(props.items)
    React.useEffect(() => {
        const searchResult = searchItems(props.items, searchQuery.toLowerCase())
        setListedItems(searchResult)
    }, [props.items])

    /** Delete item */
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);
    const [deleteItemId, setDeleteItemId] = React.useState(INITIAL_PINNED_ID)

    function onDelete(itemId: number) {
        setDeleteItemId(itemId)
        setVisible(true)
    }

    function onDeleteConfirm() {
        props.deleteItemThunk(deleteItemId)
        setVisible(false)
    }

    /** Search */
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const onChangeSearch = (query: string) => {
        setSearchQuery(query)
        const searchResult = searchItems(props.items, query.toLowerCase())
        setListedItems(searchResult)
    };

    const EmptyList = () => {
        return (
            <View style={styles.messageContainer}>
                <Title children={`No items to display`}/>
            </View>
        )
    }

    const DeleteConfirmationDialog = () => {
        return (
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>DELETE</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Would you like to remove the item from the store?
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.actions}>
                        <Button color={MAIN_COLOR} onPress={onDeleteConfirm}>Yes</Button>
                        <Button mode={`contained`} color={MAIN_COLOR} onPress={hideDialog}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }

    /** Items list will be displayed if it's not empty only */
    const Items = () => {
        const orderedList = getOrderedItemsList(listedItems, props.pinnedId)
        return (
            <React.Fragment>
                {
                    _.map(orderedList, item => {
                        return (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                description={item.description}
                                price={item.price}
                                pinned={props.pinnedId === item.id}
                                setPinned={() => props.setPinnedItemThunk(item.id)}
                                onDeletePressed={() => onDelete(item.id)}
                            />
                        )
                    })
                }
            </React.Fragment>
        )
    }

    return (
        <ScrollView>
            <Searchbar
                style={styles.search}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {!listedItems.length ? <EmptyList/> : <Items/>}
            <DeleteConfirmationDialog/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
      marginTop: 10,
      marginHorizontal: 10
    },
    actions: {
        justifyContent: 'space-around'
    }
})

export default connector(ItemListScreen);
