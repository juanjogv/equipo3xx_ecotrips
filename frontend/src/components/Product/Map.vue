<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
export default {
  name: "Map",
  props: { coordsLng: String, coordsLat: String },
  data() {
    return {};
  },
  setup(props) {
    onMounted(() => {
      mapboxgl.accessToken = "pk.eyJ1IjoianVhbmpvZ3YiLCJhIjoiY2tzdGE5bjFmMTN6dzJvcG84a2locHA0MSJ9.JuMq5YMkJnQZQmpU5U5RQA";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [parseFloat(props.coordsLng), parseFloat(props.coordsLat)], // starting position [lng, lat]
        zoom: 12, // starting zoom
      });
      new mapboxgl.Marker().setLngLat([parseFloat(props.coordsLng), parseFloat(props.coordsLat)]).addTo(map);
    });
    return {};
  },
  mounted() {},
};
</script>

<style>
#map {
  height: 25vh;
}
</style>
