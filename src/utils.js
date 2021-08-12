
export const fetchData = async (url, options) => {
    try{
    const req = await fetch(url);
    const data = req.json();
     return data;   
    }catch(e){
        console.log('fetcherror',e);
    }                           
}