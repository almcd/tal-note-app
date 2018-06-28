//EASTER TAL TRIALS
//this is the js gateway to the app, which is loaded from index.php

require.def('sampleapp/appui/sampleapp',
    [
        'antie/application',
        'antie/widgets/container'
    ],
    function(Application, Container) {
    
        return Application.extend({

            /*
             *  Init
             *  TODO: Add comments
             */
            init: function(appDiv, styleDir, imgDir, callback) {
                var self;
                self = this;
                    
                // ---
                // Define a place to store custom properties on the application object
                // for example to store the 'mainContainer' to be used in other
                // modules throughout the app
                this.customProperties = {};
                // ---


                self._super(appDiv, styleDir, imgDir, callback);
                
                // Sets the root widget of the application to be
                // an empty container
                self._setRootContainer = function() {
                    var container = new Container();
                    container.outputElement = appDiv;
                    self.setRootWidget(container);
                };
            },
            
            /*
             *  Run
             *  TODO: Add comments
             */
            run: function() {
                // Called from run() as we need the framework to be ready beforehand.
                this._setRootContainer();
                
                /* 
                OLD APPROACH
                // Create maincontainer and add simple component to it
                this.addComponentContainer("maincontainer", "sampleapp/appui/components/master");
                */

                // NEW APPROACH
                // Create masterContainer and add our main layout component to it
                //store reference to 'component container' in property on customProperties
                //so that we can access it later from within a component (via the application object)
                //customPorpeties belongs to `this` right now, because we are in the application module
                this.customProperties.masterContainer = this.addComponentContainer(
                    "masterContainer", 
                    "sampleapp/appui/components/master"
                );

            }
        });     
    }
);