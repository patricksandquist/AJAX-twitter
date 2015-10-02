$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.attr('data-user-id');
  this.followState = this.$el.attr('data-initial-follow-state');
  this.render();
  this.handleClick(this);
  // debugger;
};

$.FollowToggle.prototype.render = function () {
  // debugger;
  if (this.followState === "true") {
    this.$el.text("Unfollow!");
  } else {
    this.$el.text("Follow!");
  }

};

$.FollowToggle.prototype.handleClick = function (that) {

  that.$el.on('click', function (e) {
    // debugger;
    e.preventDefault();
    $.ajax({
      url: '/users/' + that.userId + '/follow',
      type: (that.followState === "false" ? 'POST' : 'DELETE'),
      dataType: 'json',
      success: function (responseData) {
        // debugger;
        that.followState = (that.followState === "true" ? "false" : "true");
        that.render();
      }.bind(that)
    });
  }.bind(that));
    // debugger;
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
