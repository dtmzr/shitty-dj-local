const ip = require("ip");

const networkIP = ip.address();

module.exports = (req, res) => {
  res.json({
    ip: networkIP
  });
};
