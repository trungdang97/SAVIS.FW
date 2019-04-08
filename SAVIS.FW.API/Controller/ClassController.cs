using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Business.Logic.Class;
using System.Web.Http;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;

namespace SAVIS.FW.API.Controller
{
    public class ClassController : ApiController
    {
        readonly IClassHandler _classHandler = BusinessServiceLocator.Instance.GetService<IClassHandler>();

        [HttpGet]
        [Route("api/v1/classes/{classId}")]
        public Response<Class> GetClassById(Guid classId)
        {
            return _classHandler.GetClassById(classId);
        }

        [HttpPost]
        [Route("api/v1/classes/filter")]
        public Response<IList<Class>> GetFilter([FromBody] ClassQueryFilter filter)
        {
            return _classHandler.GetFilter(filter);
        }

        [HttpPost]
        [Route("api/v1/classes/")]
        public Response<Class> CreateClass([FromBody]ClassCreateRequestModel Class)
        {
            return _classHandler.CreateClass(Class);
        }

        [HttpPut]
        [Route("api/v1/classes/")]
        public Response<Class> CreateClass([FromBody]ClassUpdateRequestModel Class)
        {
            return _classHandler.UpdateClass(Class);
        }

        [HttpDelete]
        [Route("api/v1/classes/{classId}")]
        public Response<Class> DeleteClass(Guid classId)
        {
            return _classHandler.DeleteClass(classId);
        }
    }
}
