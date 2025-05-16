import axios from 'axios'

export default class GoogleMapsService {

    static async getDistance(
        origin: string,
        destination: string
    ): Promise<number | null> {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
        if (!apiKey) {
            console.error("Google Maps API key is not defined");
            throw new Error("Google Maps API key is not defined");
        }
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            const data = response.data;

            // More robust checking of the response structure
            if (data && data.rows && data.rows.length > 0 &&
                data.rows[0].elements && data.rows[0].elements.length > 0 &&
                data.rows[0].elements[0].status === "OK") {
                return data.rows[0].elements[0].distance.value; // distance in meters
            } else {
                // Log the actual response from Google for debugging
                console.error("Error or unexpected response from Google Maps API:", data);
                // Check for specific error messages from Google
                if (data && data.error_message) {
                    throw new Error(`Google Maps API Error: ${data.error_message}`);
                }
                if (data && data.rows && data.rows.length > 0 && data.rows[0].elements && data.rows[0].elements.length > 0 && data.rows[0].elements[0].status) {
                    throw new Error(`Distance not found. Status: ${data.rows[0].elements[0].status}`);
                }
                throw new Error("Distance not found or invalid response from Google Maps API");
            }
        }
        catch (error) {
            // Log the error object itself for more details
            console.error("Error fetching distance from Google Maps API:", error);
            return null;
        }
    }

    static async getDirections(
        origin: string,
        destination: string
    ): Promise<any | null> { 
        const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
        if (!apiKey) {
            throw new Error("Google Maps API key is not defined");
        }
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.routes && data.routes.length > 0) {
                return data.routes[0].legs[0];
            } else {
                throw new Error("Directions not found");
            }
        }
        catch (error) {
            console.error("Error fetching directions from Google Maps API:", error);
            return null;
        }
    }

    static async getPlaceDetails(   
        placeId: string
    ): Promise<any | null> {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
        if (!apiKey) {
            throw new Error("Google Maps API key is not defined");
        }
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
        try {   
            const response = await axios.get(url);
            const data = response.data;
            if (data.result) {
                return data.result;
            } else {
                throw new Error("Place details not found");
            }
        }   
        catch (error) {
            console.error("Error fetching place details from Google Maps API:", error);
            return null;
        }
    }
    
    static async getNearbyPlaces(   
        location: string,
        radius: number,
        type: string
    ): Promise<any | null> {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
        if (!apiKey) {
            throw new Error("Google Maps API key is not defined");
        }
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.results) {
                return data.results; 
            } else {
                throw new Error("Nearby places not found");
            }
        }
        catch (error) {
            console.error("Error fetching nearby places from Google Maps API:", error);
            return null;
        }
    }   

}