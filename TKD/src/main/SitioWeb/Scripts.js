// Función para registrar un nuevo alumno
function registrarAlumno() {
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
    const alumno = {
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
            alert("Error al registrar al alumno");
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
            const encabezado = ["ID", "Nombre", "Apellido", "Genero", "Edad", "Peso", "Estatura", "Teléfono", "Grado", "Fecha de Ingreso"];
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

                tbody.appendChild(fila);
            }

            tabla.appendChild(tbody);
        })
        .catch(error => {
            console.error(error);
        });
}