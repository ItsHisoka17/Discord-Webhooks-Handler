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
        let body = content instanceof BaseMessage ? content.resolve() : new BaseMessage(content, options).resolve();
        let res = await fetch(`${this.url}?wait=true`, {method: 'post', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})
        return new Message(this.webhookid, this.webhooktoken, (await res.json()))
    }
    /**
     * Deletes the webhook
     * @returns {boolean}
     */
    async delete(){
        fetch(this.url, {method: 'delete'})
        return true;
    }
    /**
     * 
     * @param {string} name 
     */
}

module.exports = Webhook;