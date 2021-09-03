package com.example.nallai_backend.Repository;

import com.example.nallai_backend.Model.VehiclePart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VehiclePartRepository extends JpaRepository<VehiclePart, Integer> {

    @Query("Select p from VehiclePart p where p.name like %?1%"
            + " or p.desc like %?1%")
    public List<VehiclePart> findAll(String searchKey);
}
