using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/*
 * Log service interface
 * Author : TruongND
 * Savis Vietnam Corporation
 */

namespace SAVIS.FW.Common
{
    public interface ILogService
    {
        void Debug(object message);
        void Debug(object message, Exception ex);
        void Info(object message);
        void Info(object message, Exception ex);
        void Info(object message, Guid userId, Guid appId);
        void Warn(object message);
        void Warn(object message, Exception ex);
        void Error(object message);
        void Error(object message, Exception ex);
        void Fatal(object message);
        void Fatal(object message, Exception ex);


        void Debug(LogMessage message, Guid? userId, Guid? appId);
        void Debug(LogMessage message, Guid? userId, Guid? appId, Exception ex);
        void Info(LogMessage message, Guid? userId, Guid? appId);
        void Info(LogMessage message, Guid? userId, Guid? appId, Exception ex);
        void Warn(LogMessage message, Guid? userId, Guid? appId);
        void Warn(LogMessage message, Guid? userId, Guid? appId, Exception ex);
        void Error(LogMessage message, Guid? userId, Guid? appId);
        void Error(LogMessage message, Guid? userId, Guid? appId, Exception ex);
        void Fatal(LogMessage message, Guid? userId, Guid? appId);
        void Fatal(LogMessage message, Guid? userId, Guid? appId, Exception ex);



    }


}
