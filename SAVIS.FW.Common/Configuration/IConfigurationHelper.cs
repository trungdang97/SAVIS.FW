using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Common
{
    public interface IConfigurationHelper
    {
        string GetValue(string configName);
        List<ConfigData> GetAll();
    }

    public class ConfigData
    {
        public string Name {get;set;}
        public string Value {get;set;}
    }
}
