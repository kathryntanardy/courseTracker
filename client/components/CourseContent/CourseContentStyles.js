import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    addButtonView: {
        width: '50%',
        marginTop: 20,
        marginLeft: '25%',
    },
    container: {
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        marginHorizontal: 40,
    },
    text: {
        color: 'black',
        fontSize: 25,
fontFamily: 'Arial Rounded MT Bold',
        opacity: 1,
        paddingLeft: 15,
    },
    right: {
        color: 'black',
        fontSize: 25,
fontFamily: 'Arial Rounded MT Bold',
        opacity: 1,
        paddingLeft: 150,
    },
    divBox: {
        padding: 15,
        width: 350,
    },
    innerContainer: {
        flexDirection: 'row',
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        margin: 20
    },
    subHeadingText: {
        color: '#FFC567',
        marginHorizontal: 40,
fontFamily: 'AlNile-Bold',
        fontSize: 20,
    },
    backButton: {
        width: 30,
        marginLeft: 40,
        height: 30,
        position: 'absolute',
        padding: 0,
        marginTop: 40,
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
        marginTop: 100,
    }
});

export default styles;