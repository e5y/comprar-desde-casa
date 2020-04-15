<script>
  import { onMount, createEventDispatcher } from "svelte";
  let random = Math.random() * 10;
  export let points;

  const dispatch = createEventDispatcher();

  onMount(() => {
    const element = document.getElementById(`map-${random}`);

    const map = new google.maps.Map(element, {
      disableDefaultUI: true,
      scaleControl: true,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const bounds = new google.maps.LatLngBounds();
    points.forEach((point, i) => {
      const position = { lat: point.lat, lng: point.lng };
      const marker = new google.maps.Marker({
        position,
        map,
        icon: {
          url: `/markers/${point.category}.png`,
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 50)
        }
      });
      if (i !== 0)
        marker.addListener("click", () => {
          dispatch("markerClicked", { id: point.id });
        });
      bounds.extend(position);
    });

    map.fitBounds(bounds);
  });
</script>

<style>
  .map {
    width: 100%;
    height: 400px;
    border-radius: 7px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 1000px) {
    .map {
      height: 600px;
    }
  }
</style>

<div id="map-{random}" class="map" />
