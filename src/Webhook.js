const Base = require('./Structures/Base');
const Message = require('./Structures/BaseMessage')
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
    let message = new Message(content, options);
    let body = message.resolve()
    let res = await fetch(`${this.url}?wait=true`, {method: 'post', body})
    return new Message(this.webhookid, this.webhooktoken, res)
}
}

module.exports = Webhook;