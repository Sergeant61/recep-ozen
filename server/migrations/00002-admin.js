Migrations.add({
  version: 2,
  name: 'Admin user',
  up: function () {
    const userId = Accounts.createUser({
      email: 'merhaba@bordo.io',
      password: '123',
      profile: {
        fullname: 'Bet Admin'
      }
    });

    Meteor.users.update({ _id: userId }, {
      $set: {
        'profile.isAdmin': true,
      }
    })

    Roles.addUsersToRoles(userId, 'roles.admin', null);
  }
});