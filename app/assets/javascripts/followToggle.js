$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.attr('data-user-id');
  this.followState = this.$el.attr('data-initial-follow-state');
  this.render();
  this.handleClick.call(this);
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === "true") {
    this.$el.text("Unfollow!");
  } else {
    this.$el.text("Follow!");
  }

};

$.FollowToggle.prototype.handleClick = function () {
  this.$el.on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/users/' + this.userId + '/follow',
      type: (this.followState === "false" ? 'POST' : 'DELETE'),
      dataType: 'json',
      success: function (responseData) {
        this.followState = (this.followState === "true" ? "false" : "true");
        this.render();
      }.bind(this)
    });
  }.bind(this));
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
