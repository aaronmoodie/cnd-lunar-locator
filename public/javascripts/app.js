/*
  Lunar Locator app
*/


// init app
var app = app || {};

app._attributes = {
    cmdCentreCoords: {lat: 0.681400, lng: 23.460550}
};

app.attributes = function(prop, value) {
    if (value === undefined) {
        return this._attributes[prop];
    } else {
        this._attributes[prop] = value;
    }
};


// Models & Collections
// --------------------------------------------

// Vehicle model
app.VehicleItem = Backbone.Model.extend({
  initialize: function() {
    var power = this.get('power_level_percent');
    if (power > 50) {
      this.set("color", "green");
    } else if (power < 50 && power > 20) {
      this.set("color", "orange");
    } else {
      this.set("color", "red");
    }
  }

});

// Vehicle collection
app.VehicleList = Backbone.Collection.extend({
  model: app.VehicleItem,
  url: "/api/vehicles.json"
});



// Views
// --------------------------------------------

// Vehicle item view
app.VehicleItemView = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click [data-event="show-detail"]': 'showDetial'
  },
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
    this.template = _.template($('#vehicle-item-template').html());
  },
  render: function() {
    var renderedContent = this.template(this.model.toJSON());
    this.$el.html(renderedContent);
    return this;
  },
  showDetial: function(event) {
    var $element = $(event.currentTarget);
    $('.app').addClass('show-detail');
    $('.vehicle').removeClass('active');
    $element.addClass('active');
    var latLong = {
      lat: this.model.get('lat'),
      lng: this.model.get('long')
    };
    app.mapView.addMarker(latLong);
  }

});

// Vehicle detail view
app.VehicleDetailView = Backbone.View.extend({
 tagName: 'div'
});

// Map view
app.MapView = Backbone.View.extend({

  initialize: function(options) {
    var _this = this;
    this.markers = [];
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: options.cmdCentreCoords,
      zoom: 6,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['none']
      }
    });
    var moonMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        var normalizedCoord = _this.getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
          return null;
        }
        var bound = Math.pow(2, zoom);
        return '//mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw' +
          '/' + zoom + '/' + normalizedCoord.x + '/' +
          (bound - normalizedCoord.y - 1) + '.jpg';
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      radius: 1738000,
      name: 'Moon'
    });

    this.map.mapTypes.set('moon', moonMapType);
    this.map.setMapTypeId('moon');

    // add initial maker to the map
    this.addMarker(options.cmdCentreCoords);

    // center map on browser resize
    // google.maps.event.addDomListener(window, 'resize', function() {
    //   map.setCenter(center);
    // });
  },
  addMarker: function(position) {
    this.deleteMarkers();
    var marker = new google.maps.Marker({
      position: position,
      map: this.map
    });
    this.map.setCenter(position);
    this.markers.push(marker);
    this.showMarkers();

  },
  setMapOnAll: function(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  },
  deleteMarkers: function() {
    this.clearMarkers();
    this.markers = [];
  },
  clearMarkers: function() {
    this.setMapOnAll(null);
  },
  showMarkers: function() {
    this.setMapOnAll(this.map);
  },
  getNormalizedCoord: function(coord, zoom) {
    var y = coord.y;
    var x = coord.x;
    var tileRange = 1 << zoom;

    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {x: x, y: y};
  }
});

// Vehicle collection view
app.VehicleListView = Backbone.View.extend({
  tagName: 'ul',
  attributes: {
    class: 'list-unstyled xs-border-bottom xs-full-height xs-overflow-auto'
  },
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
    this.collection.bind('add', this.render);
  },
  render: function() {
    var $el = this.$el;
    this.collection.each(function(vehicle) {
      var itemView = new app.VehicleItemView({model:vehicle});
      $el.append(itemView.render().el);
    });
  }
});




// Router & App setup
// --------------------------------------------

// App router
app.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "vehicle/:id": "show"
  },
  show: function (id) {
    var model = app.vehicleList.get(id);
    app.detailView.setModel(model);
  }
});

// Main app view
app.AppView = Backbone.View.extend({
  initialize: function() {

    app.Router = new app.Router();
    Backbone.history.start({pushState: true});

    app.vehicleDetailView = new app.VehicleDetailView();
    app.vehicleList = new app.VehicleList();
    app.vehicleListView = new app.VehicleListView({
      collection: app.vehicleList
    });

    app.mapView = new app.MapView({cmdCentreCoords:app.attributes('cmdCentreCoords')});

    $(".vehicles").append(app.vehicleListView.el);
    $(".vehicle-detail").append(app.vehicleDetailView.el);

    app.vehicleList.fetch({reset: true});

  },
  initMap: function() {

  }

});

function initApp() {
  new app.AppView();
}

$(function(){
    $("[data-event='close-detail']").on("click", function() {
      $(".app").removeClass("show-detail");
      $(".vehicle").removeClass("active");
    });
});
