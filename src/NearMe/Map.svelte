<script>
  /**
   * Implementation
   *
   * <Map {businesses} {position} on:marker={openBusiness} />
   * */
  import { onMount, createEventDispatcher } from "svelte";

  export let businesses;
  export let position;
  export let type;

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
    width: 100%;
    height: 400px;
    border-radius: 7px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
  }
  div.compact {
    height: 200px;
  }
  @media screen and (min-width: 1000px) {
    div {
      height: 600px;
    }
    div.compact {
      height: 400px;
    }
  }
</style>

<div class={type} bind:this={element} />
