"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const model = require("../models");

//user authentication and redirection
router.use(async (req, res, next) => {
  try {
    // check token from header
    let token = req.headers["authorization"]
      ? req.headers["authorization"].substring(7)
      : "";
    // decode token
    if (!token) {
      return next({ status: 401, message: "Admin Authentication required" });
    } else if (token) {
      // verifies secret and checks exp
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        {
          ignoreExpiration: true,
        },
        async (err, decoded) => {
          if (err) {
            return next({ status: 401, message: "Admin Authentication failed" });
          }
          req.decoded = decoded
          req.admin = await model.Admin.findOne({
            where: { id: decoded.id },
            raw: true,
            attributes: ["id"],
          });
          return next();
        }
      );
    } else {
      return next();
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
