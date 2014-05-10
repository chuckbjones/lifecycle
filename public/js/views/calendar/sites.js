define([
  'underscore', 
  'views/sites',
  'views/calendar/site',
  'text!templates/calendar/table_header.html'
  ], function(_, SitesView, SiteView, tableHeaderTemplate){
  var CalendarSitesView = SitesView.extend({
    
    tableHeaderTemplate: _.template(tableHeaderTemplate, {}),

    siteView: SiteView

  });
  return CalendarSitesView;
});
