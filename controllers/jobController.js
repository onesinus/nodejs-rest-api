const axios = require('axios');

async function getJobList(req, res) {
  try {
    // Extract query parameters from request
    const { description = '', location = '', full_time = '', page = '' } = req.query;

    let apiUrl = 'https://dev6.dansmultipro.com/api/recruitment/positions.json?';
    
    // Check if description query parameter exists
    if (description) {
      apiUrl += `description=${description}&`;
    }
    
    // Check if location query parameter exists
    if (location) {
      apiUrl += `location=${location}&`;
    }
    
    // Check if full_time query parameter exists
    if (full_time) {
      apiUrl += `full_time=${full_time}&`;
    }
    
    // Check if page query parameter exists
    if (page) {
      apiUrl += `page=${page}&`;
    }
    
    // Remove trailing '&' character from the URL
    apiUrl = apiUrl.slice(0, -1);
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
}

async function getJobDetail(req, res) {
  const jobId = req.params.id;
  try {
    const apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions/${jobId}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
}

module.exports = { getJobList, getJobDetail };