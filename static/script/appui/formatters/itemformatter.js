require.def("sampleapp/appui/formatters/itemformatter",
    [   
        "antie/runtimecontext",
        "antie/formatter",
        "antie/widgets/label",
        "antie/widgets/button"
    ],
    function(RuntimeContext, Formatter, Label, Button) {

        // ---------------------------------------------------------------------------------------
        // Get a reference to the application
        var application = RuntimeContext.getCurrentApplication();
        // Get a reference to the device object
        var device = RuntimeContext.getDevice();

        // Extend formatter class
        return Formatter.extend({

            // The `format` method, receives iterator (our array from videofeed)
            format : function (iterator) {
                var item = iterator.next();

                var button = new Button();
                var buttonLabel = new Label(item.item);
                button.appendChildWidget(buttonLabel);

                // Add data to component (in this case the whole data structure returned)
                button.setDataItem(item);

                return button; 
            }
        });
    }
);