package com.example.TKD.service;

import com.example.TKD.Models.AlumnoModel;
import com.example.TKD.repositories.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AlumnoService {
    @Autowired
    AlumnoRepository alumnoRepository;

    // Obtener todos los usuarios registrados
    public ArrayList<AlumnoModel> findAllStudents() {
        return (ArrayList<AlumnoModel>) alumnoRepository.findAll();
    }

    // Guardar un usuario
    public AlumnoModel saveStudent(AlumnoModel alumno) {
        return alumnoRepository.save(alumno);
    }


    // Buscar por id
    public ArrayList<AlumnoModel> findById(Integer id) {
        return alumnoRepository.findById(id);
    }

    // Buscar por nombre
    public ArrayList<AlumnoModel> findByNombres(String nombres) {
        return  alumnoRepository.findByNombres(nombres);
    }

    // Eliminar un usuario
    public void deleteStudent(Long id) throws Exception {
        if(alumnoRepository.existsById(id)) {
            alumnoRepository.deleteById(id);
        } else {
            throw new Exception("El alumno con el ID " + id + " no existe.");
        }
    }
}
