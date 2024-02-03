import { View, Text, ScrollView, FlatList, StyleSheet} from 'react-native'

const courses = [
    { name: 'English', id: '1A' }
];

const Item = ({ name }) => (
    <View>
      <Text style={styles.text}>{name}</Text>
    </View>
);
  

export default function CourseContent() {

    const renderItem = ({ item }) => <Item name={item.name} />;
    return (
        <View style={styles.container}>
            <Text style={styles.credit}>
                3
            </Text>
            <View style={styles.innerContainer}>
                <FlatList
                    style={styles.divBox}
                    data={courses}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}></FlatList>
            </View>
           
           <View>

           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 40,
        justifyContent: 'center',
        textAlign: 'center'
    },
    text: {
        color: 'white', 
        fontSize: 25,
        fontFamily: 'Arial Rounded MT Bold',
        opacity: 1,
        paddingLeft: 15,
    },
    divBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15,
        marginHorizontal: 40,
        borderRadius: 5,
        height: 100,
    },
    credit: {
        fontSize: 25,
        color: 'black',
        padding: 15,
        marginLeft: 25,
        fontFamily: 'Arial Rounded MT Bold',
    },
    innerContainer:{
        padding: 0,
        width: 300,
        height: 75,
    }
})