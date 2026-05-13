import axios from 'axios'
const instances = axios.create({
    baseURL: 'https://agri-smart-4itq.onrender.com'
})
export default instances 
