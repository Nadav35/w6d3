const APIUtil = require('./api_util');

class FollowToggle {
  constructor(el, options) {
    // debugger
    // debugger
    this.$el = $(el);
    this.userId = this.$el.data('user-id') || options.userId;
    this.followState = (this.$el.data('initial-follow-state') ||
      options.followState);
    this.render();
    this.$el.on('click', this.handleClick.bind(this));

  }

  render() {
    // debugger
    if (this.followState === "unfollowed") {
      this.$el.html("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "followed") {
        this.$el.html("Unfollow!");
        this.$el.prop("disabled", false);
    } else if (this.followState === "following") {
        this.$el.html("Following!!");
        this.$el.prop("disabled", true);
    } else if (this.followState === "unfollowing") {
        this.$el.html("Unfollowing!!");
        this.$el.prop("disabled", true);
    }
  }

  handleClick(e) {
    e.preventDefault();
    const that = this;


    if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then( () => {
        that.followState = "followed";
        that.render();
      });

    } else {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then( () => {
        that.followState = "unfollowed";
        that.render();
      });

    }
  }
}


module.exports = FollowToggle;
