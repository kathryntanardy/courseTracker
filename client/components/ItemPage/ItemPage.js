import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { useState } from 'react'
import { getCourses } from '../../functions.js';
import { useQuery } from 'react-query';
import AddCourseMenu from '../AddCourseMenu/AddCourseMenu.js';
import DeleteCourseMenu from '../DeleteCourseMenu/DeleteCourseMenu.js';
import AntIcon from 'react-native-vector-icons/AntDesign';

import styles from './ItemPageStyles.js';
import { StackActions } from '@react-navigation/native';

const ItemPage = ({ navigation, route }) => {
  
    const goBack = () => {
        navigation.dispatch(StackActions.pop());
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

export default ItemPage