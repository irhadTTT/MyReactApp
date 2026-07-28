
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NLog;
using my_task_app.Common;
using my_task_app.Models;
using System;
using Newtonsoft.Json;
using FireSharp.Interfaces;
using FireSharp.Config;
using FireSharp;
using FireSharp.Response;
using Newtonsoft.Json.Linq;

namespace my_task_app.Controllers
{
    public class PersonsController : BaseController
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        IFirebaseConfig firebaseConfig = new FirebaseConfig
        {
            AuthSecret = "eqCsEDKw7q5Dy0kYWzcE4lOhMNeUEWFYIk0nBoYc",
            BasePath = "https://rect-burger-app-68ef0.firebaseio.com/"
        };
        IFirebaseClient client;
        public List<PersonVM> list = new List<PersonVM>();
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public string GetAllPersons()
        {
            try
            {
                client = new FirebaseClient(firebaseConfig);
                FirebaseResponse response = client.Get("Persons");
                dynamic data = JsonConvert.DeserializeObject<dynamic>(response.Body);
                if(data != null)
                {
                    foreach (var item in data)
                    {
                        list.Add(JsonConvert.DeserializeObject<PersonVM>(((JProperty)item).Value.ToString()));
                    }
                }
                return list.ToJson();
            }
            catch (Exception exc)
            {
                Logger.Error(exc);
                return Fail();
            }
        }
        [HttpDelete]
        public string DeletePerson(string personId)
        {
            try
            {
                client = new FirebaseClient(firebaseConfig);
                FirebaseResponse response = client.Delete("Persons/"+personId);
                return Success();
            }
            catch (Exception exc)
            {
                Logger.Error(exc);
                return Fail();
            }
        }
        [HttpGet]
        public string AddUpdatePerson(PersonVM person)
        {
            try
            {
                client = new FirebaseClient(firebaseConfig);
                var data = person;
                if (string.IsNullOrWhiteSpace(person.PersonId))
                {
                    PushResponse response = client.Push("Persons/", data);
                    data.PersonId = response.Result.name;
                    SetResponse setResponse = client.Set("Persons/" + data.PersonId, data);
                }
                else {
                    SetResponse setResponse = client.Set("Persons/" + person.PersonId, data);
                }        
                return new { personId = data.PersonId, success = true }.ToJson();
            }
            catch (Exception exc)
            {
                Logger.Error(exc);
                return Fail();
            }
        }
        [HttpGet]
        public string ExportData()
        {
            try
            {
                var list = GetAllPersons();
                System.IO.File.WriteAllText(@"C:\Users\irhad\OneDrive\Desktop\\path.txt", list);
                return Success();
            }
            catch (Exception exc)
            {
                Logger.Error(exc);
                return Fail();
            }
        }
    }
}