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
    public partial class ParentHomePage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadChildrenGrid();
            }
        }

        private void LoadChildrenGrid()
        {
            var client = new EyeWebServiceClient();
            gvChildern.DataSource =
                client.ListChildrenProfile(int.Parse(HttpContext.Current.Session["userId"].ToString()));
            gvChildern.DataBind();
        }

        protected void gvChildern_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType != DataControlRowType.DataRow) return;
            var strGender = Convert.ToString(DataBinder.Eval(e.Row.DataItem, "gender"));
            e.Row.Cells[2].Text = strGender == "M" ? "Male" : "Female";
            var client = new EyeWebServiceClient();

            var lblproviderId = (Label)e.Row.Cells[0].FindControl("lblproviderId");
            var usr = client.GetUserProfile(int.Parse(lblproviderId.Text));
            e.Row.Cells[3].Text = usr.lastName + ", " + usr.firstName;

        }

        protected void gvChildern_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            btnUpdate.Text = "Edit Profile";
            int rowIndex = int.Parse(e.CommandArgument.ToString());
            Label lblpatientId = (Label)gvChildern.Rows[rowIndex].Cells[0].FindControl("lblpatientId");
            dvMaster.Visible = false;
            dvDetails.Visible = true;
            PopulatePatientDetails(lblpatientId.Text);
            SetReadOnlyMode(true);
        }

        private void PopulatePatientDetails(string patientId)
        {
            var client = new EyeWebServiceClient();
            var child = client.GetPatientProfile(int.Parse(patientId));
            txtFName.Text = child.firstName;
            txtLName.Text = child.lastName;
            txtDob.Text = DateTime.Parse(child.dob).ToShortDateString();
            hdnPatientId.Value = child.patientId.ToString();
            hdnParentId.Value = child.parentId.ToString();
            hdnProviderId.Value = child.providerId.ToString();
            txtGender.Text = child.gender == "M" ? "Male" : "Female";
            var usr = client.GetUserProfile(child.providerId);
            txtProviderName.Text = usr.lastName + ", " + usr.firstName;
        }



        protected void UpdateChildProfile(object sender, EventArgs e)
        {
            if (btnUpdate.Text.Contains("Edit"))
            {
                btnUpdate.Text = "Update Profile";
                SetReadOnlyMode(false);
                var client = new EyeWebServiceClient();
                var provList = client.ListAllProviderProfile();
                ddlProviderName.Items.Clear();
                ddlProviderName.Items.Add(new ListItem
                {
                    Value = 0.ToString(),
                    Text = "Select"
                });
                foreach (var prov in provList)
                {
                    ddlProviderName.Items.Add(new ListItem
                    {
                        Value = prov.userId.ToString(),
                        Text = prov.lastName + ", " + prov.firstName
                    });
                }
            }
            else if (btnUpdate.Text.Contains("Update"))
            {
                SetReadOnlyMode(true);
                btnUpdate.Text = "Edit Profile";
                var patient = new Patient
                {
                    firstName = txtFName.Text,
                    lastName = txtLName.Text,
                    patientId = int.Parse(hdnPatientId.Value),
                    parentId = int.Parse(hdnParentId.Value),
                    dob = txtDob.Text,
                    gender = ddlGender.SelectedValue,
                    providerId = int.Parse(ddlProviderName.SelectedValue)
                };
                var client = new EyeWebServiceClient();
                var ss = client.SetChildProfile(patient);
                PopulatePatientDetails(patient.patientId.ToString());
            }
            else
            {
                CreateChildProfile();
            }
        }


        protected void CreateChildProfile()
        {
            var patient = new Patient
            {
                firstName = txtFName.Text,
                lastName = txtLName.Text,
                patientId = 0,
                parentId = int.Parse(HttpContext.Current.Session["userId"].ToString()),
                dob = txtDob.Text,
                gender = ddlGender.SelectedValue,
                providerId = int.Parse(ddlProviderName.SelectedValue)
            };
            var client = new EyeWebServiceClient();
            var childProfile = client.SetChildProfile(patient);
            //PopulatePatientDetails(childProfile.patientId.ToString());
            LoadChildrenGrid();
            dvDetails.Visible = false;
            dvMaster.Visible = true;
        }

        private void SetReadOnlyMode(bool isReadOnly)
        {
            txtFName.ReadOnly = isReadOnly;
            txtLName.ReadOnly = isReadOnly;
            txtDob.ReadOnly = isReadOnly;
            ddlGender.Visible = !isReadOnly;
            txtGender.ReadOnly = isReadOnly;
            txtProviderName.Visible = isReadOnly;
            ddlProviderName.Visible = !isReadOnly;
            txtGender.Visible = isReadOnly;
            //btnDelete.Visible = !isReadOnly;
        }

        protected void Cancel(object sender, EventArgs e)
        {
            dvMaster.Visible = true;
            dvDetails.Visible = false;
            LoadChildrenGrid();
        }

        protected void AddPatientProfile(object sender, EventArgs e)
        {
            SetReadOnlyMode(false);
            dvMaster.Visible = false;
            dvDetails.Visible = true;
            txtFName.Text = "";
            txtLName.Text = "";
            txtDob.Text = "";
            ddlProviderName.SelectedValue = 0.ToString();
            ddlGender.SelectedValue = 0.ToString();
            //btnDelete.Visible = false;
            var client = new EyeWebServiceClient();
            var provList = client.ListAllProviderProfile();
            btnUpdate.Text = "Create Profile";
            ddlProviderName.Items.Clear();
            ddlProviderName.Items.Add(new ListItem
            {
                Value = 0.ToString(),
                Text = "Select"
            });
            foreach (var prov in provList)
            {
                ddlProviderName.Items.Add(new ListItem
                {
                    Value = prov.userId.ToString(),
                    Text = prov.lastName + ", " + prov.firstName
                });
            }
        }


    }
}