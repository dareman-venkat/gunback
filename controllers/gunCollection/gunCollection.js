import gunCollectionModel from "../../model/gunCollection.js";
import mongoose from "mongoose";

const Schema = mongoose.Types;
var ObjectId = Schema.ObjectId;

let users = [];

export const getUsers = async (req, res) => {
  console.log(`Users in the database: ${users}`);
  const get = await gunCollectionModel.getUsers(res.body);

  res.send(get);
};
export const activeUsers = async (req, res) => {
  console.log(`Users in the database: ${users}`);
  const get = await gunCollectionModel.activeUsers(res.body);

  res.send(get);
};
export const noactiveUsers = async (req, res) => {
  console.log(`Users in the database: ${users}`);
  const get = await gunCollectionModel.noactiveUsers(res.body);

  res.send(get);
};

export const createUser = async (req, res) => {
  var timeInMss = new Date().getTime();
  console.log("masstime is", timeInMss);
  const user = {
    gunModelName: req.body.gunModelName,
    gunCompany: req.body.gunCompany,
    gunstock: req.body.gunstock,
    gunimgurl: req.body.gunimgurl,
    gunModelYear: req.body.gunModelYear,
    gunRentalAmount: req.body.gunRentalAmount,
    plateNo: req.body.plateNo,
    gunColor: req.body.gunColor,
    isActive: "Yes",
    isDeleted: "No",
    guntimestamp: timeInMss,
  };

  try {
    const result = await gunCollectionModel.createUser(user)
      .then((response) => {
        return "successfully";
      })
      .catch((error) => {
        return error;
      });

    console.log(result);
    res.send({ success: true, message: "successfully added", data: result });
    console.log("-->controller hit");
  } catch (error) {
    res.send({ success: false, message: error.message });
  }

  console.log(`User [${user.username}] added to the database.`);
};

export const getUser = async (req, res) => {
  console.log(res.body);
  console.log(req.params.id);
  const result = await gunCollectionModel.getUser(req.params.id);

  res.send(result);
};

export const deleteUser = async (req, res) => {
  const deleteone = await gunCollectionModel.deleteUser(req.params.id);

  res.send("delete sucesssfully");
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updateone = await gunCollectionModel.updateUser(id, updates)
      .then((response) => {
        return "successfully";
      })
      .catch((error) => {
        return error;
      });
    //let user = users.replace((res) =>res._id == (req.params.id));
    //user.gun = req.body.gun;

    console.log(
      ` ${req.body.firstName} ${req.body.lastName} username has been updated  `
    );
    res.send("Updated sucesssfully");
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
