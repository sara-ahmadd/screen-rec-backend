import {getRedisClient, isRedisAvailable} from './redis.client.js'

export const getCache = async (key:string)=>{
    const client = getRedisClient();
     if(!client || !isRedisAvailable)return null;

     try {
        return await client.get(key)
     } catch (error) {
        console.log(error)
        return null
     }
}

export const setCache = async (key:string, value:string, ttlSeconds:number) => {
    const client = getRedisClient();
     if(!client || !isRedisAvailable)return null;
    try {
        return await client.set(key, value, {EX:ttlSeconds})
    } catch (error) {
        console.log(error)
    }
}

export const deleteCache = async (key:string) => {
    const client = getRedisClient();
     if(!client || !isRedisAvailable)return null;
     try {
        await client.del(key)
     } catch (error) {
        console.log(error)
     }
}
