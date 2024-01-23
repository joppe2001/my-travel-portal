<template>
  <footer class="sticky-footer bg-gray-800 text-white py-4">
    <div class="container mx-auto text-center">
      <p class="text-sm">&copy; 2024 Your Travel Portal. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.sticky-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 100; /* Add z-index to ensure it appears above content */
}

.sticky-footer p {
  margin: 0;
  font-size: 14px;
}
</style>
