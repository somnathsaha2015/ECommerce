using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Xml.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Dynamic;
using KVConnector.Properties;
using TBSeed;

namespace KVConnector
{
    public class KVConnection
    {
        static SeedDataAccess seedDataAccess;
        public Dictionary<string, Func<object, Task<object>>> RoutingDictionary;

        #region KVConnection
        public KVConnection()
        {
            if (RoutingDictionary == null)
            {
                RoutingDictionary = new Dictionary<string, Func<object, Task<object>>>();
                //RoutingDictionary.Add("query", ExecuteSqlQueryAsync);
                RoutingDictionary.Add("init", InitAsync);
                RoutingDictionary.Add("authenticate", AuthenticateAsync);
                RoutingDictionary.Add("isEmailExist", IsEmailExistAsync);
                RoutingDictionary.Add("changePassword", ChangePasswordAsync);
            }
        } 
        #endregion

        #region Invoke
        public async Task<object> Invoke(object input)
        {
            IDictionary<string, object> payload = (IDictionary<string, object>)input;
            string action = payload["action"].ToString();
            Task<object> t = RoutingDictionary[action](payload);
            return await t;
        }
        #endregion

        #region InitAsync
        private async Task<object> InitAsync(dynamic obj)
        {
            dynamic result = new ExpandoObject();
            Task<object> t = Task.Run<object>(() =>
            {
                try
                {
                    IDictionary<string, object> objDictionary = (IDictionary<string, object>)obj;
                    if ((objDictionary.ContainsKey("conn")))
                    {
                        var connString = objDictionary["conn"].ToString();
                        //Util.setConnString(connString); // to be removed
                        seedDataAccess = new SeedDataAccess(connString);
                        Console.WriteLine("Connection string successfully set");
                    }
                }
                catch (Exception ex)
                {
                    Util.setError(result, 403, Resources.ErrInitFailed, ex.Message);
                }
                return (result);
            });
            result = await t;
            return (result);
        }
        #endregion

        #region AuthenticateAsync
        public async Task<object> AuthenticateAsync(dynamic obj)
        {
            dynamic result = new ExpandoObject();
            Task<object> t = Task.Run<object>(() =>
            {
                try
                {
                    IDictionary<string, object> objDictionary = (IDictionary<string, object>)obj;
                    bool success = false;

                    if (objDictionary.ContainsKey("auth"))
                    {
                        string auth = objDictionary["auth"].ToString();
                        byte[] authBytes = Convert.FromBase64String(auth);
                        auth = Encoding.UTF8.GetString(authBytes);
                        if (auth.IndexOf(':') > 0)
                        {
                            string[] splitAuth = auth.Split(':');
                            if (splitAuth.Length == 2)
                            {
                                string email = splitAuth[0];
                                string hash = splitAuth[1];
                                List<SqlParameter> paramsList = new List<SqlParameter>();
                                paramsList.Add(new SqlParameter("email", email));
                                DataSet ds = seedDataAccess.ExecuteDataSet(Properties.SqlResource.GetHashAndRole, paramsList);
                                //DataSet ds = seedDataAccess.ExecuteDataSet(false, Properties.SqlResource.GetHashAndRole, paramsList);
                                if (ds.Tables.Count > 0)
                                {
                                    if (ds.Tables[0].Rows.Count > 0)
                                    {
                                        var pwdHash = ds.Tables[0].Rows[0]["PwdHash"].ToString();
                                        var role = ds.Tables[0].Rows[0]["Role"].ToString();
                                        if (hash == pwdHash)
                                        {
                                            success = true;
                                            result.authenticated = true;
                                            dynamic user = new ExpandoObject();
                                            user.email = email;
                                            user.role = role;
                                            result.user = user;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (!success)
                    {
                        result.authenticated = false;
                        Util.setError(result, 401, Resources.ErrAuthenticationFailure, Resources.MessAuthenticationFailed);
                    }
                }
                catch (Exception ex)
                {
                    result = new ExpandoObject();
                    Util.setError(result, 500, Resources.ErrInternalServerError, ex.Message);
                }
                return (result);
            });
            result = await t;
            return (result);
        }
        #endregion

        #region IsEmailExistAsync
        public async Task<object> IsEmailExistAsync(dynamic obj)
        {
            dynamic result = new ExpandoObject();
            Task<object> t = Task.Run<object>(() =>
            {
                try
                {
                    IDictionary<string, object> objDictionary = (IDictionary<string, object>)obj;
                    bool success = false;

                    if (objDictionary.ContainsKey("email"))
                    {
                        string email = objDictionary["email"].ToString();
                        result.email = email;
                        List <SqlParameter> paramsList = new List<SqlParameter>();
                        paramsList.Add(new SqlParameter("email", email));
                        var isExist = seedDataAccess.ExecuteScalar(SqlResource.IsEmailExist, paramsList);
                        if(isExist != null)
                        {
                            success = true;
                        }                                           
                    }
                    if (success)
                    {
                        result.status = 200;
                        result.isEmailExist = true;                        
                    }
                    else
                    {
                        Util.setError(result, 404, Resources.ErrResourceNotFound, Resources.ErrResourceNotFound);
                    }
                }
                catch (Exception ex)
                {
                    result = new ExpandoObject();
                    Util.setError(result, 500, Resources.ErrInternalServerError, ex.Message);
                }
                return (result);
            });
            result = await t;
            return (result);
        }
        #endregion

        #region ChangePasswordAsync
        public async Task<object> ChangePasswordAsync(dynamic obj)
        {
            dynamic result = new ExpandoObject();
            Task<object> t = Task.Run<object>(() =>
            {
                try
                {
                    IDictionary<string, object> objDictionary = (IDictionary<string, object>)obj;
                    bool success = false;

                    if (objDictionary.ContainsKey("auth"))
                    {
                        string auth = objDictionary["auth"].ToString();
                        byte[] authBytes = Convert.FromBase64String(auth);
                        auth = Encoding.UTF8.GetString(authBytes);
                        if (auth.IndexOf(':') > 0)
                        {
                            string[] splitAuth = auth.Split(':');
                            if (splitAuth.Length == 3)
                            {
                                string email = splitAuth[0];
                                string oldPwdHash = splitAuth[1];
                                string newPwdHash = splitAuth[2];
                                List<SqlParameter> paramsList = new List<SqlParameter>();
                                paramsList.Add(new SqlParameter("email", email));
                                paramsList.Add(new SqlParameter("oldPwdHash", oldPwdHash));
                                var isExist = seedDataAccess.ExecuteScalar(SqlResource.IsEmailExist, paramsList);
                                if (isExist != null) // email and password hash exists in database. Now change password Hash
                                {
                                    paramsList = new List<SqlParameter>();
                                    paramsList.Add(new SqlParameter("email", email));
                                    paramsList.Add(new SqlParameter("oldPwdHash", oldPwdHash));
                                    paramsList.Add(new SqlParameter("newPwdHash", newPwdHash));
                                    int ret = seedDataAccess.ExecuteNonQuery(SqlResource.ChangePasswordHash, paramsList);
                                    if(ret == 1)
                                    {
                                        success = true;
                                    }
                                }
                            }
                        }
                    }
                    if (success)
                    {
                        result.status = 200;
                        result.changedPwdHash = true;
                    }
                    else
                    {
                        Util.setError(result, 405, Resources.ErrGenericError, Resources.MessGenericError);
                    }
                }
                catch (Exception ex)
                {
                    result = new ExpandoObject();
                    Util.setError(result, 500, Resources.ErrInternalServerError, ex.Message);
                }
                return (result);
            });
            result = await t;
            return (result);
        }
        #endregion

    }
}
