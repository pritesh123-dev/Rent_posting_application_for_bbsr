package com.rentapp.bbsr.dto;

import jakarta.validation.constraints.*;

public class RoomRequestDTO {

    @NotBlank
    @Size(max = 120)
    private String name;

    @NotBlank
    @Pattern(regexp = "^[+0-9\\- ]{7,20}$", message = "Invalid phone number")
    private String phone;

    @NotNull
    @Positive
    private Double rent;

    @NotBlank
    @Size(max = 80)
    private String city;

    @NotNull
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @NotNull
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    private Boolean isAvailable = true;

    @Size(max = 2000)
    private String description;

    private String imageUrl;

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
}
