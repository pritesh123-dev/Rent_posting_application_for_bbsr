package com.rentapp.bbsr.service;

import com.rentapp.bbsr.dto.RoomRequestDTO;
import com.rentapp.bbsr.dto.RoomResponseDTO;
import com.rentapp.bbsr.entity.Room;
import com.rentapp.bbsr.exception.ApiException;
import com.rentapp.bbsr.repository.RoomRepository;
import com.rentapp.bbsr.util.DistanceCalculator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository repository;

    @Value("${app.listing.free-limit:2000}")
    private long freeLimit;

    public RoomServiceImpl(RoomRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    @CacheEvict(value = {"rooms", "nearby"}, allEntries = true)
    public RoomResponseDTO create(RoomRequestDTO dto) {
        if (repository.count() >= freeLimit) {
            throw new ApiException(HttpStatus.PAYMENT_REQUIRED,
                "Free listing limit (" + freeLimit + ") reached.");
        }
        Room room = Room.builder()
                .name(dto.getName()).phone(dto.getPhone()).rent(dto.getRent())
                .city(dto.getCity()).area(dto.getArea())
                .latitude(dto.getLatitude()).longitude(dto.getLongitude())
                .isAvailable(dto.getIsAvailable() == null ? Boolean.TRUE : dto.getIsAvailable())
                .roomType(dto.getRoomType()).furnishing(dto.getFurnishing())
                .amenities(dto.getAmenities())
                .description(dto.getDescription()).imageUrl(dto.getImageUrl())
                .build();
        return toDto(repository.save(room), null);
    }

    @Override
    @Transactional(readOnly = true)
    public RoomResponseDTO get(UUID id) {
        Room r = repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Room not found"));
        return toDto(r, null);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RoomResponseDTO> list(String city, Double minRent, Double maxRent,
                                       Boolean available, String roomType, String furnishing, Pageable pageable) {
        return repository.search(city, minRent, maxRent, available, roomType, furnishing,
                null, null, null, null, pageable).map(r -> toDto(r, null));
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoomResponseDTO> findNearby(double lat, double lng, double radiusKm,
                                             Double maxRent, Boolean available, String roomType, String furnishing) {
        double[] bb = DistanceCalculator.boundingBox(lat, lng, radiusKm);
        var candidates = repository.search(null, null, maxRent, available, roomType, furnishing,
                bb[0], bb[1], bb[2], bb[3], Pageable.ofSize(500)).getContent();
        return candidates.stream()
                .map(r -> toDto(r, DistanceCalculator.haversineKm(lat, lng, r.getLatitude(), r.getLongitude())))
                .filter(r -> r.getDistanceKm() <= radiusKm)
                .sorted(Comparator.comparingDouble(RoomResponseDTO::getDistanceKm))
                .toList();
    }

    @Override
    @Transactional
    @CacheEvict(value = {"rooms", "nearby"}, allEntries = true)
    public RoomResponseDTO updateAvailability(UUID id, boolean available) {
        Room r = repository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Room not found"));
        r.setIsAvailable(available);
        return toDto(repository.save(r), null);
    }

    @Override
    public long totalListings() { return repository.count(); }

    private RoomResponseDTO toDto(Room r, Double distanceKm) {
        return RoomResponseDTO.builder()
                .id(r.getId()).name(r.getName()).phone(r.getPhone()).rent(r.getRent())
                .city(r.getCity()).area(r.getArea())
                .latitude(r.getLatitude()).longitude(r.getLongitude())
                .isAvailable(r.getIsAvailable())
                .roomType(r.getRoomType()).furnishing(r.getFurnishing())
                .amenities(r.getAmenities()).verified(r.getVerified())
                .description(r.getDescription()).imageUrl(r.getImageUrl())
                .createdAt(r.getCreatedAt()).distanceKm(distanceKm)
                .build();
    }
}
