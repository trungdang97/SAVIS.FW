using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAVIS.FW.Common
{
    public interface IObjectCacheService<T> : IGenericCacheService
    {
        /// <summary>
        /// Add an removable item to cache
        /// </summary>
        /// <param name="key"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        Response<T> AddToCache(string key, T obj);

        /// <summary>
        /// Add an item to cache
        /// </summary>
        /// <param name="key"></param>
        /// <param name="obj"></param>
        /// <param name="duration">Input number to determine the duration </param>
        /// <param name="priority">Input number to determine the priority of removing, 0 or 1</param>
        /// <returns></returns>
        Response<T> AddToCache(string key, T obj, CachePriority priority);

        Response<T> GetFromCache(string key);

        IObjectCacheService<T> Init();
    }

    public enum CachePriority
    {
        High,
        Medium,
        Low
    }
}
