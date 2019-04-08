using Microsoft.Owin.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.API
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9000/";

            WebApp.Start<Startup>(url: baseAddress);

            Console.WriteLine("RESTful service started up at  : " + baseAddress);
            Console.WriteLine("TESTING...");

            // Create HttpCient and make a request to api/values 
            HttpClient client = new HttpClient();
            var response = client.GetAsync(baseAddress + "api/values").Result;
            Console.WriteLine(response);
            Console.WriteLine(response.Content.ReadAsStringAsync().Result);
            Console.WriteLine("END TESTING...");

            Console.WriteLine("Turn on the browser, and try this address : " + baseAddress + "api/values");
            Console.Read();
            Console.ReadLine();
        }
    }
}
