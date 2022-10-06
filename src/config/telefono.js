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
      return jsondata;
    // }

  }catch(e){
    console.log(e);
  }
}


const telefono = {
  postTelefono: (telefono) => {
    return callApi('/phoneNumber',{
      method: 'POST',
      body: JSON.stringify(telefono)
    })
  },
  getTelefonoById: () => {
    return callApi('/phoneNumber/id');
  },
  updateTelefono: (telefono) => {
    return callApi('/phoneNumber/id',{
      method: 'PUT',
      body: JSON.stringify(telefono)
    })
  }
}

export default telefono;