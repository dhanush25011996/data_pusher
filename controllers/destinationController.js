const Destination = require('../models/destination');
const Account = require('../models/account');

exports.createDestination = async (req, res) => {
  try {
    const { accountId, url, httpMethod, headers } = req.body;
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const destination = await Destination.create({
      url,
      httpMethod,
      headers,
      AccountId: accountId
    });
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { url, httpMethod, headers } = req.body;
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    destination.url = url || destination.url;
    destination.httpMethod = httpMethod || destination.httpMethod;
    destination.headers = headers || destination.headers;
    await destination.save();
    res.status(200).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    await destination.destroy();
    res.status(200).json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDestinationsForAccount = async (req, res) => {
  try {
    const destinations = await Destination.findAll({ where: { AccountId: req.params.accountId } });
    res.status(200).json(destinations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
