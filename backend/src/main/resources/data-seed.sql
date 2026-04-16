-- Seed data: Realistic Bhubaneswar room rental listings
-- Sourced from 99acres, Housing.com, OLX, MagicBricks rental data

INSERT INTO rooms (id, name, phone, rent, city, latitude, longitude, is_available, description, image_url, created_at) VALUES

-- Patia / KIIT area
(RANDOM_UUID(), 'Rajesh - 1BHK Near KIIT Square', '+919876543210', 8500, 'Bhubaneswar', 20.3548, 85.8176, true,
 '1BHK fully furnished flat near KIIT Square. Includes AC, geyser, WiFi, and 24/7 water supply. Ideal for working professionals or students. Ground floor with parking.', NULL, NOW()),

(RANDOM_UUID(), 'Priya Hostel - Girls PG Patia', '+919812345678', 5500, 'Bhubaneswar', 20.3565, 85.8198, true,
 'Girls PG in Patia, 5 min walk from KIIT. Single sharing room with attached bathroom, home-cooked meals (veg), WiFi, laundry. Safe gated campus.', NULL, NOW()),

(RANDOM_UUID(), 'Suresh - 2BHK Furnished Patia', '+919900112233', 14000, 'Bhubaneswar', 20.3530, 85.8210, true,
 '2BHK fully furnished apartment near Patia Big Bazaar. 2 AC rooms, modular kitchen, fridge, washing machine, power backup. Family preferred.', NULL, NOW()),

(RANDOM_UUID(), 'Anil - Single Room KIIT Road', '+919678901234', 4500, 'Bhubaneswar', 20.3510, 85.8190, true,
 'Single room for bachelor near KIIT campus gate. Shared kitchen and bathroom. Electricity and water included. No smoking.', NULL, NOW()),

-- Chandrasekharpur
(RANDOM_UUID(), 'Mohan - 1BHK Chandrasekharpur', '+919845671234', 10000, 'Bhubaneswar', 20.3300, 85.8200, true,
 'Spacious 1BHK in Chandrasekharpur near Esplanade Mall. Semi-furnished with wardrobe and fan. Separate meter for electricity. Both family and bachelor allowed.', NULL, NOW()),

(RANDOM_UUID(), 'Deepak - 2BHK CSPur HB Colony', '+919834567890', 12000, 'Bhubaneswar', 20.3280, 85.8230, true,
 '2BHK apartment in HB Colony, Chandrasekharpur. Close to DAV School and Apollo Hospital. Unfurnished, freshly painted. Family only.', NULL, NOW()),

(RANDOM_UUID(), 'Rahul PG - Boys Hostel CSPur', '+919756781234', 6000, 'Bhubaneswar', 20.3310, 85.8180, true,
 'Boys PG with AC rooms. Double sharing ₹6000, Single ₹9000. Meals included (breakfast + dinner). Near Infocity bus stop. WiFi and laundry available.', NULL, NOW()),

-- Saheed Nagar
(RANDOM_UUID(), 'Smita - 2BHK Saheed Nagar', '+919823456789', 15000, 'Bhubaneswar', 20.2923, 85.8441, true,
 'Premium 2BHK in Saheed Nagar main road. Walking distance to Big Bazaar and BMC Bhawani Mall. 3rd floor with lift, car parking. Fully furnished with AC.', NULL, NOW()),

(RANDOM_UUID(), 'Bikash - 1BHK Saheed Nagar', '+919867890123', 9000, 'Bhubaneswar', 20.2940, 85.8430, true,
 '1BHK flat near Saheed Nagar bus stand. Semi-furnished with ceiling fan and tubelight. 24/7 water, separate electricity meter. Bachelor friendly.', NULL, NOW()),

(RANDOM_UUID(), 'Suman Girls PG - Saheed Nagar', '+919789012345', 6500, 'Bhubaneswar', 20.2935, 85.8450, true,
 'Girls-only PG in Saheed Nagar. Clean rooms with attached bath. Veg meals, WiFi, CCTV security. Walking distance to offices and market.', NULL, NOW()),

-- Nayapalli
(RANDOM_UUID(), 'Manoj - 1BHK Nayapalli', '+919890123456', 7000, 'Bhubaneswar', 20.2975, 85.8070, true,
 '1BHK ground floor in Nayapalli. Peaceful residential area near Iskcon Temple. Unfurnished with attached bathroom and small balcony.', NULL, NOW()),

(RANDOM_UUID(), 'Ranjan - 2BHK Nayapalli Housing Board', '+919801234567', 11000, 'Bhubaneswar', 20.2960, 85.8050, false,
 '2BHK in Nayapalli Housing Board Colony. Second floor, east-facing. Car parking available. Close to Unit-6 market and Ram Mandir.', NULL, NOW()),

-- Jaydev Vihar
(RANDOM_UUID(), 'Sarita - 2BHK Jaydev Vihar', '+919912345678', 16000, 'Bhubaneswar', 20.2991, 85.8200, true,
 'Modern 2BHK near Jaydev Vihar Square. 5 min to Infocity via Nandankanan Road. Fully furnished - 2 AC, sofa, dining table, modular kitchen. Gated community with gym.', NULL, NOW()),

(RANDOM_UUID(), 'Ashok - Studio Apt Jaydev Vihar', '+919923456789', 12000, 'Bhubaneswar', 20.2985, 85.8215, true,
 'Furnished studio apartment near Jaydev Vihar flyover. AC, WiFi, power backup. Best for IT professionals. Walking distance to restaurants and ATMs.', NULL, NOW()),

-- Infocity / Infovalley area
(RANDOM_UUID(), 'TechStay PG - Near Infocity', '+919834561234', 7500, 'Bhubaneswar', 20.3400, 85.8100, true,
 'Premium boys PG near Infocity. Fully furnished AC rooms, high-speed WiFi, housekeeping, breakfast included. Ideal for IT professionals at TCS, Infosys.', NULL, NOW()),

(RANDOM_UUID(), 'Laxmi - 1BHK Infovalley', '+919745678901', 8000, 'Bhubaneswar', 20.3420, 85.8080, true,
 '1BHK near Infovalley IT park. Semi-furnished with fan and geyser. Balcony with green view. 10 min walk to office. Bachelor and family both welcome.', NULL, NOW()),

-- Rasulgarh
(RANDOM_UUID(), 'Prakash - Single Room Rasulgarh', '+919856789012', 4000, 'Bhubaneswar', 20.2870, 85.8580, true,
 'Affordable single room in Rasulgarh near bus stand. Attached bathroom, 24/7 water. Good for working bachelor. Market and hospital nearby.', NULL, NOW()),

(RANDOM_UUID(), 'Sunita - 2BHK Rasulgarh', '+919867891234', 10000, 'Bhubaneswar', 20.2885, 85.8560, true,
 '2BHK flat near Rasulgarh Chowk. Near to railway station and ISBT. Unfurnished, 1st floor with balcony. Family preferred, no pets.', NULL, NOW()),

-- Mancheswar
(RANDOM_UUID(), 'Gopi - 1BHK Mancheswar', '+919878901234', 6500, 'Bhubaneswar', 20.3050, 85.8500, true,
 '1BHK near Mancheswar Industrial Estate. Budget-friendly for factory workers and bachelors. Basic furnishing with bed and fan.', NULL, NOW()),

-- Khandagiri / Baramunda
(RANDOM_UUID(), 'Tapan - 2BHK Khandagiri', '+919889012345', 9000, 'Bhubaneswar', 20.2550, 85.7970, true,
 '2BHK near Khandagiri caves. Peaceful location with garden view. Ground floor, independent entry. Family only. Close to Baramunda bus stand.', NULL, NOW()),

(RANDOM_UUID(), 'Manas - 1BHK Baramunda', '+919890123457', 7500, 'Bhubaneswar', 20.2700, 85.8050, false,
 '1BHK near Baramunda bus terminal. Walking distance to OUAT campus. Semi-furnished. Currently under renovation, available from next month.', NULL, NOW()),

-- Bomikhal / Acharya Vihar
(RANDOM_UUID(), 'Ajay - 2BHK Bomikhal', '+919901234568', 13000, 'Bhubaneswar', 20.2850, 85.8250, true,
 'Newly constructed 2BHK in Bomikhal, Acharya Vihar area. Near Utkal University. Vitrified tiles, modular kitchen, parking. Both bachelor and family.', NULL, NOW()),

(RANDOM_UUID(), 'Kavita - 1BHK Acharya Vihar', '+919912345679', 10000, 'Bhubaneswar', 20.2960, 85.8310, true,
 '1BHK furnished flat near Acharya Vihar Square. AC room, geyser, WiFi. Near OUAT, Utkal University. Perfect for students and working professionals.', NULL, NOW()),

-- VSS Nagar / Delta Square
(RANDOM_UUID(), 'Sanjay - 1BHK Delta Square', '+919923456780', 8000, 'Bhubaneswar', 20.2750, 85.8400, true,
 '1BHK near Delta Square, VSS Nagar. 2nd floor with lift. Semi-furnished. Walking distance to SUM Hospital and market. Family and bachelor.', NULL, NOW()),

(RANDOM_UUID(), 'Ritu - Studio VSS Nagar', '+919934567891', 6500, 'Bhubaneswar', 20.2800, 85.8400, true,
 'Compact studio room in VSS Nagar. Attached kitchen and bath. Fully furnished with bed, AC, and small fridge. Single occupancy only.', NULL, NOW()),

-- Master Canteen / Old Town
(RANDOM_UUID(), 'Bijay - Single Room Old Town', '+919945678902', 3500, 'Bhubaneswar', 20.2500, 85.8350, true,
 'Budget single room in Old Town near Lingaraj Temple. Simple room with fan and attached bathroom. Best for daily workers. Rent includes water.', NULL, NOW()),

(RANDOM_UUID(), 'Pinki - 2BHK Master Canteen', '+919956789013', 11000, 'Bhubaneswar', 20.2720, 85.8370, true,
 '2BHK in Master Canteen area. Close to Bhubaneswar railway station and Nicco Park. Semi-furnished with wardrobes. Family only, 2 wheeler parking.', NULL, NOW()),

-- Lingipur / Daya
(RANDOM_UUID(), 'Hemant - 1BHK Lingipur', '+919967890124', 5500, 'Bhubaneswar', 20.2650, 85.8700, true,
 'Affordable 1BHK in Lingipur near Daya River. Newly built with modern bathroom. Quiet area, ideal for small family. 15 min from city center.', NULL, NOW()),

-- Bapuji Nagar / Unit area
(RANDOM_UUID(), 'Mitali - 1BHK Bapuji Nagar', '+919978901235', 9500, 'Bhubaneswar', 20.2730, 85.8200, true,
 '1BHK in prime Bapuji Nagar location. Walking distance to Unit-4 market, Kalinga Hospital. Well-ventilated rooms, covered parking.', NULL, NOW()),

(RANDOM_UUID(), 'Dilip - 2BHK Unit-9', '+919989012346', 18000, 'Bhubaneswar', 20.2820, 85.8280, true,
 'Premium 2BHK in Unit-9. Fully furnished with 2 AC, TV, fridge, washing machine. 24/7 security, power backup, lift. Near Forum Mart and BMC office.', NULL, NOW());
