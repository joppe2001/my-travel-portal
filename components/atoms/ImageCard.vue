<!-- components/atoms/ImageCard.vue -->
<template>
  <div class="image-card">
    <img :src="imageUrl" :alt="imageAlt" />
    <div class="info">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <button 
        class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        @click="navigateToDestination"
        :navigateToDestination="navigateToDestination"
      >
        Explore More
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
  imageUrl: String,
  imageAlt: String,
  title: String,
  description: String,
});

const router = useRouter();

const navigateToDestination = () => {
  router.push(`/${props.id}`);
};
</script>

<!-- Add existing styles here -->


<style scoped lang="scss">
.image-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  .info {
    padding: 1rem;
    background-color: #fff;

    h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
    }
  }
}
</style>
