<style>
  footer {
    color: black;
    text-align: center;
    margin-top: auto;
    padding: 1rem;
    border-top: 1px solid #eaeaea;
    font-size: 0.9rem;
    /* Sadly this depends on the Navigation component. */
    margin-bottom: 3.5rem;
  }

  @media screen and (min-width: 768px) {
    /* Sadly this depends on the Navigation component. */
    footer {
      margin-bottom: 5.5rem;
    }
  }

  .interactions {
    list-style: none;
    padding: 0;
  }

  .interactions .instagram {
    background: linear-gradient(
      45deg,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
    color: white;
    display: inline-flex;
    padding: 0.7rem 1rem;
    border-radius: 40px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  .interactions .instagram a {
    font-size: 1rem;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .interactions .instagram .at {
    margin-left: 0.25rem;
    font-weight: bold;
  }

  .interactions .instagram i {
    margin-right: 0.5rem;
    font-size: 1.25rem;
  }

  .authors {
    margin-top: 2rem;
  }

  .authors h1 {
    font-size: 0.9rem;
    margin: 0;
    font-weight: normal;
  }

  .authors ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .authors ul img {
    margin: 0 1rem;
  }
</style>

<footer>
  <ul class="interactions">
    <li class="instagram">
      <i class="fab fa-instagram" />
      <a href="https://www.instagram.com/comprardesdecasa/" target="_blank">
        Seguinos
        <span class="at">@comprardesdecasa</span>
      </a>
    </li>
  </ul>
  <section class="authors">
    <h1>Un aporte de</h1>
    <ul>
      <li>
        <a href="https://grupoeon.com.ar?ref=comprardesdecasa" target="_blank">
          <img
            alt="Grupo EON"
            src="/authors/grupoeon.png"
            loading="lazy"
            style="max-height: 3.5rem; filter: brightness(1.15);" />
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/multiphone_cba?ref=comprardesdecasa"
          target="_blank">
          <img
            alt="MultiPhone"
            src="/authors/multiphone.png"
            style="max-height: 3.5rem;"
            loading="lazy" />
        </a>
      </li>
    </ul>
  </section>
</footer>
