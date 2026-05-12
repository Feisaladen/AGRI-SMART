import axios from 'axios'
const instances = axios.create({
    baseURL: 'http://localhost:5000'
})
export default instances 