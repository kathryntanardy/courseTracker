import axios from 'axios';

const url = 'http://10.0.2.2:5000/coursetracker';

// Get all courses
export const getCourses = async () => {
    return await axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
}

// Add a new course
export const addCourse = async (newCourseData) => {
    return await axios.post(url, newCourseData)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
}