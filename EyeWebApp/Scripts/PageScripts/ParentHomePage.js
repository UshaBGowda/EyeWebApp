$(document).ready(function () {
    var gridWidth = $("#dvMaster").width();
    $("#jQChildren").jqGrid({
        url: "Handlers/Parent.ashx?action=getChildren|",
        datatype: "json",
        loadonce: "true",
        shrinkToFit: true,
        height: "auto",
        width: gridWidth - 100,
        colNames: ["patientId", "parentId", "providerId","providerName", "First Name", "Last Name", "Date of Birth", "Gender"],
        colModel: [
            
            {
                name: "patientId", search: false, hidden: true, editable: true,editrules: {edithidden: false}},
            { name: "parentId", search: false, hidden: true, editable: true, editrules: { edithidden: false } },
            {
                name: "providerId", search: false, hidden: true, editable: true, editrules: { edithidden: false }
            },
            {
                name: "providerName",
                editable: true,
                sortable: false,
                search: false,
                hidden: true,
                edittype: "select",editrules: { edithidden: true },
                editoptions: {
                    dataUrl: "Handlers/Parent.ashx?action=getproviders|",
                    buildSelect: function(e) {
                        var t = jQuery.parseJSON(e),
                          d = "<select>";
                        if (t && t.length)
                            for (var a = 0, i = t.length; i > a; a++) {
                                var o = t[a];
                                d += '<option value="' + o.userId + '">' + o.firstName + " " + o.lastName + "</option>"
                            }
                        return d + "</select>";
                    }
                }
            },
            { name: "firstName", search: true, hidden: false ,editable:true},
            { name: "lastName", search: false, hidden: false, editable: true },
            { name: "dob", search: false, hidden: false, editable: true },
            { name: "gender", search: false, hidden: false, editable: true }
        ],
        editurl: "Handlers/Parent.ashx?action=putChildren|",
        search:true,
        pager:'#pgrChildren',
        jsonReader: {cell:""},
        rowNum: 10,
        rowList: [5, 10, 20, 50],
        sortname: 'patientId',
        sortorder: 'asc',
        viewrecords: true,
        
        caption: "Children List",
        closeAfterEdit: true,
        ondblClickRow: function (e) {
           // $("#jQChildren").jqGrid("editGridRow", e, a);
            jQuery(this).jqGrid('editGridRow', e);
        }
    });
    $("#jQChildren").jqGrid('navGrid', '#pgrChildren', { add: true, edit: true, del: false, search: true, refresh: true },
                {}, {}, {}, {
                    multipleSearch: false, multipleGroup: false
                    , showQuery: false
                });
    
});