package com.rentapp.bbsr.config;

import com.rentapp.bbsr.entity.Room;
import com.rentapp.bbsr.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoomRepository repo;
    public DataSeeder(RoomRepository repo) { this.repo = repo; }

    @Override
    public void run(String... args) {
        if (repo.count() > 0) return;
        repo.saveAll(List.of(
            r("Rajesh - 1BHK Near KIIT", "+919876543210", 8500, "Patia", 20.3548, 85.8176, "1BHK", "FURNISHED", "AC,WiFi,Geyser,Parking", true, "Fully furnished 1BHK near KIIT Square. AC, geyser, WiFi, 24/7 water. Ground floor with parking."),
            r("Priya Hostel - Girls PG", "+919812345678", 5500, "Patia", 20.3565, 85.8198, "PG", "FURNISHED", "WiFi,Meals,Laundry,CCTV", true, "Girls PG, 5 min from KIIT. Single sharing, attached bath, home meals, WiFi."),
            r("Suresh - 2BHK Furnished", "+919900112233", 14000, "Patia", 20.3530, 85.8210, "2BHK", "FURNISHED", "AC,Fridge,Washing Machine,Power Backup,Modular Kitchen", true, "2BHK fully furnished near Patia Big Bazaar. 2 AC, modular kitchen, power backup."),
            r("Anil - Single Room KIIT", "+919678901234", 4500, "Patia", 20.3510, 85.8190, "SINGLE", "UNFURNISHED", "Water Included", true, "Single room for bachelor near KIIT campus. Shared kitchen and bathroom."),
            r("Mohan - 1BHK CSPur", "+919845671234", 10000, "Chandrasekharpur", 20.3300, 85.8200, "1BHK", "SEMI_FURNISHED", "Fan,Wardrobe", true, "Spacious 1BHK near Esplanade Mall. Semi-furnished. Bachelor and family."),
            r("Deepak - 2BHK HB Colony", "+919834567890", 12000, "Chandrasekharpur", 20.3280, 85.8230, "2BHK", "UNFURNISHED", "Parking,Power Backup", true, "2BHK in HB Colony. Close to DAV School and Apollo Hospital. Family only."),
            r("Rahul PG - Boys Hostel", "+919756781234", 6000, "Chandrasekharpur", 20.3310, 85.8180, "PG", "FURNISHED", "AC,WiFi,Meals,Laundry", true, "Boys PG with AC. Double sharing ₹6000. Meals included. Near Infocity."),
            r("Smita - 2BHK Saheed Nagar", "+919823456789", 15000, "Saheed Nagar", 20.2923, 85.8441, "2BHK", "FURNISHED", "AC,Lift,Parking,Gym", true, "Premium 2BHK on main road. 3rd floor with lift, parking. Fully furnished."),
            r("Bikash - 1BHK Saheed Nagar", "+919867890123", 9000, "Saheed Nagar", 20.2940, 85.8430, "1BHK", "SEMI_FURNISHED", "Fan,Geyser", true, "1BHK near bus stand. Semi-furnished. 24/7 water. Bachelor friendly."),
            r("Suman Girls PG", "+919789012345", 6500, "Saheed Nagar", 20.2935, 85.8450, "PG", "FURNISHED", "WiFi,Meals,CCTV,Laundry", true, "Girls-only PG. Clean rooms, attached bath. Veg meals, WiFi, CCTV."),
            r("Manoj - 1BHK Nayapalli", "+919890123456", 7000, "Nayapalli", 20.2975, 85.8070, "1BHK", "UNFURNISHED", "Balcony", true, "1BHK ground floor near Iskcon Temple. Peaceful residential area."),
            r("Ranjan - 2BHK Nayapalli", "+919801234567", 11000, "Nayapalli", 20.2960, 85.8050, "2BHK", "SEMI_FURNISHED", "Parking,Fan", false, "2BHK, 2nd floor, east-facing. Car parking. Close to Unit-6 market."),
            r("Sarita - 2BHK Jaydev Vihar", "+919912345678", 16000, "Jaydev Vihar", 20.2991, 85.8200, "2BHK", "FURNISHED", "AC,Gym,Modular Kitchen,Sofa,Dining Table", true, "Modern 2BHK near Jaydev Vihar Square. 5 min to Infocity. Gated community."),
            r("Ashok - Studio Jaydev Vihar", "+919923456789", 12000, "Jaydev Vihar", 20.2985, 85.8215, "STUDIO", "FURNISHED", "AC,WiFi,Power Backup", true, "Furnished studio near flyover. Best for IT professionals."),
            r("TechStay PG - Infocity", "+919834561234", 7500, "Infocity", 20.3400, 85.8100, "PG", "FURNISHED", "AC,WiFi,Breakfast,Housekeeping", true, "Premium boys PG near Infocity. For IT professionals at TCS, Infosys."),
            r("Laxmi - 1BHK Infovalley", "+919745678901", 8000, "Infovalley", 20.3420, 85.8080, "1BHK", "SEMI_FURNISHED", "Fan,Geyser,Balcony", true, "1BHK near IT park. Semi-furnished. 10 min walk to office."),
            r("Prakash - Room Rasulgarh", "+919856789012", 4000, "Rasulgarh", 20.2870, 85.8580, "SINGLE", "UNFURNISHED", "Water Included", true, "Affordable room near Rasulgarh bus stand. Attached bathroom."),
            r("Sunita - 2BHK Rasulgarh", "+919867891234", 10000, "Rasulgarh", 20.2885, 85.8560, "2BHK", "UNFURNISHED", "Balcony,Parking", true, "2BHK near Rasulgarh Chowk. Near railway station. Family preferred."),
            r("Gopi - 1BHK Mancheswar", "+919878901234", 6500, "Mancheswar", 20.3050, 85.8500, "1BHK", "SEMI_FURNISHED", "Fan,Bed", true, "1BHK near Industrial Estate. Budget-friendly for bachelors."),
            r("Tapan - 2BHK Khandagiri", "+919889012345", 9000, "Khandagiri", 20.2550, 85.7970, "2BHK", "UNFURNISHED", "Garden View,Parking", true, "2BHK near Khandagiri caves. Ground floor, independent entry. Family only."),
            r("Manas - 1BHK Baramunda", "+919890123457", 7500, "Baramunda", 20.2700, 85.8050, "1BHK", "SEMI_FURNISHED", "Fan", false, "1BHK near bus terminal. Near OUAT campus. Under renovation."),
            r("Ajay - 2BHK Bomikhal", "+919901234568", 13000, "Bomikhal", 20.2850, 85.8250, "2BHK", "SEMI_FURNISHED", "Modular Kitchen,Parking,Vitrified Tiles", true, "Newly built 2BHK near Utkal University. Modern finish."),
            r("Kavita - 1BHK Acharya Vihar", "+919912345679", 10000, "Acharya Vihar", 20.2960, 85.8310, "1BHK", "FURNISHED", "AC,Geyser,WiFi", true, "Furnished 1BHK near Acharya Vihar Square. Near OUAT, Utkal University."),
            r("Sanjay - 1BHK Delta Square", "+919923456780", 8000, "VSS Nagar", 20.2750, 85.8400, "1BHK", "SEMI_FURNISHED", "Lift,Fan", true, "1BHK near Delta Square. 2nd floor with lift. Near SUM Hospital."),
            r("Ritu - Studio VSS Nagar", "+919934567891", 6500, "VSS Nagar", 20.2800, 85.8400, "STUDIO", "FURNISHED", "AC,Fridge,Bed", true, "Compact furnished studio. Single occupancy only."),
            r("Bijay - Room Old Town", "+919945678902", 3500, "Old Town", 20.2500, 85.8350, "SINGLE", "UNFURNISHED", "Fan,Water Included", true, "Budget room near Lingaraj Temple. Simple with fan."),
            r("Pinki - 2BHK Master Canteen", "+919956789013", 11000, "Master Canteen", 20.2720, 85.8370, "2BHK", "SEMI_FURNISHED", "Wardrobe,Parking", true, "2BHK near railway station and Nicco Park. Family only."),
            r("Hemant - 1BHK Lingipur", "+919967890124", 5500, "Lingipur", 20.2650, 85.8700, "1BHK", "UNFURNISHED", "Modern Bathroom", true, "Affordable 1BHK near Daya River. Newly built. Quiet area."),
            r("Mitali - 1BHK Bapuji Nagar", "+919978901235", 9500, "Bapuji Nagar", 20.2730, 85.8200, "1BHK", "SEMI_FURNISHED", "Parking,Fan,Ventilation", true, "1BHK in prime location. Near Unit-4 market, Kalinga Hospital."),
            r("Dilip - 2BHK Unit-9", "+919989012346", 18000, "Unit-9", 20.2820, 85.8280, "2BHK", "FURNISHED", "AC,TV,Fridge,Washing Machine,Lift,Security,Power Backup", true, "Premium 2BHK. Fully furnished. 24/7 security, lift. Near Forum Mart.")
        ));
        System.out.println("Seeded 30 Bhubaneswar room listings with types, furnishing & amenities.");
    }

    private Room r(String name, String phone, double rent, String area, double lat, double lng,
                   String type, String furnishing, String amenities, boolean avail, String desc) {
        return Room.builder()
            .name(name).phone(phone).rent(rent).city("Bhubaneswar").area(area)
            .latitude(lat).longitude(lng).roomType(type).furnishing(furnishing)
            .amenities(amenities).isAvailable(avail).verified(true).description(desc)
            .build();
    }
}
