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

  let content = new Meteor.Collection(null);
  content.insert({a: 'UW', b: 'UO'});
  content.insert({a: 'Messi', b: 'Ronaldo'});
  content.insert({a: 'Sherman', b: 'Crabtree'});
  console.log(content.find().fetch());
  Template.expandables.helpers({
    rival: content.find().fetch()
  });

  Template.expandables.events({
    click: function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
      console.log(getRivalryData(a, b));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
