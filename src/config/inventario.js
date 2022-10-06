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


const inventario = {
  postInventario: (inventario) => {
    return callApi('/inventory',{
      method: 'POST',
      body: JSON.stringify(inventario)
    });
  },
  getInventario: () => {
    return callApi('/inventory');
  }
}

export default inventario;