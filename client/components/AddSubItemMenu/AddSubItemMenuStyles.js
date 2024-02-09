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
        height: 450,
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: '10%',
        zIndex: 3,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addSubItemContainer: {
        marginLeft: '10%',
        marginTop: 60
    },
    addSubItemText: {
        fontSize: 20
    },
    addSubItemInputContainer: {
        width: '80%',
        marginLeft: '10%',
        marginTop: 20,
    },
    addSubItemInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    addSubItemButtonContainer: {
        marginTop: 20,
        width: '80%',
        marginLeft: '10%',
    }
});

export default styles;