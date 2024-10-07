export const setData = (data,key)=>{
localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalData = (key)=>{
   const data = JSON.parse(localStorage.getItem(key))
   return data
}