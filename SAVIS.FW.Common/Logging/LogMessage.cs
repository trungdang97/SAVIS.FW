using HtmlAgilityPack;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;

namespace SAVIS.FW.Common
{
    public class LogMessage
    {
        private string TEMPLATE = HostingEnvironment.ApplicationPhysicalPath+ "bin\\Logging\\Template.html";
        private string _message { get; set; }
        private IEnumerable<HtmlNode> _xmlNode { get; set; }
        public LogMessage(string message)
        {
            _message = message;
            if (!string.IsNullOrEmpty(message))
            {
                // Load data from string
                var i = _message;
                // Process this data
                var doc = new HtmlDocument();
                // Load doc
                doc.LoadHtml(i);
                //get list tag ecm-el
                _xmlNode = doc.DocumentNode.Descendants("savis-log");
            }
            
        }
        public string ToXml()
        {

            // Read xml, process and return message
            return  _message;
        }
        public string ToHtml()
        {
            var result = _message;
            /*get allbum templace*/
            var data = File.ReadAllText(TEMPLATE, System.Text.Encoding.UTF8);
            if (!string.IsNullOrEmpty(data))
            {
                // Load data from string
                var i = data;
                // Process this data
                var doc = new HtmlDocument();
                // Load doc
                doc.LoadHtml(i);
                var mainNode = (from input in doc.DocumentNode.Descendants("main")
                                select input).FirstOrDefault();
                var mainHtml = mainNode.InnerHtml;
                result = mainHtml.Replace("%content%", result);
                if (_xmlNode != null)
                {
                    foreach (var dt in _xmlNode)
                    {
                        //type
                        var eType = dt.GetAttributeValue("type", string.Empty);
                        //id
                        var eId = dt.GetAttributeValue("id", string.Empty);
                        //name
                        var EName = dt.GetAttributeValue("name", string.Empty);
                        //EMeta1
                        var EMeta1 = dt.GetAttributeValue("meta1", string.Empty);
                        //EMeta2
                        var EMeta2 = dt.GetAttributeValue("meta2", string.Empty);
                        //EMeta3
                        var EMeta3 = dt.GetAttributeValue("meta3", string.Empty);
                        //EMeta4
                        var EMeta4 = dt.GetAttributeValue("meta4", string.Empty);

                        var currentXmlNodetext = dt.OuterHtml;

                        var itemNode = (from input in doc.DocumentNode.Descendants("items")
                                        where input.Attributes["class"].Value == eType
                                        select input).FirstOrDefault();
                        var itemHtml = "";
                        if (itemNode != null)
                        {
                            itemHtml = itemNode.InnerHtml;
                        }
                        itemHtml = itemHtml.Replace("%id%", eId);
                        itemHtml = itemHtml.Replace("%name%", EName);
                        itemHtml = itemHtml.Replace("%meta1%", EMeta1);
                        itemHtml = itemHtml.Replace("%meta2%", EMeta2);
                        itemHtml = itemHtml.Replace("%meta3%", EMeta3);
                        itemHtml = itemHtml.Replace("%meta4%", EMeta4);
                        result = result.Replace(currentXmlNodetext, itemHtml);
                    }
                }
            }
            
           
            // Read xml, process and return message
            return result;
        }
        

        public string ToPlainText()
        {
            var result = _message;
            if (_xmlNode != null)
            {
                foreach (var dt in _xmlNode)
                {
                    //type
                    var eType = dt.GetAttributeValue("type", string.Empty);
                    //id
                    var eId = dt.GetAttributeValue("id", string.Empty);
                    //name
                    var EName = dt.GetAttributeValue("name", string.Empty);

                    var currentXmlNodetext = dt.OuterHtml;
                    result = result.Replace(currentXmlNodetext, eType + ": " + EName);

                }
            }
            // Read xml, process and return message
            return result;
        }
    }
}
