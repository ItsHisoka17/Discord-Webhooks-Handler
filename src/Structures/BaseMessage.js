const fetch = require('node-fetch');
const Embed = require('./Embed')

class BaseMessage {
    /**
     * 
     * @param {object} data 
     */
    constructor(content, options){
        this.content = content;
        this.options = options;
        this.data = {};
    }

    resolve(){
        Object.assign(this.data, this.options);
        if (this.content instanceof Embed){
            this.data.embeds = [this.content]
        }
        if (typeof this.content === 'object'){
            this.data = {...this.content}
        }
        if (typeof this.content === 'string'){
            this.data.content = this.content;
        }
        return this.data;
    }
}

module.exports = BaseMessage;