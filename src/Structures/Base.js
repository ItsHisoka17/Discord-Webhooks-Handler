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