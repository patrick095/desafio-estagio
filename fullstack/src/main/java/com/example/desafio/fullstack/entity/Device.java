package com.example.desafio.fullstack.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "deviceAdd")
@Entity
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_brand")
    private Brand brand;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_model")
    private Model model;

    @NotBlank
    private String processor;
    @NotBlank
    private String memory;
    @NotBlank
    private String screen;
    @NotBlank
    private String storage;
    private Boolean newDevice;
    private String description;



}
