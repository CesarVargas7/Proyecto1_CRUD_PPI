function obtenerDatos() {
    // Obtener los valores de los campos de entrada
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const genero = document.getElementById("genero").value;
    const edad = document.getElementById("edad").value;
    const peso = document.getElementById("peso").value;
    const estatura = document.getElementById("estatura").value;
    const telefono = document.getElementById("telefono").value;
    const grado = document.getElementById("gradoCinta").value;
    const fecha = document.getElementById("fechaIngreso").value;

    // Crear un objeto con los datos del alumno
    return alumno = {
        nombres: nombre,
        apellidos: apellido,
        genero: genero,
        edad: edad,
        peso: peso,
        estatura: estatura,
        telefono: telefono,
        gradoCinta: grado,
        fechaIngreso: fecha
    };
}

// Función para registrar un nuevo alumno
function registrarAlumno() {
    let alumno = obtenerDatos();

    // Realizar una solicitud POST al servicio backend
    fetch("http://localhost:8080/alumno/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(alumno)
    })
        .then(response => response.json())
        .then(data => {
            // Mostrar un mensaje de éxito
            alert("Alumno registrado exitosamente");
            // Limpiar los campos de entrada
            document.getElementById("registrarAlumno").reset();
        })
        .catch(error => {
            // Mostrar un mensaje de error
            alert(error);
            console.error(error);
        });
}

// Función para obtener los detalles de los alumnos
function obtenerDetalles() {
    console.log("hola")
    // Realizar una solicitud GET al servicio backend
    fetch("http://localhost:8080/alumno")
        .then(response => response.json())
        .then(data => {
            // Obtener la tabla donde se mostrarán los detalles
            const tabla = document.getElementsByTagName("table")[0];

            // Limpiar la tabla
            tabla.innerHTML = "";

            // Agregar las filas y columnas de la tabla
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");
            const encabezado = ["ID", "Nombre", "Apellido", "Genero", "Edad", "Peso", "Estatura", "Teléfono", "Grado", "Fecha de Ingreso", "Acciones"];
            const filaEncabezado = document.createElement("tr");

            for(campo of encabezado) {
                const th = document.createElement("th");
                th.textContent = campo;
                filaEncabezado.appendChild(th);
            }

            thead.appendChild(filaEncabezado);
            tabla.appendChild(thead);

            for(alumno of data) {
                const fila = document.createElement("tr");
                const columnas = [alumno.id, alumno.nombres, alumno.apellidos, alumno.genero, alumno.edad, alumno.peso, alumno.estatura, alumno.telefono, alumno.gradoCinta, alumno.fechaIngreso];

                for(valor of columnas) {
                    const td = document.createElement("td");
                    td.textContent = valor;
                    fila.appendChild(td);
                }

// Agregar botones de editar y eliminar
                const tdAcciones = document.createElement("td");
                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.onclick = function() { editarAlumno(); };
                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.onclick = function() { eliminarAlumno(); };
                tdAcciones.appendChild(btnEditar);
                tdAcciones.appendChild(btnEliminar);
                fila.appendChild(tdAcciones);

                tabla.appendChild(fila);            }

            tabla.appendChild(tbody);

        })
        .catch(error => {
            console.error(error);
        });
}

function editarAlumno() {
    // Mostrar el contenedor de edición
    document.getElementById("contenedorEditar").style.display = "block";
}

function eliminarAlumno() {
    // Mostrar el contenedor de confirmación de eliminación
    document.getElementById("contenedorEliminar").style.display = "block";
}

function confirmarEdicion() {
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombreC").value;
    const apellido = document.getElementById("apellidoC").value;
    const genero = document.getElementById("generoC").value;
    const edad = document.getElementById("edadC").value;
    const peso = document.getElementById("pesoC").value;
    const estatura = document.getElementById("estaturaC").value;
    const telefono = document.getElementById("telefonoC").value;
    const grado = document.getElementById("gradoCintaC").value;
    const fecha = document.getElementById("fechaIngresoC").value;

    // Crear un objeto con los datos del alumno
    alumno = {
        id: id,
        nombres: nombre,
        apellidos: apellido,
        genero: genero,
        edad: edad,
        peso: peso,
        estatura: estatura,
        telefono: telefono,
        gradoCinta: grado,
        fechaIngreso: fecha
    };

    //  solicitud PUT para actualizar al alumno
    fetch(`http://localhost:8080/alumno/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(alumno)
    })
        .then(response => response.json())
        .then(data => {
            // Mostrar un mensaje de éxito
            alert("Alumno editado exitosamente");
            // Limpiar los campos de entrada
            document.getElementById("registrarAlumno").reset();
        })
        .catch(error => {
            // Mostrar un mensaje de error
            alert(error);
            console.error(error);
        });

    document.getElementById("contenedorEditar").style.display = "none";
}

function confirmarEliminacion() {
    const id = document.getElementById("confirmarID").value;

    //  solicitud PUT para actualizar al alumno
    fetch(`http://localhost:8080/alumno/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }//,
        //body: JSON.stringify(id)
    })
        .then(response => response.json())
        .then(data => {
            // Mostrar un mensaje de éxito
            alert("Alumno eliminado exitosamente");
            // Limpiar los campos de entrada
        })
        .catch(error => {
            // Mostrar un mensaje de error
            alert(error);
            console.error("Alumno no encontrado");
        });
    // Aquí debes hacer una solicitud DELETE para eliminar al alumno
    document.getElementById("contenedorEliminar").style.display = "none";
}