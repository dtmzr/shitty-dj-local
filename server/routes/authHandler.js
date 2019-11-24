const axios = require("axios").default;

module.exports = async (req, res) => {
  try {
    const authResponse = await axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        redirect_uri: `http://localhost:${process.env.PORT}/host`,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        ...req.body
      }
    });

    res.json(authResponse.data);
  } catch (error) {
    console.log(error.message, { error });
    res.status(500).send(error.message);
  }
};
