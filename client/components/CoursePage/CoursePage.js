import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import styles from './CoursePageStyles.js';
import AntIcon from 'react-native-vector-icons/AntDesign';

const CoursePage = ({ navigation, route }) => {
  
    const goBack = () => {
        navigation.navigate('Home', {});
    };
    
    return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
        <View style={[styles.headerContainer, { backgroundColor: route.params.colour }]}>
            <View style={styles.backButtonWrapper}>
                <TouchableOpacity onPress={goBack} >
                    <AntIcon name="back" color="white" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.headerTextWrapper}>
                <Text style={styles.headerText}>
                    {route.params.name}
                </Text>
            </View>
        </View>
    </View>
  )
}

export default CoursePage