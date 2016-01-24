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
    partial class GridProperties<T>
    {
        public List<T> Rows { get; set; }
        public int Records { get; set; }
        public int Total { get; set; }

        public int Page { get; set; }
    }

    /// <summary>
    /// Summary description for Parent
    /// </summary>
    public class Parent : IHttpHandler, IRequiresSessionState
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
                case "getchildren":
                     
            var patients=
                client.ListChildrenProfile(int.Parse(HttpContext.Current.Session["userId"].ToString()));
            List<Dictionary<String, Object>> tableRowsChildren = new List<Dictionary<String, Object>>();
                    Dictionary<String, Object> rowChildren;
                    foreach (var dr in patients)
                    {
                        rowChildren = new Dictionary<String, Object>();
                        rowChildren["patientId"] = dr.patientId;
                        rowChildren["parentId"] = dr.parentId;
                        rowChildren["providerId"] = dr.providerId;
                        rowChildren["firstName"] = dr.firstName;
                        rowChildren["lastName"] = dr.lastName;
                        rowChildren["dob"] = dr.dob;
                        rowChildren["gender"] = dr.gender;
                        var providerProfile = client.GetUserProfile(dr.providerId);
                        rowChildren["providerName"] = providerProfile.firstName+" "+providerProfile.lastName;
                        tableRowsChildren.Add(rowChildren);
                    }
                    output = new JavaScriptSerializer().Serialize(tableRowsChildren);

                    
                    /*
                    output =JsonConvert.SerializeObject(new GridProperties<Patient>
                        {
                            rows = patients,
                            records = Convert.ToInt32(numberOfRows),
                            total = (patients.Count + Convert.ToInt32(numberOfRows) - 1)/Convert.ToInt32(numberOfRows),
                            page = Convert.ToInt32(pageIndex)

                        });*/
                    break;
                case "editchildren":
                    XElement patientEntity = new XElement("patientEntity");
                            if (context.Request.RequestType.ToString().ToLower() == "post")
                            {
                                string[] keys = context.Request.Form.AllKeys;
                                for (int i = 0; i < keys.Length; i++)
                                {
                                    patientEntity.Add(new XElement(keys[i],context.Request.Form[(keys[i])].ToString()));
                                }
                            }
                            if ((string)patientEntity.Element("oper") == "edit")
                            {
                                Patient editPatient = new Patient
                                {
                                    patientId = (int)patientEntity.Element("patientId"),
                                    parentId = (int)patientEntity.Element("parentId"),
                                    providerId = (int)patientEntity.Element("providerNameDdl"),
                                    firstName = (string)patientEntity.Element("firstName"),
                                    lastName = (string)patientEntity.Element("lastName"),
                                    gender = (string)patientEntity.Element("genderDdl"),
                                    dob = (string)patientEntity.Element("dob")
                                };
                                client.SetChildProfile(editPatient);
                            }
                            else
                            {
                                Patient newPatient = new Patient
                                {
                                    parentId = int.Parse(HttpContext.Current.Session["userId"].ToString()),
                                    providerId = (int)patientEntity.Element("providerNameDdl"),
                                    firstName = (string)patientEntity.Element("firstName"),
                                    lastName = (string)patientEntity.Element("lastName"),
                                    gender = (string)patientEntity.Element("genderDdl") ,
                                    dob = (string)patientEntity.Element("dob")
                                };
                                client.SetChildProfile(newPatient);
                            }
                    break;
                case "getproviders":
                    
                    var provList = client.ListAllProviderProfile();
                    output = new JavaScriptSerializer().Serialize(provList);
                    break;
                case "getgenders":

                    var dt = new DataTable();
                    dt.Columns.Add(new DataColumn
                    {
                        ColumnName = "genderId"

                    });
                    dt.Columns.Add(new DataColumn
                    {
                        ColumnName = "gender"
                    });
                    DataRow drM = dt.NewRow();
                    drM["genderId"] = "M";
                    drM["gender"] = "Male";
                    dt.Rows.Add(drM);
                    
                    DataRow drF = dt.NewRow();
                    drF["genderId"] = "F";
                    drF["gender"] = "Female";
                    dt.Rows.Add(drF);

                    DataRow drN = dt.NewRow();
                    drN["genderId"] = "N";
                    drN["gender"] = "Not specified";
                    dt.Rows.Add(drN);

                    List<Dictionary<String, Object>> tableRows = new List<Dictionary<String, Object>>();
                    Dictionary<String, Object> row;
                    foreach (DataRow dr in dt.Rows)
                    {
                        row = new Dictionary<String, Object>();
                        foreach (DataColumn col in dt.Columns)
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                        tableRows.Add(row);
                    }
                    output = new JavaScriptSerializer().Serialize(tableRows);
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