using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Runtime.Caching;

namespace SAVIS.FW.Common
{
    public class AspnetObjectCacheService<T> : IObjectCacheService<T> where T:class
    {

        readonly ILogService logger = new ApplicationLog();

        public string RegionName = ConfigurationManager.AppSettings["AspNetCachePrefix"];

        CacheItemPolicy defaultPolicy = new CacheItemPolicy();

        public static bool isAllowCache = true;

        /// <summary>
        /// time span in second
        /// </summary>
        /// <param name="expirationTimeSpan"></param>
        public IObjectCacheService<T> Init()
        {
            logger.Info("-----------------------------------------");
            logger.Info("----ASPNET CACHE SERVER ENABLED----------");
            logger.Info("-----------------------------------------");

            RegionName = ConfigurationManager.AppSettings["AspNetCachePrefix"];
            string timeSpan = ConfigurationManager.AppSettings["CachingExpirationTimespan"];
            int m = 10000;
            int.TryParse(timeSpan, out m);

            defaultPolicy.SlidingExpiration = new TimeSpan(10000000 * (long)m);
            
            return this;
        }

        public bool HasInCache(string key)
        {
            if (!isAllowCache) return true;

            if (MemoryCache.Default.Contains(RegionName + key))
            {
                logger.Info("HasInCache, key :" + RegionName + key);
                return true;
            }

            logger.Info("NotHasInCache, key :" + RegionName + key);
            return false;
        }

        public Response<T> AddToCache(string key, T obj)
        {
            return AddToCache(key, obj, 0, CachePriority.High);
        }
        public Response<T> AddToCache(string key, T obj, CachePriority priority)
        {
            return AddToCache(key, obj, 0, CachePriority.High);
        }

        /// <summary>
        /// Adding an item to memcached
        /// </summary>
        /// <param name="key"></param>
        /// <param name="obj"></param>
        /// <param name="duration"></param>
        /// <param name="priority"></param>
        /// <returns></returns>
        public Response<T> AddToCache(string key, T obj, int duration, CachePriority priority)
        {
            try
            {
                var newPolicy = new CacheItemPolicy();

                logger.Info("Add key : " + RegionName + key);
                logger.Info("Total keys : " + MemoryCache.Default.GetCount(null));
                logger.Info("Physical limits : " + MemoryCache.Default.PhysicalMemoryLimit);
                //logger.Info("Polling interval : " + MemoryCache.Default.PollingInterval);
                //logger.Info("Cache mem limit : " + MemoryCache.Default.CacheMemoryLimit);
                //logger.Info("Default capacities: " + MemoryCache.Default.DefaultCacheCapabilities);
                //logger.Info("Default sliding: " + defaultPolicy.SlidingExpiration);

                //if (priority == CachePriority.Low)
                //{
                //    newPolicy.Priority = CacheItemPriority.Default;
                //}

                //if (priority == CachePriority.High)
                //{
                //    newPolicy.Priority = CacheItemPriority.NotRemovable;
                //}

                if(duration != 0)
                {
                    newPolicy.SlidingExpiration = new TimeSpan(10000000 * (long)duration);
                }

                if (MemoryCache.Default.Contains(RegionName + key))
                {
                    logger.Info("[Memcache] Key is already existed : key : "  + RegionName + key);
                    MemoryCache.Default.Remove(RegionName + key, null);
                }
                    

                var isSuccess = MemoryCache.Default.Add(RegionName + key, obj, newPolicy, null);

                if (isSuccess)
                {
                    logger.Info("Total keys after add : " + MemoryCache.Default.GetCount(null));
                    // logger.Info("Total keys after add : " + MemoryCache.Default.Get);
                    return new Response<T>(1, "added", obj);
                }
                    
                else
                    return new Response<T>(-1, "adding item failed", null);
            }
            catch (Exception ex)
            {
                logger.Error(ex);

            }


            return new Response<T>(0, "item is exist", null);
        }

        public Response<T> GetFromCache(string key)
        {
            try
            {
                logger.Info("Get key : " + RegionName + key);
                var data = (MemoryCache.Default.Get(RegionName + key, null));
                if (data != null)
                {
                    return new Response<T>(1, null, (T)data);
                }
            }
            catch (Exception ex)
            {
                logger.Error(ex);
            }

            return new Response<T>(0, null, null);
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
            throw new NotImplementedException();
        }


    }


}

