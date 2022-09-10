sap.ui.define(
	["sap/ui/core/UIComponent"], 
	function(UIComponent){
		return UIComponent.extend("root.Component",{
			metadata: {
				"manifest" : "json"
			},
			init: function(){
				//call the base class contructor to initialize
				UIComponent.prototype.init.apply(this);
				//You will get FREE ROUTER OBJECT
			},
			createContent: function(){
				//Step 1: Create App View Object
				var oAppView = new sap.ui.view("idAView",{
					viewName: "root.view.App",
					type: "XML"
				});
				//Step 2: Create Other 2 view objects
				var oView1 = new sap.ui.view("idV1",{
					viewName: "root.view.View1",
					type: "XML"
				});
				var oMainView = new sap.ui.view("idMV",{
					viewName: "root.view.MainView",
					type: "XML"
				});
				var oView2 = new sap.ui.view("idV2",{
					viewName: "root.view.View2",
					type: "XML"
				});
				//Step 3: Get the object of App Container
				var oAppContainer = oAppView.byId("idApp");
				//Step 4: Add these 2 views inside App Container in Pages Aggregation
				oAppContainer.addPage(oMainView).addPage(oView1).addPage(oView2);
				return oAppView;
			},
			destroy: function(){
				
			}
		});
	}
);