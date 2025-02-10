package com.example.desafio.fullstack.controller;

import com.example.desafio.fullstack.DTO.DeviceDTO;
import com.example.desafio.fullstack.entity.Device;
import com.example.desafio.fullstack.service.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping(value = "/device")
public class DeviceController {

    private final DeviceService deviceService;

    @GetMapping
    public ResponseEntity<List<Device>> findAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(deviceService.getAllDispositivos(page, size));
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<Device> findById(@PathVariable Long id) {
       return ResponseEntity.ok(deviceService.getDeviceById(id));
    }

    @PostMapping
    public ResponseEntity<Void> saveDevice(@RequestBody DeviceDTO deviceDTO) {
        deviceService.createDevice(deviceDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Device> updateDevice( @RequestBody DeviceDTO deviceDTO) {
        return ResponseEntity.ok(deviceService.updateDevice(deviceDTO));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.noContent().build();
    }

}
