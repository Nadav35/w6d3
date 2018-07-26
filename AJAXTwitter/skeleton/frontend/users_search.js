const APIUtil = require('./api_util.js');

const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(el) {
    // debugger
    this.$el = $(el);
    this.$input = this.$el.find('input[name=username]');
    this.$ul = this.$el.find('.users');
    this.$input.on('input', this.handleInput.bind(this));

  }

  handleInput(e) {
    // e.preventDefault();
    // debugger

    APIUtil.searchUsers(this.$input.val())
    .then( users => this.renderResults(users));
  }

  renderResults(users) {
    // debugger
    this.$ul.empty();

    for (let i = 0; i < users.length; i++){
      let user = users[i];

      let $a = $('<a>');

      $a.text(`${user.username}`);
      $a.attr('href', `/users/${user.id}`);

      let $tag = $('<button></button>');
      // debugger
      new FollowToggle($tag, {
        userId: user.id,
        followState: user.followed ? 'followed' : 'unfollowed'
      });
      // debugger

      let $li = $('<li>');
      $li.append($a);
      $li.append($tag);
      this.$ul.append($li);
      // console.log(this.$ul);
      // debugger

    }

  }

}

module.exports = UsersSearch;
