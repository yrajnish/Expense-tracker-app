const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transectionCtrl");

//router objectrs
const router = express.Router();

//routes

//add transaction POST  method
router.post("/add-transection", addTransection);

//edit transaction POST  method
router.post("/edit-transection", editTransection);

// delete transaction
router.post("/delete-transection", deleteTransection);

//get transection
router.post("/get-transection", getAllTransection);
module.exports = router;
