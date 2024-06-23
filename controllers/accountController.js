const Account = require('../models/account');
const { v4: uuidv4 } = require('uuid');

exports.createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const account = await Account.create({
      email,
      accountId: uuidv4(),
      accountName,
      appSecretToken: uuidv4(),
      website,
    });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    account.email = email || account.email;
    account.accountName = accountName || account.accountName;
    account.website = website || account.website;
    await account.save();
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    await account.destroy();
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
