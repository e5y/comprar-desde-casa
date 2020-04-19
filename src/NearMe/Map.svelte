<script>
  /**
   * Implementation
   *
   * <Map {businesses} {position} on:marker={openBusiness} />
   * */
  import { onMount, createEventDispatcher } from "svelte";

  export let businesses;
  export let position;

  let element, map;

  const dispatch = createEventDispatcher();

  onMount(() => {
    map = new google.maps.Map(element, {
      disableDefaultUI: true,
      scaleControl: true,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    const bounds = new google.maps.LatLngBounds();

    businesses.forEach(business => {
      const latlng = {
        lat: business.position.geopoint.latitude,
        lng: business.position.geopoint.longitude
      };

      const marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: {
          url: `/markers/${business.category}.png`,
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 50)
        }
      });

      marker.addListener("click", () => {
        dispatch("marker", { id: business.id });
      });

      bounds.extend(latlng);
    });

    const latlng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    new google.maps.Marker({
      position: latlng,
      map: map,
      icon: {
        url: "/markers/user.png",
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
      },
      zIndex: Number.MAX_SAFE_INTEGER
    });

    bounds.extend(latlng);

    map.fitBounds(bounds);
  });
</script>

<style>
  div {
    height: 400px;
    width: 100%;
  }
</style>

<div bind:this={element} />
