using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SAVIS.FW.Application.Startup))]
namespace SAVIS.FW.Application
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
