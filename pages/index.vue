<template>
	<div class="container mx-auto">
		<h1 class="text-4xl font-bold text-center my-8">Your Adventure Awaits</h1>
		<div v-if="isLoading" class="loading-spinner">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
			>
				<g
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-width="2"
				>
					<path
						stroke-dasharray="2 4"
						stroke-dashoffset="6"
						d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
					>
						<animate
							attributeName="stroke-dashoffset"
							dur="0.6s"
							repeatCount="indefinite"
							values="6;0"
						/>
					</path>
					<path
						stroke-dasharray="30"
						stroke-dashoffset="30"
						d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
					>
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.1s"
							dur="0.3s"
							values="30;0"
						/>
					</path>
					<path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5">
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.5s"
							dur="0.2s"
							values="10;0"
						/>
					</path>
					<path
						stroke-dasharray="6"
						stroke-dashoffset="6"
						d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"
					>
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.7s"
							dur="0.2s"
							values="6;0"
						/>
					</path>
				</g>
			</svg>
		</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

const userStore = useUserStore();
const cities = ref([]);
const isLoading = ref(true);

// Function to wait for a given number of milliseconds
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchAndSortCities = async (userId) => {
  const startTime = Date.now();
  isLoading.value = true;

  if (userId) {
    try {
      const { $fetchUserTravelDetails } = useNuxtApp();
      const userTravelDetails = await $fetchUserTravelDetails(userId);

      if (userTravelDetails && userTravelDetails.cities) {
        const citiesArray = Object.values(userTravelDetails.cities);
        cities.value = citiesArray.sort((a, b) => a.cityName.localeCompare(b.cityName));
      }
    } catch (error) {
      console.error("Error fetching or sorting cities:", error);
    }
  }

  const elapsedTime = Date.now() - startTime;
  await wait(Math.max(750 - elapsedTime, 0)); // Ensure spinner shows for at least 0.75 seconds
  isLoading.value = false;
};

watchEffect(() => {
  const userId = userStore.user?.uid;
  if (userId) {
    fetchAndSortCities(userId);
  } else {
    cities.value = [];
    isLoading.value = false;
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

	.loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
		text-align: center;
		padding: 2rem;
	}
</style>
