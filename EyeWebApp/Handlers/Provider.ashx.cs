using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.SessionState;
using System.Xml.Linq;
using EyeWebApp.EyeWebService;
using Newtonsoft.Json;

namespace EyeWebApp.Handlers
{
    /// <summary>
    /// Summary description for Provider
    /// </summary>
    /// <summary>
    /// Summary description for Parent
    /// </summary>
    public class Provider : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            HttpRequest request = context.Request;
            string[] qryStr = request.QueryString[0].ToLower().Split('|');
            HttpResponse response = context.Response;

            string numberOfRows = request["rows"];
            string pageIndex = request["page"];
            string sortColumnName = request["sidx"];
            string sortOrderBy = request["sord"];
            int totalRecords;
            string output = "";
            var client = new EyeWebServiceClient();
            switch (qryStr[0].ToLower())
            {
                case "getpatients":

                    var patients =
                        client.ListPatientsProfile(int.Parse(HttpContext.Current.Session["userId"].ToString()));
                    List<Dictionary<String, Object>> tableRowsPatients = new List<Dictionary<String, Object>>();
                    foreach (var dr in patients)
                    {
                        var rowPatients = new Dictionary<String, Object>();
                        rowPatients["patientId"] = dr.patientId;
                        rowPatients["parentId"] = dr.parentId;
                        rowPatients["providerId"] = dr.providerId;
                        rowPatients["firstName"] = dr.firstName;
                        rowPatients["lastName"] = dr.lastName;
                        rowPatients["dob"] = dr.dob;
                        rowPatients["gender"] = dr.gender;
                        var parentProfile = client.GetUserProfile(dr.parentId);
                        rowPatients["parentName"] = parentProfile.firstName + " " + parentProfile.lastName;
                        tableRowsPatients.Add(rowPatients);
                    }
                    output = new JavaScriptSerializer().Serialize(tableRowsPatients);
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