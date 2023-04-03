const express = require("express");

const {
  postReview,
  getReviews,
  uploadFile,
  functionTest,
} = require("../controllers/reviewController");

const router = express.Router();
router
  .route("/reviews")
  .get(getReviews)
  .post(uploadFile, postReview, functionTest);

module.exports = router;
