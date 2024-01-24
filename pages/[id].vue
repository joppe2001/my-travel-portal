<template>
  <div class="travel-portal">
    <div class="country-details">
      <h1 class="city-name">{{ userTravelDetails?.cityName }}</h1>
      <p class="country-description">{{ userTravelDetails?.countryDetails }}</p>
    </div>
    <div class="day-schedule">
      <div v-for="(details, day) in userTravelDetails?.roadmap" :key="day" class="day-details">
        <h2 class="day-title">{{ details.title }}</h2>
        <div class="daily-schedule">
          <div class="schedule-item">
            <strong>Morning:</strong>
            <p class="morning-details">{{ details?.morning }}</p>
          </div>
          <div class="schedule-item">
            <strong>Afternoon:</strong>
            <p class="afternoon-details">{{ details?.afternoon }}</p>
          </div>
          <div class="schedule-item">
            <strong>Evening:</strong>
            <p class="evening-details">{{ details?.evening }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useUserStore from '../stores/user';
const userStore = useUserStore();

const { $fetchSpecificCountryDetails } = useNuxtApp();

const route = useRoute();
const userTravelDetails = ref(null);

watchEffect(async () => {
  const userId = userStore.user.uid;
  console.log("User ID:", userId);
  if (userId) {
    userTravelDetails.value = await $fetchSpecificCountryDetails(userId, route.params.id);
  }
});

watch(userTravelDetails, (newValue) => {
  console.log("Updated travel details:", newValue);
});
</script>

<style scoped lang="scss">
.travel-portal {
  background-color: #f7f7f7; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.city-name {
  color: #3498db; 
  font-size: 28px;
  margin-bottom: 10px;
}

.country-description {
  color: #555; 
  font-size: 18px;
  line-height: 1.6;
}

.day-details {
  background-color: #fff; 
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.day-title {
  color: #e74c3c;
  font-size: 24px;
  margin-bottom: 15px;
}

.daily-schedule {
  .schedule-item {
    color: #444;
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 10px;

    strong {
      color: #f39c12;
    }
  }
}
</style>
