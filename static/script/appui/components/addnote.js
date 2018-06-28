require.def("sampleapp/appui/components/addnote",
    [       
        "sampleapp/appui/components/view",
        "antie/runtimecontext",
        "antie/widgets/component",
        "antie/widgets/verticallist",
        "antie/widgets/container",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/keyboard",
        "antie/storageprovider",
        "sampleapp/appui/utilities/generic"
    ],
    function (
        View,
        RuntimeContext,
        Component,
        VerticalList,
        Container,
        Button,
        Label,
        Keyboard,
        StorageProvider,
        Generic) {
        
        // Get a reference to the device object
        var device = RuntimeContext.getDevice();
        
        //Get a reference to the application
        var application = RuntimeContext.getCurrentApplication();

        var generic = new Generic();

        // ---------------------------------------------------------------------------------------
        // All components extend Component
        return View.extend({

            //constructor
            init: function () {
                var self = this;
                this._super("addnote"); // Call constructor of superclass and sets id to this value
                
                // ---------------------------------------------------------------------------------------
                // Vertical Layout List
                var keyboardLayoutList = new VerticalList("keyboardLayoutList");
                this.appendChildWidget(keyboardLayoutList);

                // ---------------------------------------------------------------------------------------
                // Header Container (dumb, div like container)
                var keyboardContainer = new Container("keyboardContainer");
                keyboardContainer.addClass("keyboardContainer");
                keyboardLayoutList.appendChildWidget(keyboardContainer); // Append to main layout list

                // ---------------------------------------------------------------------------------------
                // Title Label
                this.inputLabel = new Label('');
                this.inputLabel.addClass('keyboardInputLabel');
                keyboardContainer.appendChildWidget(this.inputLabel);

                // ---------------------------------------------------------------------------------------
                // Keyboard UI
                this.keyboard = new Keyboard(
                    "onScreenKeyboard",
                    18,
                    3,
                    ' _ABCDEFGHI_0123_ ' + 
                    '-_JKLMNOPQR_4567_-' +
                    '___STUVWXYZ_89____'
                );

                this.keyboard.setActiveChildKey('A');
                keyboardContainer.appendChildWidget(this.keyboard);

                this.keyboard.addEventListener("select", function (ev) {
                    self._handleKeyboardInput(ev); // On keypress call method to handle input
                });

                // ---------------------------------------------------------------------------------------
                // Save button UI
                var saveButton = new Button("Screen");
                saveButton.addClass('save-button');
                saveButton.appendChildWidget(new Label("Save"));
                keyboardLayoutList.appendChildWidget(saveButton);
                //console.log('keyboardInput array = ', this.keyboardInput);
                
                saveButton.addEventListener("select", function () {
                    //console.log('SAVE ', self.noteData);
                    self._handleSaveButtonPress();
                });
            },

            // ---------------------------------------------------------------------------------------
            // Lifecycle methods
            _onBeforeShow: function(ev) {
                // Called after the component is rendered but before it is visible.

                this.keyboard.focus(); //set focus on keyboard
            },

            // ---------------------------------------------------------------------------------------
            // Custom methods
            _handleKeyboardInput: function (ev) {
                var self = this;

                // Create array to hold users keyboard input
                self.keyboardInput = self.keyboardInput || [];

                // Execute array method based on type of input
                switch (ev.target._dataItem) {
                    case "SPACE":
                        self.keyboardInput.push(" "); //add blank space to array
                        break;
                    case "DEL":
                        self.keyboardInput.pop(); //pop last item off array
                        break;
                    default:
                        self.keyboardInput.push(ev.target._dataItem); //add inputted character to array
                    break;
                }

                // Store array contents as string
                var labelText = self.keyboardInput.join('');
                
                // Output string to label widget in component
                self.inputLabel.setText(labelText);
                
                // Store input in noteData property for use in save method
                self.noteData = self.keyboardInput.join('')
            },
            _handleSaveButtonPress: function () {
                var self = this;

                // Get storage
                var storageAPI = device.getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, "todoapp");

                var storedVal = storageAPI.getItem('mylist');

                // If the user hasn't stored any data previously
                // Create an array to store their notes in.
                if (!storedVal) {
                    storedVal = [];
                }

                var timeStamp = String(Math.floor(Date.now() / 1000));
                console.log('timeStamp ', timeStamp);

                // Place values to be stored in object
                var input = {
                    item: self.noteData,
                    added: new Date(),
                    key: timeStamp
                }
                
                // If the user has tried to save a blank note, show the error component
                if (!input.item) {
                    generic._showNewError('You need to give your note some content');  
                    return;
                }

                // Push object into array
                storedVal.push(input);

                // Store array
                storageAPI.setItem('mylist', storedVal); //store note

                // Push user to notes view
                // Get reference to screen component container, as defined in application
                // Get reference to application
                
                var application = self.getCurrentApplication();

                // Get reference to screen component container, as defined in application
                var screenContainer = application.customProperties.screenContainer;

                // Clear label
                self.inputLabel.setText("");

                // Clear keyboard array
                self.keyboardInput = [];

                // Push to component container, and pass value
                screenContainer.pushComponent(
                    "sampleapp/appui/components/viewnotes"
                );
            }
        });
    }
);