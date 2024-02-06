import axios from 'axios';

const url = 'http://10.0.2.2:5000/coursetracker';

export const getCourses = async () => {
    return await axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((err) => err.message);
}