const { resolveColor, verifyImage } = require('../Utils/Util');

class Embed {
    constructor(data = {}){
        if (typeof data === 'object' && ('description' in data || 'title' in data)){
            Object.assign(this, data);
        }
    }
    setColor(color){
        this.color = resolveColor(color)
        return this;
    }
    /**
     * 
     * @param {string} str 
     */
    setDescription(str){
        if (!(str instanceof String)){
            throw new TypeError('DESCRIPTION Must be of type String')
        }
        if (str.length > 2048){
            throw new RangeError('DESCRIPTION_LENGTH')
        }
        this.description = str;
        return this; 
    }
    /**
     * 
     * @param {string} title 
     */
    setTitle(title){
        this.title = title
        return this;
    }
    /**
     * 
     * @param {string} text 
     * @param {string} iconURL 
     */
    setFooter(text, iconURL){
        this.footer = {text, iconURL};
    }

    /**
     * 
     * @param {string} text 
     * @param {string} iconURL 
     */
    setAuthor(text, iconURL){
        this.author = {text, iconURL}
    }

    /**
     * @param {string} url
     */
    setThumbnail(url){
        if (!verifyImage(url)){
            throw new TypeError('INVALID Image URL')
        } else {
            this.thumbnail = url;
        }
    }
    
    /**
     * @param {string} url
     */
    setImage(url){
        if (!verifyImage(url)){
            throw new TypeError('INVALID Image URL')
        } else { 
            this.image = url;
        }
    }
}

module.exports = Embed;