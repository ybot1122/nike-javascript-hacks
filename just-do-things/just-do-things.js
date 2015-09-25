const getRivalryData = function(a, b) {
  return {
    left: {
      name: a,
      source: 'images/' + a + '.jpg',
      tweets: []
    },
    right: {
      name: b,
      source: 'images/' + b + '.jpg',
      tweets: []
    }
  }
}

if (Meteor.isClient) {
  let Content = new Meteor.Collection(null);
  Content.insert({a: 'UW', b: 'UO'});
  Content.insert({a: 'Messi', b: 'Ronaldo'});
  Content.insert({a: 'Sherman', b: 'Crabtree'});

  console.log(Content.find().fetch());

  let blargh = Content.find().fetch();

  Template.expandables.helpers({
    rival: function() {
      return Content.find().fetch();
    }
  });

  Template.expandables.events({
    click: function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
      Content.update({a: a, b: b}, {a: 'BLLAAG', b: b, data: getRivalryData(a, b)}, {multi: false});
      blargh = Content.find().fetch();
    }
  });

  Template.submission.events({
    'submit .submit': function(e) {
      e.preventDefault();
      const text = e.target.text.value;
      console.log(text);
      e.target.text.value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
