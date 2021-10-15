var sceneManager = {
	activeScene : 'isFirst', 
	historyCache : [],
	init : function(){
		var preProcess = function(willScene, callback){
			comp.header.highlight(willScene.getSceneName());
			$('#'+willScene.getSceneName()).append($('#footer'));
			if(sceneManager.activeScene != 'isFirst'){
				scene[sceneManager.activeScene].close();
			}
			callback && callback();
		};
		
		routie({
			
			'planner' : function(){
				var Scene = scene.planner;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					});
				});
			},
			'partners' : function(){
				var Scene = scene.partners;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					});
				});
			},
			'partners/:categoryKey' : function(categoryKey){
				var Scene = scene.partners;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					}, categoryKey);
				});
			},
			'contact' : function(){
				var Scene = scene.contact;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					});
				});
			},
			'contact/:scrollTo' : function(scrollTo){
				var Scene = scene.contact;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					},scrollTo);
				});
			},
			'about' : function(){
				var Scene = scene.about;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					});
				});
			},
			'main' : function(){
				var Scene = scene.main;
				preProcess(Scene, function(){
					Scene.init(function(){
						Scene.open();
						sceneManager.activeScene = Scene.getSceneName();
					});
				});
			},
			'*' : function(){
				sceneManager.change('main');
			},
		});

		window.onhashchange = function() {
			if( window.cordova ) {

			} else {

			}
		}
	},
	change : function(path){
		document.location.hash = path;
	}
}