define([
  'underscore', 
  'views/site',
  'text!templates/calendar/site.html'
  ], function(_, SiteView, siteTemplate){
  var CalendarSiteView = SiteView.extend({

    // Cache the template function for a single item.
    template: _.template(siteTemplate),

  });
  return CalendarSiteView;
});
