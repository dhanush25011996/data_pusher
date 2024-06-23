const Account = require('../models/account');
const Destination = require('../models/destination');
const axios = require('axios');

exports.handleIncomingData = async (req, res) => {
  try {
    const token = req.headers['cl-x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    const account = await Account.findOne({ where: { appSecretToken: token } });
    if (!account) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    const destinations = await Destination.findAll({ where: { AccountId: account.id } });
    const data = req.body;

    for (const dest of destinations) {
      const config = {
        method: dest.httpMethod.toLowerCase(),
        url: dest.url,
        headers: dest.headers,
      };

      if (dest.httpMethod === 'GET') {
        config.params = data;
      } else {
        config.data = data;
      }

      await axios(config);
    }

    res.status(200).json({ message: 'Data pushed to destinations successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
