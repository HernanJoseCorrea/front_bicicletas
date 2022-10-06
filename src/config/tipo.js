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

const tipo = {
  postTipo: (tipo) => {
    return callApi('/types',{
      method: 'POST',
      body: JSON.stringify(tipo)
    });
  },
  getTipo: () => {
    return callApi('/types');
  },
  updateTipo: (id, tipo) => {
    return callApi(`/types/${id}`,{
      method: 'PUT',
      body: JSON.stringify(tipo)
    });
  }
}

export default tipo;