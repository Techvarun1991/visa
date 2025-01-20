// // const API_BASE_URL = `https://${process.env.REACT_APP_BACKEND_URL}`;
// const API_BASE_URL = 'http://localhost:8000';
// export default API_BASE_URL;

const API_BASE_URL = `http://${process.env.REACT_APP_BACKEND_URL || 'localhost:8000'}`;
export default API_BASE_URL;
