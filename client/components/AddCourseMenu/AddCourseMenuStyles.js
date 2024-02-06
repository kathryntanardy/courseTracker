import { StyleSheet } from "react-native";

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
        marginTop: '50%',
        zIndex: 3,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addCourseContainer: {
        marginLeft: '10%',
        marginTop: 60
    },
    addCourseText: {
        fontSize: 20
    },
    addCourseInputContainer: {
        width: '80%',
        marginLeft: '10%',
        marginTop: 20,
    },
    addCourseInput: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    addCourseButtonContainer: {
        marginTop: 20,
        width: '80%',
        marginLeft: '10%',
    },
});

export default styles;