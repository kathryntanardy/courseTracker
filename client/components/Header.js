import { View, Text, StyleSheet } from 'react-native'

export default function Header(){
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Courses
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        backgroundColor: 'grey',
    },
    headerText: {
        textAlign: 'center', 
        fontSize: 30,
        padding: 60,
    }
})