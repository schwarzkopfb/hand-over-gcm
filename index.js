'use strict'

module.exports = HandoverGCM

var inherits = require('util').inherits,
    Plugin   = require('hand-over/plugin'),
    gcm      = require('node-gcm')

function HandoverGCM(opts) {
    Plugin.call(this, opts)

    if (typeof opts === 'string')
        this.sender = new gcm.Sender(opts)
    else if (opts) {
        var key = (
            opts.apiKey || opts.api_key || opts.key ||
            opts.senderId || opts.sender_id || opts.sender
        )
        this.sender = new gcm.Sender(key, opts)
    }
    else
        this.sender = new gcm.Sender
}

inherits(HandoverGCM, Plugin)

HandoverGCM.prototype.name = 'gcm'

HandoverGCM.prototype.send = function sendOverGCM(regid, data, callback) {
    this.sender.send(new gcm.Message({ data: data }), [ regid ], 5, function (err) {
        if (err) {
            // weird: `node-gcm` passes back numbers insted of `Error` instances
            var er = new Error('transmission failed through Google Cloud Messaging Service')
            er.statusCode = err

            callback(er)
        }
        else
            callback()
    })
}

HandoverGCM.prototype.destroy = function destroyGCMSender() {
    // nothing to do
}

HandoverGCM.prototype.unref = function unreferenceGCMSender() {
    // nothing to do
}
