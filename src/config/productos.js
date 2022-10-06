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


const productos = {
  // Admin
  postProducto: (producto) => {
    return callApi("/products", {
      method: "POST",
      body: JSON.stringify(producto),
    });
  },
  // Admin
  getProductosAdmin: () => {
    return callApi("/products");
  },
  // Para usuarios
  getProductosActive: () => {
    return callApi("/products/active");
  },
  // Para usuarios
  getProductoById: (id) => {
    return callApi(`/products/active/${id}`);
  },
  // Cuando un usuario compre, se le descontara una cantidad al producto
  updateProductoDescontarCant: (id, cantidad) => {
    return callApi(`/products/sell/${id}`,{
      method: "PUT",
      body: JSON.stringify(cantidad),
    });
  },
  // Actualizar productos
  updateProductos: (id, producto) => {
    return callApi(`/products/${id}`,{
      method: "PUT",
      body: JSON.stringify(producto),
    });
  },
  // Solo desactiva el producto
  deleteProductos: (id, producto) => {
    return callApi(`/products/${id}`,{
      method: "DELETE"
    });
  }
}

export default productos;