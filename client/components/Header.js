import { View, Text, StyleSheet } from 'react-native'

export default function Header() {
    return (
        <>
        <View style={styles.container}>
            <Text style={styles.headerText}>
                COURSES {'\n'}
                <Text style={styles.subHeadingText}>
                    credits
                </Text>
            </Text>
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 0.30,
    },
    headerText: {
        flex: 1,
        fontSize: 35,
        marginTop: 120,
        marginHorizontal: 40,
        fontFamily: 'AlNile-Bold',
        color: 'white',
        lineHeight: 0,
    },
    subHeadingText : {
        color: '#FFC567',
        marginTop: 0, 
        marginHorizontal: 60,
        fontFamily: 'AlNile-Bold',
        fontSize: 20,
    }
})