package com.example.TKD.Controllers;

import com.example.TKD.Models.AlumnoModel;
import com.example.TKD.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return alumnoService.saveStudent(alumno);
    }

    @PutMapping()
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
}
