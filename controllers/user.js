const { request, response } = require("express");

const getUser = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "GET Api - Controller",
    query,
  });
};

const postUser = (req = request, res = response) => {
  const body = req.body;
  res.json({
    msg: "POST Api - Controller",
    body,
  });
};

const putUser = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "PUT Api - Controller",
    id,
  });
};

const patchUser = (req = request, res = response) => {
  res.json({
    msg: "PATCH Api - Controller",
  });
};

const deleteUser = (req = request, res = response) => {
  res.json({
    msg: "DELETE Api - Controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
