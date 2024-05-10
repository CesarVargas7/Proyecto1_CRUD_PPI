package com.example.TKD.Controllers;

import com.example.TKD.Models.AlumnoModel;
import com.example.TKD.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

@RestController
@RequestMapping("/alumno")
@CrossOrigin(origins = "*")
public class AlumnoController {
    @Autowired
    AlumnoService alumnoService;

    //get
    @GetMapping
    public ArrayList<AlumnoModel> findAllStudents() {
        return alumnoService.findAllStudents();
    }

    //post
    @PostMapping(path ="/add")
    public AlumnoModel saveStudent(@RequestBody AlumnoModel alumno) {
        if(haveEmptyFields(alumno)) {
            // Lanza una excepción cuando se encuentran campos vacíos
            // código
        }
        return alumnoService.saveStudent(alumno);
    }
    @CrossOrigin(origins = "*")
    @PutMapping(path = "/edit/")
    public AlumnoModel updateStudent(@RequestBody AlumnoModel alumno) {
        return alumnoService.saveStudent(alumno);
    }

    // Buscar por ID
    @GetMapping(path ="/find-by-id") // localhost:8080/alumno/find-by-id?
    public ArrayList<AlumnoModel> findById(@RequestParam("id")Integer id) {
        return alumnoService.findById(id);
    }

    // Buscar por nombre
    @GetMapping(path ="/find-by-nombres") // localhost:8080/alumno/find-by-name?
    public ArrayList<AlumnoModel> findByNombres(@RequestParam("nombres")String nombres) {
        return alumnoService.findByNombres(nombres);
    }

    //delete
    @DeleteMapping(path ="/delete/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable("id") Long id) {
        try {
            alumnoService.deleteStudent(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Validaciones

    private boolean haveEmptyFields(AlumnoModel alumno) {
        if(alumno.getNombres() == null || alumno.getNombres().isEmpty() || alumno.getNombres().isBlank()) {
            return true;
        }
        if(alumno.getEdad() == null) {
            return true;
        }
        if(alumno.getPeso() == null) {
            return true;
        }
        if(alumno.getEstatura() == null) {
            return true;
        }
        if(alumno.getGradoCinta() == null || alumno.getGradoCinta().isEmpty() || alumno.getGradoCinta().isBlank()) {
            return true;
        }
        if(alumno.getFechaIngreso() == null || alumno.getFechaIngreso().isEmpty() || alumno.getFechaIngreso().isBlank()) {
            return true;
        }
        if(alumno.getTelefono() == null || alumno.getTelefono().isEmpty() || alumno.getTelefono().isBlank()) {
            return true;
        }
        // Si no entra en ninguna de las validaciones
        // se interpreta que haveEmptyFields == false, es decir, no aplica
        return false;
    }

    private boolean haveInvalidFields(AlumnoModel alumno) {
        if(alumno.getEdad() <= 0) {
            return true;
        }
        if(alumno.getPeso() <= 0) {
            return true;
        }
        if(alumno.getEstatura() < 80) {
            return true;
        }
        // Si no entra en ninguna de las validaciones
        // se interpreta que haveInvalidFields == false, es decir, no aplica
        return false;
    }
}
