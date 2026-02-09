/**
 * This function standardizes API success response for all endpoints.
 * @param msg 
 * @param data 
 * @returns object that should be returned as endpoint response
 */
export const successResponse = (msg:string, data?:any) => {
    return {
        status:'success',
        message:msg,
        ...data
    }
}