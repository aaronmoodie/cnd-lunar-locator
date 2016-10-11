/*
  Lunar Locator app
*/


// init app
var app = app || {};

// Models & Collections
// --------------------------------------------

// Vehicle model
app.VehicleItem = Backbone.Model.extend({

});

// Vehicle collection
app.VehicleList = Backbone.Collection.extend({
  model: VehicleItem
});


// Views
// --------------------------------------------

// Vehicle item view
app.VehicleItemView = Backbone.View.extend({
  tagName: 'li'
});

// Vehicle detail view
app.VehicleDetailView = Backbone.View.extend({

});

// Vehicle collection view
app.VehicleListView = Backbone.View.extend({
  tagName: 'ul'
});



// Router & App setup
// --------------------------------------------

// App router
app.Router = Backbone.Router.extend({

});

// Main app view
app.AppView = Backbone.View.extend({

});


$(function(){
    // new app.AppView();
});
