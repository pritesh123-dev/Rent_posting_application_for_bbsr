package com.rentapp.bbsr.dto;

import java.time.Instant;
import java.util.UUID;

public class RoomResponseDTO {
    private UUID id;
    private String name;
    private String phone;
    private Double rent;
    private String city;
    private String area;
    private Double latitude;
    private Double longitude;
    private Boolean isAvailable;
    private String roomType;
    private String furnishing;
    private String amenities;
    private Boolean verified;
    private String description;
    private String imageUrl;
    private Instant createdAt;
    private Double distanceKm;

    public RoomResponseDTO() {}

    public UUID getId() { return id; }
    public void setId(UUID v) { id = v; }
    public String getName() { return name; }
    public void setName(String v) { name = v; }
    public String getPhone() { return phone; }
    public void setPhone(String v) { phone = v; }
    public Double getRent() { return rent; }
    public void setRent(Double v) { rent = v; }
    public String getCity() { return city; }
    public void setCity(String v) { city = v; }
    public String getArea() { return area; }
    public void setArea(String v) { area = v; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double v) { latitude = v; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double v) { longitude = v; }
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean v) { isAvailable = v; }
    public String getRoomType() { return roomType; }
    public void setRoomType(String v) { roomType = v; }
    public String getFurnishing() { return furnishing; }
    public void setFurnishing(String v) { furnishing = v; }
    public String getAmenities() { return amenities; }
    public void setAmenities(String v) { amenities = v; }
    public Boolean getVerified() { return verified; }
    public void setVerified(Boolean v) { verified = v; }
    public String getDescription() { return description; }
    public void setDescription(String v) { description = v; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String v) { imageUrl = v; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant v) { createdAt = v; }
    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double v) { distanceKm = v; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final RoomResponseDTO d = new RoomResponseDTO();
        public Builder id(UUID v) { d.id = v; return this; }
        public Builder name(String v) { d.name = v; return this; }
        public Builder phone(String v) { d.phone = v; return this; }
        public Builder rent(Double v) { d.rent = v; return this; }
        public Builder city(String v) { d.city = v; return this; }
        public Builder area(String v) { d.area = v; return this; }
        public Builder latitude(Double v) { d.latitude = v; return this; }
        public Builder longitude(Double v) { d.longitude = v; return this; }
        public Builder isAvailable(Boolean v) { d.isAvailable = v; return this; }
        public Builder roomType(String v) { d.roomType = v; return this; }
        public Builder furnishing(String v) { d.furnishing = v; return this; }
        public Builder amenities(String v) { d.amenities = v; return this; }
        public Builder verified(Boolean v) { d.verified = v; return this; }
        public Builder description(String v) { d.description = v; return this; }
        public Builder imageUrl(String v) { d.imageUrl = v; return this; }
        public Builder createdAt(Instant v) { d.createdAt = v; return this; }
        public Builder distanceKm(Double v) { d.distanceKm = v; return this; }
        public RoomResponseDTO build() { return d; }
    }
}
