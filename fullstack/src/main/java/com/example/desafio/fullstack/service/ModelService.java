package com.example.desafio.fullstack.service;

import com.example.desafio.fullstack.entity.Brand;
import com.example.desafio.fullstack.entity.Model;
import com.example.desafio.fullstack.repository.BrandRepository;
import com.example.desafio.fullstack.repository.ModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ModelService {

    private final ModelRepository modelRepository;
    private final BrandRepository brandRepository;

    public List<Model> getModel(Long id) {
        Optional<Brand> brand = brandRepository.findById(id);

        if (brand.isEmpty()){
            return modelRepository.findAll();
        }
        return brand.get().getModels();
    }
}
