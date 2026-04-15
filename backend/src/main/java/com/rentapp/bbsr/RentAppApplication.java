package com.rentapp.bbsr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RentAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(RentAppApplication.class, args);
    }
}
