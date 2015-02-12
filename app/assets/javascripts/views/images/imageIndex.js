ModelFindrApp.Views.ImageIndex = Backbone.CompositeView.extend({
  template: JST['images/imageIndex'],

  events: {
    "click #chevron-left": "moveLeft",
    "click #chevron-right": "moveRight"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.model = options.model;
    this.randomize = options.randomize

    this.collection.each(function(img) {
      var imgLI = new ModelFindrApp.Views.ImageIndexItem({model: img})
      this.addSubview('.img-list', imgLI)
    }, this);

    this.listenTo(this.collection, 'add', this.addImage);
    this.listenTo(this.collection, 'sync', this.render);

    if (this.model) {
      this.listenTo(this.model, "sync", this.render);
    }
  },

  addImage: function (image) {
    var imgLI = new ModelFindrApp.Views.ImageIndexItem({model: image, collection: this.collection});
    this.addSubview('.img-list', imgLI);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    var view = this;

    setTimeout(function () {
      view.$(".img-list").justifiedGallery({
        lastRow: 'nojustify',
        rowHeight: 300,
        margins: 5,
        randomize: view.randomize,
        rel: 'gallery1',
        waitThumbnailsLoad: false
      })

      $('.img').each( function(imgCount, img) {
        $(img).attr("data-img-count", imgCount);
      }.bind(this))
    }, 0)

    return this;
  }
})
