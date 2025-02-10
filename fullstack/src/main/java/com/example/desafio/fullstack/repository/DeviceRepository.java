package com.example.desafio.fullstack.repository;

import com.example.desafio.fullstack.entity.Device;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device>findAllBy(Pageable pageable);
}
