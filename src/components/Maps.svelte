<script>
    import { MapLibre, Marker } from 'svelte-maplibre';
  
    const parisCoordinates = [48.8566, 2.3522]; // Coordonnées de Paris
  
    const restaurants = [
      { name: "Restaurant 1", coordinates: [48.8566, 2.3522] }, // Coordonnées pour Restaurant 1
      { name: "Restaurant 2", coordinates: [48.8566, 2.3522] }, // Coordonnées pour Restaurant 2
      { name: "Restaurant 3", coordinates: [48.8566, 2.3522] }  // Coordonnées pour Restaurant 3
    ];
  </script>
  
  <MapLibre 
    center={parisCoordinates}
    zoom={12}
    class="map"
    standardControls
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" >
  
    {#each restaurants as restaurant}
      <Marker coordinates name={restaurant}.name />
    {/each}
  
  </MapLibre>
  
  <style>
    :global(.map) {
      height: 500px;
    }
  </style>
  