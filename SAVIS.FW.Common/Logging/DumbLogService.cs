using log4net;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace SAVIS.FW.Common
{
    /// <summary>
    /// This class is a dumb log service to avoid logging but doesn't change the code
    /// </summary>
    public class DumbLogService : ILogService
    {
       private readonly log4net.ILog log4Net;

        public DumbLogService(string logName)
        {
            this.log4Net = LogManager.GetLogger(logName);
        }

        public DumbLogService()
        {
            this.log4Net = LogManager.GetLogger("default");
        }

        public DumbLogService(log4net.ILog log4Net)
        {
            this.log4Net = log4Net;
        }

        #region ILog Members

        /// <summary>
        /// Log to file with type Debug
        /// </summary>
        /// <param name="message"></param>
        public void Debug(object message)
        {

            // Console.WriteLine(message);
        }

        /// <summary>
        /// Log to file with type Debug
        /// </summary>
        /// <param name="message"></param>
        public void Debug(object message, Exception exception)
        {

        }

        /// <summary>
        /// Log to file with type Info
        /// </summary>
        /// <param name="message"></param>
        public void Info(object message)
        {
            
        }

        /// <summary>
        /// Log to file with type Info
        /// </summary>
        /// <param name="message"></param>
        public void Info(object message, Exception exception)
        {
            
        }
        public void Info(object message, Guid userId, Guid appId)
        {

        }

    /// <summary>
        /// Log to file with type Warn
        /// </summary>
        /// <param name="message"></param>
        public void Warn(object message)
        {
            log4Net.Warn(BuildMessage(message));
        }

        /// <summary>
        /// Log to file with type Warn
        /// </summary>
        /// <param name="message"></param>
        public void Warn(object message, Exception exception)
        {
            log4Net.Warn(BuildMessage(message), exception);
        }

        /// <summary>
        /// Log to file with type Error
        /// </summary>
        /// <param name="message"></param>
        public void Error(object message)
        {
            log4Net.Error(BuildMessage(message));
        }

        /// <summary>
        /// Log to file with type Error
        /// </summary>
        /// <param name="message"></param>
        public void Error(object message, Exception exception)
        {
            log4Net.Error(BuildMessage(message), exception);
        }
        /// <summary>
        /// Log to file with type Error
        /// </summary>
        /// <param name="message"></param>
        public void Fatal(object message)
        {
            log4Net.Fatal(BuildMessage(message));
        }

        /// <summary>
        /// Log to file with type Warn
        /// </summary>
        /// <param name="message"></param>
        public void Fatal(object message, Exception exception)
        {
            log4Net.Fatal(BuildMessage(message), exception);
        }

        /// <summary>
        /// Return log with type Debug is enabled
        /// </summary>
        public bool IsDebugEnabled
        {
            get { return log4Net.IsDebugEnabled; }
        }

        /// <summary>
        /// Return log with type Info is enabled
        /// </summary>
        public bool IsInfoEnabled
        {
            get { return log4Net.IsInfoEnabled; }
        }

        /// <summary>
        /// Return log with type Warn is enabled
        /// </summary>
        public bool IsWarnEnabled
        {
            get { return log4Net.IsWarnEnabled; }
        }

        /// <summary>
        /// Return log with type Error is enabled
        /// </summary>
        public bool IsErrorEnabled
        {
            get { return log4Net.IsErrorEnabled; }
        }

        #endregion

        private static string BuildMessage(object message)
        {
            var aboveFrame = new StackFrame(3);
            return
                String.Format("[{0} - {1}] {2}", aboveFrame.GetMethod().ReflectedType.FullName,
                              aboveFrame.GetMethod().Name, message);
        }

        public void Debug(LogMessage message, Guid? userId, Guid? appId)
        {
            throw new NotImplementedException();
        }

        public void Debug(LogMessage message, Guid? userId, Guid? appId, Exception ex)
        {
            throw new NotImplementedException();
        }

        public void Info(LogMessage message, Guid? userId, Guid? appId)
        {
            throw new NotImplementedException();
        }

        public void Info(LogMessage message, Guid? userId, Guid? appId, Exception ex)
        {
            throw new NotImplementedException();
        }

        public void Warn(LogMessage message, Guid? userId, Guid? appId)
        {
            throw new NotImplementedException();
        }

        public void Warn(LogMessage message, Guid? userId, Guid? appId, Exception ex)
        {
            throw new NotImplementedException();
        }

        public void Error(LogMessage message, Guid? userId, Guid? appId)
        {
            throw new NotImplementedException();
        }

        public void Error(LogMessage message, Guid? userId, Guid? appId, Exception ex)
        {
            throw new NotImplementedException();
        }

        public void Fatal(LogMessage message, Guid? userId, Guid? appId)
        {
            throw new NotImplementedException();
        }

        public void Fatal(LogMessage message, Guid? userId, Guid? appId, Exception ex)
        {
            throw new NotImplementedException();
        }
    }
}
