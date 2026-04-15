package com.rentapp.bbsr.util;

public final class DistanceCalculator {

    private static final double EARTH_RADIUS_KM = 6371.0088;

    private DistanceCalculator() {}

    /** Great-circle distance between two points in kilometers (Haversine). */
    public static double haversineKm(double lat1, double lng1, double lat2, double lng2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                 + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                 * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    /** Rough lat/lng delta for a radius in km, used to build a bounding box pre-filter. */
    public static double[] boundingBox(double lat, double lng, double radiusKm) {
        double latDelta = radiusKm / 110.574;
        double lngDelta = radiusKm / (111.320 * Math.cos(Math.toRadians(lat)));
        return new double[] {
            lat - latDelta, lat + latDelta,
            lng - lngDelta, lng + lngDelta
        };
    }
}
