if (Meteor.isClient) {
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
