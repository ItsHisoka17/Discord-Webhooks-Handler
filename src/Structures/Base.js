const fetch = require('node-fetch');

class Base {
    /**
     * 
     * @param {string} id 
     * @param {string} token 
     */
    constructor(id, token){
        this.webhookid = id;
        this.webhooktoken = token;
        this.url = null;
        if (this.constructor.resolveURL(id) || this.constructor.resolveURL(token)){
            this.url = typeof this.constructor.resolveURL(id) === 'string' ? this.constructor.resolveURL(id) : this.constructor.resolveURL(token)
        } else {
            this.url = 'https://discord.com/api/webhooks/' + this.webhookid + '/' + this.webhooktoken;
        }
        this.constructor.fetch.apply(this);
    }
    /**
     * 
     * @param {string} url
     * @returns {string | null} 
     */
    static resolveURL(url){
        let webhook_regex = /https:\/\/discord\.(com|app)\/api\/webhooks\/([0-9]{18})\/(.*)/
        let match = webhook_regex.exec(url);
        if (match){
            return url;
        } else {
            return null;
        }
    }
    static async fetch(){
        let res = await fetch(this.url)
        let data = await res.json()
            /**
             * ID of the webhook's guild
             * @type {string}
             */
             this.guild = data.name || null;
             /**
              * Application ID of the webhook
              * @type {string}
              */
             this.applicationid = data.application_id || null;
             /**
              * Webhook's username
              * @type {string}
              */
             this.username = data.name || null;
             /**
              * Webhook's avatar extension
              * @type {string}
              */
             this.avatar = data.name || null;
    }
}

module.exports = Base;