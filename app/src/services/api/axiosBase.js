import axios from 'axios';

export default axios.create({
    baseURL: `http://${process.env.BASE_API_URL}`,
});