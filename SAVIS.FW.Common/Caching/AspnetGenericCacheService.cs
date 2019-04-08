using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Runtime.Caching;

namespace SAVIS.FW.Common
{
    public class AspnetGenericCacheService : IGenericCacheService
    {

        readonly ILogService logger = new ApplicationLog();

        public string RegionName = ConfigurationManager.AppSettings["AspNetCachePrefix"];

        CacheItemPolicy defaultPolicy = new CacheItemPolicy();

        public static bool isAllowCache = true;

        /// <summary>
        /// time span in second
        /// </summary>
        /// <param name="expirationTimeSpan"></param>

        public bool HasInCache(string key)
        {
            if (!isAllowCache) return true;

            if (MemoryCache.Default.Contains(key))
            {
                logger.Info("HasInCache, key :" + RegionName + key);
                return true;
            }

            logger.Info("NotHasInCache, key :" + RegionName + key);
            return false;
        }

        public Response<string> DeleteFromCache(string key)
        {
            try
            {
                MemoryCache.Default.Remove(RegionName + key, null);
                return new Response<string>(1, "", "");
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }
            
            return new Response<string>(1, string.Empty, string.Empty);
        }

        public string ClearAllCache()
        {
            try
            {
                logger.Info("Start clear cache");
                logger.Info("------------Before---------------------------");
                logger.Info("Total keys : " + MemoryCache.Default.GetCount(null));
                logger.Info("Physical limits : " + MemoryCache.Default.PhysicalMemoryLimit);
                logger.Info("Polling interval : " + MemoryCache.Default.PollingInterval);
                logger.Info("Cache mem limit : " + MemoryCache.Default.CacheMemoryLimit);
                logger.Info("Default capacities: " + MemoryCache.Default.DefaultCacheCapabilities);
                logger.Info("Default sliding: " + defaultPolicy.SlidingExpiration);

                var enumerator = MemoryCache.Default.AsEnumerable();

                foreach (var item in enumerator)
                {
                    var obj = MemoryCache.Default.Remove(item.Key);
                    // logger.Info("Removed : " + obj.ToString());

                }
                
                logger.Info("------------After---------------------------");
                logger.Info("Total keys : " + MemoryCache.Default.GetCount(null));
                logger.Info("Physical limits : " + MemoryCache.Default.PhysicalMemoryLimit);
                logger.Info("Polling interval : " + MemoryCache.Default.PollingInterval);
                logger.Info("Cache mem limit : " + MemoryCache.Default.CacheMemoryLimit);
                logger.Info("Default capacities: " + MemoryCache.Default.DefaultCacheCapabilities);
                logger.Info("Default sliding: " + defaultPolicy.SlidingExpiration);
                return "Success";
            }
            catch (Exception ex)
            {
                logger.Error(ex);

                return ex.Message;
            }
        }


    }


}

