package com.rentapp.bbsr.dto;

import jakarta.validation.constraints.*;

public class RoomRequestDTO {

    @NotBlank @Size(max = 120)
    private String name;

    @NotBlank @Pattern(regexp = "^[+0-9\\- ]{7,20}$", message = "Invalid phone number")
    private String phone;

    @NotNull @Positive
    private Double rent;

    @NotBlank @Size(max = 80)
    private String city;

    @Size(max = 100)
    private String area;

    @NotNull @DecimalMin("-90.0") @DecimalMax("90.0")
    private Double latitude;

    @NotNull @DecimalMin("-180.0") @DecimalMax("180.0")
    private Double longitude;

    private Boolean isAvailable = true;
    private String roomType;
    private String furnishing;
    private String amenities;
    @Size(max = 2000) private String description;
    private String imageUrl;

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
    public String getDescription() { return description; }
    public void setDescription(String v) { description = v; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String v) { imageUrl = v; }
}
