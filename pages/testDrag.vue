<template>
  <div class="travel-builder">
    <!-- Source container -->
    <div class="activity-container">
      <h2>Available Activities</h2>
      <draggable v-model="activities" tag="div" :options="dragOptions">
        <template #item="{ element }">
          <div class="activity-block">
            {{ element }}
          </div>
        </template>
      </draggable>
    </div>

    <!-- Destination container -->
    <div class="new-activities-container">
      <h2>Create New Activities</h2>
      <draggable v-model="newActivities" tag="div" :options="dragOptions">
        <template #item="{ element }">
          <div class="new-activity-block">
            {{ element }}
          </div>
        </template>
      </draggable>
    </div>

    <button @click="saveNewActivities">Save New Activities</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const activities = ref(['Activity 1', 'Activity 2', 'Activity 3']);
const newActivities = ref([]);

const saveNewActivities = () => {
  // Send newActivities to Firebase or perform other actions
  console.log('New Activities:', newActivities.value);
};

const dragOptions = {
  animation: 150, // Animation duration in milliseconds
  group: 'travel-builder', // Group identifier for connected draggables
  ghostClass: 'drag-ghost', // Class for the ghost element while dragging
  chosenClass: 'drag-chosen', // Class for the chosen item while dragging
  dragClass: 'drag-drag', // Class for the item being dragged
};
</script>

<style scoped>
.travel-builder {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}

.activity-container,
.new-activities-container {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  min-height: 100px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.activity-block,
.new-activity-block {
  background-color: #f0f0f0;
  padding: 8px;
  margin: 4px;
  cursor: grab;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.drag-ghost {
  opacity: 0.6;
}

.drag-chosen {
  background-color: #fff3e2;
  border: 1px solid #ffa500;
}

.drag-drag {
  background-color: #fff;
  border: 2px solid #007bff;
}
</style>
