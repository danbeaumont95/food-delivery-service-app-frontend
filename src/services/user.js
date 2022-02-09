import axios from 'axios';
import { url } from './url';

const userLogin = async (user) => {
  const { email, password } = user;
  const res = await axios.post(`${url}/api/users/session`, {
    email,
    password,
    type: 'user'
  });
  return res;
};

const exportObject = {
  userLogin
};

export default exportObject;