Rivalry = new Meteor.Collection('Rivalry');
Player = new Meteor.Collection('Player');

if (Meteor.isClient) {

  let opened = [{a: 'UW', b: 'WSU'},{a: 'UW', b: 'UO'},{a: 'Sherman', b: 'Crabtree'},{a: 'Yankees', b: 'Red Sox'}];

  Template.expandables.helpers({
    rival: function() {
      let result = Rivalry.find().fetch();
      return result;
    },
    data: function(a, b) {
      console.log(a + 'vs' + b);
      if (_.findWhere(opened, {a: a, b: b})) {
        let l = Player.findOne({name: a});
        let r = Player.findOne({name: b});
        if (l && r) {
          return {left: l, right: r}
        }
      }
      return false;
    }
  });

  Template.expandables.events({
    click: function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
      opened.push({a: a, b: b});
      console.log(Player.find().fetch());
    }
  });

  Template.submission.events({
    'submit .submit': function(e) {
      e.preventDefault();
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
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    Player.insert({name: 'UO', image: 'images/UO.jpg', tweets: [
        {
          message: 'hello hello',
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    Player.insert({name: 'WSU', image: 'images/wsu.jpg', tweets: [
        {
          message: 'hello hello',
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    Player.insert({name: 'Crabtree', image: 'images/crabtree.jpeg', tweets: [
        {
          message: 'hello hello',
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    Player.insert({name: 'Sherman', image: 'images/sherman.jpeg', tweets: [
        {
          message: 'hello hello',
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    Player.insert({name: 'Red Sox', image: 'images/redsox.jpeg', tweets: [
        {
          message: 'hello hello',
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    Player.insert({name: 'Yankees', image: 'images/yankees.jpeg', tweets: [
        {
          message: 'hello hello',
          time: '1:04 pm'
        },
        {
          message: 'hello hello',
          time: '1:04 pm'
        }
      ]
    });
    console.log(Player.find().fetch());
    console.log(Rivalry.find().fetch());
  });

  Meteor.methods({
    submitTweet: function(a, message) {
      var d = new Date();
      var hr = d.getHours();
      var min = d.getMinutes();
      if (min < 10) {
          min = "0" + min;
      }
      var ampm = hr < 12 ? "am" : "pm";
      hr = hr % 12;
      let str = hr + ':' + min + ' ' + ampm
      Player.update(
        {name: a},
        {$push: {
          tweets: {
              message: message,
              time: str
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