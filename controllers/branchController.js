const { Branch } = require('../models');

exports.getAllBranches = async (req, res, next) => {
  try {
    const branches = await Branch.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      order: ['name']
    });
    res.json({ branches });
  } catch (err) {
    next(err);
  }
};

exports.getBranchById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    res.json({ branch });
  } catch (err) {
    next(err);
  }
};

exports.createBranch = async (req, res, next) => {
  try {
    const { name } = req.body;
    const branch = await Branch.create({
      name
    });
    res.status(201).json({ branch });
  } catch (err) {
    next(err);
  }
};

exports.updateBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const rows = await Branch.update(
      {
        name
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

exports.deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Branch.destroy({
      where: { id }
    });
    if (rows === 0) return res.status(400).json({ message: 'delete failed' });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
