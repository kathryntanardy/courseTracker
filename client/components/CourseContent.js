import { Image, View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { useState } from 'react'
import Header from './Header'

const courses = [
    { name: 'English', id: '1A', credits: 3 },
    { name: 'Chinese', id: '2B', credits: 3 },
    { name: 'CMPT', id: '3C', credits: 4 }
];


const Separator = () => <View style={styles.separator} />;
export default function CourseContent() {
    const [subjectName, setSubjectName] = useState('COURSES');

    const handlePress = (subject) => {
        setSubjectName(subject.name)
    }

    const backHome = () => {
        setSubjectName('COURSES')
    }

    if (subjectName == 'COURSES') {

        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
                <View style={styles.innerContainer}>
                    <Text style={styles.text}>{item.credits}</Text>
                    <Text style={styles.right}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <>
                <View style={styles.headerOuter}>
                    <Header name={subjectName}/>
                    <Text style={styles.subHeadingText}>
                        credits
                    </Text>
                </View>
                <View style={styles.outer}> 
                    <View style={styles.container}>
                <FlatList
                    style={styles.divBox}
                    data={courses}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                    ItemSeparatorComponent={Separator}></FlatList>
            </View>
                </View>

            </>
        )
    }
    else {
        
        return (
            <>
                <View style={styles.pressableOuter}>
                    <Pressable onPress={backHome}>
                        <Image
                            resizeMode='contain'
                            style={styles.backButton}
                            source={require('../img/arrow.png')}
                        />
                    </Pressable>
                </View>
                <View style={styles.outer}>
                    <Header name={subjectName}/>
                </View>


            </>

        )
    }

}

const styles = StyleSheet.create({
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
})