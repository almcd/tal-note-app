/**
 * @fileOverview This defines a base view class for 
 * common functionality for all views.
 *
 */
require.def("sampleapp/appui/components/view",
    [
        "antie/runtimecontext",
        "antie/widgets/component",
        "sampleapp/appui/utilities/generic"
    ],
    function (RuntimeContext, Component, Generic) {
        /**
         * The base View class for all views
         * @name sampleapp.appui.components.views
         * @class
         * @extends antie.widgets.Component
         * @requires ...
         */
        return Component.extend(/** @lends sampleapp.appui.components.view.prototype */{
            init: function(id) {
                this._super(id);
                this.addClass("screenInner");
                var self = this;

                


                // ---------------------------------------------------------------------------------------
                // Add component lifecycle event listeners
                this.addEventListener("load", function(ev) { self._onLoad(ev); });
                this.addEventListener("beforerender", function(ev) { self._onBeforeRender(ev); });
                this.addEventListener("beforeshow", function(ev) { self._onBeforeShow(ev); });
                this.addEventListener("aftershow", function(ev) { self._onAfterShow(ev); });
                this.addEventListener("beforehide", function(ev) { self._onBeforeHide(ev); });
                this.addEventListener("afterhide", function(ev) { self._onAfterHide(ev); });
            },
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
            }
        });
    }
);