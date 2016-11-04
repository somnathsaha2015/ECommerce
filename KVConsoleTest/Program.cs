using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Dynamic;
using TBSeed;

namespace KVConsoleTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //SendMail();
            //RandomAlphaNumeric();
            //AddUser();
            CheckException();
        }

        private static void CheckException()
        {
            try
            {
                Exception ex = new Exception("New");
                ex.Data.Add("101", "test");
                throw ex;
                //throw new Exception("Res Exception");

            }
            catch (Exception ex)
            {
                var v = ex.Data.Keys.Cast<List<object>>();
                var dictList = ex.Data.Cast<DictionaryEntry>();
               Console.WriteLine(ex.Message);
            }
        }

        private static void AddUser()
        {
            var connString = "server=(local);Database=KistlerDB;Integrated Security=SSPI";
            SeedDataAccess seedDataAccess = new SeedDataAccess(connString);
            dynamic user = new ExpandoObject();
            var email = "sa@gmail.com";
            var hash = "abcd";
            user.Email = email;
            user.PwdHash = hash;
            user.Role = "U";
            var kvUser = new KVUser()
            {
                Email = email,
                PwdHash = hash,
                Role = 'U'
            };
            Dictionary<string, object> kvUserDict = SeedUtil.GetDictFromObject(kvUser);
            Dictionary<string, object> userDict = SeedUtil.GetDictFromDynamicObject(user);
            var seed = new Seed()
            {
                TableName = "UserMaster",
                TableDict = userDict,
                //TableObject = "user",
                IsCustomIDGenerated = false,
                PKeyColName = "Id"
            };
            List<Seed> seedList = new List<Seed>();
            seedList.Add(seed);
            try
            {
                seedDataAccess.SaveSeeds(seedList);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        private static void RandomAlphaNumeric()
        {
            var alph = Guid.NewGuid().ToString().Substring(0, 8);
        }
        private static void SendMail()
        {

            MailMessage mess = new MailMessage();
            mess.To.Add("sagarwal@netwoven.com");
            mess.From = new MailAddress("capitalch2@gmail.com", "Email header", System.Text.Encoding.UTF8);
            mess.Subject = "This mail is send as test";
            mess.SubjectEncoding = System.Text.Encoding.UTF8;
            mess.Body = "This is Email Body";
            mess.BodyEncoding = System.Text.Encoding.UTF8;
            mess.IsBodyHtml = true;
            mess.Priority = MailPriority.High;
            SmtpClient client = new SmtpClient();
            client.Credentials = new NetworkCredential("capitalch2@gmail.com", "su$hant123");
            client.Port = 587;
            //client.Port = 465;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            try
            {
                client.Send(mess);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
    }
}
