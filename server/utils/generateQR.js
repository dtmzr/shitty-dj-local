const path = require("path");
const ip = require("ip");
const qrcode = require("qrcode");

module.exports = function() {
  const networkIP = ip.address();

  qrcode.toFile(path.resolve(__dirname, "../../dist/qrcode.png"), [
    { data: networkIP, mode: "byte" }
  ]);
};
