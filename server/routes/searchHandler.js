const axios = require("axios").default;

module.exports = async (req, res) => {
  const { term } = req.query;

  try {
    const {
      data: { access_token }
    } = await axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }
    });

    const { data } = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/search",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      },
      params: {
        query: term,
        type: "track"
      }
    });

    res.json(data);
  } catch (error) {
    console.log(error.message, { error });
    res.status(500).send(error.message);
  }
};
