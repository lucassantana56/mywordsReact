import axios from 'axios';

const api = axios.create({
    baseURI: 'http://192.168.1.89:3333'
});

export default api