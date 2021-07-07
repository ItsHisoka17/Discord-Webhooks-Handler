const Embed = require('./Embed')

class BaseMessage {
    /**
     * 
     * @param {object} data 
     */
    constructor(content, options = {}){
        this.content = content;
        this.options = options;
        this.data = {};
    }

    resolve(){
        this.data = {...this.data, ...this.options};
        if (typeof this.content === 'object'){
            Object.assign(this.data, this.content)
        }
        if (this.content instanceof Embed || this.options instanceof Embed){
            this.data.embeds = [this.content instanceof Embed ? this.content : this.options]
        }
        if (typeof this.content === 'string'){
            this.data.content = this.content
        }

        if (this.data.embeds){
            let arrayEmbeds = [];
            for (const e of this.data.embeds){
                if (e instanceof Embed){
                    arrayEmbeds.push(e)
                }
            }
            this.data.embeds = arrayEmbeds;
        }
        return this.data;
    }
}

module.exports = BaseMessage;