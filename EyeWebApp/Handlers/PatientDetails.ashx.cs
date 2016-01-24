using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Xml.Linq;
using EyeWebApp.EyeWebService;

namespace EyeWebApp.Handlers
{
    /// <summary>
    /// Summary description for PatientDetails
    /// </summary>
    public class PatientDetails : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest request = context.Request;
            string errMsg = "";

            string[] qryStr = request.QueryString[0].ToLower().Split('|');
            HttpResponse response = context.Response;

            string _search = request["_search"];
            string numberOfRows = request["rows"];
            string pageIndex = request["page"];
            string sortColumnName = request["sidx"];
            string sortOrderBy = request["sord"];
            int totalRecords;
            string output = "";
            var client = new EyeWebServiceClient();
            switch (qryStr[0].ToLower())
            {
                case "gettherapy":

                     PatientGames patientGame=
                client.ListGameAssignment(int.Parse(qryStr[1]));
            List<Dictionary<String, Object>> tableRowsPatientGames = new List<Dictionary<String, Object>>();
                    foreach (var dr in patientGame.gameAssignments)
                    {
                        var rowPatientGames = new Dictionary<String, Object>();

                        rowPatientGames["patientId"] = patientGame.patientId;
                        rowPatientGames["gameId"] = dr.game.gameId;
                        rowPatientGames["gameName"] = dr.game.gameName;
                        rowPatientGames["gameDescription"] = dr.game.gameDescription;
                        rowPatientGames["therapyId"] = dr.game.therapy.therapyId;
                        rowPatientGames["therapyName"] = dr.game.therapy.therapyName;
                        rowPatientGames["therapyDescription"] = dr.game.therapy.therapyDescription;
                        rowPatientGames["level"] = dr.level;
                        rowPatientGames["endDate"] = dr.endDate;
                        rowPatientGames["startDate"] = dr.startDate;
                        tableRowsPatientGames.Add(rowPatientGames);
                    }
                    output = new JavaScriptSerializer().Serialize(tableRowsPatientGames);

                    break;

                case "listtherapies":
                    List<Therapy> therapies = client.ListAllTherapy();
                    List<Dictionary<String, Object>> tableRowsTherapiesList = new List<Dictionary<String, Object>>();
                    var defaultTherapy = new Dictionary<String, Object>();
                    defaultTherapy["therapyId"] = "0";
                    defaultTherapy["therapyName"] = "Select";
                        tableRowsTherapiesList.Add(defaultTherapy);
                    foreach (var dr in therapies)
                    {
                        var rowTherapy = new Dictionary<String, Object>();
                        rowTherapy["therapyId"] = dr.therapyId;
                        rowTherapy["therapyName"] = dr.therapyName;
                        tableRowsTherapiesList.Add(rowTherapy);
                    }
                    output = new JavaScriptSerializer().Serialize(tableRowsTherapiesList);

                    break;
                case "listgamesfortherapy":
                    List<Dictionary<String, Object>> tableRowsGamesList = new List<Dictionary<String, Object>>();
                    if (int.Parse(qryStr[1]) == 0)
                    {
                        var rowGame = new Dictionary<String, Object>();
                        rowGame["gameId"] = "0";
                        rowGame["gameName"] = "Select";
                        tableRowsGamesList.Add(rowGame);
                    }
                    else
                    {
                        List<Game> games = client.ListAllGamesForTherapy(int.Parse(qryStr[1]));
                        foreach (var dr in games)
                        {
                            var rowGame = new Dictionary<String, Object>();
                            rowGame["gameId"] = dr.gameId;
                            rowGame["gameName"] = dr.gameName;
                            tableRowsGamesList.Add(rowGame);
                        }
                    }
                    output = new JavaScriptSerializer().Serialize(tableRowsGamesList);
                    break;

                case "assigngame":
                    XElement gameAssignmentEntity = new XElement("gameAssignmentEntity");
                            if (context.Request.RequestType.ToString().ToLower() == "post")
                            {
                                string[] keys = context.Request.Form.AllKeys;
                                for (int i = 0; i < keys.Length; i++)
                                {
                                    gameAssignmentEntity.Add(new XElement(keys[i],context.Request.Form[(keys[i])].ToString()));
                                }
                            }
                    PatientGames patientGames = new PatientGames
                    {
                        patientId = (int)gameAssignmentEntity.Element("patientId"),
                        gameAssignments = new List<GameAssignment>()
                    };
                    if ((string) gameAssignmentEntity.Element("oper") == "del")
                    {
                        GameAssignment gameAssignment = new GameAssignment
                        {

                            level = (int)gameAssignmentEntity.Element("level"),
                            startDate = (string)gameAssignmentEntity.Element("startDate"),
                            endDate = (string)gameAssignmentEntity.Element("endDate"),
                            game = new Game
                            {
                                gameId = (int)gameAssignmentEntity.Element("gameId")
                            }
                        };
                        patientGames.gameAssignments.Add(gameAssignment);
                        output = client.DeleteGameAssignment(patientGames).ToString();
                    }
                    else
                    {
                        GameAssignment gameAssignment = new GameAssignment
                        {

                            level = (int) gameAssignmentEntity.Element("level"),
                            startDate = (string) gameAssignmentEntity.Element("startDate"),
                            endDate = (string) gameAssignmentEntity.Element("endDate"),
                            game = new Game
                            {
                                gameId = (int) gameAssignmentEntity.Element("gamesDdl")
                            }
                        };
                        patientGames.gameAssignments.Add(gameAssignment);
                        output = client.SetGameAssignment(patientGames).ToString();
                    }
                    break;
                case "getgamescore":
                    PatientGameScore patientGameScore = new PatientGameScore
                    {
                        patientId = int.Parse(qryStr[1]),
                        level = int.Parse(qryStr[3]),
                        game = new Game
                        {
                            gameId = int.Parse(qryStr[2])
                        }
                    };
                    PatientGameScore resPatGameScore = client.ListGameScoresForPatient(patientGameScore);
                    List<Dictionary<String, Object>> tableRowGameScores = new List<Dictionary<String, Object>>();
                     foreach (var dr in resPatGameScore.gameScoreList)
                    {
                        var rowGameScore = new Dictionary<String, Object>();
                        rowGameScore["gameName"] = resPatGameScore.game.gameName;
                        rowGameScore["level"] = resPatGameScore.level;
                        rowGameScore["datePlayed"] = dr.datePlayed;
                        rowGameScore["durationInMin"] = dr.durationInMin.TotalMinutes.ToString();
                        rowGameScore["score"] = dr.score;
                        tableRowGameScores.Add(rowGameScore);
                    }
                    output = new JavaScriptSerializer().Serialize(tableRowGameScores);
                    break;

            }
            response.Write(output);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}