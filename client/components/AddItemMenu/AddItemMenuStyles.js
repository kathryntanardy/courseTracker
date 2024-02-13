import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    mainView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'absolute',
        zIndex: 2
    },
    formView: {
        width: '80%',
        height: 400,
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: '10%',
        zIndex: 3,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addItemContainer: {
        marginLeft: '10%',
        marginTop: 60
    },
    addItemText: {
        fontSize: 20
    },
    addItemInputContainer: {
        width: '80%',
        marginLeft: '10%',
        marginTop: 20,
    },
    addItemInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    addItemButtonContainer: {
        marginTop: 20,
        width: '80%',
        marginLeft: '10%',
    }
});

export default styles;