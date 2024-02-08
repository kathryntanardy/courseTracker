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
        fontFamily: 'AlNile-Bold',
        fontSize: 30,
    },
    backButtonWrapper: {
        marginRight: '80%'
    }
});

export default styles;