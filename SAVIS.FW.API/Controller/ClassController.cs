﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Business.Logic.Class;
using System.Web.Http;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Config;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace SAVIS.FW.API.Controller
{
    public class ClassController : ApiController
    {
        readonly IClassHandler _classHandler = BusinessServiceLocator.Instance.GetService<IClassHandler>();

        [HttpGet]
        [Route("api/v1/classes/{classId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Class> GetClassById(Guid classId)
        {
            return _classHandler.GetClassById(classId);
        }

        [HttpGet]
        [Route("api/v1/classes/filter/")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<IList<Class>> GetFilter(string filter)
        {
            ClassQueryFilter classFilter = JsonConvert.DeserializeObject<ClassQueryFilter>(filter);
            return _classHandler.GetFilter(classFilter);
        }

        [HttpPost]
        [Route("api/v1/classes/")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Class> CreateClass([FromBody]ClassCreateRequestModel Class)
        {
            return _classHandler.CreateClass(Class);
        }

        [HttpPut]
        [Route("api/v1/classes/")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Class> CreateClass([FromBody]ClassUpdateRequestModel Class)
        {
            return _classHandler.UpdateClass(Class);
        }

        [HttpDelete]
        [Route("api/v1/classes/{classId}")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Class> DeleteClass(Guid classId)
        {
            return _classHandler.DeleteClass(classId);
        }

        ////Nghiep vu yeu cau

        //Them bot giao vien chu nhiem cho lop
        [HttpPost]
        [Route("api/v1/classes/assign")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Class> AssignToClass(Guid? teacherId, Guid classId)
        {
            return _classHandler.AssignToClass(teacherId, classId);
        }

        [HttpGet]
        [Route("api/v1/classes/{classId}/detail")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Response<Class> ClassDetail(Guid classId)
        {
            return _classHandler.CurrentStudents(classId);
        }
    }
}
