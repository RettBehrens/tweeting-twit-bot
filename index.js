var consumer_key = process.env.consumer_key || require('./env.js').consumer_key;
var consumer_secret = process.env.consumer_secret || require('./env.js').consumer_secret;
var access_token = process.env.access_token || require('./env.js').access_token;
var access_token_secret = process.env.access_token_secret || require('./env.js').access_token_secret;
var Twit = require('twit');

var T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret,
});

var users = ['937000244650192897', '927245875751112704', '2292889800', '4180733653', '70345946', '875402720643043336', '1344064868', '1668100142', '2735246778', '14675801', '517021184', '285019665', '3013204853', '408006225', '4229278887'];
var stream = T.stream('statuses/filter', {follow: users});
stream.on('tweet', (tweet) => {
  if (users.indexOf(tweet.user.id_str) > -1) {
    console.log(tweet.user.name + ": " + tweet.text);
    T.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data, response) => {
      console.log(data)
    });
  }
});
