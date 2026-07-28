using Microsoft.AspNetCore.Mvc;

namespace my_task_app.Common
{
    public class BaseController : Controller
    {
        [NonAction]
        protected string Success()
        {
            return new { success = true }.ToJson();
        }

        [NonAction]
        protected string Fail()
        {
            return new { success = false }.ToJson();
        }
    }
}
