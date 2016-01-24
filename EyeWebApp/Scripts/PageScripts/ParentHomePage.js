$(document).ready(function() {
    var initDateEdit = function(elem) {
        setTimeout(function() {
            $(elem).datepicker({
                autoSize: true,
                changeYear: true,
                changeMonth: true,
                showButtonPanel: false,
                showWeek: false,
                minDate: "-100Y",
                maxDate: 0,
                yearRange: "-100:+0"
            });
        }, 100);
    };
    var varHideNavBtns = {
        
        beforeShowForm: function(r) {
            r.parent().find("#pData").hide();
            r.parent().find("#nData").hide();
        }
    };

    var gridWidth = $("#dvMaster").width();
    $("#jQChildren").jqGrid({
        url: "Handlers/Parent.ashx?action=getChildren|",

        datatype: "json",
        shrinkToFit: true,
        loadonce: true,
        height: "auto", 
        width: gridWidth - 100,
        
        colNames: ["patientId", "parentId", "providerId", "First Name", "Last Name", "Date of Birth", "Gender", "Provider Name", "genderDdl", "providerNameDdl"],
        colModel: [
            { name: "patientId", search: false, hidden: true, editable: true, editrules: { edithidden: false } },
            { name: "parentId", search: false, hidden: true, editable: true, editrules: { edithidden: false } },
            { name: "providerId", search: false, hidden: true, editable: false, editrules: { edithidden: false } },
            { name: "firstName", search: true, hidden: false, editable: true },
            { name: "lastName", search: false, hidden: false, editable: true },
            {
                name: "dob",
                search: false,
                hidden: false,
                editable: true,
                editoptions: {
                    dataInit: initDateEdit,
                    readonly: "readonly"
                }
            },
            { name: "gender", search: false, hidden: false, editable: false, editrules: { edithidden: true } },
            { name: "providerName", search: false, hidden: false, editable: false, editrules: { edithidden: true } },
            {
                name: "genderDdl",
                editable: true,
                sortable: false,
                search: false,
                hidden: true,
                edittype: "select",
                editrules: { edithidden: true },
                editoptions: {
                    dataUrl: "Handlers/Parent.ashx?action=getgenders|",
                    buildSelect: function(e) {
                        var t = jQuery.parseJSON(e),
                            d = "<select>";
                        if (t && t.length)
                            for (var a = 0, i = t.length; i > a; a++) {
                                var o = t[a];
                                d += '<option value="' + o.genderId + '">' + o.gender + "</option>";
                            }
                        return d + "</select>";
                    }
                }
            },
            {
                name: "providerNameDdl",
                editable: true,
                sortable: false,
                search: false,
                hidden: true,
                edittype: "select",
                editrules: { edithidden: true },
                editoptions: {
                    dataUrl: "Handlers/Parent.ashx?action=getproviders|",
                    buildSelect: function(e) {
                        var t = jQuery.parseJSON(e),
                            d = "<select>";
                        if (t && t.length)
                            for (var a = 0, i = t.length; i > a; a++) {
                                var o = t[a];
                                d += '<option value="' + o.userId + '">' + o.firstName + " " + o.lastName + "</option>";
                            }
                        return d + "</select>";
                    }
                }
            }
        ],
        editurl: "Handlers/Parent.ashx?action=editChildren|",
        search: true,
        pager: '#pgrChildren',
        jsonReader: { cell: "" },
        rowNum: 10,
        rowList: [5, 10, 20, 50],
        sortname: 'patientId',
        sortorder: 'asc',
        viewrecords: true,

        caption: "Children List",
        closeAfterEdit: true,
        ondblClickRow: function(e) {

            jQuery(this).jqGrid("editGridRow", e, varHideNavBtns);
        }


    });
    $("#jQChildren").jqGrid('navGrid', '#pgrChildren', { add: true, edit: true, del: false, search: true, refresh: true },
    varHideNavBtns, {
        //afterSubmit: function () {
        //    return $("#jQChildren").jqGrid("setGridParam", {
        //        datatype: "json"
        //    }).trigger("reloadGrid"), $("<div></div>").html("A new child record was successfully created.").dialog({
        //        title: "Success",
        //        resizable: false,
        //        modal: true,
        //        buttons: {
        //            Ok: function () {
        //                $(this).dialog("close");
        //            }
        //        }
        //    });
        //}
        }, {}, {
                multipleSearch: false, multipleGroup: false
                , showQuery: false
            });


    jQuery("#refresh_jQChildren").click(function() {
        jQuery("#jQChildren").setGridParam({ datatype: 'json' });
        jQuery("#jQChildren").trigger("reloadGrid");
    });
});