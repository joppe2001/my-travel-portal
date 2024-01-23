<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 md:py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-blue-500">Home</router-link>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        @click="signOut"
      >
        Sign Out
      </button>
    </div>
  </header>
</template>

<script setup>
const { $signOutUser } = useNuxtApp();

const signOut = async () => {
  $signOutUser();
};
</script>

<style scoped>
/* Mobile-friendly styles */
@media (max-width: 640px) {
  header {
    padding: 8px 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    width: 100%;
  }
}

/* normal width screen, make sure buttons are on each end of the screen */
@media (min-width: 640px) {
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
