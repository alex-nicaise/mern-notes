const { verifyJWT } = require("./verifyJWT");
const { generateJWT } = require("./generateJWT");

const authTokens = (token, refreshToken) => {
  const userTokenDecoded = verifyJWT(token);
  const refreshTokenDecoded = verifyJWT(refreshToken);

  if (refreshTokenDecoded === false) {
    throw new Error("Not authorized. Refresh token invalid.");
  }

  if (userTokenDecoded === false && refreshTokenDecoded !== false) {
    // Generate new token. The decoded user id is passed as first parameter.
    const newToken = generateJWT(
      userTokenDecoded, // decoded user id
      `${60_000 * 15}` // 15 minutes
    );
    return { newToken, userId: userTokenDecoded };
  } else {
    return { userId: userTokenDecoded, message: "User authenticated" };
  }
};

module.exports = { authTokens };
