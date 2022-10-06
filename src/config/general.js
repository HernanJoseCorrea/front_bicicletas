const callApi = async(url, options = {}) =>{
  options.header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // const {url} = data;

  try{
    const res = await fetch(`http://localhost:5000/api${url}`, options);
    // Codigo correcto
    if(res.status == 200 || res.status == 201){  
      const jsondata = res.json();
      return jsondata;
    }

  }catch(e){
    console.log(e);
  }
}


const general = {
  getTipoDocumento: () => {
    return callApi("/typesDocument");
  }
}


export default general;