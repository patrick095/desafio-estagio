package com.example.desafio.fullstack.controller;

import com.example.desafio.fullstack.entity.Model;
import com.example.desafio.fullstack.service.ModelService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping(value = "/model")
public class ModelController {

    private final ModelService modelService;

    @GetMapping(value = "{id}")
    public List<Model> listarModelos(@PathVariable Long id) {
       return modelService.getModel(id);
    }
}
