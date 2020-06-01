<script>
  import { onMount } from "svelte";
  import { Businesses } from "../classes/Businesses.js";
  import { Owner } from "../classes/Owner.js";
  import { db, session } from "../stores.js";

  let businesses,
    emails = [];

  onMount(async () => {
    businesses = new Businesses(
      await $db.database.collection("approved_businesses").get()
    );
    Promise.all(
      businesses.map(async business => {
        if (business.owner_email) {
          emails = [...emails, [business.owner_email, business.owner_name]];
          const owner = new Owner(
            await $db.database
              .collection("owners")
              .where("email", "==", business.owner_email)
              .get()
          );
          /*
          const doesntHaveOwner = owner.empty;
          if (doesntHaveOwner && business.owner_email && business.owner_name) {
            const newOwner = new Owner();
            owner.name = business.owner_name;
            owner.email = business.owner_email;
            owner.password = Math.random()
              .toString(36)
              .slice(2);
          }
          console.log(!owner.empty ? "has owner" : "doesnt have owner");
          */
        } else {
          console.log("has owner");
        }
      })
    );
  });
</script>

<table>
  {#if emails}
    {#each emails as email}
      <tr>
        <td>{email[0]}</td>
        <td>{email[1]}</td>
      </tr>
    {/each}
  {/if}
</table>
