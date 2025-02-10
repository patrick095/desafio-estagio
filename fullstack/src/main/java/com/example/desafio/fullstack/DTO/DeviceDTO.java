package com.example.desafio.fullstack.DTO;


public record DeviceDTO(Long id,
        Long brandId, Long modelId,
        String processor, String memory,
        String screen, String storage, Boolean newDevice, String description) {
}
