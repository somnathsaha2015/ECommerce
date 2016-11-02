using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using System.Text;
using System.Security.Cryptography;
using System.Data.SqlClient;
using System.Data;
//using TBUtility;

namespace KVConnector
{
    public class Util
    {        

        #region getMd5Hash
        public static string getMd5Hash(string input)
        {
            StringBuilder sBuilder = new StringBuilder();
            using (MD5 md5Hash = MD5.Create())
            {
                // Convert the input string to a byte array and compute the hash.
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
                // Loop through each byte of the hashed data 
                // and format each one as a hexadecimal string.
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }
            }
            return sBuilder.ToString();
        }
        #endregion

        #region setError      
        public static void setError(dynamic results, int status, string errorMessage, string details)
        {
            results.error = new ExpandoObject();
            results.error.status = status;
            results.error.message = errorMessage;
            results.error.details = details;
        }
        #endregion        

        #region sendMail   
        public static void sendMail()
        {
            
        }
        #endregion 


    }
}
