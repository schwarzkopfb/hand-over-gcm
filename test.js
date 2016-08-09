'use strict'

var test     = require('tap'),
    Handover = require('hand-over'),
    Plugin   = require('./'),
    pending  = 1,
    p        = new Plugin(process.env.HANDOVER_GCM_TEST_SENDER_ID),
    n        = new Handover().use(p)

n.load = function (userId, channel, callback) {
    callback(null, process.env.HANDOVER_GCM_TEST_TOKEN)
}

function success(err) {
    test.notOk(err, 'notification should be sent out successfully')
    n.unref()
    p.destroy()
}

test.plan(2)

n.send('test', 'Handover GCM test passed!', success)

test.test('constructor signatures', function (test) {
    var ref = {},
        p   = new Plugin(ref)

    test.equal(p.options, ref)
    p = new Plugin
    test.same(p.options, {})
    test.end()
})
