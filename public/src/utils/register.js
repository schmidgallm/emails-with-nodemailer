import axios from 'axios';

export const register = async (first_name, last_name, email) => {
  // init user object
  const user = {
    first_name,
    last_name,
    email
  };

  // post to users route
  const response = await axios.post('/api/v1/users', user);

  return response;
};
