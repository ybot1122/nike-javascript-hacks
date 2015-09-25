const getRivalryData = function(a, b) {
  return {
    left: {
      name: a,
      source: 'images/' + a + '.jpg',
      tweets: [
        {message: a + 'godawgs'},
        {message: a + 'woof'},
        {message: a + 'bark'}
      ]
    },
    right: {
      name: b,
      source: 'images/' + b + '.jpg',
      tweets: [
        {message: b + 'hello'},
        {message: b + 'dssadad'},
        {message: b + 'hefffasllo'}
      ]
    }
  }
}

if (Meteor.isClient) {
  let Content = new Meteor.Collection(null);
  Content.insert({a: 'UW', b: 'UO'});
  Content.insert({a: 'Messi', b: 'Ronaldo'});
  Content.insert({a: 'Sherman', b: 'Crabtree'});

  console.log(Content.find().fetch());

  Template.expandables.helpers({
    rival: Content.find().fetch()
  });

  Template.expandables.events({
    click: function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
      Content.update({a: a, b: b}, {a: a, b: b, data: getRivalryData(a, b)}, {multi: false});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
