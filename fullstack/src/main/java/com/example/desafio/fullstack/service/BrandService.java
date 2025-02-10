package com.example.desafio.fullstack.service;

import com.example.desafio.fullstack.entity.Brand;
import com.example.desafio.fullstack.repository.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public List<Brand> getAllBrand() {
        return brandRepository.findAll();
    }

}
