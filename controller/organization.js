const orgModel = require('../models/organization')

class Organization {

    static async addOrg(req, res, next) {
      try {
        const newOrg = await orgModel.create(req.body);
  
        res.status(201).json(newOrg);
      } catch (err) {
        next(err);
      }
    }

    static async getOrg(req, res, next) {
        try {
          const orgList = await orgModel.findAll();
    
          res.status(201).json(orgList);
        } catch (err) {
          next(err);
        }
    }

    static async getOrgDetail(req, res, next) {
      try {
        const orgList = await orgModel.findAll();
  
        res.status(201).json(orgList);
      } catch (err) {
        next(err);
      }
  }

    static async createOrg(req, res, next) {
      try {
        console.log(req.body);
        const newOrg = await orgModel.create(req.body);
  
        res.status(201).json(newOrg);
      } catch (err) {
        console.log(err);
        next(err);
      }
  }
}

module.exports = Organization