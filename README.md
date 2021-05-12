# hyper-mongo-middleman

Node.js boilerplate code for a [Hyper](https://hyper.co) authenticated, [MongoDB](https://mongodb.com) middleman for an analytics database (e.g. for logging bot checkouts)

## Usage
The server is configured so that all license key holders are able to make POST requests to the database, but only certain users are able to GET data. This is managed by an array of discord user IDs in `/middleware/authenticate.js`.

The default route is one for success database entries. The [schema](https://mongoosejs.com/docs/guide.html) of which can be found in `/mongo/models/success.js` and can be modified to suit.

By default, environment variables will be used for the **PORT** `/index.js`, **HYPER_KEY** `/authenticate.js` and **MONGO_DB_URI** `/mongo/mongo.js`, however these values can be hardcoded in their respective files.


To get started with [MongoDB](https://mongodb.com) see this [guide](https://docs.atlas.mongodb.com/getting-started/).

## Installation
```bash
git clone https://github.com/essence-daniel/hyper-mongo-middleman.git
cd hyper-mongo-middleman
npm install
```
## Quick Setup Guide
1. Update all necessary environment variables.
2. `npm start`.
```bash
listening on port 8080
Connected to MongoDB
```
In the case that it logs `Failed to connect to MongoDB`, check that you have correctly copied your MongoDB URI and that it has the correct permissions as well as suitable network access.
## Resources
* [mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html) - Mongoose Schema Guide
* [docs.atlas.mongodb.com/getting-started](https://docs.atlas.mongodb.com/getting-started/) - MongoDB getting started guide

## License
[MIT](https://choosealicense.com/licenses/mit/)
