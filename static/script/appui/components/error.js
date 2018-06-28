require.def("sampleapp/appui/components/error",
    [   
        "sampleapp/appui/components/view",
        "antie/runtimecontext",
        "antie/widgets/component",
        "antie/widgets/label",
        "antie/widgets/button"
    ],
    function (View, RuntimeContext, Component, Label, Button) {

        // Get the application object
        var application = RuntimeContext.getCurrentApplication();

        // Get a reference to the device object
        var device = RuntimeContext.getDevice();

        return View.extend({
            init: function() {
                this._super("error");
                var self = this;

                this.brandTitle = new Label('You haven\'t created any notes yet');
                this.brandTitle.addClass("errorTitle");
                this.appendChildWidget(this.brandTitle);

                // Get a reference to screen component container, as defined in application
                var screenContainer = application.customProperties.screenContainer;

                var button = new Button();
                button.appendChildWidget(new Label('Add note'));
                button.addClass("errorButton");
                button.addEventListener("select", function () {
                    screenContainer.show("sampleapp/appui/components/addnote"); // Load component into the component container
                });
                this.appendChildWidget(button);
            },
            _onBeforeRender: function(ev) {
                // Called before a component is rendered
                // This is the best place to set data-specific content
                var copy = ev.args.copy;
                
                // Set label to text to received arguments
                this.brandTitle.setText(copy);
            },
            _onAfterShow: function () {
                // Get reference to main layout vertical list, as defined in application
                var mainLayoutList = application.customProperties.mainLayoutList;
                var headerContainer = application.customProperties.headerContainer;
                headerContainer.focus();
                mainLayoutList.focus();
            }
        });
    }
);