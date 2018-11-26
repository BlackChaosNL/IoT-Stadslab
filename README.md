# IoT Stadslab Den Bosch
## Version
To make sure versioning gets done correctly we are following [SemVer v2.0.0](https://semver.org)

The current version of the API is `0.1.0`.
## Description
### Nederlands
Wij zijn vijf studenten van Avans 's-Hertogenbosch, wij doen een minor genaamde "De Vrije Minor".
Voor de opdrachtgever van deze Minor ontwikkelen wij een publiekelijke API voor het vergaren en gebruiken van LoRa netwerk nodes.
Om deze API gegevens inzichtelijk te maken wordt er een dashboard ontwikkelt. De rest van deze informatie wordt in het Engels gedaan.
### English
We are five students from Avans University of Applied Sciences at 's-Hertogenbosch, we are doing a minor called "De Vrije Minor".
We are developing a public API for the employer of our minor, this API uses and gathers information from LoRa network nodes and sensors.
To visualize the data gathered from the API, a dashboard will be developed. The rest of this guide will continue in English.

### Installation
#### Local
* Setup
  * Install required software.
    * Install Windows Subsystem for Linux or Cygwin. (Windows Only)
    * Install NodeJS.
    * Install Git.
  * Update NodeJS to latest revision with `npm i -g npm`.
* Installation
  * `git clone` this repository.
  * Run the installation with `npm i`.
  * Create a copy of `.env.default` and name this `.env`.
  * Get your The Things Network credentials in the [Console Part](https://console.thethingsnetwork.org/applications/) of the website.
  * Fill in the following credentials in the `.env` file:
    * `database="your-mongodb-database"`
    * `ttnclient="your client details for The Things Network"`
    * `ttnsecret="your secret detail for The Things Network"`
* Start
  * Use `npm start`


#### Heroku
* Fork this repository on [GitHub](https://github.com).
* Create an account or log in to [Heroku](https://heroku.com).
* Create a new App on Heroku.
  * Fill in an app name.
  * Select a region where you want the API hosted.
  * Press `Create app`
* Select your App in the list.
* Set Config Vars.
  * Click on `Settings`.
  * Click on `Reveal Config Vars`.
  * Fill in the following credentials:
    * `database = your-mongodb-database`
    * `ttnclient = your client details for The Things Network`
    * `ttnsecret = your secret detail for The Things Network`
* Enable Deployment for your App.
  * Select `Deploy`.
  * Select `GitHub`.
  * Connect your GitHub account.
  * Select your newly forked repository.
  * Press on `Deploy Branch` from `master` under `Manual Deploy`.
* Press `Open app` to go to your newly deployed API.

#### Docker
* To be written.

### Documentation
* API documentation will be provided via [Swagger](https://swagger.io) exposed through the [`/swagger`](https://iotstadslab.herokuapp.com/swagger) route in the API.
* To show the documentation we are making use of [ReDoc](https://github.com/Rebilly/ReDoc) exposed on the [`/`](https://iotstadslab.herokuapp.com) route of the API.
* To view a sample of the API docs, a demo is hosted at [IoT Stadslab](https://iotstadslab.herokuapp.com).

### ToDo's
- [ ] Fix TTN observable to allow longer strings to be recieved.
- [ ] Write Docker part of the README.
