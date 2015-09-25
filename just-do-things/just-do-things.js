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

  Template.expandables.helpers({
    rival: [
      {a: 'UW', b: 'UO'},
      {a: 'Messi', b: 'Ronaldo'},
      {a: 'Sherman', b: 'Crabtree'},
      {a: 'Chelsea', b: 'Arsenal'},
      {a: 'Yankees', b: 'Red Sox'}
    ]
  });

  Template.expandables.events({
    click: function(e) {
      const a = e.target.getAttribute('data-a');
      const b = e.target.getAttribute('data-b');
      console.log(getRivalryData(a, b));
    }
  });

  Template.rivalry.helpers({
    rival: [
      {
        left: {
          name: 'UW',
          source: 'images/uw.jpg',
          tweets: [
            {message: 'godawgs'},
            {message: 'woof'},
            {message: 'bark'}
          ]
        },
        right: {
          name: 'UO',
          source: 'images/uo.jpg',
          tweets: [
            {message: 'hello'},
            {message: 'dssadad'},
            {message: 'hefffasllo'}
          ]
        }
      },
      {
        left: {
          name: 'Messi',
          source: 'images/uw.jpg',
          tweets: [
            {message: 'godawgs'},
            {message: 'woof'},
            {message: 'bark'}
          ]
        },
        right: {
          name: 'Ronaldo',
          source: 'images/uo.jpg',
          tweets: [
            {message: 'hello'},
            {message: 'dssadad'},
            {message: 'hefffasllo'}
          ]
        }
      }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
