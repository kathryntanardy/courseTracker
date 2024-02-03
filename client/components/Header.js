import { View, Text, StyleSheet } from 'react-native'

export default function Header(props) {
   
        return (
            <>
                <Text style={styles.headerText}>
                    {props.name}
                </Text>
            </>  
        )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 35,
        paddingTop: 0,
        marginLeft: 40,
        fontFamily: 'AlNile-Bold',
        color: 'white',
        textTransform:'uppercase',
    },
    
})