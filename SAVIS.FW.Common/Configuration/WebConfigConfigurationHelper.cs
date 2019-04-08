using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Common
{
    public class WebConfigConfigurationHelper : IConfigurationHelper
    {
        public string GetValue(string configName)
        {
            var config = ConfigurationManager.AppSettings[configName];

            return config;
        }

        public List<ConfigData> GetAll()
        {
            return new List<ConfigData>();
        }
    }
}
