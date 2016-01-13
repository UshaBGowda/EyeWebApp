using System;
using System.Web;
using System.Web.UI;
using EyeWebApp.EyeWebService;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace EyeWebApp.Account
{
    public partial class Login : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            RegisterHyperLink.NavigateUrl = "Register";
            // Enable this once you have account confirmation enabled for password reset functionality
            //ForgotPasswordHyperLink.NavigateUrl = "Forgot";
           // OpenAuthLogin.ReturnUrl = Request.QueryString["ReturnUrl"];
            var returnUrl = HttpUtility.UrlEncode(Request.QueryString["ReturnUrl"]);
            if (!String.IsNullOrEmpty(returnUrl))
            {
                RegisterHyperLink.NavigateUrl += "?ReturnUrl=" + returnUrl;
            }
        }

        protected void LogIn(object sender, EventArgs e)
        {
            if (IsValid)
            {
                // Validate the user password
                var manager = Context.GetOwinContext().GetUserManager<ApplicationUserManager>();
                var signinManager = Context.GetOwinContext().GetUserManager<ApplicationSignInManager>();

                // This doen't count login failures towards account lockout
                // To enable password failures to trigger lockout, change to shouldLockout: true
                var result = signinManager.PasswordSignIn(Email.Text, Password.Text, RememberMe.Checked, false);

                switch (result)
                {
                        
                    case SignInStatus.Success:
                        var client = new EyeWebServiceClient();
                        HttpContext.Current.Session["loginId"] = signinManager.UserManager.FindByEmail(Email.Text).Id;
                        HttpContext.Current.Session["userId"] = client.GetUserId(HttpContext.Current.Session["loginId"].ToString());
                        HttpContext.Current.Session["userTypeId"] = client.GetUserTypeId(int.Parse(HttpContext.Current.Session["userId"].ToString()));

                        if (int.Parse(HttpContext.Current.Session["userTypeId"].ToString()) == 1)
                            IdentityHelper.RedirectToReturnUrl("~/ProviderHomePage.aspx", Response);
                        else
                            IdentityHelper.RedirectToReturnUrl("~/ParentHomePage.aspx", Response);

                        break;
                    case SignInStatus.LockedOut:
                        Response.Redirect("/Account/Lockout");
                        break;
                    case SignInStatus.RequiresVerification:
                        Response.Redirect(String.Format("/Account/TwoFactorAuthenticationSignIn?ReturnUrl={0}&RememberMe={1}", 
                                                        Request.QueryString["ReturnUrl"],
                                                        RememberMe.Checked),
                                          true);
                        break;
                    case SignInStatus.Failure:
                    default:
                        FailureText.Text = "Invalid login attempt";
                        ErrorMessage.Visible = true;
                        break;
                }
            }
        }
    }
}