package com.example.desafio.fullstack.service;

import com.example.desafio.fullstack.DTO.DeviceDTO;
import com.example.desafio.fullstack.entity.Brand;
import com.example.desafio.fullstack.entity.Device;
import com.example.desafio.fullstack.entity.Model;
import com.example.desafio.fullstack.exception.MissingIdException;
import com.example.desafio.fullstack.repository.DeviceRepository;
import com.example.desafio.fullstack.repository.BrandRepository;
import com.example.desafio.fullstack.repository.ModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeviceService {


    private final DeviceRepository deviceRepository;
    private final BrandRepository brandRepository;
    private final ModelRepository modelRepository;

    
    public List<Device> getAllDispositivos(int page, int size) {
       Page<Device> pageDevice = deviceRepository.findAll(PageRequest.of(page, size));
       return pageDevice.getContent();
    }
    
    public void createDevice(@RequestBody DeviceDTO deviceDTO) {

        if (deviceDTO.brandId() == null || deviceDTO.modelId() == null) {
            throw new MissingIdException("Id não pode ser nulo");
        }

        Brand brand = brandRepository.findById(deviceDTO.brandId())
                .orElseThrow(() -> new IllegalArgumentException("Marca não encontrada"));

        Model model = modelRepository.findById(deviceDTO.modelId())
                .orElseThrow(() -> new IllegalArgumentException("Modelo não encontrado"));

            Device newDevice =
                    new Device(null, brand, model, deviceDTO.processor(),
                            deviceDTO.memory(), deviceDTO.screen(), deviceDTO.storage(),
                            deviceDTO.newDevice(), deviceDTO.description());

            deviceRepository.save(newDevice);
    }
    public Device updateDevice( DeviceDTO deviceDTO) {

            if (deviceDTO.brandId() == null || deviceDTO.modelId() == null) {
                throw new IllegalArgumentException("MarcaID e ModeloID não pode ser nulo  ");
            }

            Device oldDis = deviceRepository.findById(deviceDTO.id())
                    .orElseThrow(()-> new IllegalArgumentException("Dispositivo não encontrado"));

            Brand brand = brandRepository.findById(deviceDTO.brandId())
                    .orElseThrow(() -> new IllegalArgumentException("Marca não encontrada"));

            Model model = modelRepository.findById(deviceDTO.modelId())
                    .orElseThrow(() -> new IllegalArgumentException("Modelo não encontrado"));

            newDevice(deviceDTO, oldDis, brand, model);

           return deviceRepository.save(oldDis);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    public Device getDeviceById(Long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    private static void newDevice(DeviceDTO deviceDTO, Device oldDis, Brand brand, Model model) {
        oldDis.setNewDevice(deviceDTO.newDevice());
        oldDis.setDescription(deviceDTO.description());
        oldDis.setStorage(deviceDTO.storage());
        oldDis.setBrand(brand);
        oldDis.setMemory(deviceDTO.memory());
        oldDis.setModel(model);
        oldDis.setScreen(deviceDTO.screen());
        oldDis.setProcessor(deviceDTO.processor());
        oldDis.setDescription(deviceDTO.description());
    }
}


