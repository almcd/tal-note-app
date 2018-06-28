//Generic utility methods for use throughout the app

require.def("sampleapp/appui/utilities/generic",
[
    "antie/runtimecontext",
    "antie/class",
    "antie/runtimecontext"
],
function (RuntimeContext, Class, RuntimeContext) {

    // Get a reference to the device object
    var device = RuntimeContext.getDevice();

    // Get a reference to the application
    var application = RuntimeContext.getCurrentApplication();
    
    return Class.extend({
        _showNewError : function (str) {
            // Get reference to component container, as defined in application
            var screenContainer = application.customProperties.screenContainer;

            // Push to component container, and pass string to display
            screenContainer.show(
                "sampleapp/appui/components/error",
                {
                    copy: str
                }
            );
        }
    });
});