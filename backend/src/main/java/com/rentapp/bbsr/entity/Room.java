package com.rentapp.bbsr.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
    name = "rooms",
    indexes = {
        @Index(name = "idx_room_city", columnList = "city"),
        @Index(name = "idx_room_lat_lng", columnList = "latitude, longitude"),
        @Index(name = "idx_room_available", columnList = "is_available"),
        @Index(name = "idx_room_type", columnList = "room_type"),
        @Index(name = "idx_room_rent", columnList = "rent")
    }
)
public class Room {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false)
    private Double rent;

    @Column(nullable = false, length = 80)
    private String city;

    @Column(length = 100)
    private String area;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable;

    @Column(name = "room_type", length = 20)
    private String roomType;

    @Column(length = 20)
    private String furnishing;

    @Column(length = 500)
    private String amenities;

    @Column
    private Boolean verified;

    @Column(length = 2000)
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Room() {}

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = Instant.now();
        if (isAvailable == null) isAvailable = true;
        if (verified == null) verified = false;
    }

    // Getters & setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public Double getRent() { return rent; }
    public void setRent(Double rent) { this.rent = rent; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }
    public String getFurnishing() { return furnishing; }
    public void setFurnishing(String furnishing) { this.furnishing = furnishing; }
    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }
    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean verified) { this.verified = verified; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Room r = new Room();
        public Builder name(String v) { r.name = v; return this; }
        public Builder phone(String v) { r.phone = v; return this; }
        public Builder rent(Double v) { r.rent = v; return this; }
        public Builder city(String v) { r.city = v; return this; }
        public Builder area(String v) { r.area = v; return this; }
        public Builder latitude(Double v) { r.latitude = v; return this; }
        public Builder longitude(Double v) { r.longitude = v; return this; }
        public Builder isAvailable(Boolean v) { r.isAvailable = v; return this; }
        public Builder roomType(String v) { r.roomType = v; return this; }
        public Builder furnishing(String v) { r.furnishing = v; return this; }
        public Builder amenities(String v) { r.amenities = v; return this; }
        public Builder verified(Boolean v) { r.verified = v; return this; }
        public Builder description(String v) { r.description = v; return this; }
        public Builder imageUrl(String v) { r.imageUrl = v; return this; }
        public Room build() { return r; }
    }
}
