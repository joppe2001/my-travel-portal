<template>
  <div class="home-page">
    <div class="destinations">
      <!-- Loop through destinations using v-for -->
      <div v-for="destination in userDestinations" :key="destination.id" class="destination-card">
        <img :src="destination.imageUrl" :alt="destination.name" class="destination-image">
        <div class="destination-info">
          <h2>{{ destination.name }}</h2>
          <p>{{ destination.description }}</p>
          <!-- More details can be added here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const userDestinations = [
  { id: 1, name: 'Praia', imageUrl: '/images/praia.webp', description: 'Experience the vibrant culture of Praia.' },
  { id: 2, name: 'Sal', imageUrl: '/images/sal.webp', description: 'Relax on the beautiful beaches of Sal.' },
  { id: 3, name: 'BoaVista', imageUrl: '/images/boa-vista.jpg', description: 'Explore the stunning landscapes of Boa Vista.' }
];

</script>

<style scoped lang="scss">
.home-page {
  .destinations {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px;

    .destination-card {
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      .destination-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .destination-info {
        padding: 15px;

        h2 {
          font-size: 20px;
          color: #333;
        }

        p {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}

</style>