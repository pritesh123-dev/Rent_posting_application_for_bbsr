package com.rentapp.bbsr.service;

import com.rentapp.bbsr.dto.RoomRequestDTO;
import com.rentapp.bbsr.dto.RoomResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface RoomService {
    RoomResponseDTO create(RoomRequestDTO dto);
    RoomResponseDTO get(UUID id);
    Page<RoomResponseDTO> list(String city, Double minRent, Double maxRent, Boolean available,
                                String roomType, String furnishing, Pageable pageable);
    List<RoomResponseDTO> findNearby(double lat, double lng, double radiusKm,
                                      Double maxRent, Boolean available, String roomType, String furnishing);
    RoomResponseDTO updateAvailability(UUID id, boolean available);
    long totalListings();
}
