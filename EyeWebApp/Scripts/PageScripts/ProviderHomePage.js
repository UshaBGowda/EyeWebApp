$(document).ready(function () {

    var gridWidth = $("#dvMaster").width();
    $("#jQPatients").jqGrid({
        url: "Handlers/Provider.ashx?action=getPatients|",

        datatype: "json",
        shrinkToFit: true,
        loadonce: true,
        height: "auto",
        width: gridWidth - 100,
        colNames: ["patientId", "parentId", "providerId", "First Name", "Last Name", "Date of Birth", "Gender", "Parent Name"],
        colModel: [

            { name: "patientId", search: false, hidden: true, editable: false, editrules: { edithidden: false } },
            { name: "parentId", search: false, hidden: true, editable: false, editrules: { edithidden: false } },
            { name: "providerId", search: false, hidden: true, editable: false, editrules: { edithidden: false } },
            { name: "firstName", search: true, hidden: false, editable: false },
            { name: "lastName", search: false, hidden: false, editable: false },
            { name: "dob", search: false, hidden: false, editable: false },
            { name: "gender", search: false, hidden: false, editable: false, editrules: { edithidden: true } },
            { name: "parentName", search: false, hidden: false, editable: false, editrules: { edithidden: true }}
        ],
        search:true,
    pager:'#pgrPatients',
    jsonReader: {cell:""},
    rowNum: 10,
    rowList: [5, 10, 20, 50],
    sortname: 'patientId',
    sortorder: 'asc',
    viewrecords: true,     
    caption: "Patients List"
});
    $("#jQPatients").jqGrid('navGrid', '#pgrPatients', { add: false, edit: false, del: false, search: true, refresh: true },
                {}, {}, {}, {
                    multipleSearch: false, multipleGroup: false
                    , showQuery: false
                }).jqGrid('navButtonAdd', '#pgrPatients',
    {
        caption: "Show"/*"Show"*/, buttonicon: "ui-icon-extlink", title: "Show Link",
        onClickButton: function () {
            var grid = $("#jQPatients");
            var rowid = grid.jqGrid('getGridParam', 'selrow');
            var url = "/PatientDetails?id=";
            window.location = url + grid.jqGrid('getCell', rowid, 'patientId');
        }
    });
    jQuery("#refresh_jQPatients").click(function () {
        jQuery("#jQPatients").setGridParam({ datatype: 'json' });
        jQuery("#jQPatients").trigger("reloadGrid");
    });

    //$("#jQPatients").jqGrid('navButtonAdd', '#pgrPatients',
    //{
    //    caption: "Show"/*"Show"*/, buttonicon: "ui-icon-extlink", title: "Show Link",
    //    onClickButton: function () {
    //        var grid = $("#jQPatients");
    //        var rowid = grid.jqGrid('getGridParam', 'selrow');
    //        window.location = grid.jqGrid('getCell', rowid, 'dataUrl');
    //    }
    //});

});