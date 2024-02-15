import axios from 'axios';

const url = "http://127.0.0.1:5000"

export default axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application',
    }
})