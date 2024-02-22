import axios from 'axios';

const url = 'http://10.0.2.2:5000/coursetracker';

// Get all courses
export const getCourses = async () => {
    return await axios.get(`${url}/allcourses`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Get a specific course
export const getCourse = async (courseName) => {
    return await axios.get(`${url}?courseName=${courseName}`)
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

// Edit a course
export const editCourse = async (courseData) => {
    return await axios.patch(url, courseData)
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

// Get an item from a course
export const getItem = async (courseData) => {
    return await axios.get(`${url}/item?courseName=${courseData.courseName}&itemName=${courseData.itemName}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Add a new item to a course
export const addItem = async (newItemData) => {
    return await axios.patch(`${url}/item`, newItemData)
    .then((res) => {
        return res.data
    })
    .catch((err) => err.message);
}

// Edit a course item
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

// Get all subItems with upcoming due dates
export const getUpcomingSubItems = async () => {
    return await axios.get(`${url}/item/subitem/upcoming`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
}

// Add subitem to Item
export const addSubItem = async (courseItemData) => {
    return await axios.patch(`${url}/item/subitem`, courseItemData)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
};

// Edit subitem in item
export const editSubItem = async (subItemData) => {
    return await axios.patch(`${url}/item/subitem/edit`, subItemData)
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