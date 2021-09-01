package com.example.nallai_backend.Controller;

import com.example.nallai_backend.Model.VehiclePart;
import com.example.nallai_backend.Repository.VehiclePartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.nallai_backend.Model.VehiclePart;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/parts/")
public class VehiclePartController {

    @Autowired
    private VehiclePartRepository repo;

    @GetMapping("viewParts")
    public List<VehiclePart> getParts(){
        return repo.findAll();
    }

    @GetMapping("viewParts/{id}")
    public ResponseEntity<VehiclePart> getParts(@PathVariable int id){

        VehiclePart vpart = repo.findById(id).orElseThrow(()-> new NoSuchElementException("Part not found"));
        return ResponseEntity.ok(vpart);

    }

    @PostMapping("addParts")
    public ResponseEntity<Object> addPart(@RequestBody VehiclePart part){
        repo.save(part);
        return new ResponseEntity<Object>("Part is added", HttpStatus.OK);
    }

    @PutMapping("updatePart/{id}")
    public ResponseEntity<?> updatePart(@PathVariable int id, @RequestBody VehiclePart part){
        try{
            VehiclePart exs_part = repo.getById(id);
            exs_part.setName(part.getName());
            exs_part.setDesc(part.getDesc());
            exs_part.setPrice(part.getPrice());
            exs_part.setAvailability(part.isAvailability());
            exs_part.setShelfNo(part.getShelfNo());

            VehiclePart updated_part = repo.save(exs_part);

            return ResponseEntity.ok(updated_part);

        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Part Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("deletePart/{id}")
    public ResponseEntity<?> deletePart(@PathVariable int id){
        try{
            repo.deleteById(id);
            return new ResponseEntity<Object>("Part is deleted", HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Object>("Part Not found", HttpStatus.NOT_FOUND);
        }
    }
}
