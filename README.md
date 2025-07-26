# Burger Week 2024

<img width="2984" height="1572" alt="Screenshot 2025-07-25 at 9 20 28 PM" src="https://github.com/user-attachments/assets/fab9aafe-dea3-4a83-8f10-3b3d60f826e6" />

[See The Burger Map Live Here](https://burger-week-brown.vercel.app/)

## Why
This mapping project spawned out of the need to locate the nearest participating Burger Week restaurant in [Seven Day's Annual Burger Week](https://burgerweek.sevendaysvt.com/). After all these great restaurants were announced I needed to be able to visualize which restaurants were closest to me, rather than try to review a long list of participants and qualify which town/county that was in. 

## How
I scraped data from the Burger week website, used Mapbox's [reverse geocoding API](https://docs.mapbox.com/api/search/geocoding/#reverse-geocoding) to get coordinates for each location and quickly created a custom burger marker to note locations.  Restaurant location information and menu links are available via the `Popup` when you click a map marker. 

The App is scaffolded using [Vite.js](https://vite.dev), [React](https://react.dev) & [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)

Seven Days liked it so much they included it in the Burger Week website after launch. 

