Rivalry = new Meteor.Collection('Rivalry');
Player = new Meteor.Collection('Player');

if (Meteor.isClient) {

  Session.set('opened', []);

  Template.expandables.helpers({
    rival: function() {
      let result = Rivalry.find().fetch();
      return result;
    },
    data: function(a, b) {
      if (_.findWhere(Session.get('opened'), {a: a, b: b})) {
        let l = Player.findOne({name: a});
        let r = Player.findOne({name: b});
        if (l && r) {
          return {left: l, right: r}
        }
      }
      return false;
    }
  });

  // handler for expanding a rivalry view
  Template.expandables.events({
    'click .clickable': function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
      let existing = Session.get('opened');
      if (!_.findWhere(Session.get('opened'), {a: a, b: b})) {
        existing.push({a: a, b: b});
        Session.set('opened', existing);
      }
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

  // handler for submitting a message
  Template.submission.events({
    'submit .submit': function(e) {
      e.preventDefault();
      console.log(e);
      const text = e.target.text.value;
      const a = e.target.getAttribute('data-name');
      if (!text || text === '') {
        return;
      }
      Meteor.call('submitTweet', a, text, function(err, data) {
        e.target.text.value = "";
      });
    }
  });

  // handler for making a chatroom scrolled to bottom
  Template.chatroom.rendered = function() {
    this.firstNode.scrollTop = this.firstNode.scrollHeight;
  };

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
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Rivalry.remove({});
    Player.remove({});
    Rivalry.insert({a: 'UW', b: 'UO'});
    Rivalry.insert({a: 'UW', b: 'WSU'});
    Rivalry.insert({a: 'Sherman', b: 'Crabtree'});
    Rivalry.insert({a: 'Yankees', b: 'Red Sox'});
    Player.insert({name: 'UW', image: 'images/UW.jpg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
    Player.insert({name: 'UO', image: 'images/UO.jpg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
    Player.insert({name: 'WSU', image: 'images/wsu.jpg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
    Player.insert({name: 'Crabtree', image: 'images/crabtree.jpeg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
    Player.insert({name: 'Sherman', image: 'images/sherman.jpeg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
    Player.insert({name: 'Red Sox', image: 'images/redsox.jpeg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
    Player.insert({name: 'Yankees', image: 'images/yankees.jpeg', tweets: [
        {
          message: 'hello hello',
          time: 1443245826743
        }
      ]
    });
  });

  Meteor.methods({
    submitTweet: function(a, message) {
      Player.update(
        {name: a},
        {$push: {
          tweets: {
              message: message,
              time: Date.now()
            }
        }
      });
      return true;
    },
    getRivalries: function() {
      return Rivalry.find().fetch();
    },
    getName: function(name) {
      return Player.findOne({name: name}).fetch();
    }
  })
}