// Import axios for making HTTP requests
import axios from 'axios';

// Create an axios instance with custom configuration
const instance = axios.create({
    // Set the base URL for all requests to the backend server
    baseURL: 'http://localhost:3001', 
});

// Export the configured axios instance for use in other components
export default instance;