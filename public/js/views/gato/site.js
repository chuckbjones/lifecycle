define([
  'underscore', 
  'views/site',
  'text!templates/gato/site.html'
  ], function(_, SiteView, siteTemplate){
  var GatoSiteView = SiteView.extend({

    // Cache the template function for a single item.
    template: _.template(siteTemplate),

  });
  return GatoSiteView;
});
