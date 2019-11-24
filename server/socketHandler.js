module.exports = io => {
  let tracks = [];
  io.on("connection", socket => {
    socket.emit("tracks", tracks);

    socket.on("new_track", track => {
      tracks.push(track);
      io.sockets.emit("tracks", tracks);
    });

    socket.on("remove_track", () => {
      tracks.shift();
      io.sockets.emit("tracks", tracks);
    });

    socket.on("load_tracks", loadedTracks => {
      tracks = loadedTracks;
      io.sockets.emit("tracks", tracks);
    });

    socket.on("connect", () => {
      io.emit("user connected");
    });

    socket.on("disconnect", () => {
      io.emit("user disconnected");
    });
  });
};
