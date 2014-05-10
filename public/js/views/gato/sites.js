define([
  'underscore', 
  'views/sites',
  'views/gato/site',
  'text!templates/gato/table_header.html'
  ], function(_, SitesView, SiteView, tableHeaderTemplate){
  var GatoSitesView = SitesView.extend({
    
    tableHeaderTemplate: _.template(tableHeaderTemplate, {}),

    siteView: SiteView

  });
  return GatoSitesView;
});
