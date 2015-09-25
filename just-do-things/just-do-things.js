Rivalry = new Meteor.Collection(null);
Player = new Meteor.Collection(null);
Rivalry.insert({a: 'UW', b: 'UO'});

if (Meteor.isClient) {

  let opened = [];

  Template.expandables.helpers({
    rival: function() {
      return Rivalry.find().fetch();
    }
  });

  Template.expandables.events({
    click: function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
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
      e.target.text.value = "";
      console.log(e);
      Meteor.call('submitTweet', a, text, function(err, data) {

      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    submitTweet: function(a, message) {
      /*
      Content.update(
        {$or: [{'a': a}, {'b': a}]},
        {$push: {
        }}
      );
*/
      console.log(a + ': ' + message);
      return true;
    }
  })
}


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