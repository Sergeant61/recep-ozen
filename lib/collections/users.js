import SimpleSchema from 'simpl-schema';

UserProfileSchema = new SimpleSchema({
  fullname: String,

  status: {
    type: String,
    allowedValues: ['lead', 'customer'],
    optional: true
  },

  isAdmin:Boolean
});

UserStatusLastLoginSchema = new SimpleSchema({
  date: {
    type: Date,
    optional: true
  },

  ipAddr: {
    type: String,
    optional: true
  }
});

UserStatusSchema = new SimpleSchema({
  lastLogin: {
    type: UserStatusLastLoginSchema,
    optional: true
  },

  userAgent: {
    type: String,
    optional: true
  },

  idle: {
    type: Boolean,
    optional: true
  },

  lastActivity: {
    type: Date,
    optional: true
  },

  online: {
    type: Boolean,
    optional: true
  }
});

UserSchema = new SimpleSchema({
  profile: UserProfileSchema,

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  emails: {
    type: Array,
    optional: true
  },

  'emails.$': {
    type: Object,
    blackbox: true
  },

  status: {
    type: UserStatusSchema,
    optional: true,
  },
});

Meteor.users.attachSchema(UserSchema);
Meteor.users.softRemovable();
Meteor.users.autoDates();