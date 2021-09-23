const { Customer } = require('../models');

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: ['firstName', 'lastName']
    });
    res.json({ customers });
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    res.json({ customer });
  } catch (err) {
    next(err);
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const { firstName, lastName, birthDate, gender, address } = req.body;
    const customer = await Customer.create({
      firstName,
      lastName,
      gender,
      birthDate,
      address
    });
    res.status(201).json({ customer: customer });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, birthDate, gender, address } = req.body;
    const rows = await Customer.update(
      {
        firstName,
        lastName,
        gender,
        birthDate,
        address
      },
      {
        where: { id }
      }
    );
    if (rows[0] === 0) return res.status(400).json({ message: 'update failed' });
    res.json({ message: 'update completed' });
  } catch (err) {
    next(err);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Customer.destroy({
      where: { id }
    });
    if (rows === 0) return res.status(400).json({ message: 'delete failed' });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
