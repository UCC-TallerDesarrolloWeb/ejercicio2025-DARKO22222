const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];

let cargarProductos = (prod = productos) => {
  let contenido = "";

  prod.forEach((elemento, id) => {
    contenido += `
    <div>
      <img src="images/${elemento.imagen}" alt="${elemento.nombre}" />
      <h3>${elemento.nombre}</h3>
      <p>$${elemento.precio}</p>
      <button type="button" onclick="mostrarDetalle(${id})">
        Ver Detalle del Producto
      </button>
      <button type="button" onclick="agregarAlcarrito(${id})">
      Agregar al Carrito
      </button>
    </div>
  `;
  });
  document.getElementById("mostrar-catalogo").innerHTML = contenido;
};

let agregarAlcarrito = (id) => {
  let carritoList = localStorage.getItem("carrito");
  if (carritoList == null) {
    carritoList = [];
  } else {
    carritoList = JSON.parse(carritoList);
  }
  carritoList.push(id);
  console.log(carritoList);
  localStorage.setItem("carrito", JSON.stringify(carritoList));
  contarProductosCarrito();
};

let cargarCarrito = () => {
  let contenido = "";
  let carritoList = JSON.parse(localStorage.getItem("carrito"));
  let total = 0;
  if (carritoList == null) {
    const listprod = [];
    const listcant = [];
    carrito.forEach((num) => {
      if (!listprod.includes(num)) {
        listprod.push(num);
        listcant.push(1);
      } else {
        const inx = listprod.indexOf(num);
        listcant[inx] += 1;
      }
    });
    listprod.forEach((num, id) => {
      const elemento = productos[num];
      contenido += carritoList = JSON.parse(carritoList);
      carritoList.forEach((num) => {
        const elemento = productos[num];
        contenido += `<div>
    <h3>${elemento.nombre}</h3>
    <p>${elemento.precio}</p>
    <p>Cantidad: ${listcant[id]}</p>
        <button type="button" onclick="eliminarProducto(${id})">Eliminar del Carrito</button>
    <div> `;
        total += elemento.precio * listcant[id];
      });
      contenido += `Total:  ${formatPrecio(total)}`;
      contenido += `<button type="button" onclick="vaciarCarrito()">Vaciar Carrito</button>`;
      document.getElementById("mostrar-carrito").innerHTML = contenido;
    });
  }
};

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  contarProductosCarrito();
  window.location.reload();
}

let elimiminarProducto = (id) => {
  let carritoList = localStorage.getItem("carrito");
  carritoList = JSON.parse(carritoList);
  carritoList.splice(id, 1);
  if (carritoList.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carritoList));
  } else {
    localStorage.removeItem("carrito");
  }
  contarProductosCarrito();
  window.location.reload();
};

let mostrarDetalle = (id) => {
  document.getElementById("titulo-producto").innerText = productos[id].nombre;
  document.getElementById("descr-producto").innerText =
    productos[id].description;
  document.getElementById("detalle").style.display = "block";
};

let cerrarDetalle = () => {
  document.getElementById("detalle").style.display = "none";
};

let filtrarProductos = () => {
  let searchWord = document.getElementById("search").value;
  let min = document.getElementById("price-min").value;
  let max = document.getElementById("price-max").value;
  let marca = document.getElementById("marca").value;
  let prot = document.getElementById("protectores").checked;
  let entr = document.getElementById("entrenamiento").checked;
  let dob = document.getElementById("dobok").checked;

  let newList = productos;
  if (searchWord) {
    newList = newList.filter(
      (prod) =>
        prod.nombre.toLowerCase().includes(searchWord.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchWord.toLowerCase())
    );
  }
  if (min) {
    newList = newList.filter((prod) => prod.precio >= prod.precio >= min);
  }
  if (max) {
    newList = newList.filter((prod) => prod.precio <= prod.precio <= max);
  }
  if (marca !== "Todas") {
    newList = newList.filter((prod) => prod.marca === marca);
  }
  let categorias = [];
  if (prot) categorias.push("Protectores");
  if (entr) categorias.push("Entrenamiento");
  if (dob) categorias.push("Dobok");
  if (categorias.length > 0) {
    newList = newList.filter((prod) => categorias.includes(prod.categoria));
  }

  mostrarDetalle(newList);
};

let formatPrecio = (precio) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(precio);
};

let contarProductosCarrito = () => {
  const getCarrito = JSON.parse(localStorage.getItem("carrito"));
  if (getCarrito != null) {
    document.getElementById("cant-prod").innerText = getCarrito.length;
  }
};

let ordenarCatalogo = () => {
  const opt = document.getElementById("ordenar").value;
  let newProductos;
  switch (opt) {
    case "menor":
      newProductos = productos.sort((a, b) => a.precio - b.precio);
      break;
    case "mayor":
      newProductos = productos.sort((a, b) => b.precio - a.precio);
      break;
    case "az":
      newProductos = productos.sort((a, b) => {
        if (a.nombre.toUpperCase() < b.nombre.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      });
    case "za":
      newProductos = productos.sort((a, b) => {
        if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      });
      mostrarDetalle(newProductos);
  }
};
