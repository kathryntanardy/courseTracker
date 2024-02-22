import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    courseContainer: {
        width: '100%',
        marginTop: 30,
        height: 450
    },
    subItemContainer: {
        width: '100%',
        marginTop: 30,
        height: 200
    },
    flatListHeaderTextWrapper: {
        width: '95%',
        marginLeft: '2.5%',
        borderBottomWidth: 1
    },
    flatListHeaderText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    courseInfo: {
        paddingLeft: 15
    }, 
    courseCredits: {
        color: 'black',
        fontSize: 15,
        opacity: 1,
    },
    courseName: {
        color: 'black',
        fontSize: 25,
        opacity: 1,
    },
    divBox: {
        marginTop: 15,
        paddingRight: 15,
        paddingLeft: 15
    },
    outerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator: {
        borderBottomWidth: 1,
        width: '100%',
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 20,
        marginBottom: 20
    },
    backButton: {
        width: 30,
        marginLeft: 40,
        height: 30,
        position: 'absolute',
        padding: 0,
        marginTop: 40,
        backgroundColor: 'black'
    },
    outer: {
        flex: 1,
    },
    header:{
        fontSize: 40,
        margin: 40,

    },
    pressableOuter:{
        paddingTop: 20,
        height: 100,
    },
    headerOuter:{
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
    addButtonWrapper: {
        marginLeft: '80%'
    },
    courseColourCircle: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: 'black'
    },
    displayItemOptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        alignItems: 'center'
    },
    editItemButton: {
        color: "white",
        borderRadius: 10,
        padding: 5
    },
    subItemColourCircle: {
        width: 10,
        height: 10
    }
});

export default styles;