$(document).ready(function () {
    function e() {
        return $(".lblUserEmail").html()
    }

    function t() {
        var e = document.createElement("input");
        return e.type = "text", e.value = $(".lblUserEmail").html(), e.setAttribute("readOnly", "true"), e;
    }
    var d = $("#Tabs").width();
    $(function () {
        $("#Tabs").accordion({
            collapsible: !0,
            heightStyle: "content"
        }), $("#jqLookUp").jqGrid("GridUnload"), $("#AdminTabs").accordion({
            collapsible: !0,
            heightStyle: "content"
        }), $("#Admin").tabs(), $("#AdminTabs").accordion({
            active: !1
        }).click();
        var a = {
            width: "500",
            beforeShowForm: function (e) {
                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                    var t = $("#jqLookUp"),
                      d = $("#editmod" + t[0].id),
                      a = d.parent(),
                      i = d.width(),
                      o = a.width();
                    d.height(), a.height()
                }
                d[0].style.left = Math.round((o - i) / 2) + "px", $("#edithd" + $("#jqLookUp")[0].id).addClass("cmsedit")
            },
            afterSubmit: function () {
                return $("#jqLookUp").jqGrid("setGridParam", {
                    datatype: "json"
                }).trigger("reloadGrid"), $("#jqLookUpEdit").jqGrid("setGridParam", {
                    datatype: "json"
                }).trigger("reloadGrid"), $("<div></div>").html("LookupID was successfully updated").dialog({
                    title: "Success",
                    resizable: !1,
                    modal: !0,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close")
                        }
                    }
                }), [!0, "", ""]
            },
            beforeSubmit: function (e) {
                var t = $("#jqLookUp").getRowData(e.jqLookUp_id);
                return e.LookupID = t.Id, "" === e.Comments.trim() ? ($("#exec").addClass("ui-state-highlight"), [!1, "ERROR MESSAGE: Please add a comment for the change"]) : [!0, ""]
            },
            closeAfterEdit: !0
        },
          i = {
              width: "500",
              beforeShowForm: function (e) {
                  e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                      var t = $("#jqLookUp"),
                        d = $("#viewmod" + t[0].id),
                        a = d.parent(),
                        i = a.width(),
                        o = d.width();
                      d.height(), a.height()
                  }
                  d[0].style.left = Math.round((i - o) / 2) + "px", $("#viewhd" + $("#jqLookUp")[0].id).addClass("cmsview")
              }
          };
        $("#jqLookUp").jqGrid({
            url: "Handlers/CodeHandler.ashx?action=LookupGetEdit|",
            datatype: "json",
            loadonce: "true",
            autowidth: !0,
            shrinkToFit: !0,
            height: "auto",
            width: d - 50,
            colNames: ["ID", "Code Name", "Source System", "Target System", "Source Code", "Target Code", "Description", "Status", "Start Date", "End Date", "Last Updated On", "Last Modified By", "Comments"],
            colModel: [{
                name: "Id",
                search: !1,
                hidden: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "CodeName",
                sortable: !0,
                width: 375,
                searchoptions: {
                    sopt: ["cn"]
                },
                editable: !0,
                editoptions: {
                    readonly: "readonly",
                    dataInit: function (e) {
                        $(e).width(250)
                    }
                }
            }, {
                name: "SourceSystem",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "TargetSystem",
                sortable: !0,
                search: !1,
                width: 75,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "SourceCode",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "TargetCode",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "Description",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "Status",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "StartDate",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "EndDate",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "LastUpdated",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "ModifiedBy",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                edittype: "custom",
                editoptions: {
                    custom_element: t,
                    custom_value: e
                }
            }, {
                name: "Comments",
                search: !1,
                hidden: !0,
                editable: !0,
                editrules: {
                    edithidden: !0
                }
            }],
            editurl: "Handlers/CodeHandler.ashx?action=LookupPut|",
            ignoreCase: !0,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: "#pgrLookUp",
            sortname: "CodeName",
            viewrecords: !0,
            sortorder: "asc",
            caption: "Edit Look Up Values",
            hidegrid: !1,
            closeAfterEdit: !0,
            ondblClickRow: function (e) {
                $("#jqLookUp").jqGrid("editGridRow", e, a)
            },
            loadComplete: function () {
                var e, t, d, a = $(this).jqGrid("getDataIDs"),
                  i = a.length;
                for (e = 0; i > e; e++) t = a[e], d = $(this).jqGrid("getCell", t, "Edit_Flag"), "0" === d && $("#" + $.jgrid.jqID(t)).addClass("not-editable-row")
            }
        }), $("#jqLookUp").jqGrid("navGrid", "#pgrLookUp", {
            view: !1,
            add: !1,
            del: !1
        }, a, {}, {}, {}, i), $("#jqLookUpEdit").jqGrid("GridUnload");
        var o = {
            width: "500",
            beforeShowForm: function (e) {
                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                    var t = $("#jqLookUpEdit"),
                      d = $("#editmod" + t[0].id),
                      a = d.parent(),
                      i = d.width(),
                      o = a.width();
                    d.height(), a.height()
                }
                d[0].style.left = Math.round((o - i) / 2) + "px", $("#edithd" + $("#jqLookUpEdit")[0].id).addClass("cmsedit")
            }
        },
          r = {
              width: "500",
              beforeShowForm: function (e) {
                  e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                      var t = $("#jqLookUpEdit"),
                        d = $("#viewmod" + t[0].id),
                        a = d.parent(),
                        i = a.width(),
                        o = d.width();
                      d.height(), a.height()
                  }
                  d[0].style.left = Math.round((i - o) / 2) + "px", $("#viewhd" + $("#jqLookUpEdit")[0].id).addClass("cmsview")
              }
          };
        $("#jqLookUpEdit").jqGrid({
            url: "Handlers/CodeHandler.ashx?action=LookupGet|",
            datatype: "json",
            loadonce: "true",
            autowidth: !0,
            shrinkToFit: !0,
            height: "auto",
            width: d - 50,
            colNames: ["ID", "Code Name", "Source System", "Target System", "Source Code", "Target Code", "Description", "Status", "Start Date", "End Date", "Last Updated On", "Last Modified By", "Comments", "Edit_Flag"],
            colModel: [{
                name: "Id",
                key: !0,
                search: !1,
                hidden: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "CodeName",
                key: !0,
                sortable: !0,
                width: 375,
                searchoptions: {
                    sopt: ["cn"]
                },
                editable: !0,
                editoptions: {
                    readonly: "readonly",
                    dataInit: function (e) {
                        $(e).width(250)
                    }
                }
            }, {
                name: "SourceSystem",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "TargetSystem",
                sortable: !0,
                search: !1,
                width: 75,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "SourceCode",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "TargetCode",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "Description",
                sortable: !0,
                searchoptions: {
                    sopt: ["cn"]
                },
                editable: !0
            }, {
                name: "Status",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "StartDate",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "EndDate",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "LastUpdated",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "ModifiedBy",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                edittype: "custom",
                editoptions: {
                    custom_element: t,
                    custom_value: e
                }
            }, {
                name: "Comments",
                search: !1,
                hidden: !0,
                editable: !1
            }, {
                name: "Edit_Flag",
                search: !1,
                hidden: !0,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }],
            editurl: "Handlers/CodeHandler.ashx?action=LookupPut|",
            ignoreCase: !0,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: "#pgrLookUpEdit",
            sortname: "CodeName",
            viewrecords: !0,
            sortorder: "asc",
            caption: "View Look Up Values",
            hidegrid: !1,
            reloadAfterSubmit: !0,
            ondblClickRow: function (e) {
                $("#jqLookUpEdit").jqGrid("viewGridRow", e, r)
            },
            beforeSelectRow: function (e) {
                var t = $(this).getGridParam("selrow"),
                  d = $(this.rows.namedItem(e)),
                  a = $.jgrid.jqID(this.id);
                return t === e || d.hasClass("not-editable-row") ? ($("#edit_" + a).addClass("ui-state-disabled"), $("#del_" + a).addClass("ui-state-disabled")) : ($("#edit_" + a).removeClass("ui-state-disabled"), $("#del_" + a).removeClass("ui-state-disabled")), !0
            },
            subGrid: !0,
            subGridRowExpanded: function (e, t) {
                var d, a = $("#jqLookUpEdit").getRowData(t);
                d = e + "_t", jQuery("#" + e).html("<table id='" + d + "' class='scroll'></table>"), jQuery("#" + d).jqGrid({
                    url: "Handlers/CodeHandler.ashx?action=getLookupHist|" + a.Id,
                    datatype: "json",
                    loadonce: "true",
                    shrinkToFit: !0,
                    height: "auto",
                    width: $(window).width() - 200,
                    colNames: ["LookupID", "SourceCode", "TargetCode", "Description", "Status", "StartDate", "EndDate", "Comments", "Modifiedby", "ModifiedDT"],
                    colModel: [{
                        name: "LookupID",
                        sortable: !0,
                        search: !1,
                        hidden: !0
                    }, {
                        name: "SourceCode",
                        key: !0,
                        sortable: !0,
                        search: !1
                    }, {
                        name: "TargetCode",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "Description",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "Status",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "StartDate",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "EndDate",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "Comments",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "Modifiedby",
                        sortable: !0,
                        search: !1
                    }, {
                        name: "ModifiedDT",
                        sortable: !0,
                        search: !1
                    }],
                    rowNum: 10,
                    sortname: "ModifiedDT",
                    sortorder: "desc",
                    ondblClickRow: function (e) {
                        $("#" + d).jqGrid("viewGridRow", e, {
                            width: "500",
                            beforeShowForm: function (e) {
                                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                                    var t = $("#" + d),
                                      a = $("#viewmod" + t[0].id),
                                      i = a.parent(),
                                      o = i.width(),
                                      r = a.width();
                                    a.height(), i.height()
                                }
                                a[0].style.left = Math.round((o - r) / 2) + "px", $("#viewhd" + $("#" + d)[0].id).addClass("cmsview")
                            }
                        })
                    }
                })
            },
            loadComplete: function () {
                var e, t, d, a = $(this).jqGrid("getDataIDs"),
                  i = a.length;
                for (e = 0; i > e; e++) t = a[e], d = $(this).jqGrid("getCell", t, "Edit_Flag"), "0" === d && $("#" + $.jgrid.jqID(t)).addClass("not-editable-row")
            }
        }), $("#jqLookUpEdit").jqGrid("navGrid", "#pgrLookUpEdit", {
            view: !0,
            edit: !1,
            add: !1,
            del: !1
        }, o, {}, {}, {}, r), $("#dvView").show(), $("#dvEdit").hide(), $("#rbView").change(function () {
            $("#dvView").show(1e3), $("#dvEdit").hide(1e3)
        }), $("#rbEdit").change(function () {
            $("#dvView").hide(1e3), $("#dvEdit").show(1e3)
        }), $("#jqLookUp").jqGrid({
            url: "Handlers/CodeHandler.ashx?action=LookupGetEdit|",
            datatype: "json",
            loadonce: "true",
            autowidth: !0,
            shrinkToFit: !0,
            height: "auto",
            width: d - 50,
            colNames: ["ID", "Code Name", "Source System", "Target System", "Source Code", "Target Code", "Description", "Status", "Start Date", "End Date", "Last Updated On", "Last Modified By", "Comments"],
            colModel: [{
                name: "Id",
                search: !1,
                hidden: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "CodeName",
                sortable: !0,
                width: 375,
                searchoptions: {
                    sopt: ["cn"]
                },
                editable: !0,
                editoptions: {
                    readonly: "readonly",
                    dataInit: function (e) {
                        $(e).width(250)
                    }
                }
            }, {
                name: "SourceSystem",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "TargetSystem",
                sortable: !0,
                search: !1,
                width: 75,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "SourceCode",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "TargetCode",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "Description",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "Status",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0
            }, {
                name: "StartDate",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "EndDate",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "LastUpdated",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                editoptions: {
                    readonly: "readonly"
                }
            }, {
                name: "ModifiedBy",
                sortable: !0,
                width: 75,
                search: !1,
                editable: !0,
                edittype: "custom",
                editoptions: {
                    custom_element: t,
                    custom_value: e
                }
            }, {
                name: "Comments",
                search: !1,
                hidden: !0,
                editable: !0,
                editrules: {
                    edithidden: !0
                }
            }],
            editurl: "Handlers/CodeHandler.ashx?action=LookupPut|",
            ignoreCase: !0,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: "#pgrLookUp",
            sortname: "CodeName",
            viewrecords: !0,
            sortorder: "asc",
            caption: "Edit Look Up Values",
            hidegrid: !1,
            closeAfterEdit: !0,
            ondblClickRow: function (e) {
                $("#jqLookUp").jqGrid("editGridRow", e, a)
            },
            loadComplete: function () {
                var e, t, d, a = $(this).jqGrid("getDataIDs"),
                  i = a.length;
                for (e = 0; i > e; e++) t = a[e], d = $(this).jqGrid("getCell", t, "Edit_Flag"), "0" === d && $("#" + $.jgrid.jqID(t)).addClass("not-editable-row")
            }
        }), $("#jqLookUp").jqGrid("navGrid", "#pgrLookUp", {
            view: !1,
            add: !1,
            del: !1
        }, a, {}, {}, {}, i);
        var s = {
            width: "500",
            beforeShowForm: function (e) {
                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                    var t = $("#jqUsers"),
                      d = $("#editmod" + t[0].id),
                      a = d.parent(),
                      i = d.width(),
                      o = a.width();
                    d.height(), a.height()
                }
                d[0].style.left = Math.round((o - i) / 2) + "px", $("#edithd" + $("#jqUsers")[0].id).addClass("cmsedit")
            },
            afterSubmit: function () {
                return $("#jqUsers").jqGrid("setGridParam", {
                    datatype: "json"
                }).trigger("reloadGrid"), $("<div></div>").html("User was successfully updated").dialog({
                    title: "Success",
                    resizable: !1,
                    modal: !0,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close")
                        }
                    }
                }), [!0, "", ""]
            },
            beforeSubmit: function (e) {
                var t = $("#jqUsers").getRowData(e.jqUsers_id);
                return e.RoleID1 = $("#ddlRoles option:selected").val(), e.UserID = t.UserID, [!0, ""]
            },
            closeAfterEdit: !0,
            closeAfterAdd: !0
        },
          n = {
              width: "500",
              beforeShowForm: function (e) {
                  e.parent().find("#pData").hide(),

                  e.parent().find("#nData").hide(); {
                      var t = $("#jqUsers"),
                        d = $("#editmod" + t[0].id),
                        a = d.parent(),
                        i = d.width(),
                        o = a.width();
                      d.height(), a.height()
                  }
                  d[0].style.left = Math.round((o - i) / 2) + "px", $("#edithd" + $("#jqUsers")[0].id).addClass("cmsedit")
              }, afterSubmit: function () {
                  return $("#jqUsers").jqGrid("setGridParam", {
                      datatype: "json"
                  }).trigger("reloadGrid"), $("<div></div>").html("User was successfully created").dialog({
                      title: "Success",
                      resizable: !1,
                      modal: !0,
                      buttons: {
                          Ok: function () {
                              $(this).dialog("close")
                          }
                      }
                  }), [!0, "", ""]
              }, beforeSubmit: function (e) {
                  var t = $("#jqUsers").getRowData(e.jqUsers_id);
                  return e.UserID = t.UserID, "" === e.ModifierID.trim() || "" === e.UserCorpID.trim() || "" === e.UserEmail.trim() || "" === e.UserFirstName.trim() || "" === e.UserLastName.trim() ? ($("#exec").addClass("ui-state-highlight"), [!1, "ERROR MESSAGE: Please populate all the fields"]) : [!0, ""]
              }, closeAfterEdit: !0, closeAfterAdd: !0
          }, l = {
              width: "500",
              beforeShowForm: function (e) {
                  e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                      var t = $("#jqUsers"),
                        d = $("#viewmod" + t[0].id),
                        a = d.parent(),
                        i = a.width(),
                        o = d.width();
                      d.height(), a.height()
                  }
                  d[0].style.left = Math.round((i - o) / 2) + "px", $("#viewhd" + $("#jqUsers")[0].id).addClass("cmsview")
              }
          };
        $("#jqUsers").jqGrid({
            url: "Handlers/CodeHandler.ashx?action=getUsers|",
            datatype: "json",
            loadonce: "true",
            autowidth: !0,
            shrinkToFit: !0,
            height: "auto",
            width: d - 50,
            colNames: ["UserID", "UserFirstName", "UserLastName", "UserEmail", "UserCorpID", "RoleID", "Role", "ModifierID", "ModifiedDT"],
            colModel: [{
                name: "UserID",
                sortable: !0,
                search: !1,
                hidden: !0
            }, {
                name: "UserFirstName",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "UserLastName",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "UserEmail",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "UserCorpID",
                sortable: !0,
                search: !0,
                searchoptions: {
                    sopt: ["cn"]
                },
                editable: !0
            }, {
                name: "RoleID",
                sortable: !0,
                hidden: !0,
                editable: !0,
                search: !1
            }, {
                name: "Role",
                editable: !0,
                sortable: !0,
                search: !1,
                edittype: "select",
                editoptions: {
                    dataUrl: "Handlers/CodeHandler.ashx?action=getroles|",
                    buildSelect: function (e) {
                        var t = jQuery.parseJSON(e),
                          d = "<select>";
                        if (t && t.length)
                            for (var a = 0, i = t.length; i > a; a++) {
                                var o = t[a];
                                d += '<option value="' + o.ID + '">' + o.Role + "</option>"
                            }
                        return d + "</select>"
                    }
                }
            }, {
                name: "ModifierID",
                sortable: !0,
                hidden: !0,
                editable: !0,
                search: !1,
                edittype: "custom",
                editoptions: {
                    custom_element: t,
                    custom_value: e
                },
                addtype: "custom",
                addoptions: {
                    custom_element: t,
                    custom_value: e
                }
            }, {
                name: "ModifiedDT",
                hidden: !0,
                sortable: !0,
                search: !1
            }],
            editurl: "Handlers/CodeHandler.ashx?action=UsersPut|",
            ignoreCase: !0,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: "#pgrUsers",
            sortname: "UserFirstName",
            viewrecords: !0,
            sortorder: "asc",
            caption: "Edit User records",
            hidegrid: !1,
            closeAfterEdit: !0,
            ondblClickRow: function (e) {
                $("#jqUsers").jqGrid("viewGridRow", e, l)
            },
            subGrid: !0,
            subGridRowExpanded: function (d, a) {
                var i, o, r = $("#jqUsers").getRowData(a);
                i = d + a + "_t", o = "p_" + i, $("#" + d).html("<table id='" + i + "' class='scroll'></table><div id='" + o + "' class='scroll'></div>");
                var s = {
                    width: "500",
                    beforeShowForm: function (e) {
                        e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                            var t = $("#" + i),
                              d = $("#editmod" + t[0].id),
                              a = d.parent(),
                              o = d.width(),
                              r = a.width();
                            d.height(), a.height()
                        }
                        d[0].style.left = Math.round((r - o) / 2) + "px", $("#edithd" + $("#" + i)[0].id).addClass("cmsedit")
                    },
                    afterSubmit: function () {
                        return $("#" + i).jqGrid("setGridParam", {
                            datatype: "json"
                        }).trigger("reloadGrid"), $("<div></div>").html("Lookup ID was successfully Associated with the Group: ").dialog({
                            title: "Success",
                            resizable: !1,
                            modal: !0,
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close")
                                }
                            }
                        }), [!0, "", ""]
                    },
                    beforeSubmit: function (e) {
                        var t = $("#jqUsers").getRowData(a);
                        return e.Mst_UserID = t.UserID, e.ModifiedBy = $(".lblUserEmail").html(), [!0, ""]
                    },
                    closeAfterEdit: !0,
                    closeAfterAdd: !0
                },
                  n = {
                      mtype: "POST",
                      reloadAfterSubmit: !0,
                      serializeDelData: function () {
                          return ""
                      },
                      width: "500",
                      beforeShowForm: function (e) {
                          e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                              var t = $("#" + i),
                                d = $("#delmod" + t[0].id),
                                a = d.parent(),
                                o = d.width(),
                                r = a.width();
                              d.height(), a.height()
                          }
                          d[0].style.left = Math.round((r - o) / 2) + "px", $("#delhd" + $("#" + i)[0].id).addClass("cmsedit")
                      },
                      onclickSubmit: function (e, t) {
                          var d = $("#jqUsers").getRowData(a);
                          e.url = "Handlers/CodeHandler.ashx?action=userdetailsdel|" + encodeURIComponent(t) + "," + d.UserID + "," + $(".lblUserEmail").html().replace(/ /g, "")
                      }
                  };
                jQuery("#" + i).jqGrid({
                    url: "Handlers/CodeHandler.ashx?action=getUserDetails|" + r.UserID,
                    datatype: "json",
                    loadonce: "true",
                    autowidth: !0,
                    shrinkToFit: !0,
                    height: "auto",
                    width: $(window).width() - 200,
                    colNames: ["LookupID", "OwnerID", "ModifierID", "ModifiedDT", "LookUpName", "ModifiedBy"],
                    colModel: [{
                        name: "LookupID",
                        key: !0,
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "OwnerID",
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "ModifierID",
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "ModifiedDT",
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "LookUpName",
                        editable: !0,
                        sortable: !0,
                        search: !1,
                        edittype: "select",
                        editoptions: {
                            dataUrl: "Handlers/CodeHandler.ashx?action=getsellookup|",
                            buildSelect: function (e) {
                                var t = jQuery.parseJSON(e),
                                  d = "<select>";
                                if (t && t.length)
                                    for (var a = 0, i = t.length; i > a; a++) {
                                        var o = t[a];
                                        d += '<option value="' + o.LookupID + '">' + o.LookUpName + "</option>"
                                    }
                                return d + "</select>"
                            }
                        }
                    }, {
                        name: "ModifiedBy",
                        sortable: !0,
                        hidden: !1,
                        editable: !1,
                        search: !1,
                        edittype: "custom",
                        editoptions: {
                            custom_element: t,
                            custom_value: e
                        },
                        addtype: "custom",
                        addoptions: {
                            custom_element: t,
                            custom_value: e
                        }
                    }],
                    editurl: "Handlers/CodeHandler.ashx?action=UserDetailsPut|",
                    rowNum: 10,
                    pager: "#" + o,
                    sortname: "ModifiedDT",
                    sortorder: "desc",
                    ondblClickRow: function (e) {
                        $("#" + i).jqGrid("viewGridRow", e, {
                            width: "500",
                            beforeShowForm: function (e) {
                                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                                    var t = $("#" + i),
                                      d = $("#viewmod" + t[0].id),
                                      a = d.parent(),
                                      o = a.width(),
                                      r = d.width();
                                    d.height(), a.height()
                                }
                                d[0].style.left = Math.round((o - r) / 2) + "px", $("#viewhd" + $("#" + i)[0].id).addClass("cmsview")
                            }
                        })
                    }
                }), jQuery("#" + i).jqGrid("navGrid", "#" + o, {
                    edit: !1,
                    add: !0,
                    del: !0,
                    search: !1,
                    refresh: !1
                }, {}, s, n, {}, {})
            }
        }), $("#jqUsers").jqGrid("navGrid", "#pgrUsers", {
            view: !0,
            add: !0,
            del: !1
        }, s, n, {}, {}, l);
        var h = {
            width: "500",
            beforeShowForm: function (e) {
                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                    var t = $("#jqGroups"),
                      d = $("#editmod" + t[0].id),
                      a = d.parent(),
                      i = d.width(),
                      o = a.width();
                    d.height(), a.height()
                }
                d[0].style.left = Math.round((o - i) / 2) + "px", $("#edithd" + $("#jqGroups")[0].id).addClass("cmsedit")
            },
            afterSubmit: function () {
                return $("#jqGroups").jqGrid("setGridParam", {
                    datatype: "json"
                }).trigger("reloadGrid"), $("<div></div>").html("Group was successfully updated").dialog({
                    title: "Success",
                    resizable: !1,
                    modal: !0,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close")
                        }
                    }
                }), [!0, "", ""]
            },
            beforeSubmit: function (e) {
                var t = $("#jqGroups").getRowData(e.jqGroups_id);
                return e.RoleID1 = $("#ddlRoles option:selected").val(), e.UserID = t.UserID, [!0, ""]
            },
            closeAfterEdit: !0,
            closeAfterAdd: !0
        },
          c = {
              width: "500",
              beforeShowForm: function (e) {
                  e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                      var t = $("#jqGroups"),
                        d = $("#editmod" + t[0].id),
                        a = d.parent(),
                        i = d.width(),
                        o = a.width();
                      d.height(), a.height()
                  }
                  d[0].style.left = Math.round((o - i) / 2) + "px", $("#edithd" + $("#jqGroups")[0].id).addClass("cmsedit")
              },
              afterSubmit: function () {
                  return $("#jqGroups").jqGrid("setGridParam", {
                      datatype: "json"
                  }).trigger("reloadGrid"), $("<div></div>").html("Group entry was successfully created").dialog({
                      title: "Success",
                      resizable: !1,
                      modal: !0,
                      buttons: {
                          Ok: function () {
                              $(this).dialog("close")
                          }
                      }
                  }), [!0, "", ""]
              },
              beforeSubmit: function (e) {
                  var t = $("#jqGroups").getRowData(e.jqGroups_id);
                  return e.GroupID = t.GroupID, "" === e.ModifierID.trim() || "" === e.GroupName.trim() || "" === e.Description.trim() ? ($("#exec").addClass("ui-state-highlight"), [!1, "ERROR MESSAGE: Please populate all the fields"]) : [!0, ""]
              },
              closeAfterEdit: !0,
              closeAfterAdd: !0
          },
          u = {
              width: "500",
              beforeShowForm: function (e) {
                  e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                      var t = $("#jqGroups"),
                        d = $("#viewmod" + t[0].id),
                        a = d.parent(),
                        i = a.width(),
                        o = d.width();
                      d.height(), a.height()
                  }
                  d[0].style.left = Math.round((i - o) / 2) + "px", $("#viewhd" + $("#jqGroups")[0].id).addClass("cmsview")
              }
          };
        $("#jqGroups").jqGrid({
            url: "Handlers/CodeHandler.ashx?action=getGroups|",
            datatype: "json",
            loadonce: "true",
            height: "auto",
            width: $("#jqUsers").width() - 20,
            colNames: ["GroupID", "GroupName", "Description", "ModifierID", "ModifiedDT"],
            colModel: [{
                name: "GroupID",
                key: !0,
                sortable: !0,
                search: !1,
                hidden: !0,
                editable: !0
            }, {
                name: "GroupName",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "Description",
                sortable: !0,
                search: !1,
                editable: !0
            }, {
                name: "ModifierID",
                sortable: !0,
                hidden: !0,
                editable: !0,
                search: !1,
                edittype: "custom",
                addtype: "custom",
                addoptions: {
                    custom_element: t,
                    custom_value: e
                },
                editoptions: {
                    custom_element: t,
                    custom_value: e
                }
            }, {
                name: "ModifiedDT",
                sortable: !0,
                search: !1,
                editable: !0,
                hidden: !0
            }],
            editurl: "Handlers/CodeHandler.ashx?action=GroupsPut|",
            ignoreCase: !0,
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: "#pgrGroups",
            sortname: "GroupName",
            viewrecords: !0,
            sortorder: "asc",
            caption: "Edit Groups",
            hidegrid: !1,
            closeAfterEdit: !0,
            ondblClickRow: function (e) {
                $("#jqGroups").jqGrid("viewGridRow", e, u)
            },
            subGrid: !0,
            subGridRowExpanded: function (d, a) {
                var i, o, r = $("#jqGroups").getRowData(a);
                i = d + a + "_t", o = "p_" + i, $("#" + d).html("<table id='" + i + "' class='scroll'></table><div id='" + o + "' class='scroll'></div>");
                var s = {
                    width: "500",
                    beforeShowForm: function (e) {
                        e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                            var t = $("#" + i),
                              d = $("#editmod" + t[0].id),
                              a = d.parent(),
                              o = d.width(),
                              r = a.width();
                            d.height(), a.height()
                        }
                        d[0].style.left = Math.round((r - o) / 2) + "px", $("#edithd" + $("#" + i)[0].id).addClass("cmsedit")
                    },
                    afterSubmit: function () {
                        return $("#" + i).jqGrid("setGridParam", {
                            datatype: "json"
                        }).trigger("reloadGrid"), $("<div></div>").html("Lookup ID was successfully Associated with the Group: ").dialog({
                            title: "Success",
                            resizable: !1,
                            modal: !0,
                            buttons: {
                                Ok: function () {
                                    $(this).dialog("close")
                                }
                            }
                        }), [!0, "", ""]
                    },
                    beforeSubmit: function (e) {
                        var t = $("#jqGroups").getRowData(a);
                        return e.Mst_GroupID = t.GroupID, e.ModifiedBy = $(".lblUserEmail").html(), [!0, ""]
                    },
                    closeAfterEdit: !0,
                    closeAfterAdd: !0
                },
                  n = {
                      mtype: "POST",
                      reloadAfterSubmit: !0,
                      serializeDelData: function () {
                          return ""
                      },
                      width: "500",
                      beforeShowForm: function (e) {
                          e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                              var t = $("#" + i),
                                d = $("#delmod" + t[0].id),
                                a = d.parent(),
                                o = d.width(),
                                r = a.width();
                              d.height(), a.height()
                          }
                          d[0].style.left = Math.round((r - o) / 2) + "px", $("#delhd" + $("#" + i)[0].id).addClass("cmsedit")
                      },
                      onclickSubmit: function (e, t) {
                          var d = $("#jqGroups").getRowData(a);
                          e.url = "Handlers/CodeHandler.ashx?action=groupdetailsdel|" + encodeURIComponent(t) + "," + d.GroupID + "," + $(".lblUserEmail").html().replace(/ /g, "")
                      }
                  };
                jQuery("#" + i).jqGrid({
                    url: "Handlers/CodeHandler.ashx?action=getGroupDetails|" + r.GroupID,
                    datatype: "json",
                    loadonce: "true",
                    autowidth: !0,
                    shrinkToFit: !0,
                    height: "auto",
                    width: $(window).width() - 200,
                    colNames: ["LookupID", "GroupID", "ModifierID", "ModifiedDT", "LookUpName", "ModifiedBy"],
                    colModel: [{
                        name: "LookupID",
                        key: !0,
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "GroupID",
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "ModifierID",
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "ModifiedDT",
                        hidden: !0,
                        sortable: !0,
                        search: !1,
                        editable: !0
                    }, {
                        name: "LookUpName",
                        editable: !0,
                        sortable: !0,
                        search: !1,
                        edittype: "select",
                        editoptions: {
                            dataUrl: "Handlers/CodeHandler.ashx?action=getsellookup|",
                            buildSelect: function (e) {
                                var t = jQuery.parseJSON(e),
                                  d = "<select>";
                                if (t && t.length)
                                    for (var a = 0, i = t.length; i > a; a++) {
                                        var o = t[a];
                                        d += '<option value="' + o.LookupID + '">' + o.LookUpName + "</option>"
                                    }
                                return d + "</select>"
                            }
                        }
                    }, {
                        name: "ModifiedBy",
                        sortable: !0,
                        hidden: !1,
                        editable: !1,
                        search: !1,
                        edittype: "custom",
                        editoptions: {
                            custom_element: t,
                            custom_value: e
                        },
                        addtype: "custom",
                        addoptions: {
                            custom_element: t,
                            custom_value: e
                        }
                    }],
                    editurl: "Handlers/CodeHandler.ashx?action=GroupDetailsPut|",
                    rowNum: 10,
                    pager: "#" + o,
                    sortname: "ModifiedDT",
                    sortorder: "desc",
                    ondblClickRow: function (e) {
                        $("#" + i).jqGrid("viewGridRow", e, {
                            width: "500",
                            beforeShowForm: function (e) {
                                e.parent().find("#pData").hide(), e.parent().find("#nData").hide(); {
                                    var t = $("#" + i),
                                      d = $("#viewmod" + t[0].id),
                                      a = d.parent(),
                                      o = a.width(),
                                      r = d.width();
                                    d.height(), a.height()
                                }
                                d[0].style.left = Math.round((o - r) / 2) + "px", $("#viewhd" + $("#" + i)[0].id).addClass("cmsview")
                            }
                        })
                    }
                }), jQuery("#" + i).jqGrid("navGrid", "#" + o, {
                    edit: !1,
                    add: !0,
                    del: !0,
                    search: !1,
                    refresh: !1
                }, {}, s, n, {}, {})
            }
        }), $("#jqGroups").jqGrid("navGrid", "#pgrGroups", {
            view: !0,
            add: !0,
            del: !1
        }, h, c, {}, {}, u)
    })
});
