# IoT Stadslab Den Bosch
[![Build Status](https://travis-ci.org/BlackChaosNL/IoT-Stadslab.svg?branch=master)](https://travis-ci.org/BlackChaosNL/IoT-Stadslab)
[![Known Vulnerabilities](https://snyk.io/test/github/BlackChaosNL/IoT-Stadslab/badge.svg)](https://snyk.io/test/github/BlackChaosNL/IoT-Stadslab)
[![Coverage Status](https://coveralls.io/repos/github/BlackChaosNL/IoT-Stadslab/badge.svg?branch=master)](https://coveralls.io/github/BlackChaosNL/IoT-Stadslab?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependancies](https://david-dm.org/BlackChaosNL/IoT-Stadslab.svg)](https://david-dm.org/)
## Version
To make sure versioning gets done correctly we are following [SemVer v2.0.0](https://semver.org)

The current version of the API is `0.2.0`.
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
- [ ] Write Docker part of the README.

### License

Copyright `2018-2019` `IoT Stadslab Den Bosch`

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
