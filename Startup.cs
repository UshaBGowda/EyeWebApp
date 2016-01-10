using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EyeWebApp.Startup))]
namespace EyeWebApp
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
