const { QueryTypes } = require('sequelize');
const { Account, Customer, Branch, sequelize, Sequelize } = require('../models');

exports.getAccountsByCustomerId = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    // const accounts = await Account.findAll({
    //   where: {
    //     customerId
    //   },
    //   attributes: ['id', 'openDate', 'balance'],
    //   include: [
    //     {
    //       model: Customer,
    //       attributes: {
    //         exclude: ['createdAt', 'updatedAt']
    //       }
    //     },
    //     {
    //       model: Branch,
    //       attributes: ['name']
    //     }
    //   ]
    // });
    // const sql =
    //   'SELECT a.id AS id, a.open_date AS openDate, a.balance AS balance, c.id AS cId' +
    //   ', c.first_name AS firstName, c.last_name AS lastName, c.gender AS gender, c.birth_date AS birthDate' +
    //   ',c.address AS address, b.name AS name FROM accounts a LEFT JOIN customers c ON a.customer_id = c.id ' +
    //   'LEFT JOIN branches b ON b.id = a.branch_id WHERE c.id = :customerId';

    // const accounts = await sequelize.query(sql, {
    //   type: QueryTypes.SELECT,
    //   replacements: {
    //     customerId: customerId
    //   }
    // });

    const result = await Account.findAll({
      attributes: ['customerId', [Sequelize.fn('SUM', Sequelize.col('balance')), 'total']],
      group: ['customerId'],
      include: Customer
    });

    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
