using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KVConnector
{
    class MailItem
    {
        public string To { get; set; }
        public string From { get; set; }
        public string FromName { get; set; }
        public string subject { get; set; }
        public int port { get; set; }
        public bool IsBodyHtml { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }

    }
}
