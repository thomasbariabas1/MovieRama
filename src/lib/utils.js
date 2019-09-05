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

    });

    return areEquals;
}

export function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const createAction = (type)=>(payload)=>({type,payload})
