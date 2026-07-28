using Microsoft.AspNetCore.Mvc;
using my_task_app.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace my_task_app.Common
{
    public static class ObjectExt
    {
        public static string ToJson(this object o)
        {
            var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver(), ReferenceLoopHandling = ReferenceLoopHandling.Ignore };
            return JsonConvert.SerializeObject(o, Formatting.Indented, settings);
        }
    }
}
