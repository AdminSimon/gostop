loader = {
    initialize: function () {
        this.loadConfig();
    },    
    loadConfig: function (callback) {
        
        service.ui.loadingShow($('body'));

        sceneManager.init();
        
        service.ui.loadingHide();
    }
};
loader.initialize();