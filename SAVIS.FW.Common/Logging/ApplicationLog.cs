using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using log4net.Config;
using System.IO;
using System.Diagnostics;
using log4net.Core;
using log4net.Repository.Hierarchy;
using log4net.Appender;
using System.Configuration;

namespace SAVIS.FW.Common
{
    public class ApplicationLog : ILogService
    {
        SavisLogService debugLog = new SavisLogService("DebugLogger");
        SavisLogService errorLog = new SavisLogService("ErrorLogger");
        SavisLogService infoLog = new SavisLogService("InfoLogger");
        SavisLogService fatalLog = new SavisLogService("FatalLogger");
        SavisLogService warnLog = new SavisLogService("WarnLogger");

        private readonly log4net.ILog log4Net;

        #region ILog Members
        public bool IsDebugEnabled
        {
            get { return log4Net.IsDebugEnabled; }
        }

        public bool IsInfoEnabled
        {
            get { return log4Net.IsInfoEnabled; }
        }

        public bool IsWarnEnabled
        {
            get { return log4Net.IsWarnEnabled; }
        }

        public bool IsErrorEnabled
        {
            get { return log4Net.IsErrorEnabled; }
        }

        /// <summary>
        /// Log to file with type Debug
        /// </summary>
        /// <param name="message"></param>
        public void Debug(object message)
        {
            debugLog.Debug(message);
        }

        public void Debug(object message, Exception ex)
        {
            debugLog.Debug(message, ex);
        }

        /// <summary>
        /// Log to file with type Info
        /// </summary>
        /// <param name="message"></param>
        public void Info(object message)
        {
            infoLog.Info(message);
        }

        public void Info(object message, Exception ex)
        {
            infoLog.Info(message, ex);
        }

        /// <summary>
        /// Log to file with type Warn
        /// </summary>
        /// <param name="message"></param>
        public void Warn(object message)
        {
            warnLog.Warn(message);
        }
        public void Warn(object message, Exception ex)
        {
            warnLog.Warn(message, ex);
        }

        /// <summary>
        /// Log to file with type Error
        /// </summary>
        /// <param name="message"></param>
        public void Error(object message)
        {
            errorLog.Error(message);
        }
        public void Error(object message, Exception ex)
        {
            errorLog.Error(message, ex);
        }
        public void Fatal(object message)
        {
            fatalLog.Fatal(message);
        }
        public void Fatal(object message, Exception ex)
        {
            fatalLog.Fatal(message, ex);
        }
        /// <summary>
        /// Log to file with type Debug
        /// </summary>
        /// <param name="message">action to log</param>
        /// <param name="userId">userId</param>
        /// <param name="appId">application id</param>
        /// <param name="moduleId">module Id</param>
        /// <param name="content">content</param>
        /// <param name="objectId">Id of Object</param>
        public void Debug(object message, Guid userId, Guid appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;

            debugLog.Debug(message);
        }

        /// <summary>
        /// Log to file with type Info
        /// </summary>
        /// <param name="message">action to log</param>
        /// <param name="userId">userId</param>
        /// <param name="appId">application id</param>
        /// <param name="moduleId">module Id</param>
        /// <param name="content">content</param>
        /// <param name="objectId">Id of Object</param>
        public void Info(object message, Guid userId, Guid appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;

            infoLog.Info(message);
        }
     
        /// <summary>
        /// Log to file with type warn
        /// </summary>
        /// <param name="message">action to log</param>
        /// <param name="userId">userId</param>
        /// <param name="appId">application id</param>
        /// <param name="moduleId">module Id</param>
        /// <param name="content">content</param>
        /// <param name="objectId">Id of Object</param>
        public void Warn(object message, Guid userId, Guid appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;

            warnLog.Warn(message);
        }

        /// <summary>
        /// Log to file with type Error
        /// </summary>
        /// <param name="message">action to log</param>
        /// <param name="userId">userId</param>
        /// <param name="appId">application id</param>
        /// <param name="moduleId">module Id</param>
        /// <param name="content">content</param>
        /// <param name="objectId">Id of Object</param>
        public void Error(object message, Guid userId, Guid appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;

            errorLog.Error(message);
        }








        #region new log
        /// <summary>
        /// Debug
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        public void Debug(LogMessage logMessage, Guid? userId, Guid? appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Debug(logMessage.ToPlainText());
        }
        public void Debug(LogMessage logMessage, Guid? userId, Guid? appId,Exception ex)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Debug(logMessage.ToPlainText(),ex);
        }

        /// <summary>
        /// Info
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        public void Info(LogMessage logMessage, Guid? userId, Guid? appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Info(logMessage.ToPlainText());
        }
        public void Info(LogMessage logMessage, Guid? userId, Guid? appId,Exception ex)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Info(logMessage.ToPlainText(),ex);
        }
        /// <summary>
        /// Warn
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        public void Warn(LogMessage logMessage, Guid? userId, Guid? appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Warn(logMessage.ToPlainText());
        }
        public void Warn(LogMessage logMessage, Guid? userId, Guid? appId,Exception ex)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Warn(logMessage.ToPlainText(),ex);
        }
        /// <summary>
        /// Log Error
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        public void Error(LogMessage logMessage, Guid? userId, Guid? appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Error(logMessage.ToPlainText());
        }
        public void Error(LogMessage logMessage, Guid? userId, Guid? appId,Exception ex)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Error(logMessage.ToPlainText(),ex);
        }

        /// <summary>
        /// Log Fatal
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        public void Fatal(LogMessage logMessage, Guid? userId, Guid? appId)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Fatal(logMessage.ToPlainText());
        }
        /// <summary>
        /// Log Fatal
        /// </summary>
        /// <param name="logMessage"></param>
        /// <param name="userId"></param>
        /// <param name="appId"></param>
        public void Fatal(LogMessage logMessage, Guid? userId, Guid? appId, Exception ex)
        {
            log4net.LogicalThreadContext.Properties["application_id"] = appId;
            log4net.LogicalThreadContext.Properties["user_id"] = userId;
            //
            log4net.LogicalThreadContext.Properties["plantTextMessage"] = logMessage.ToPlainText();
            log4net.LogicalThreadContext.Properties["xmlMessage"] = logMessage.ToXml();
            log4net.LogicalThreadContext.Properties["htmlMessage"] = logMessage.ToHtml();
            infoLog.Fatal(logMessage.ToPlainText(), ex);
        }
        #endregion
        #endregion


    }
}
