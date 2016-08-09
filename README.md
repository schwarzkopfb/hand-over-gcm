[![view on npm](http://img.shields.io/npm/v/hand-over-gcm.svg?style=flat-square)](https://www.npmjs.com/package/hand-over-gcm)
[![downloads per month](http://img.shields.io/npm/dm/hand-over-gcm.svg?style=flat-square)](https://www.npmjs.com/package/hand-over-gcm)
[![node version](https://img.shields.io/badge/node-%3E=0.8-brightgreen.svg?style=flat-square)](https://nodejs.org/download)
[![build status](https://img.shields.io/travis/schwarzkopfb/hand-over-gcm.svg?style=flat-square)](https://travis-ci.org/schwarzkopfb/hand-over-gcm)
[![test coverage](https://img.shields.io/coveralls/schwarzkopfb/hand-over-gcm.svg?style=flat-square)](https://coveralls.io/github/schwarzkopfb/hand-over-gcm)
[![license](https://img.shields.io/npm/l/hand-over-gcm.svg?style=flat-square)](https://github.com/schwarzkopfb/hand-over-gcm/blob/master/LICENSE)

Google Cloud Messaging plugin for [Handover](https://npm.im/hand-over).

## Usage

```js

const Handover = require('hand-over'),
      notifier = new Handover

notifier.use('gcm', 'your-gcm-api-key')

notifier.send('userId', { message: 'Hello GCM!' }, callback)

function callback(err) {
    if (err)
        console.error(err.stack)
    else
        console.log('yay!')
}

```

__Note:__ Options are passed to the [node-gcm](https://npm.im/node-gcm) package's `Sender` constructor.

## Installation

With npm:

    npm install hand-over-gcm

## License

[MIT](/LICENSE)
