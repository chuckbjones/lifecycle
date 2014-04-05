Sites.Site = DS.Model.extend({
  name: DS.attr('string'),
  service: DS.attr('string'),
  url: DS.attr('string'),
  organizational_unit: DS.attr('string'),
  comments: DS.attr('string'),
  state: DS.attr('string'),
  site_type: DS.attr('string'),
  owner: DS.attr(),
  managers: DS.attr(),

  manager_names: function() {
    var managers = this.get('managers');
    if (!managers) return '-';
    return managers.mapBy('name').join(', ');
  }.property('managers')
});

Sites.Site.FIXTURES = [
 {
  id: 1,
  name: 'Decommisioned Gato Site',
  service: 'gato',
  url: null,
  organizational_unit: "VPIT",
  comments: 'Waiting for content from client. \n\nI suspect this site will never be used. Putting in Decommissioned',
  state: 'Decommissioned',
  site_type: 'Decommisioned Gato Site',
  owner: {
    "name": "James Owner",
    "email": "jpwn@example.com"
  },
  managers: [
    {
      name: "John Manager",
      email: "jmgr@example.com"
    }
  ]
 },
 {
  id: 2,
  name: 'Biology',
  service: 'gato',
  url: 'http://www.bio.example.com/',
  organizational_unit: "College of Science",
  comments: 'Hopping',
  state: 'Live in Gato 2',
  site_type: 'Academic Department',
  owner: {
    name: "Joe Owner",
    email: "jpwn2@example.com"
  },
  managers: [
    {
      name: "Fred Manager",
      email: "fmgr@example.com"
    },
    {
      name: "Paul Editor",
      email: "pedt@example.com"
    }
  ]
 },
 {
  id: 3,
  name: 'VP University Advancement',
  service: 'gato',
  url: 'http://www.ua.example.com/',
  organizational_unit: "VPUA",
  comments: 'Sandbox access is included in role\n\nUsers audited and updated: 02/13/2012\n\nUsers audited and updated: 11/07/2012',
  state: 'Live in Gato 2',
  site_type: 'VP Office',
  owner: {
    name: "Tom Owner",
    email: "tpwn@example.com"
  }
 }
];
