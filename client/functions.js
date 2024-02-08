import axios from 'axios';

const url = 'http://10.0.2.2:5000/coursetracker';

// Get all courses
export const getCourses = async () => {
    return await axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Add a new course
export const addCourse = async (newCourseData) => {
    return await axios.post(url, newCourseData)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Delete a course
export const deleteCourse = async (courseData) => {
    return await axios.delete(url, { data: courseData })
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Get all items from a course
export const getItems = async (courseData) => {
    return await axios.get(`${url}/allitems?courseName=${courseData}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
}

// Add a new item to a course
export const addItem = async (newItemData) => {
    return await axios.patch(`${url}/item`, newItemData)
    .then((res) => {
        return res.data
    })
    .catch((err) => err.message);
}

// Get subitems from item
export const getSubItems = async (courseItemData) => {
    return await axios.post(`${url}/item/subitems`, courseItemData)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};