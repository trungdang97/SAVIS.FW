using Sodium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            string password = "abcde";
            //int output_length = 64;
            //byte[] s = PasswordHash.ArgonGenerateSalt();
            //string salt = Encoding.UTF8.GetString(s, 0, s.Length);

            //byte[] hash = PasswordHash.ScryptHashBinary(password, salt, PasswordHash.Strength.Medium, output_length);
            string hash = PasswordHash.ScryptHashString(password, PasswordHash.Strength.Medium);

            Console.WriteLine(hash);

            if(PasswordHash.ScryptHashStringVerify(hash, password))
            {
                Console.WriteLine("\n We cool");
            }

            Console.Read();
        }
    }
}
