# App using Angular 2/4 and the Spotify API

## Live Demo

Here is a [live demo version](http://ang2-spotify.herokuapp.com) that you can jump right into and use. If you want to create your own build and/or learn more about the process, continue reading.

## Introduction

This app allows users to search for an artist by keyword, then browse different artists by grabbing a randomly selected but related artist.

Users can also choose whether they want a more mainstream artist, or a more underground one. 

Note that some artists may not even have related mainstream or underground artists (like Bruno Mars, for example).

## Build Instructions

1. Make sure Node.js(along with the Node Package Manager, or NPM) is installed, then in the terminal, run `npm i` to install all dependencies.

2. Before you start using the app, you will need to supply the app with an API key.

  * Navigate to /server/config.js.

  * You should find the places where the API keys are needed. For Spotify, only the client ID is required, not the secret key.

  	* [Spotify key link](https://developer.spotify.com/web-api/)

3. You can serve the app locally by running `npm run build`. The app listens at port 3000.

## The Process

Throughout the app's development, I gained experience with Angular 2/4 and TypeScript. This app was originally developed with Angular 1.x, so through the migration to the next evolution of Angular I learned more about the vastly different architecture based around Web Components, as well as static typing which is one of the many features TypeScript provides, and more.

The project is still in development, so I plan on adding some new features and UX/UI tweaks in the near future.

