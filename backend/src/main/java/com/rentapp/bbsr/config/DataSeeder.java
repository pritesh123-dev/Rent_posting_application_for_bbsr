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

        List<Room> rooms = List.of(
            room("Rajesh - 1BHK Near KIIT Square", "+919876543210", 8500, 20.3548, 85.8176, true,
                "1BHK fully furnished flat near KIIT Square. AC, geyser, WiFi, 24/7 water supply. Ground floor with parking."),
            room("Priya Hostel - Girls PG Patia", "+919812345678", 5500, 20.3565, 85.8198, true,
                "Girls PG in Patia, 5 min walk from KIIT. Single sharing with attached bath, home meals, WiFi, laundry."),
            room("Suresh - 2BHK Furnished Patia", "+919900112233", 14000, 20.3530, 85.8210, true,
                "2BHK fully furnished near Patia Big Bazaar. 2 AC rooms, modular kitchen, fridge, washing machine, power backup."),
            room("Anil - Single Room KIIT Road", "+919678901234", 4500, 20.3510, 85.8190, true,
                "Single room for bachelor near KIIT campus. Shared kitchen and bathroom. Electricity and water included."),
            room("Mohan - 1BHK Chandrasekharpur", "+919845671234", 10000, 20.3300, 85.8200, true,
                "Spacious 1BHK near Esplanade Mall. Semi-furnished with wardrobe and fan. Both family and bachelor allowed."),
            room("Deepak - 2BHK CSPur HB Colony", "+919834567890", 12000, 20.3280, 85.8230, true,
                "2BHK in HB Colony, Chandrasekharpur. Close to DAV School and Apollo Hospital. Freshly painted. Family only."),
            room("Rahul PG - Boys Hostel CSPur", "+919756781234", 6000, 20.3310, 85.8180, true,
                "Boys PG with AC rooms. Double sharing. Meals included. Near Infocity bus stop. WiFi and laundry available."),
            room("Smita - 2BHK Saheed Nagar", "+919823456789", 15000, 20.2923, 85.8441, true,
                "Premium 2BHK on Saheed Nagar main road. 3rd floor with lift, car parking. Fully furnished with AC."),
            room("Bikash - 1BHK Saheed Nagar", "+919867890123", 9000, 20.2940, 85.8430, true,
                "1BHK flat near Saheed Nagar bus stand. Semi-furnished. 24/7 water, separate electricity meter. Bachelor friendly."),
            room("Suman Girls PG - Saheed Nagar", "+919789012345", 6500, 20.2935, 85.8450, true,
                "Girls-only PG in Saheed Nagar. Clean rooms with attached bath. Veg meals, WiFi, CCTV security."),
            room("Manoj - 1BHK Nayapalli", "+919890123456", 7000, 20.2975, 85.8070, true,
                "1BHK ground floor in Nayapalli. Peaceful area near Iskcon Temple. Attached bathroom and small balcony."),
            room("Ranjan - 2BHK Nayapalli", "+919801234567", 11000, 20.2960, 85.8050, false,
                "2BHK in Nayapalli Housing Board Colony. 2nd floor, east-facing. Car parking. Close to Unit-6 market."),
            room("Sarita - 2BHK Jaydev Vihar", "+919912345678", 16000, 20.2991, 85.8200, true,
                "Modern 2BHK near Jaydev Vihar Square. 5 min to Infocity. 2 AC, sofa, modular kitchen. Gated community with gym."),
            room("Ashok - Studio Jaydev Vihar", "+919923456789", 12000, 20.2985, 85.8215, true,
                "Furnished studio apartment near Jaydev Vihar flyover. AC, WiFi, power backup. Best for IT professionals."),
            room("TechStay PG - Near Infocity", "+919834561234", 7500, 20.3400, 85.8100, true,
                "Premium boys PG near Infocity. Furnished AC rooms, high-speed WiFi, breakfast. For IT professionals at TCS, Infosys."),
            room("Laxmi - 1BHK Infovalley", "+919745678901", 8000, 20.3420, 85.8080, true,
                "1BHK near Infovalley IT park. Semi-furnished with fan and geyser. 10 min walk to office."),
            room("Prakash - Single Room Rasulgarh", "+919856789012", 4000, 20.2870, 85.8580, true,
                "Affordable single room in Rasulgarh near bus stand. Attached bathroom, 24/7 water. Good for working bachelor."),
            room("Sunita - 2BHK Rasulgarh", "+919867891234", 10000, 20.2885, 85.8560, true,
                "2BHK near Rasulgarh Chowk. Near railway station and ISBT. 1st floor with balcony. Family preferred."),
            room("Gopi - 1BHK Mancheswar", "+919878901234", 6500, 20.3050, 85.8500, true,
                "1BHK near Mancheswar Industrial Estate. Budget-friendly for bachelors. Basic furnishing with bed and fan."),
            room("Tapan - 2BHK Khandagiri", "+919889012345", 9000, 20.2550, 85.7970, true,
                "2BHK near Khandagiri caves. Peaceful with garden view. Ground floor, independent entry. Family only."),
            room("Manas - 1BHK Baramunda", "+919890123457", 7500, 20.2700, 85.8050, false,
                "1BHK near Baramunda bus terminal. Near OUAT campus. Under renovation, available next month."),
            room("Ajay - 2BHK Bomikhal", "+919901234568", 13000, 20.2850, 85.8250, true,
                "Newly constructed 2BHK in Bomikhal. Near Utkal University. Vitrified tiles, modular kitchen, parking."),
            room("Kavita - 1BHK Acharya Vihar", "+919912345679", 10000, 20.2960, 85.8310, true,
                "1BHK furnished flat near Acharya Vihar Square. AC, geyser, WiFi. Near OUAT, Utkal University."),
            room("Sanjay - 1BHK Delta Square", "+919923456780", 8000, 20.2750, 85.8400, true,
                "1BHK near Delta Square, VSS Nagar. 2nd floor with lift. Walking distance to SUM Hospital."),
            room("Ritu - Studio VSS Nagar", "+919934567891", 6500, 20.2800, 85.8400, true,
                "Compact studio in VSS Nagar. Fully furnished with bed, AC, small fridge. Single occupancy only."),
            room("Bijay - Single Room Old Town", "+919945678902", 3500, 20.2500, 85.8350, true,
                "Budget single room in Old Town near Lingaraj Temple. Simple room with fan. Rent includes water."),
            room("Pinki - 2BHK Master Canteen", "+919956789013", 11000, 20.2720, 85.8370, true,
                "2BHK in Master Canteen area. Close to railway station and Nicco Park. Semi-furnished. Family only."),
            room("Hemant - 1BHK Lingipur", "+919967890124", 5500, 20.2650, 85.8700, true,
                "Affordable 1BHK in Lingipur near Daya River. Newly built with modern bathroom. Quiet area."),
            room("Mitali - 1BHK Bapuji Nagar", "+919978901235", 9500, 20.2730, 85.8200, true,
                "1BHK in prime Bapuji Nagar. Walking distance to Unit-4 market, Kalinga Hospital. Covered parking."),
            room("Dilip - 2BHK Unit-9 Premium", "+919989012346", 18000, 20.2820, 85.8280, true,
                "Premium 2BHK in Unit-9. Fully furnished - 2 AC, TV, fridge, washing machine. 24/7 security, lift.")
        );

        repo.saveAll(rooms);
        System.out.println("Seeded " + rooms.size() + " Bhubaneswar room listings.");
    }

    private Room room(String name, String phone, double rent, double lat, double lng, boolean avail, String desc) {
        return Room.builder()
            .name(name).phone(phone).rent(rent)
            .city("Bhubaneswar").latitude(lat).longitude(lng)
            .isAvailable(avail).description(desc)
            .build();
    }
}
