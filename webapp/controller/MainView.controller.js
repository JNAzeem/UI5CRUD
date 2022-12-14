sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("root.controller.MainView", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf root.view.MainView
		 */
			onInit: function() {
				this.giStudentId=0;
				this.student = {
					id:this.giStudentId,
					firstName:"",
					middleName:"",
					lastName:"",
					gender:0,
					GenderText:"female",
					dob:"",
					fatherName:"",
					contactNumber:"",
					AlternativeNumber:""
					
				};
				this.data = {
					students:[],
					student:this.student
					
				};
			},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf root.view.MainView
		 */
		//	onBeforeRendering: function() {
		//
		//	},
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf root.view.MainView
		 */
			onAfterRendering: function() {
				var oModel = new sap.ui.model.json.JSONModel(this.data);
				this.getView().setModel(oModel);
			},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf root.view.MainView
		 */
		//	onExit: function() {
		//
		//	}
		Navigate: function() {
			this.getView().getParent().to("idV1");
		},
		onNext: function() {
			//This code was generated by the layout editor.
			//you are in view1, you need to know value of search field
			//set that as title for second view
			//Step 1: get the search field object in current view
			var oSearch = this.getView().byId("idSearch");
			//Step 2: get the value from the search object
			var sVal = oSearch.getValue();
			//Step 3: get the second VIEW object using parent - both views we added in
			//pages aggregation
			var oAppContainer = this.getView().getParent();
			var aPages = oAppContainer.getPages();
			var oView2 = aPages[1];
			//Step 4: change the title of second view's Page object
			//which is a child of the view 
			oView2.getContent()[0].setTitle(sVal);
			//Navigate to view 2
			//this.onNavigate();
			this.Navigate();
		},
		/**
		 *@memberOf root.controller.MainView
		 */
		 AddStudentHandler: function(oEvent){
		 	if(!this.newStudentDialog){
		 		this.newStudentDialog = sap.ui.xmlfragment("root.Fragments.AddStudent",this) ;
		 		
		 		
		 		var oModel = new sap.ui.model.json.JSONModel();
		 		this.newStudentDialog.setModel(oModel);
		 		
		 		
		 	}
		 	//this.newStudentDialog = sap.ui.xmlfragment("root.Fragments.AddStudent",this) ;
		 	
		 	var data = JSON.parse(JSON.stringify(this.student));
		 	this.newStudentDialog.getModel().setData(data);
		 	this.newStudentDialog.open();
		 	console.log("Test");
		 },
		 AddStudenRecord: function(oEvent){
		 	var oModel = oEvent.getSource().getModel();
		 	var oDialogData = oModel.getData();
		 	var oViewData = this.getView().getModel().getData();
		 	oDialogData.GenderText = (oDialogData.gender)?"Male":"Female";
		 	if(this.gtEditing){
			 	for(var i=0;i<oViewData.students.length>0;i++){
			 		var temp = oViewData.students[i];
			 		if(temp.id ===oDialogData.id){
			 			temp = oDialogData;
			 			temp.GenderText = (oDialogData.gender)?"Male":"Female";
			 			oViewData.students[i] = temp;
			 			break;
			 		}
			 		
			 	}
			 	this.gtEditing = false;
			 	this.getView().getModel().setData(oViewData);
			 	this.cancelAddingStd();
			 	return;
		 	}
		 
		 	oViewData.students.push(oDialogData);
		 	this.getView().getModel().setData(oViewData);
		 	this.giStudentId++;
		 	this.cancelAddingStd();
		 },
		 cancelAddingStd:function(){
		 	this.newStudentDialog.close();
		 },
		 EditStdntInfo : function(oEvent){
		 	
		 	var oCurrentStudent = oEvent.getSource().getBindingContext().getObject();
		 	this.newStudentDialog.getModel().setData(oCurrentStudent);
		 	this.newStudentDialog.open();
		 	this.gtEditing = true;
		 	console.log("EditWork");
		 },
		  DeleteStdntR : function(oEvent){
		  	var oCurrentStudent = oEvent.getSource().getBindingContext().getObject();
		  	var oViewData = this.getView().getModel().getData();
		 
		 		for(var i=0;i<oViewData.students.length>0;i++){
			 		var temp = oViewData.students[i];
			 		if(temp.id ===oCurrentStudent.id){
			 			oViewData.students.splice(i , 1);	
			 			break;
			 		}
			 	
		 		}
		 		this.getView().getModel().setData(oViewData);
		 	console.log("DeleteWork");
		 }//,
		// onSearch: function(oEvent) {
		// 	//This code was generated by the layout editor.
		// 	var oSearch = this.getView().byId("idSearch");
		// 	var sVal = oSearch.getValue();
		// 	var oView1 = this.getView.getParent().getPages()[1];
		// 	oView1.getContent()[0].setTitle(sVal);
		// 	this.Navigate();
		// }
	});
});