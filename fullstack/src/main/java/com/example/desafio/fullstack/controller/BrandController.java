package com.example.desafio.fullstack.controller;

import com.example.desafio.fullstack.entity.Brand;
import com.example.desafio.fullstack.service.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping(value = "/brand")
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public List<Brand> brandList() {
      return brandService.getAllBrand();
    }

}
