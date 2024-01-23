<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-center my-8">Your Adventure Awaits</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(city, index) in cities"
        :key="city?.cityName"
        class="city-card"
        :class="{
          'start-city': index === 0,
          'end-city': index === cities.length - 1,
        }"
      >
        <div class="city-image">
          <img
            :src="`/images/${city.urlTitle.toLowerCase()}.webp`"
            :alt="city.cityName"
            class="w-full h-48 object-cover"
          />
        </div>
        <div class="city-details p-4">
          <h2 class="text-2xl font-semibold mb-2">{{ city?.cityName }}</h2>
          <p class="text-gray-600">{{ city?.countryDetails }}</p>
        </div>
        <router-link :to="`/${city?.urlTitle}`" class="explore-button">
          what my <strong>{{ city?.cityName }}</strong> trip looks like?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUserStore from "../stores/user";

const { $fetchUserTravelDetails } = useNuxtApp();
const userStore = useUserStore();

const cities = ref([]);
const router = useRouter();

const goToDestinations = () => {
  router.push("/destinations");
};

watchEffect(async () => {
  const userId = userStore.user.uid;
  if (userId) {
    const userTravelDetails = await $fetchUserTravelDetails(userId);
    cities.value = userTravelDetails?.cities;
  }
});
</script>

<style scoped lang="scss">
.container {
  max-width: 100%;
  padding: 1rem;
}

.city-card {
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
	background-color: #f0f0f0;
}

.city-image {
  position: relative;
  border-radius: 5px 5px 0 0;
}

.start-city::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 2px solid #ccc;
  height: 50%;
}

.end-city::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 2px solid #ccc;
  height: 50%;
}

.city-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.city-details {
	padding-bottom: 4rem;
}

.explore-button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0 0 5px px;
  text-decoration: none;
  transition: background-color 0.2s;
}

.explore-button:hover {
  background-color: #2779bd;
}
</style>
