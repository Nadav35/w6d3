const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor(form) {
    this.$el = $(form);
    this.$el.on('submit', this.submit.bind(this));
  }

  submit(e) {
    e.preventDefault();

    let data = this.$el.serializeJSON();
    this.$el.find(':input').prop('disabled', true);

    APIUtil.createTweet(data).then( (tweet) => this.handleSuccess(tweet));
  }

  handleSuccess(tweet) {
    this.$el.find(':input').prop('disabled', false);
    
    this.clearInput();
  }

  clearInput() {
    this.$input.val("");

  }
}
