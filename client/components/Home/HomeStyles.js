import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%'
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
        padding: 15,
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
    }
});

export default styles;