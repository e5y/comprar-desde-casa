<script>
  export let phone;

  const normalizePhone = phone => {
    let digits = phone.replace(/\D+/g, "");
    if (!digits.startsWith("54")) digits = `54${digits}`;
    return digits;
  };

  const waPhone = normalizePhone(phone);
  const waText = encodeURIComponent(
    "¡Hola! Te encontré en Comprar Desde Casa (https://comprardesdecasa.com.ar), te quería solicitar información sobre tu negocio."
  );
  const waURL = `https://wa.me/${waPhone}?text=${waText}`;
</script>

<style>
  a {
    text-decoration: none;
    margin: 0.15rem 0;
    background: #1e4cf5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 7px;
    text-align: center;
  }

  a i {
    margin-right: 0.25rem;
    width: 1rem;
  }
</style>

<a href={waURL} target="_blank">
  <i class="fab fa-whatsapp" />
  Hablar ahora
</a>
