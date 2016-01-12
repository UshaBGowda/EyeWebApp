$(document).ready(function () {

    var gridWidth = $("#dvMaster").width();
    $("#jQPatients").jqGrid({
        url: "Handlers/Provider.ashx?action=getPatients|",

        datatype: "json",
        shrinkToFit: true,
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
                });

});