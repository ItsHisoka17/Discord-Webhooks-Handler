const Base = require('./Base');
const BaseMessage = require('./BaseMessage')
const fetch = require('node-fetch')

class Message extends Base {
    constructor(webhookid, webhooktoken, data){
        super(webhookid, webhooktoken)
        for (let e of Object.keys(data)){
            this[e] = data[e];
        }
    }
    /**
     * Deletes the message
     * @param {{timeout: number}} options 
     * @returns {boolean}
     */
async delete(options = {timeout: 0}){
    if (options.timeout && options.timeout>0){
        setTimeout(function(){
            fetch(this.url + '/messages' + '/' + this.id, {method: 'delete'})
        }, options.timeout)
        return true;
    }
    if (typeof options === 'number' && options>0){
        setTimeout(function(){
            fetch(this.url + '/messages' + '/' + this.id, {method: 'delete'})
        }, options)
        return true;
    }
    fetch(this.url + '/messages' + '/' + this.id, {method: 'delete'});
    return true;
}

async edit(content, options){
    let message = new BaseMessage(content, options)
    let body = message.resolve();
    let res = await fetch(this.url + '/messages' + '/' + this.id + '?wait=true', {method: 'patch',  body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})
    return new Message(this.webhookid, this.webhooktoken, (await res.json()))
}
}

module.exports = Message;