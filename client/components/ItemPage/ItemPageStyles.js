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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 20,
        marginBottom: 20
    },
    editSubItemButton: {
        color: "white",
        borderRadius: 10,
        padding: 5
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    displaySubItemOptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        marginRight: '10%',
        alignItems: 'center'
    },
    itemProgressDisplayContainer: {
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
    itemProgressGrade: {
        display: 'flex',
        flexDirection: 'column'
    },
    itemProgressVerticalLine: {
        backgroundColor: 'grey',
        height: 75,
        width: 2,
        marginVertical: 10
    },
    progressCircleText: {
        fontSize: 15
    }
});

export default styles;