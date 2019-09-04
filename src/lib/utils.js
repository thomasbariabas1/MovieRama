export const isEquals = (compare1, compare2) =>{

    if(typeof compare1 !=='object' || typeof compare2 !=='object'){
        throw new Error('The provided comparison sides are not objects')
    }
    if(Object.keys(compare1).length !== Object.keys(compare2).length)
        return false;

    let areEquals = true;
    Object.keys(compare1).map(key=>{
        if(!compare2[key]){
            areEquals = false
        }else if(compare1[key] !== compare2[key]){
            areEquals = false
        }

    })

    return areEquals;
}

export const createAction = (type)=>(payload)=>({type,payload})