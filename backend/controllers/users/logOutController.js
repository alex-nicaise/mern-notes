const logOutUser = (req, res) => {
  const clearedCookie = res.clearCookie("refreshToken");

  if (!clearedCookie) {
    return res.status(500).send();
  }

  res.status(200).send();
};

module.exports = { logOutUser };
