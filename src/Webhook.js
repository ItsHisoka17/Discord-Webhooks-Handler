const Base = require('./Structures/Base');
const BaseMessage = require('./Structures/BaseMessage')
const Message = require('./Structures/Message')
const fetch = require('node-fetch')

class Webhook extends Base {
    /**
     * 
     * @param {string} id 
     * @param {token} token 
     */
    constructor(webhookid, webhooktoken){
        super(webhookid, webhooktoken)
    }

async send(content, options){
    let message = new BaseMessage(content, options);
    let body = message.resolve()
    let res = await fetch(`${this.url}?wait=true`, {method: 'post', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})
    return new Message(this.webhookid, this.webhooktoken, (await res.json()))
}
}

module.exports = Webhook;