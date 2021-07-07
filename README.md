# Discord Webhooks - Better interact with Discord Webhooks API

### Why use this?

**Discord Webhooks was created and is maintained by a team of developers using Node JS**

**Has tons of features to help you control your webhooks**


### Features:

> Send, edit, delete Webhook messages

> Get Info about your webhooks in the easiest way

> Supports Basic data structures, Embeds, Allowed Mentions, and more


### Example Usage:

```js
const Webhook = require('discord-webhooks');
const webhook = new Webhook('webhook_id', 'webhook_token'); //Or just put the webhook URL as the first parameter

webhook.send('Hey there! This is a webhook message!');
```

### Editing, and Deleting messages:
```js
const Webhook = require('discord-webhooks');
const webhook = new Webhook('webhook_id', 'webhook_token'); //Or just put the webhook URL as the first parameter

webhook.send('This message will be edited in 5 seconds')
.then((m) => {
    setTimeout(function(m){
        m.edit('This message will be deleted in 5 seconds')
        .then(function(m){
            m.delete({timeout: 5000}) //Amount of time for the message to be deleted, can also be set as the first parameter
        })
        }, 5000)
})
```

### Sending messages with embeds:
```js
const Webhook = require('discord-webhooks');
const webhook = new Webhook('webhook_id', 'webhook_token'); //Or just put the webhook URL as the first parameter

const embed = new webhook.Embed()
.setTitle('This is an embed Title')
.setDescription('This is an embed description')
.setColor('DARK_AQUA');

/*
Now there are multiple ways you could send this embed
Method 1:
*/

webhook.send('Hey! This is the content of the message', embed); //First param: message content, second param: embed

//Method 2:

webhook.send(embed) //Sends only the embed

//Method 3:

webhook.send({content: 'This is the message content', embeds: [embed]}) //Send it as a raw message structure
```

### Contact Us:

**[Discord](https://discord.gg/WhnmkwgtGb) | [Github](https://github.com/ItsHisoka17)** 