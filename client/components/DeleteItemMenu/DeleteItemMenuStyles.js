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
        height: 300,
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: '50%',
        zIndex: 3,
        backgroundColor: 'white',
        borderRadius: 10
    },
    deleteItemTextContainer: {
        marginLeft: '10%',
        marginTop: 60
    },
    deleteItemText: {
        fontSize: 20
    },
    deleteItemMenuSubtitleContainer: {
        marginLeft: '10%',
        marginTop: 10
    },
    deleteItemMenuSubtitleText: {
        fontSize: 10
    },
    deleteItemButtonContainer: {
        marginTop: 20,
        width: '80%',
        marginLeft: '10%',
    },
});

export default styles;