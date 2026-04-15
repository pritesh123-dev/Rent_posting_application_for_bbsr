package com.rentapp.bbsr.dto;

import java.time.Instant;
import java.util.UUID;

public class RoomResponseDTO {
    private UUID id;
    private String name;
    private String phone;
    private Double rent;
    private String city;
    private Double latitude;
    private Double longitude;
    private Boolean isAvailable;
    private String description;
    private String imageUrl;
    private Instant createdAt;
    private Double distanceKm;

    public RoomResponseDTO() {}

    public RoomResponseDTO(UUID id, String name, String phone, Double rent, String city,
                           Double latitude, Double longitude, Boolean isAvailable,
                           String description, String imageUrl, Instant createdAt, Double distanceKm) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.rent = rent;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isAvailable = isAvailable;
        this.description = description;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.distanceKm = distanceKm;
    }

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
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private UUID id;
        private String name;
        private String phone;
        private Double rent;
        private String city;
        private Double latitude;
        private Double longitude;
        private Boolean isAvailable;
        private String description;
        private String imageUrl;
        private Instant createdAt;
        private Double distanceKm;

        public Builder id(UUID id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder rent(Double rent) { this.rent = rent; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
        public Builder longitude(Double longitude) { this.longitude = longitude; return this; }
        public Builder isAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public Builder distanceKm(Double distanceKm) { this.distanceKm = distanceKm; return this; }

        public RoomResponseDTO build() {
            return new RoomResponseDTO(id, name, phone, rent, city, latitude, longitude,
                    isAvailable, description, imageUrl, createdAt, distanceKm);
        }
    }
}
