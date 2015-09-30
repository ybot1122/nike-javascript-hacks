Session.set('active', null);

Template.activelist.helpers({
  rivalries: function() {
    let result = Rivalry.find().fetch();
    return result;
  }
});

Template.activelist.events({
  'click .rivalry-item': function(e) {
    const a = e.target.getAttribute('data-a');
    const b = e.target.getAttribute('data-b');
    Session.set('active', {a: a, b: b});
  }
});

Template.activebox.helpers({
  data: function() {
    const active = Session.get('active');
    if (active && active.a && active.b) {
      const l = Player.findOne({name: active.a});
      const r = Player.findOne({name: active.b});
      if (l && r) {
        return {left: l, right: r}
      }
    }
    return false;
  }
});


// handler for closing a rivalry view
Template.close.events({
  'click .close': function(e) {
    e.preventDefault();
    e.stopPropagation();
    const a = e.target.getAttribute('data-a');
    const b = e.target.getAttribute('data-b');
    let existing = Session.get('opened');
    let updated = _.without(existing, _.findWhere(existing, {a: a, b: b}));
    Session.set('opened', updated);
  }
});

Template.submission.helpers({
  a: function() {
    return Session.get('active').a;
  },
  b: function() {
    return Session.get('active').b;
  }
});

// handler for submitting a message
Template.submission.events({
  'submit .submit': function(e) {
    e.preventDefault();
    console.log(e);
    const text = e.target.text.value;
    const a = (e.target[1].checked) ? Session.get('active').a : Session.get('active').b;
    if (!text || text === '') {
      return;
    }
    Meteor.call('submitTweet', a, text, function(err, data) {
      e.target.text.value = "";
    });
  }
});

// formatting time to user's local
Template.chatroom.helpers({
  convertTime: function(ts) {
    const d = new Date(ts * 1000);
    let hr = d.getHours();
    let min = d.getMinutes();
    let secs = d.getSeconds();
    let ampm = hr < 12 ? "am" : "pm";
    hr = hr % 12;
    if (min < 10) {
        min = "0" + min;
    }
    return hr + ':' + min + ':' + secs + ' ' + ampm;
  },
  tweets: function() {
    let result = [];
    const active = Session.get('active');
    if (active && active.a && active.b) {
      const l = Player.findOne({name: active.a});
      const r = Player.findOne({name: active.b});
      _.each(l.tweets, function(item) {
        item.team = active.a;
        result.push(item);
      });
      _.each(r.tweets, function(item) {
        item.team = active.b;
        result.push(item);
      });
    }
    console.log(result);
    return result;
  }
});
