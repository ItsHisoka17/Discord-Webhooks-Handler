const fetch = require('node-fetch');
const APIError = require('./APIError')

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
        if (this.resolveURL(id) || this.resolveURL(token)){
            this.url = typeof this.resolveURL(id) === 'string' ? this.resolveURL(id) : this.resolveURL(token)
        } else {
            this.url = 'https://discord.com/api/webhooks/' + this.webhookid + '/' + this.webhooktoken;
        }
        try {
        fetch(this.url)
        .then((res) => res.json())
        .then((data) => {
            /**
             * ID of the webhook's guild
             * @type {string}
             */
            this.guild = data["guild_id"];
            /**
             * Application ID of the webhook
             * @type {string}
             */
            this.applicationid = data["application_id"]
            /**
             * Webhook's username
             * @type {string}
             */
            this.username = data["username"]
            /**
             * Webhook's avatar extension
             * @type {string}
             */
            this.avatar = data["avatar"]
        })
    } catch {
        throw new APIError('Error while fetching webhook: 404')
    }
    }
    /**
     * 
     * @param {string} url
     * @returns {string | null} 
     */
    resolveURL(url){
        let webhook_regex = /https:\/\/discord\.(com|app)\/api\/webhooks\/([0-9]{18})\/(.*)/
        let match = webhook_regex.exec(url);
        if (match){
            return url;
        } else {
            return null;
        }
    }
}

module.exports = Base;