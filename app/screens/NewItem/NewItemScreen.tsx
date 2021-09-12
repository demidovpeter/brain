import * as React from "react";
// UI
import ErrorMessage from "../../components/Typography/ErrorMessage";
import {ScrollView, View, StyleSheet} from "react-native";
import {Button, Snackbar, Subheading, TextInput} from "react-native-paper";
// redux
import {addNewItemThunk} from "../../modules/items";
import {RootState} from "../../modules";
import {connect, ConnectedProps} from "react-redux";
// rest
import {getEmptyForm} from "./utils";
import _ from "lodash";
import {MAIN_COLOR} from "../../utils/styles";

const mapState = (state: RootState) => ({
    items: state.items.items,
})

const mapDispatch = {addNewItemThunk}
type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(mapState, mapDispatch)

const NewItemScreen = (props: PropsFromRedux) => {

    const requiredErrorMessage = 'This field is required'
    const numberErrorMessage = 'Please enter valid number'

    const initialErrors = {
        name: '',
        description: '',
        price: '',
    }
    const initialForm = getEmptyForm(props.items)

    const [errors, setErrors] = React.useState(initialErrors)
    const [itemForm, setItemForm] = React.useState(initialForm)

    function isFormValid() {
        let isValid = true

        /** Reset errors */
        setErrors(initialErrors)
        /**
         * Check the fields.
         * `Name` and `Description` must not be empty
         * `Price` has to be a valid number greater than 0
         * */
        if (itemForm.name.trim() === '') {
            setErrors(prevState => ({...prevState, name: requiredErrorMessage}))
            isValid = false
        }
        if (itemForm.description.trim() === '') {
            setErrors(prevState => ({...prevState, description: requiredErrorMessage}))
            isValid = false
        }

        const price = _.toNumber(itemForm.price)

        if (_.isNaN(price) || price <= 0) {
            setErrors(prevState => ({...prevState, price: numberErrorMessage}))
            isValid = false
        }
        return isValid
    }

    function onFormSubmit() {
        if (isFormValid()) {
            /** Update Redux store */
            props.addNewItemThunk({
                ...itemForm,
                price: _.toNumber(itemForm.price)
            })
            /** Reset form */
            setItemForm(getEmptyForm(props.items))
            /** Push notifier */
            setVisibleNotification(true)
        }
    }

    /** Notification */
    const [visibleNotification, setVisibleNotification] = React.useState(false)
    const SaveNotification = () => {
        return (
            <Snackbar
                visible={visibleNotification}
                onDismiss={() => setVisibleNotification(false)}
                duration={3000}
            >
                New item has been saved!
            </Snackbar>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <Subheading style={styles.input}>Please fill out the form and press submit button.</Subheading>
                <TextInput
                    mode="outlined"
                    label="Name/Title"
                    style={styles.input}
                    value={itemForm.name}
                    onChangeText={(text) => setItemForm(prevState => ({...prevState, name: text}))}
                />
                {!!errors.name && <ErrorMessage text={errors.name}/>}
                <TextInput
                    mode="outlined"
                    label="Price"
                    style={styles.input}
                    value={itemForm.price}
                    keyboardType={`number-pad`}
                    left={<TextInput.Affix text="$"/>}
                    onChangeText={(text) => setItemForm(prevState => ({...prevState, price: text}))}
                />
                {!!errors.price && <ErrorMessage text={errors.price}/>}
                <TextInput
                    mode="outlined"
                    label="Description"
                    style={styles.input}
                    value={itemForm.description}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setItemForm(prevState => ({...prevState, description: text}))}
                />
                {!!errors.description && <ErrorMessage text={errors.description}/>}
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={onFormSubmit}
                >
                    Submit
                </Button>
            </ScrollView>
            <SaveNotification/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    input: {
        marginTop: 10,
        marginHorizontal: 10
    },
    button: {
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: MAIN_COLOR
    }
});

export default connector(NewItemScreen);
