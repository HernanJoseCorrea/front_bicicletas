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
      console.log(jsondata);
      return jsondata;
    // }

  }catch(e){
    console.log(e);
  }
}

const ventas = {
  postVenta: (venta) => {
    return callApi('/sales',{
      method: 'POST',
      body: JSON.stringify(venta)
    })
  },
  // Ventas por id del usuario
  getVentasByIdUser: () => {
    return callApi('/sales/id');
  },
  // Ventas administrador
  getVentas: () => {
    return callApi('/sales');
  }
}

export default ventas;