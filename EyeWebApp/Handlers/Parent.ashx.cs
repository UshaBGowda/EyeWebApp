﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
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

    class GridProperties<T>
    {
        public List<T> rows { get; set; }
        public int records { get; set; }
        public int total { get; set; }

        public int page { get; set; }
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

            string[] qryStr = request.QueryString[0].ToString().ToLower().Split('|');
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
                     
            List<Patient> patients=
                client.ListChildrenProfile(int.Parse(HttpContext.Current.Session["userId"].ToString()));
                    output =JsonConvert.SerializeObject(new GridProperties<Patient>
                        {
                            rows = patients,
                            records = Convert.ToInt32(numberOfRows),
                            total = (patients.Count + Convert.ToInt32(numberOfRows) - 1)/Convert.ToInt32(numberOfRows),
                            page = Convert.ToInt32(pageIndex)

                        });
                    break;
                case "putchildren":
                    XElement LookUp = new XElement("LookUp");
                            if (context.Request.RequestType.ToString().ToLower() == "post")
                            {
                                string[] keys = context.Request.Form.AllKeys;
                                for (int i = 0; i < keys.Length; i++)
                                {
                                    LookUp.Add(new XElement(keys[i],context.Request.Form[(keys[i])].ToString()));
                                }
                            }
                    string str = LookUp.ToString();

                    break;
                case "getproviders":
                    
                    var provList = client.ListAllProviderProfile();
                               
                                output = new JavaScriptSerializer().Serialize(provList);
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