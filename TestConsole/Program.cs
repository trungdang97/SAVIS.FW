using Sodium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TestConsole
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            string password = "123456a@";
            //int output_length = 64;
            //byte[] s = PasswordHash.ArgonGenerateSalt();
            //string salt = Encoding.UTF8.GetString(s, 0, s.Length);

            //byte[] hash = PasswordHash.ScryptHashBinary(password, salt, PasswordHash.Strength.Medium, output_length);
            string hash = PasswordHash.ArgonHashString(password, PasswordHash.StrengthArgon.Moderate);
            Console.WriteLine(hash);
            Console.WriteLine(hash.Length);
            Clipboard.SetText(hash);

            if (PasswordHash.ScryptHashStringVerify(hash, password))
            {
                Console.WriteLine("\n We cool");
            }

            Console.Read();
        }
    }
}
