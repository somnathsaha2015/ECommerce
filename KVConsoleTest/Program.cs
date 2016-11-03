using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace KVConsoleTest
{
    class Program
    {
        static void Main(string[] args)
        {
            //SendMail();
            RandomAlphaNumeric();
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
