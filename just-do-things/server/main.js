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
});