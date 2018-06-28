require.def("sampleapp/appui/components/view_single_note",
    [   
        "sampleapp/appui/components/view",
        "antie/runtimecontext",
        "antie/widgets/component",
        "antie/widgets/container",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        "antie/storageprovider"
    ],
    function (
        View,
        RuntimeContext,
        Component,
        Container,
        Button,
        Label,
        VerticalList,
        StorageProvider) {
            
        // Get a reference to the device object
        var device = RuntimeContext.getDevice();

        // Get a reference to the application
        var application = RuntimeContext.getCurrentApplication();

        // ---------------------------------------------------------------------------------------
        // All components extend Component
        return View.extend({

            //constructor
            init: function () {
                var self = this;
                this._super("viewsinglenote"); // Call constructor of superclass and sets id to this value
                    
                this.label = new Label('label')
                this.label.addClass('note-full')
                this.appendChildWidget(this.label);

                // ---------------------------------------------------------------------------------------
                // Create Vertical List
                this.optionsList = new VerticalList("mainLayoutList");
                this.appendChildWidget(this.optionsList);

                // ---------------------------------------------------------------------------------------
                // Create Delete Button
                var buttonDelete = new Button("buttonDelete");
                buttonDelete.addEventListener("select", function () {
                    self._deleteItem();
                });

                buttonDelete.appendChildWidget(new Label("Delete"));
                this.optionsList.appendChildWidget(buttonDelete);

                // ---------------------------------------------------------------------------------------
                // Create Back Button
                var buttonBack = new Button("buttonBack");
                buttonBack.addEventListener("select", function () {
                    // Get reference to parent component container of this component
                    var componentContainer = self.parentWidget;

                    // Call back on parent component container
                    componentContainer.back();
                });

                buttonBack.appendChildWidget(new Label("Back"));
                this.optionsList.appendChildWidget(buttonBack);
            },

            // ---------------------------------------------------------------------------------------
            //lifecycle methods
            _onBeforeRender: function(ev) {
                // Called before a component is rendered.
                // This is the best place to set data-specific content.
                var args = ev.args.noteData;

                // Set label to text to received arguments
                this.label.setText(args.item);

                // Assign the args object as a property of the component so that we can use it elsewhere  
                this._returnedData = args;
            },
        
            // ---------------------------------------------------------------------------------------
            // custom methods
            _deleteItem: function() {
                var self = this;

                console.log('deleteitem this._returnedData', this._returnedData);

                // Get storage
                var storageAPI = device.getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, "todoapp");
                // Get object
                var storedVal = storageAPI.getItem('mylist');
   
                // Remove matching item from array of objects and return new array with object removed
                var result = storedVal.filter(function(storedVal) {
                    return storedVal.key !== self._returnedData.key;
                });
                console.log(result);

                // Store updated array
                storageAPI.setItem('mylist', result);
                
                // Get reference to screen component container, as defined in application
                // Get reference to application
                var application = self.getCurrentApplication();

                // Get reference to screen component container, as defined in application
                var screenContainer = application.customProperties.screenContainer;

                // Show updated notes
                screenContainer.show(
                    "sampleapp/appui/components/viewnotes"
                );
            }

        });
    }
);