import { View, Text, ScrollView, FlatList, SectionList, StyleSheet} from 'react-native'

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
        <View>
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black'
    }
})