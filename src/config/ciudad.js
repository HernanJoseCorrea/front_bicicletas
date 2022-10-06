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


const ciudad = {
  postCiudad: (ciudad) => {
    return callApi('/cities',{
      method: 'POST',
      body: JSON.stringify(ciudad)
    });
  },
  getCiudad: () => { 
    return callApi('/cities');
  },
  updateCiudad: (id, ciudad) => {
    return callApi(`/cities${id}`,{
      method: 'PUT',
      body: JSON.stringify(ciudad)
    })
  }
}

export default ciudad;