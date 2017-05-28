# AuthServer-Node

A NodeJS server with authentication built in.

This is a starter package for a Node API server with user authentication.


## Getting Started

Checkout this repo, install dependencies, then start the server:

```
> git clone https://github.com/SealedSaint/AuthServer-Node.git
> cd AuthServer-Node
> npm install
```

You'll need a config file which is ignored by Git in the `.gitignore`. This is intentionally left out, because you'll have sensitive information in this config that you want to keep local. An example `config.js` might look like this:

```
const CONFIG = {
	"secret": "123ABC"
}

module.exports = CONFIG
```

Finally, you'll need to [install MongoDB](https://docs.mongodb.com/getting-started/shell/installation/).

Once you have your `mongod` process up and running, you're ready to start the server: `npm start`. Congrats!

## How it Works

This server utilizes the following major packages/technologies:

* bcrypt
* passport
* jwt
* express
