import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        backgroundColor: "green",
        position: 'fixed'
    },
    headerTextWrapper: {
        position: 'absolute'
    },
    headerText: {
        color: 'white',
        fontSize: 30,
    },
    backButtonWrapper: {
        marginRight: '80%'
    },
    flatListContainer: {
        width: '100%'
    },
    flatListItem: {
        padding: 15,
    },
    separator: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 20,
        marginBottom: 20
    }

});

export default styles;