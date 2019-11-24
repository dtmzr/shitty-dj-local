# Shitty DJ

This DJ is really the shit.

## Requirements

1. You'll need a spotify premium account.
2. Open network with access to this application.

## Setup spotify

1. Login in the [spotify dashboard](https://developer.spotify.com/dashboard/login).
2. Press `create a client id`.
3. Enter a random name, description and select I don't know as answer.
4. Accept all terms.
5. Edit settings of the new created application.
6. Enter `http://localhost:9000/host` into the `Redirect URIs` field. (If you change the local port, you'll have to update this entry too.)
7. Save settings.
8. Note down the `Client ID` and `Client Secret` for the app setup.

## Setup app

1. Duplicate `.env.example` to `.env` and update with credentials from dashboard.
2. Run `npm install`
3. Run `npm start` to run in production or `npm run dev` to run in dev context.
4. Guests should

## Usage

Setup one device with a up to date browser (chrome preferred) at [http://localhost:9000/host](http://localhost:9000/host). Follow the login link and sign in into spotify with a premium account.

Your guests will be able to access the app through scanning the qrcode or typing the applications network address.

## Known issues

**Regions:** Currently the web api searches globally for songs but the host can't play all songs due to region restrictions. In this case the playlist will be stuck when a unaccessible song is reached.

## Hacks

All the listed hacks are bind to the `window` object inside the host application. You can access this object via the developer console.

**Access the socket:** at any time you can access the socket via `socket`.

**Removing current song:** you can skip the current song with entering `socket.emit("remove_track")` into the console.

**Auth issues:** keep calm and reload the webapp, don't restart the server without saving!

**Panic backup:** run `saveTracks()` to save the current playlist in your localstorage. Now you can restart the server and run `loadTracks()` to update the server state from your localstorage.
