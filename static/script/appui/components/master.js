require.def("sampleapp/appui/components/master",
    [   
        "antie/runtimecontext",
        'antie/widgets/componentcontainer',
        "antie/widgets/component",
        "antie/widgets/container",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/widgets/horizontallist"
    ],
    function (RuntimeContext, ComponentContainer, Component, Container, Button, Label, VerticalList, HorizontalList) {
            
        // ---------------------------------------------------------------------------------------
        // Get the application object
        // As outside of component constructor, use 'RuntimeContext' instead of 'this'.
        // Placing this here, 'matter of taste', could be declared in constructor or in method where required also.
        // Used for handling back behaviour, in keyup event at bottom of file.
        var application = RuntimeContext.getCurrentApplication();

        // ---------------------------------------------------------------------------------------
        // Get a reference to the device object
        var device = RuntimeContext.getDevice();

        // ---------------------------------------------------------------------------------------
        // All components extend Component
        return Component.extend({

            //constructor
            init: function () {
                var self = this;
                this._super("master"); // Call constructor of superclass and sets id to this value

                // ---------------------------------------------------------------------------------------
                // Set up TAL logging
                // Get a reference to the device logger
                this.logger = device.getLogger();
                this.logger.info('Example logging');

                // ---------------------------------------------------------------------------------------
                // Main Layout List
                // vertical list to hold our other components / containers
                // enables focus managment across app content, as long as there is a button to focus on
                var mainLayoutList = new VerticalList("mainLayoutList");
                this.appendChildWidget(mainLayoutList);
                application.customProperties.mainLayoutList = mainLayoutList;

                // ---------------------------------------------------------------------------------------
                // Header Container (dumb, div like container)
                var headerContainer = new Container("headerContainer");
                headerContainer.addClass("headerContainer");
                mainLayoutList.appendChildWidget(headerContainer); // Append to main layout list

                application.customProperties.headerContainer = headerContainer; 

                // ---------------------------------------------------------------------------------------
                var buttonOne = new Button("buttonOne");
                buttonOne.addEventListener("select", function () {
                    screenContainer.show("sampleapp/appui/components/viewnotes"); // Load component into the component container
                });
                buttonOne.appendChildWidget(new Label("View Notes"));

                var buttonTwo = new Button("buttonTwo");
                buttonTwo.addEventListener("select", function () {
                    screenContainer.show("sampleapp/appui/components/addnote"); // Load component into the component container
                });
                buttonTwo.appendChildWidget(new Label("Add Note"));

                // Create a horizontal list widget and append the buttons to navigate within the list
                var mainMenu = new HorizontalList("mainMenuList");
                mainMenu.addClass('mainMenu');

                // App Title
                var title = new Label("NOTES");
                title.addClass('mainTitle');
                mainMenu.appendChildWidget(title); // Append to header container

                // Add the button widgets to the horizontal list widget
                mainMenu.appendChildWidget(buttonOne);
                mainMenu.appendChildWidget(buttonTwo);

                // Add the horizontal list widget to the header container
                headerContainer.appendChildWidget(mainMenu);

                // ---------------------------------------------------------------------------------------
                // Main Container

                // Add a component container (provides history stack), where we will show our screen components
                var screenContainer = new ComponentContainer("screenContainer");
                mainLayoutList.appendChildWidget(screenContainer);

                // Store reference to screenContainer component container within custom proeprties of application object
                // This is so that we can push components to this component from elsewhere.
                // Later used in the `viewnotes` component
                application.customProperties.screenContainer = screenContainer;

                // ---------------------------------------------------------------------------------------
                // Show screen one in the main container on load
                screenContainer.show("sampleapp/appui/components/viewnotes");

                // ---------------------------------------------------------------------------------------
                // Event Listeners

                // Aftershow 
                // Calls Application.ready() the first time the component is shown
                // The callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady() {
                    // Remove application loading screen
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);

                    // Manually set focus on main layout list 
                    mainLayoutList.focus();
                });

                // ---------------------------------------------------------------------------------------
                // Add component lifecycle event listeners
                this.addEventListener("load", function(ev) { self._onLoad(ev); });
                this.addEventListener("beforerender", function(ev) { self._onBeforeRender(ev); });
                this.addEventListener("beforeshow", function(ev) { self._onBeforeShow(ev); });
                this.addEventListener("aftershow", function(ev) { self._onAfterShow(ev); });
                this.addEventListener("beforehide", function(ev) { self._onBeforeHide(ev); });
                this.addEventListener("afterhide", function(ev) { self._onAfterHide(ev); });
            },

            // ---------------------------------------------------------------------------------------
            //lifecycle methods
            _onLoad: function(ev) {
                // Called when component is first loaded.
            },
            _onBeforeRender: function(ev) {
                // Called before a component is rendered.
                // This is the best place to set data-specific content.

            },
            _onBeforeShow: function(ev) {
                // Called after the component is rendered but before it is visible.
            },
            _onAfterShow: function(ev) {
                // Called after the component is visible.
                
            },
            _onBeforeHide: function(ev) {
                // Called before the component is hidden.
            },
            _onAfterHide: function(ev) {
                // Called after the component is hidden.
            },
        });
    }
);