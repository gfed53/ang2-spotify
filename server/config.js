exports.PORT = process.env.PORT || 3000;

exports.KEYS = {
	spotID: 'SPOTIFY-CLIENT-ID'
};

/*

REDIRECT URIs

If you're building your own version of this app, you will need a Spotify client key (set as the value of the 'spotID' property) which you will get when creating a Spotify app.(https://beta.developer.spotify.com/documentation/web-api/quick-start/)

After doing so, you will need to navigate to your app via the dashboard, go to 'Edit Settings', and add your production redirect URIs where it requests them, and save your changes.

./external/oauth-callback.html
	dev: http://localhost:3000
	prod: eg. http://my-app123.herokuapp.com

./src/app/services/get-auth-token.service.ts
	dev: http://localhost:3000/oauth-callback
	prod: eg. http://my-app123.herokuapp.com/oauth-callback

*/
