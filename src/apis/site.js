import axios from 'axios';
const endpoint = 'https://j6t1jffqn5.execute-api.ap-southeast-2.amazonaws.com/dev/build-large-site'

export const createSite = (data) => {
  return axios.post(endpoint, data)
}