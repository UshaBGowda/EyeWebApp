$(document).ready(function () {
    $("#tabs").tabs();
    var dates = [];
    var scores = [];
    var gridWidth = $("#dvMaster").width();
    var dvGameAssign = $("#dvGameAssign");
    var dvGameScore = $("#dvGameScore");
    var dvGameChart = $("#dvGameChart");
    // dvGameChart.width = gridWidth - 50;
    dvGameScore.hide();

    function clearCanvas(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var w = canvas.width;
        canvas.width = 1;
        canvas.width = w;
        context.beginPath();
    }

    var initDateEdit = function (elem) {
        setTimeout(function () {
            $(elem).datepicker({
                autoSize: true,
                changeYear: true,
                changeMonth: true,
                showButtonPanel: false,
                showWeek: false,
                minDate: 0,
                yearRange: "-100:+0"
            });
        }, 100);
    };

    ////$("#btnBack").click(function () {
    ////   dates = [];
    ////   scores = [];
    ////  //  $("#jQGameScore").jqGrid("clearGridData");
    ////  //  clearCanvas( $("#chrtGameScore").get(0).getContext("2d"), $("#chrtGameScore"));
    ////    dvGameScore.hide();
    ////    dvGameAssign.show();
    ////});

    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function getGameScores(varPatientId,varGameId,varLevel) 
    {
        $.ajax({
            url: "Handlers/PatientDetails.ashx?action=getGameScore|" + varPatientId + "|" + varGameId + "|" + varLevel,
            async: false,
            type: "GET",
            dataType: "json",
            success: function(resultdata) {
                //return resultdata;
                for (var i = 0; i < resultdata.length; i++) {
                    scores.push(((resultdata[i].score) / (resultdata[i].durationInMin)).toFixed(2));
                    var strdate = new Date(resultdata[i].datePlayed);
                    //dates.push(resultdata[i].datePlayed);
                    dates.push((strdate.getMonth() + 1) + "/" + (strdate.getDay() + 1));
                }
                return "Success";
            },
            error: function(error) {
                return "error";
            }
        });

                
    }

   
    $("#jQTherapy").jqGrid({
        url: "Handlers/PatientDetails.ashx?action=getTherapy|"+getUrlVars()["id"],
        datatype: "json",
        shrinkToFit: true,
        loadonce: true,
        height: "auto",
        width: gridWidth - 100,
        colNames: ["patientId","therapyId", "Therapy Name", "Therapy","Therapy Description", "gameId", "Game Name","Game", "Game Description",
            "Level","Start Date", "End Date"],
        colModel: [
            { name: "patientId", search: false, hidden: true, editable: true, editrules: { edithidden: false }, editoptions: { defaultValue: getUrlVars()["id"] } },
            { name: "therapyId", search: false, hidden: true, editable: false, editrules: { edithidden: false } },
            { name: "therapyName", search: true, hidden: false, editable: false, editrules: { edithidden: true } },
            {
                name: "therapyDdl",
                editable: true,
                sortable: false,
                search: false,
                hidden: true,
                edittype: "select",
                editrules: { edithidden: true },
                editoptions: {
                    dataUrl: "Handlers/PatientDetails.ashx?action=listTherapies|",
                    dataEvents: [
                        {
                            type: "change",
                            fn: function(e) {
                                var thisval = $(e.target).val();
                                $.get('Handlers/PatientDetails.ashx?action=listgamesfortherapy|' + thisval, function(data) {
                                    var t = jQuery.parseJSON(data),
                                    d = "<select>";
                                    if (t && t.length)
                                        for (var a = 0, i = t.length; i > a; a++) {
                                            var o = t[a];
                                            d += '<option value="' + o.gameId + '">' + o.gameName + "</option>";
                                        }
                                     

                                    $("#gamesDdl").html(d + "</select>");
                                }); // end get
                            } //end func
                        } // end type
                    ],
                    buildSelect: function(e) {
                        var t = jQuery.parseJSON(e),
                            d = "<select>";
                        if (t && t.length)
                            for (var a = 0, i = t.length; i > a; a++) {
                                var o = t[a];
                                d += '<option value="' + o.therapyId + '">' + o.therapyName + "</option>";
                            }
                        return d + "</select>";
                    }

                    
                }
            },
            { name: "therapyDescription", search: false, hidden: true, editable: true, editrules: { edithidden: false } },
            { name: "gameId", search: false, hidden: true, editable: true, editrules: { edithidden: false } },
            { name: "gameName", search: true, hidden: false, editable: false, editrules: { edithidden: false } },
             {
                 name: "gamesDdl",
                 editable: true,
                 sortable: false,
                 search: false,
                 hidden: true,
                 edittype: "select",
                 editrules: { edithidden: true }
                 ,
                 editoptions: {
                     dataUrl: "Handlers/PatientDetails.ashx?action=listgamesfortherapy|0",
                     buildSelect: function (e) {
                         var t = jQuery.parseJSON(e),
                             d = "<select>";
                         if (t && t.length)
                             for (var a = 0, i = t.length; i > a; a++) {
                                 var o = t[a];
                                 d += '<option value="' + o.gameId + '">' + o.gameName + "</option>";
                             }
                         return d + "</select>";
                     }
                 }
             },
            { name: "gameDescription", search: false, hidden: true, editable: true, editrules: { edithidden: false } },          
            { name: "level", search: true, hidden: false, editable: true },
            { name: "startDate", search: true, hidden: false, editable: true, editoptions: {
        dataInit: initDateEdit,
        readonly: "readonly"
            }},
            {
                name: "endDate", search: true, hidden: false, editable: true, editoptions: {
                    dataInit: initDateEdit,
                    readonly: "readonly"
                }
            }
        ],
        editurl: "Handlers/PatientDetails.ashx?action=assignGame|",
        search: true,
        pager: '#pgrTherapy',
        jsonReader: { cell: "" },
        rowNum: 10,
        rowList: [5, 10, 20, 50],
        sortname: 'gameId',
        sortorder: 'asc',
        viewrecords: true,
        caption: "Game Assignments"
    });
    $("#jQTherapy").jqGrid('navGrid', '#pgrTherapy', { add: true, edit: false, del: true, search: true, refresh: true },
    {}, {},  {delData: {
        gameId: function() {
            var selId = $("#jQTherapy").jqGrid('getGridParam', 'selrow');
            var value = $("#jQTherapy").jqGrid('getCell', selId, 'gameId');
            return value;
        },
        patientId: function () {
            var selId = $("#jQTherapy").jqGrid('getGridParam', 'selrow');
            var value = $("#jQTherapy").jqGrid('getCell', selId, 'patientId');
            return value;
        },
        level: function () {
            var selId = $("#jQTherapy").jqGrid('getGridParam', 'selrow');
            var value = $("#jQTherapy").jqGrid('getCell', selId, 'level');
            return value;
        },
        startDate: function () {
            var selId = $("#jQTherapy").jqGrid('getGridParam', 'selrow');
            var value = $("#jQTherapy").jqGrid('getCell', selId, 'startDate');
            return value;
        },
        endDate: function () {
            var selId = $("#jQTherapy").jqGrid('getGridParam', 'selrow');
            var value = $("#jQTherapy").jqGrid('getCell', selId, 'endDate');
            return value;
        }
    }},{},{
        multipleSearch: false,
        multipleGroup: false,
        showQuery: false
    }).jqGrid("navButtonAdd", "#pgrTherapy",
    {
        caption: "View score"/*"Show"*/, buttonicon: "ui-icon-extlink", title: "Show Score",
        onClickButton: function () {
            dvGameAssign.hide();
            dvGameScore.show();
            var grid = $("#jQTherapy");
            var rowid = grid.jqGrid('getGridParam', "selrow");
            //show chart
            var varPatientId =  getUrlVars()["id"] ;
            var varGameId = grid.jqGrid("getCell", rowid, "gameId") ;
            var varLevel = grid.jqGrid("getCell", rowid, "level");

            var ctx = $("#chrtGameScore").get(0).getContext("2d");
            // This will get the first returned node in the jQuery collection.
           
            var result = getGameScores(varPatientId,varGameId,varLevel);
            // var jsonresult = $.parseJSON(result);
          
            var data = {
                labels: dates,
                datasets: [
                    {
                        label: "Game score",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: scores
                    }
                ]
            };
            //var ctx = document.getElementById("chrtGameScore").getContext("2d");
            Chart.types.Line.extend({
                name: "LineAlt",
                draw: function () {
                    Chart.types.Line.prototype.draw.apply(this, arguments);

                    var ctx1 = this.chart.ctx;
                    ctx1.save();
                    // text alignment and color
                    ctx1.textAlign = "center";
                    ctx1.textBaseline = "bottom";
                    ctx1.fillStyle = this.options.scaleFontColor;
                    // position
                    var x = this.scale.xScalePaddingLeft * 0.4;
                    var y = this.chart.height / 2;
                    // change origin
                    ctx1.translate(x, y);
                    // rotate text
                    ctx1.rotate(-90 * Math.PI / 180);
                    ctx1.fillText(this.datasets[0].label, 0, 0);
                    ctx1.restore();
                }
            });

            
            var myLineChart = new Chart(ctx).LineAlt(data, {
                // make enough space on the right side of the graph
                scaleLabel: "          <%=value%>",
                responsive: true,
                maintainAspectRatio: false
            });
            
            //show grid
           
            $("#jQGameScore").jqGrid({
                url: "Handlers/PatientDetails.ashx?action=getGameScore|" + getUrlVars()["id"] + "|" + grid.jqGrid('getCell', rowid, 'gameId') + "|" + grid.jqGrid('getCell', rowid, 'level'),
                datatype: "json",
                shrinkToFit: true,
                loadonce: true,
                height: "auto",
                width: gridWidth - 100,
                colNames: ["Game Name", "Level Played", "Date Played", "Duration in min", "Score"],
                colModel: [
                    { name: "gameName", search: false, hidden: true, editable: false },
                    { name: "level", search: false, hidden: true, editable: false },
                    { name: "datePlayed", search: false, hidden: false, editable: false },
                    { name: "durationInMin", search: false, hidden: false, editable: false },
                    { name: "score", search: false, hidden: false, editable: false }
                ],
                search: true,
                pager: '#pgrGameScore',
                jsonReader: { cell: "" },
                rowNum: 10,
                rowList: [5, 10, 20, 50],
                sortname: 'patientId',
                sortorder: 'asc',
                viewrecords: true,
                caption: "Game Scores For : " + grid.jqGrid('getCell', rowid, 'gameName')
        });
            $("#jQGameScore").jqGrid('navGrid', '#pgrGameScore', { add: false, edit: false, del: false, search: false, refresh: true },
            {}, {}, {}, {
                multipleSearch: false,
                multipleGroup: false,
                showQuery: false
            });
            jQuery("#refresh_jQGameScore").click(function () {
                jQuery("#jQGameScore").setGridParam({ datatype: 'json' });
                jQuery("#jQGameScore").trigger("reloadGrid");
            });

        }
    });;
    jQuery("#refresh_jQTherapy").click(function () {
        jQuery("#jQTherapy").setGridParam({ datatype: 'json' });
        jQuery("#jQTherapy").trigger("reloadGrid");
    });




   
});