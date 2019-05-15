using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using SAVIS.FW.Business;
using SAVIS.FW.Common;
using SAVIS.FW.Business.Logic.Class;
using SAVIS.FW.Business.Logic.Student;
using SAVIS.FW.Business.Logic.Teacher;
using SAVIS.FW.Business.Logic.Login;

namespace SAVIS.FW.Business.Config
{

    public class BusinessServiceLocator
    {
        // a map between contracts -> concrete implementation classes
        private IDictionary<Type, Type> servicesType;

        // a map containing references to concrete implementation already instantiated
        // (the service locator uses lazy instantiation).
        private IDictionary<Type, object> instantiatedServices;
        private static readonly BusinessServiceLocator _instance = new BusinessServiceLocator();
        public static BusinessServiceLocator Instance
        {
            get { return _instance; }
        }


        public void Init()
        {
            BuildServiceTypesMap();
        }
        internal BusinessServiceLocator()
        {
            this.servicesType = new Dictionary<Type, Type>();
            this.instantiatedServices = new Dictionary<Type, object>();
            this.BuildServiceTypesMap();
        }


        public T GetService<T>()
        {

            lock (instantiatedServices)
            {
                if (this.instantiatedServices.ContainsKey(typeof(T)))
                {
                    return (T)this.instantiatedServices[typeof(T)];
                }
                else
                {
                    try
                    {
                        // lazy initialization
                        try
                        {
                            // use reflection to invoke the service
                            ConstructorInfo constructor = servicesType[typeof(T)].GetConstructor(new Type[0]);
                            Debug.Assert(constructor != null, "Cannot find a suitable constructor for " + typeof(T));


                            T service = (T)constructor.Invoke(null);

                            // Add service
                            instantiatedServices.Add(typeof(T), service);

                            return service;

                        }
                        catch (KeyNotFoundException ex)
                        {
                            // LogService.Service.Error(ex);
                            throw new ApplicationException("The requested service is not registered | " + typeof(T));
                        }

                    }
                    catch (Exception ex)
                    {
                        //  LogService.Service.Error(ex);
                        throw new ApplicationException("Failed | " + typeof(T));
                    }
                }
            }

        }
        public T GetService<T>(Guid? applicationId, Guid? UserId)
        {

            lock (instantiatedServices)
            {
                if (this.instantiatedServices.ContainsKey(typeof(T)))
                {
                    return (T)this.instantiatedServices[typeof(T)];
                }
                else
                {
                    try
                    {
                        // lazy initialization
                        try
                        {
                            // use reflection to invoke the service
                            ConstructorInfo constructor = servicesType[typeof(T)].GetConstructor(new Type[0]);
                            Debug.Assert(constructor != null, "Cannot find a suitable constructor for " + typeof(T));


                            T service = (T)constructor.Invoke(null,new object[] { applicationId, UserId });

                            // Add service
                            instantiatedServices.Add(typeof(T), service);

                            return service;

                        }
                        catch (KeyNotFoundException ex)
                        {
                            // LogService.Service.Error(ex);
                            throw new ApplicationException("The requested service is not registered | " + typeof(T));
                        }

                    }
                    catch (Exception ex)
                    {
                        //  LogService.Service.Error(ex);
                        throw new ApplicationException("Failed | " + typeof(T));
                    }
                }
            }

        }

        private void BuildServiceTypesMap()
        {
            // Log
            servicesType.Add(typeof(ILogService), typeof(ApplicationLog));
            servicesType.Add(typeof(IGenericCacheService), typeof(AspnetGenericCacheService));

            //scf/classes
            servicesType.Add(typeof(IClassHandler), typeof(DbClassHandler));
            //scf/students
            servicesType.Add(typeof(IStudentHandler), typeof(DbStudentHandler));
            //scf/teachers
            servicesType.Add(typeof(ITeacherHandler), typeof(DbTeacherHandler));
            //scf/login
            servicesType.Add(typeof(ILoginHandler), typeof(DbLoginHandler));
        }
    }

}

