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

async delete(){
    let res = await fetch(this.url + '/messages' + '/' + this.id + '?wait=true', {method: 'delete'});
    return new Message(this.webhookid, this.webhooktoken, res)
}

async edit(content, options){
    let message = new BaseMessage(content, options)
    let body = message.resolve();
    let res = await fetch(this.url + '/messages' + '/' + this.id + '?wait=true', {method: 'patch', body})
    return new Message(this.webhookid, this.webhooktoken, res)
}
}

module.exports = Message;