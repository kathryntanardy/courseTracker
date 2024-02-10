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

export const editItem = async (itemData) => {
    return await axios.patch(`${url}/item/edit`, itemData)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
}

// Delete an item from a course
export const deleteItem = async (itemData) => {
    return await axios.delete(`${url}/item`, { data: itemData })
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Get subItems from Item
export const getSubItems = async (courseItemData) => {
    return await axios.get(`${url}/item/subitem?courseName=${courseItemData.courseName}&itemName=${courseItemData.itemName}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Add subitem to Item
export const addSubItem = async (courseItemData) => {
    return await axios.patch(`${url}/item/subitem`, courseItemData)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Delete subItem from item
export const deleteSubItem = async (courseItemData) => {
    return await axios.delete(`${url}/item/subitem`, { data: courseItemData })
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};