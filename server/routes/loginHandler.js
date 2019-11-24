const hostUrl = `http://localhost:${process.env.PORT}/host`;
const scopes = "streaming user-read-private user-read-email";
const redirectUrl =
  "https://accounts.spotify.com/authorize" +
  "?response_type=code" +
  "&client_id=" +
  process.env.SPOTIFY_CLIENT_ID +
  (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
  "&redirect_uri=" +
  encodeURIComponent(hostUrl);

module.exports = (req, res) => {
  res.redirect(redirectUrl);
};
