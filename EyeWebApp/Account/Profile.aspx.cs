using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using EyeWebApp.EyeWebService;

namespace EyeWebApp.Account
{
    public partial class Profile : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session["loginId"] != null)
            {
                if (!IsPostBack)
                {
                    if (HttpContext.Current.Session["userId"] != null)
                    {
                        PopulateFields();
                        SetVisibility(false);
                    }
                    else
                    {
                        SetVisibility(true);
                    }
                }
            }
            else
            {
                IdentityHelper.RedirectToReturnUrl("~/account/login.aspx", Response);
            }
        }
        //TODO: complete the method
        private void PopulateFields()
        {
            var client = new EyeWebServiceClient();
            var usrLoad = client.GetUserProfile(int.Parse(HttpContext.Current.Session["userId"].ToString()));
            txtFName.Text = usrLoad.firstName;
            txtLName.Text = usrLoad.lastName;
            txtDOB.Text = usrLoad.dob;
            ddlGender.SelectedValue = usrLoad.gender;
            ddlUserType.SelectedValue = usrLoad.userTypeId.ToString();

            List<Address> addressList = usrLoad.addressList;

            foreach(Address add in addressList)
            {
                if (add.addressType == "Home")
                {
                    txtHomeStreetName.Text = add.streetName;
                    txtHomeCity.Text = add.city;
                    txtHomeState.Text = add.stateName;
                    txtHomeCountry.Text = add.country;
                    txtHomeZip.Text = add.zipcode;
                    txtHomePhoneNumber.Text = add.phoneNo;

                }
                else if (add.addressType == "Office")
                {
                    txtOFCStreetName.Text = add.streetName;
                    txtOFCCity.Text = add.city;
                    txtOFCState.Text = add.stateName;
                    txtOFCCountry.Text = add.country;
                    txtOFCZip.Text = add.zipcode;
                    txtOFCPhoneNumber.Text = add.phoneNo;

                }
            }

        }
        //TODO: complete the method
       private void SetVisibility(bool visible)
       {
           txtFName.Enabled = visible;
           txtLName.Enabled = visible;
           txtDOB.Enabled = visible;
           ddlGender.Enabled = visible;
           ddlUserType.Enabled = visible;
           txtHomeStreetName.Enabled = visible;
           txtHomeCity.Enabled = visible;
           txtHomeState.Enabled = visible;
           txtHomeCountry.Enabled = visible;
           txtHomeZip.Enabled = visible;
           txtHomePhoneNumber.Enabled = visible;
           txtOFCStreetName.Enabled = visible;
           txtOFCCity.Enabled = visible;
           txtOFCState.Enabled = visible;
           txtOFCCountry.Enabled = visible;
           txtOFCZip.Enabled = visible;
           txtOFCPhoneNumber.Enabled = visible;
       }

        protected void ProfileEditButtonClick(object sender,EventArgs e)
       {
           PopulateFields();
           SetVisibility(true);
            ddlUserType.Enabled = false;
       }
        protected void ProfileSubmitButtonClick(object sender, EventArgs e)
        {
            var client = new EyeWebServiceClient();
            var addList = new List<Address>();
          
            var newUser = new user();

            if (txtHomeStreetName.Text!="")
            {
                var add = new Address
                {
                    addressType = "Home",
                    streetName = txtHomeStreetName.Text,
                    city = txtHomeCity.Text,
                    stateName = txtHomeState.Text,
                    country = txtHomeCountry.Text,
                    zipcode = txtHomeZip.Text,
                    phoneNo = txtHomePhoneNumber.Text
                };
                addList.Add(add);
            }

            if (txtOFCStreetName.Text != "")
            {
                var add1 = new Address
                {
                    addressType ="Office",
                    streetName = txtOFCStreetName.Text,
                    city = txtOFCCity.Text,
                    stateName = txtOFCState.Text,
                    country = txtOFCCountry.Text,
                    zipcode = txtOFCZip.Text,
                    phoneNo = txtOFCPhoneNumber.Text
                };
                addList.Add(add1);
            }
            if (HttpContext.Current.Session["userId"] != null)
                newUser.userId = int.Parse(HttpContext.Current.Session["userId"].ToString());

            newUser.firstName = txtFName.Text;
            newUser.lastName = txtLName.Text;
            newUser.dob = txtDOB.Text;
            newUser.gender = ddlGender.SelectedValue;
            newUser.userTypeId = int.Parse(ddlUserType.SelectedValue);
            newUser.loginId = HttpContext.Current.Session["loginId"].ToString();
            newUser.addressList = addList;

            var success = client.SetProfile(newUser);

            if (success)
            {
                HttpContext.Current.Session["userId"] = client.GetUserId(newUser.loginId);
                HttpContext.Current.Session["userTypeId"] = newUser.userTypeId;

                IdentityHelper.RedirectToReturnUrl(
                    newUser.userTypeId == 1 ? "~/ProviderHomePage.aspx" : "~/ParentHomePage.aspx", Response);
            }
        }
    }
}