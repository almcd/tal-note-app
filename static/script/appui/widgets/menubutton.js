require.def("sampleapp/appui/widgets/menubutton",
    [
      'antie/widgets/button',
      'antie/widgets/label',
    ],
    function (Button, Label) {
        return Button.extend({
            init: function (id, title, selectListener) {
                this._super(id);
                
                var label = new Label(title);
                this.appendChildWidget(label);

                this.addEventListener("select", function () {
                    selectListener();
                });

                return this;
            }
        });
    }
);