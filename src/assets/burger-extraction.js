import fs from 'fs';

// Sample data - replace this with reading from a file if needed
import data from './burger-data.js';

function parseDataToGeoJSON(data) {
    const features = data.trim().split('\n').map(line => {
        // Split the line by commas to separate fields
        const parts = line.split(',');

        // Extract each part based on its position in the line
        const restaurantName = parts[0].trim();
        const burgerMenu = parts[1].trim();
        const address = parts.slice(2, parts.length - 2).join(',').trim();
        const coordinates = parts[parts.length - 2];
        console.log("coordinates", coordinates);
        const link = parts[parts.length - 1].trim();

        // Extract latitude and longitude from the coordinates
        const latMatch = coordinates.match(/latitude:([\d.-]+)/);
        const lonMatch = coordinates.match(/longitude:([\d.-]+)/);

        const latitude = latMatch ? parseFloat(latMatch[1]) : null;
        const longitude = lonMatch ? parseFloat(lonMatch[1]) : null;

        if (latitude === null || longitude === null) {
            console.warn(`Invalid coordinates for: ${restaurantName}`);
            return null; // Skip invalid entries
        }

        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
            },
            properties: {
                name: restaurantName,
                menu: burgerMenu,
                address: address,
                link: link,
            },
        };
    }).filter(feature => feature !== null); // Filter out any null entries

    // Construct the GeoJSON object
    return {
        type: 'FeatureCollection',
        features: features,
    };
}

// Generate GeoJSON data
const geoJSONData = parseDataToGeoJSON(data);

// Write to a file (optional)
fs.writeFileSync('output.geojson', JSON.stringify(geoJSONData, null, 2));

console.log('GeoJSON data has been written to output.geojson');
