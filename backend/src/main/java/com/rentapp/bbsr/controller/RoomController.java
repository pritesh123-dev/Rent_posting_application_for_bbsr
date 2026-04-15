package com.rentapp.bbsr.controller;

import com.rentapp.bbsr.dto.ApiResponse;
import com.rentapp.bbsr.dto.RoomRequestDTO;
import com.rentapp.bbsr.dto.RoomResponseDTO;
import com.rentapp.bbsr.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomService service;

    public RoomController(RoomService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoomResponseDTO>> create(@Valid @RequestBody RoomRequestDTO dto) {
        RoomResponseDTO saved = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Room posted successfully", saved));
    }

    @GetMapping
    public ApiResponse<Page<RoomResponseDTO>> list(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double minRent,
            @RequestParam(required = false) Double maxRent,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort) {

        String[] sp = sort.split(",");
        Sort s = Sort.by(sp.length > 1 && "asc".equalsIgnoreCase(sp[1])
                ? Sort.Direction.ASC : Sort.Direction.DESC, sp[0]);
        return ApiResponse.ok(service.list(city, minRent, maxRent, available, PageRequest.of(page, size, s)));
    }

    @GetMapping("/nearby")
    public ApiResponse<List<RoomResponseDTO>> nearby(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "5") double radiusKm,
            @RequestParam(required = false) Double maxRent,
            @RequestParam(required = false) Boolean available) {
        return ApiResponse.ok(service.findNearby(lat, lng, radiusKm, maxRent, available));
    }

    @GetMapping("/{id}")
    public ApiResponse<RoomResponseDTO> get(@PathVariable UUID id) {
        return ApiResponse.ok(service.get(id));
    }

    @PatchMapping("/{id}/availability")
    public ApiResponse<RoomResponseDTO> updateAvailability(
            @PathVariable UUID id,
            @RequestBody Map<String, Boolean> body) {
        boolean available = Boolean.TRUE.equals(body.get("isAvailable"));
        return ApiResponse.ok(service.updateAvailability(id, available));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> stats() {
        long total = service.totalListings();
        return ApiResponse.ok(Map.of("totalListings", total, "freeRemaining", Math.max(0, 2000 - total)));
    }
}
