import CustomerDetailsModel from "../../model/CustomerDetails.js";

let users = [];

export const getUsers = async (req, res) => {
  console.log(`Users in the database: ${users}`);
  const get = await CustomerDetailsModel.getUsers(res.body);

  res.send(get);
};
export const activeUsers = async (req, res) => {
  console.log(`Users in the database: ${users}`);
  const get = await CustomerDetailsModel.activeUsers(res.body);

  res.send(get);
};
export const noactiveUsers = async (req, res) => {
  console.log(`Users in the database: ${users}`);
  const get = await CustomerDetailsModel.noactiveUsers(res.body);

  res.send(get);
};
export const geterror = async (req, res) => {
  let json = {
    statuscode: "401",
    message: "error",
  };
  JSON.stringify(json);
  res.status(401).send(json);
};

export const createUser = async (req, res) => {
  const { email } = req.body;
  const user = req.body;
  try {
    let result = await CustomerDetailsModel.createUser(req.body, email);

    res.send(result);
  } catch (error) {
    res.send({ success: false, message: error.message });
  }

  // users.push({...user, id: uuid()});

  console.log(`User [${user.username}] added to the database.`);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await CustomerDetailsModel.login(email, password);
  res.send(result);
};

export const getUser = async (req, res) => {
  console.log(res.body);
  console.log(req.params.id);
  const result = await CustomerDetailsModel.getUser(req.params.id);

  res.send(result);
};

export const deleteUser = async (req, res) => {
  const deleteone = await CustomerDetailsModel.deleteUser(req.params.id);

  res.send("delete sucesssfully");
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updateone = await CustomerDetailsModel.updateUser(id, updates)
      .then((response) => {
        return "successfully";
      })
      .catch((error) => {
        return error;
      });

    console.log(
      ` ${req.body.firstName} ${req.body.lastName} username has been updated  `
    );
    res.send("Updated sucesssfully");
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
