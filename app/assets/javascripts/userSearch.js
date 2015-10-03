$.UserSearch = function (el) {
  this.$el = $(el);
  this.$input = $(el).attr("value");
  this.$ul = $(el).find(".users");
  this.listener();
};

$.UserSearch.prototype.listener = function () {
  this.$el.on('keyup', 'input', function (e) {
    // Set this.$input because it hasn't updated yet?
    e.preventDefault();
    $.ajax({
      url: '/users/search',
      type: 'get',
      dataType: 'json',
      data: { query: e.currentTarget.value },
      success: function (responseData) {
        // debugger;
        this.renderResults(responseData);
      }.bind(this)
    });
  }.bind(this));
};

$.UserSearch.prototype.renderResults = function(responseData) {
  this.$el.find('li').remove();
  $.each(responseData, function(index, value) {
    this.$ul.append('<li><a href=' + value.id + '>' + value.username + '</a><button class="follow-toggle" data-user-id=' + value.id + ' data-initial-follow-state=' + value.followed + '>' + (value.followed ? "Unfollow" : "Follow") +'</button></li>'
);
  }.bind(this));
};

$.fn.userSearch = function () {
  return this.each(function () {
    new $.UserSearch(this);
  });
};

$(function () {
  $("div.users-search").userSearch();
});
