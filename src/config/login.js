const callApi = async(url, options = {}) =>{
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  try{
    const res = await fetch(`http://localhost:5000/api${url}`, options);
    // Codigo correcto
    // if(res.status == 200 || res.status == 201){  
      const jsondata = await res.json();
      return jsondata;
    // }

  }catch(e){
    console.log(e);
  }
}


const login = {
  
  postLogin: (datos) => {
    return callApi("/login", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  }
}

export default login;