'use strict'

// support early Node releases
process.nextTick = require('process.nexttick')

var assert = require('assert')
assert(process.env.HANDOVER_GCM_TEST_TOKEN, '"HANDOVER_GCM_TEST_TOKEN" environment variable not set')
assert(process.env.HANDOVER_GCM_TEST_SENDER_ID, '"HANDOVER_GCM_TEST_TOKEN" environment variable not set')

var test     = require('tap'),
    Handover = require('hand-over'),
    Plugin   = require('./'),
    pending  = 2,
    token    = process.env.HANDOVER_GCM_TEST_TOKEN,
    p        = new Plugin(process.env.HANDOVER_GCM_TEST_SENDER_ID),
    n        = new Handover().use(p)

n.load = function (userId, channel, callback) {
    callback(null, token)
}

function done() {
    if (--pending)
        return

    n.unref()
    p.destroy()
}

function success(err) {
    test.notOk(err, 'notification should be sent out successfully')
    done()
}

function error(errs) {
    test.ok(errs, 'notification should _not_ be sent out successfully')
    test.type(errs, Array, 'returned errors should be in an array')
    var err = errs[ 0 ]
    test.type(err, Error, 'returned error should be derived from `Error`')
    test.equal(err.statusCode, 400, 'error status code should be specified')
    done()
}

test.plan(6)

n.send('test', { message: 'Handover GCM test passed!' }, success)
n.send('test', 'invalid payload', error)

test.test('constructor signatures', function (test) {
    var ref = {},
        p   = new Plugin(ref)

    test.equal(p.options, ref)
    p = new Plugin
    test.same(p.options, {})
    test.end()
})
