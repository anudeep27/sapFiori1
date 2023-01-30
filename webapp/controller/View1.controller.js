sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Filter) {
        "use strict";

        return Controller.extend("com.anudeep.project2.controller.View1", {
            onInit: function () {
                var olModel = {
                    Details: {
                        FName: "", 
                        LName: "", 
                        Gender: {
                            M: "Male",
                            F: "Female"
                        },
                        Phone: "",
                        Address: {
                            HouseNo: "",
                            Street: "",
                            Street2: "",
                            City: "",
                            Pin: ""
                        }
                    }
                };
                var oModel = new JSONModel(olModel);
                this.getView().setModel(oModel);

                var oLData = {
                    Emp: [
                        {FName: "Anudeep", LName: "Daniel", Gender: "Male", Country: "India", Phone: "7893377234"},
                        {FName: "Christopher", LName: "Nolan", Gender: "Male", Country: "England", Phone: "7981908030"},
                        {FName: "Regina", LName: "Phalange", Gender: "Female", Country: "Canada", Phone: "9676103270"},
                        {FName: "Mary Jane", LName: "Watson", Gender: "Female", Country: "England", Phone: "6300127581"}
                    ]
                };
                var oLModel = new JSONModel(oLData);
                this.getView().setModel(oLModel, "oTable");

            },
        onNext: function(oEvent){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("View2")
            },
        onSubmit: function(oEvent){
            var oDetails = {};
            oDetails.FName   = this.getView().byId("FN").getValue();
            oDetails.LName   = this.getView().byId("LN").getValue();
            oDetails.Gender  = this.getView().byId("Gend").getSelectedButton().getText();
            oDetails.Country = this.getView().byId("Country").getSelectedItem().getText();
            oDetails.Phone   = this.getView().byId("PH").getValue();
            if (oDetails.Country == "Select Country") {
                oDetails.Country = "India";
            }
            var oTModel = this.getView().getModel("oTable");
            var that = this;
            if (oDetails.FName == "") {
                alert("Please Enter First Name");
            } else {
                MessageBox.confirm("Do you wish to Confirm", {
                    actions: [MessageBox.Action.YES, MessageBox.Action.CLOSE],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (sAction) {
                        if (sAction == MessageBox.Action.YES) {
                            oTModel.getProperty("/Emp").push(oDetails);
                            oTModel.refresh(); 
                            that.getView().byId("FN").setValue("");
                            that.getView().byId("LN").setValue("");
                            that.getView().byId("Gend").setSelectedIndex(0);
                            that.getView().byId("Country").setSelectedKey("Default");
                            that.getView().byId("PH").setValue("");
                            that.getView().byId("HN").setValue("");
                            that.getView().byId("ST").setValue("");
                            that.getView().byId("ST2").setValue("");
                            that.getView().byId("CT").setValue("");
                            that.getView().byId("PC").setValue("");
                            var length  = that.getView().getModel("oTable").oData.Emp.length;
                            that.getView().byId("ALL").setCount(length);
                            // that.getView().byId("F").setCount(length);
                        } else {
                            
                        }
                    }
                });
            } 
        },

        onFilterSelect: function (oEvent) {
			var oBinding = this.byId("empTable").getBinding("items"),
				sKey = oEvent.getParameter("key"),
				// Array to combine filters
				aFilters = [];

            if (sKey === "FE") {
                aFilters.push(
                    new Filter( "Gender", "EQ", "Female", true) );
            } else if (sKey === "MA") {
                aFilters.push(
                    new Filter( "Gender", "EQ", "Male", true) );
            }
            oBinding.filter(aFilters);
        },

        handleToggle: function(oEvent) {
			// var demoToast = this.getView().byId("demoToast");
			// demoToast.setText("Event toggle fired.");
			// demoToast.show();
		},

        onCancel: function(){
            this.getView().byId("FN").setValue("");
            this.getView().byId("LN").setValue("");
            this.getView().byId("Gend").setSelectedIndex(0);
            this.getView().byId("Country").setSelectedKey("Default");
            this.getView().byId("PH").setValue("");
            this.getView().byId("HN").setValue("");
            this.getView().byId("ST").setValue("");
            this.getView().byId("ST2").setValue("");
            this.getView().byId("CT").setValue("");
            this.getView().byId("PC").setValue("");
        }

        });
    });
