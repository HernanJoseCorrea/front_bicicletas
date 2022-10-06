const callApi = async(url, options = {}) =>{
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Authorization": sessionStorage.getItem('token')
  };

  try{
    const res = await fetch(`http://localhost:5000/api${url}`, options);
    // Codigo correcto
    // if(res.status == 200 || res.status == 201){  
      const jsondata = await res.json();
      console.log(jsondata)
      return jsondata;
    // }

  }catch(e){
    console.log(e);
  }
}


const person = {
  
  postPerson: (ventas) => {
    return callApi("/person", {
      method: "POST",
      body: JSON.stringify(ventas),
    });
  },
  getPersonaById: () => {
    return callApi("/person/id");
  },
  updatePersonaById: (persona) => {
    return callApi("/person/id",{
      method: "PUT",
      body: JSON.stringify(persona)
    })
  }
}


export default person;