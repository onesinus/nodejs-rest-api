const axios = require('axios');

async function getJobList(req, res) {
  try {
    const { description, location, full_time, page } = req.query;
    const apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions.json?description=${description}&location=${location}&full_time=${full_time}&page=${page}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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