var bcrypt = require("bcryptjs");
const BaseServiceQueryBuilder = require("../../base/services/BaseServiceQueryBuilder");
const { USER_CONFIG_MAIN_TABLE } = require("../config");

const UserServiceRegister = async (first_name, last_name, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  await BaseServiceQueryBuilder(USER_CONFIG_MAIN_TABLE).insert({
    first_name,
    last_name,
    email,
    password: passwordHash,
  });

  return { first_name, last_name, email, password };
};

module.exports = UserServiceRegister;
