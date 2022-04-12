# Metric/Imperial Converter
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

*A project for the Free Code Camp QA / Adv Node &amp; Express Certification - spec [here](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter)*

A REST API for converting metric and imperial measurements based on arbitrary text input. 

### Table of Contents
  - [Install](#install)
  - [Usage](#usage)
  - [Extra Sections](#extra-sections)
  - [API](#api)
  - [Maintainers](#maintainers)
  - [Thanks](#thanks)
  - [Contributing](#contributing)
  - [License](#license)
- [Definitions](#definitions)

### Install
- Fork/Clone repository
- run `npm install` to install dependencies
- run `npm start` to start server (PORT can be set in .env file)
- if `NODE_ENV=test` FCC test runner will attempt to run Free Code Camp's automated certification test suite as well

### Usage
- Port will default to 3000 if not set as environment variable
- Set `NODE_ENV` to anything other than `test` to prevent FCC certification tests from running
- See [API](#api) section for endpoint specifics

### API
`/api/convert?={QtyUnit}` - pass in URL query param of valid quantity and unit to get converted response (JSON)
Currently supported conversions: 
- gallons(gal) <-> litres(L)
- pounds(lbs) <-> kilograms(kg)
- miles(mi) <-> kilometers(km)

### Contributing
Not accepting PRs at this time. Please contact erich@zenlex.dev with any questions. 

### License
[GNU General Public License](https://opensource.org/licenses/GPL-3.0)
