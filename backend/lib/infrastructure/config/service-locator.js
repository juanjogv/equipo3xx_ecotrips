"use strict";

const constants = require("./constants");
const environment = require("./environment");
const JwtAccessTokenManager = require("../security/JwtAccessTokenManager");
const UserSerializer = require("../../interfaces/serializers/UserSerializer");
const ProductSerializer = require("../../interfaces/serializers/Home/ProductSerializer");
const ReviewSerializer = require("../../interfaces/serializers/ReviewSerializer");

function buildBeans() {
  const beans = {
    accessTokenManager: new JwtAccessTokenManager(),
    userSerializer: new UserSerializer(),
    productSerializer: new ProductSerializer(),
    reviewSerializer: new ReviewSerializer(),
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    throw new Error("Add In Memory support");
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    throw new Error("Add MongoDB support");
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.POSTGRES) {
    const UserRepository = require("../repositories/UserRepository");
    const HomeRepository = require("../repositories/HomeRepository");
    const ReviewRepository = require("../repositories/ReviewRepository");
    beans.userRepository = new UserRepository();
    beans.homeRepository = new HomeRepository();
    beans.reviewRepository = new ReviewRepository();
  } else {
    const UserRepositorySQLite = require("../repositories/UserRepositorySQLite");
    beans.userRepository = new UserRepositorySQLite();
  }

  return beans;
}

module.exports = buildBeans();
