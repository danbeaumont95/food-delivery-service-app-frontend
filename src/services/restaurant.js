import axios from 'axios';
import { url } from './url';

const restaurantLogin = async (user) => {
  const { email, password } = user;
  const res = await axios.post(`${url}/api/users/session`, {
    email,
    password,
    type: 'restaurant'
  });
  return res;
};

const exportObject = {
  restaurantLogin
};

export default exportObject;