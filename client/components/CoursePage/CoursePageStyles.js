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
        marginRight: '70%'
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
        marginTop: 20,
        marginBottom: 20
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editItemButton: {
        color: "white",
        borderRadius: 10,
        padding: 5
    },
    displayItemOptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        marginRight: '10%',
        alignItems: 'center'
    },
    courseProgressDisplayContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 15,
        paddingBottom: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    courseProgressGrade: {
        display: 'flex',
        flexDirection: 'column'
    },
    courseProgressVerticalLine: {
        backgroundColor: 'grey',
        height: 75,
        width: 2,
        marginVertical: 10
    },
    itemListHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemListHeaderText: {
        fontSize: 20,
        paddingLeft: 15
    },
    progressCircleText: {
        fontSize: 15
    }
});

export default styles;