require.def("sampleapp/appui/datasources/itemfeed_local",
    [   
        "antie/runtimecontext",
        "antie/class",
        "antie/storageprovider"
    ],
    function(RuntimeContext, Class, StorageProvider) {

        // Get a reference to the device object
        var device = RuntimeContext.getDevice();

        // Get a reference to the application
        var application = RuntimeContext.getCurrentApplication();

        return Class.extend({
            loadData : function(callbacks) {
                // Get a reference to the device object
                var device = RuntimeContext.getDevice();

                var storageAPI = device.getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, "todoapp");
                storedVal = storageAPI.getItem('mylist');
                
                if (!storedVal) {
                    console.log('Error: no data to return');
                }
                
                callbacks.onSuccess(storedVal);
                callbacks.onError()
            }
        });
    }
);