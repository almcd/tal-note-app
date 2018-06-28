require.def("sampleapp/appui/components/viewnotes",
    [   
        "sampleapp/appui/components/view",
        "antie/runtimecontext",
        "antie/widgets/container",
        "antie/datasource",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/carousel",
        "antie/widgets/carousel/binder",
        "antie/widgets/carousel/keyhandlers/activatefirsthandler",
        "sampleapp/appui/datasources/itemfeed_local",
        "sampleapp/appui/formatters/itemformatter",
        "sampleapp/appui/utilities/generic"
    ],
    function (
            View,
            RuntimeContext,
            Container,
            DataSource,
            Button,
            Label,
            VerticalList,
            Carousel,
            Binder,
            ActivateFirstHandler,
            ItemFeedLocal,
            ItemFormatter,
            Generic) {

        // ---------------------------------------------------------------------------------------
        // Get a reference to the device object
        var device = RuntimeContext.getDevice();
        
        // Get a reference to the application
        var application = RuntimeContext.getCurrentApplication();

        // Load generic object
        var generic = new Generic();

        return View.extend({
            init: function () {
                var self = this; // Ref to this to access this inside closure
                this._super("viewnotes"); // Call constructor of superclass and sets id to this value

                // ---------------------------------------------------------------------------------------
                this.carousel = new Carousel("simplecarousel", Carousel.orientations.VERTICAL);

                // Create a new carousel using the formatter
                // Event delegation - listening for event on carousel, rather than setting event on each carousel item
                this.carousel.addEventListener("select", function (evt) {
                    var selectedButtonInCarousel = evt.target;
                    var itemDataFromButton = selectedButtonInCarousel.getDataItem();
                    
                    // Rest of carousel construction and data binding has now been abstracted out into the _bindCarouselData method
                    //get reference to screen component container, as defined in application
                    var screenContainer = application.customProperties.screenContainer;
                    
                    screenContainer.pushComponent(
                        "sampleapp/appui/components/view_single_note", 
                        {
                            noteData: itemDataFromButton
                        }
                    );
                });

                // Append carousel to component
                this.appendChildWidget(this.carousel);
    
                // Set up navigation through carousel
                var handler = new ActivateFirstHandler();
                handler.setAnimationOptions({
                    skipAnim: false,
                    duration: 200,
                    easing: "swing"
                });
                handler.attach(this.carousel);

                // ---------------------------------------------------------------------------------------
                // Add an event listener for the databound event on the vertical list
                // This is where you can compensate for focus management issues or do other things once the data has been loaded into the list
                this.carousel.addEventListener("databound", function (ev) {
                    // Defer showing the error view until the current callstack has been executed, to avoid any raced conditions or interference with whatever TAL is doing
                    setTimeout(function () {
                        console.log('bound data');
                        var numItems = ev.target.getChildWidgets().length;
                        console.log('numItems', numItems);
                        if (!numItems) {
                            generic._showNewError('You haven\'t created any notes yet');
                            return;
                        } else {
                            self.carousel.alignToIndex(0);
                        }
                    }, 0);
                });
            },

            // ---------------------------------------------------------------------------------------
            // Lifecycle methods
            _onBeforeRender: function(ev) {
                // Called before a component is rendered.
                // This is the best place to set data-specific content.

                // ev.fromBack should be true if coming back to this component
                // via the back method of its parent component container
                // console.log('viewnotes _onBeforeRender ev.fromBack', ev.fromBack);

                console.log('--------------------------------------------');
                console.log('_onBeforeRender invoked');
                this._bindCarouselData();
            },

            // ---------------------------------------------------------------------------------------
            // Custom methods
            _bindCarouselData: function () {
                var self = this;

                var numItemsInCarousel = this.carousel.getChildWidgets().length;

                if (numItemsInCarousel > 0) {
                    console.log('Removing all items from carousel');
                    this.carousel.removeAll();
                }

                var itemFormatter = new ItemFormatter();

                var itemFeedLocal = new ItemFeedLocal();

                var dataSource = new DataSource(this, itemFeedLocal, "loadData");

                var binder = new Binder(itemFormatter, dataSource);

                console.log('binding data...');
                binder.appendAllTo(this.carousel);
            }
        });
    }
);