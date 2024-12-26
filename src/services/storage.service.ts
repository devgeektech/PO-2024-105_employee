

export const getStorageItem=(key:string)=>{
    return localStorage.getItem(key)||'';
}

export const removeStorageItem=(key:string)=>{
    localStorage.removeItem(key);
}

export const clearStorage=()=>{
    localStorage.clear();
}

export const setStorageItem=(key:string, value:any)=>{
    localStorage.setItem(key,value);
}