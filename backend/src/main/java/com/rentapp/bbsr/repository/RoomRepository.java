package com.rentapp.bbsr.repository;

import com.rentapp.bbsr.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {

    @Query("""
        SELECT r FROM Room r
        WHERE (:city IS NULL OR LOWER(CAST(r.city AS string)) LIKE LOWER(CAST(CONCAT('%', :city, '%') AS string)))
          AND (:minRent IS NULL OR r.rent >= :minRent)
          AND (:maxRent IS NULL OR r.rent <= :maxRent)
          AND (:available IS NULL OR r.isAvailable = :available)
          AND (:minLat IS NULL OR r.latitude BETWEEN :minLat AND :maxLat)
          AND (:minLng IS NULL OR r.longitude BETWEEN :minLng AND :maxLng)
        ORDER BY r.createdAt DESC
    """)
    Page<Room> search(
        @Param("city") String city,
        @Param("minRent") Double minRent,
        @Param("maxRent") Double maxRent,
        @Param("available") Boolean available,
        @Param("minLat") Double minLat,
        @Param("maxLat") Double maxLat,
        @Param("minLng") Double minLng,
        @Param("maxLng") Double maxLng,
        Pageable pageable
    );
}
