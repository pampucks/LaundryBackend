const jwt = require("jsonwebtoken");
const UserServiceFetch = require("./UserServiceFetch");

const UserServiceCreateJWT = async (email, expiresIn = "24h") => {
  const user = await UserServiceFetch(email);
  const token = jwt.sign(
    { first_name: user.first_name, last_name: user.last_name, email },
    process.env.TOKEN,
    { expiresIn }
  );

  return { token };
};

module.exports = UserServiceCreateJWT;
