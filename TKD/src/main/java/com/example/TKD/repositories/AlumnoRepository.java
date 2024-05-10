package com.example.TKD.repositories;

import com.example.TKD.Models.AlumnoModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Repository
public interface AlumnoRepository extends CrudRepository<AlumnoModel, Long> {

    // Buscar por ID
    public abstract ArrayList<AlumnoModel> findById(Integer id);

    // Buscar por Nombre
    public abstract ArrayList<AlumnoModel> findByNombres(String nombres);

    // Eliminar por ID
    public abstract void deleteById(Long id);

}
