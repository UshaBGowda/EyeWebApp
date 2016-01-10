using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EyeWebApp.EyeWebService;

namespace EyeWebApp
{
    public partial class ProviderHomePage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadPatientsGrid();
            }
        }

        private void LoadPatientsGrid()
        {
            var client = new EyeWebServiceClient();
            gvPatients.DataSource =
                client.ListPatientsProfile(int.Parse(HttpContext.Current.Session["userId"].ToString()));
            gvPatients.DataBind();
        }


        protected void gvPatients_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType != DataControlRowType.DataRow) return;
            var strGender = Convert.ToString(DataBinder.Eval(e.Row.DataItem, "gender"));
            e.Row.Cells[2].Text = strGender == "M" ? "Male" : "Female";
            var client = new EyeWebServiceClient();

            var lblproviderId = (Label)e.Row.Cells[0].FindControl("lblparentId");
            var usr = client.GetUserProfile(int.Parse(lblproviderId.Text));
            e.Row.Cells[3].Text = usr.lastName + ", " + usr.firstName;

        }

        protected void gvPatients_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int rowIndex = int.Parse(e.CommandArgument.ToString());
            Label lblpatientId = (Label)gvPatients.Rows[rowIndex].Cells[0].FindControl("lblpatientId");
            PopulatePatientDetails(lblpatientId.Text);
        }

        private void PopulatePatientDetails(string patientId)
        {
            var client = new EyeWebServiceClient();
            var child = client.GetPatientProfile(int.Parse(patientId));
            dvMaster.Visible = false;
            dvDetails.Visible = true;
            txtFName.Text = child.firstName;
            txtLName.Text = child.lastName;
            txtDob.Text = DateTime.Parse(child.dob).ToShortDateString();
            hdnPatientId.Value = child.patientId.ToString();
            hdnParentId.Value = child.parentId.ToString();
            txtGender.Text = child.gender == "M" ? "Male" : "Female";
            var usr = client.GetUserProfile(child.parentId);
            txtParentName.Text = usr.lastName + ", " + usr.firstName;

        }

        protected void GoBack(object sender, EventArgs e)
        {
            dvMaster.Visible = true;
            dvDetails.Visible = false;
            LoadPatientsGrid();
        }
    }
}