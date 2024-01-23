<template>
  <div class="travel-builder">
    <!-- Source container -->
    <div class="activity-container">
      <h2>Available Activities</h2>
      <div
        v-for="(activity, index) in activities"
        :key="index"
        class="activity-block"
        @mousedown="startDrag(index)"
        @mouseup="endDrag"
        @mouseenter="highlightActivity(index)"
        @mouseleave="unhighlightActivity(index)"
        @click="addNewActivity(index)"
        :class="{ 'is-dragging': dragging && index === dragIndex, 'highlighted': highlighted === index }"
      >
        {{ activity }}
      </div>
    </div>

    <!-- Destination container -->
    <div class="new-activities-container">
      <h2>Create New Activities</h2>
      <div
        v-for="(activity, index) in newActivities"
        :key="index"
        class="new-activity-block"
        @mousedown="startDrag(index + activities.length)"
        @mouseup="endDrag"
        @mouseenter="highlightActivity(index + activities.length)"
        @mouseleave="unhighlightActivity(index + activities.length)"
        @click="removeNewActivity(index)"
        :class="{ 'is-dragging': dragging && (index + activities.length) === dragIndex, 'highlighted': highlighted === (index + activities.length) }"
      >
        {{ activity }}
      </div>
    </div>

    <button @click="saveNewActivities">Save New Activities</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activities = ref(['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4']);
const newActivities = ref([]);
const dragIndex = ref(-1);
const dragging = ref(false);
const highlighted = ref(-1);

const startDrag = (index) => {
  dragIndex.value = index;
  dragging.value = true;
};

const endDrag = () => {
  if (dragging.value) {
    dragging.value = false;
    if (dragIndex.value >= 0) {
      if (highlighted.value >= 0) {
        // Check if the destination is the source container
        const destinationIsSource = dragIndex.value >= activities.length;

        // Move activity back to the source container if needed
        if (destinationIsSource) {
          const movedActivity = newActivities.value[dragIndex.value - activities.length];
          if (movedActivity) {
            activities.value.push(movedActivity);
            newActivities.value.splice(dragIndex.value - activities.length, 1);
          }
        }
      }
      dragIndex.value = -1;
      highlighted.value = -1;
    }
  }
};

const highlightActivity = (index) => {
  highlighted.value = index;
};

const unhighlightActivity = (index) => {
  if (highlighted.value === index) {
    highlighted.value = -1;
  }
};

const addNewActivity = (index) => {
  // Add the clicked activity to the "Create New Activities" section
  const clickedActivity = activities.value[index];
  if (clickedActivity) {
    newActivities.value.push(clickedActivity);
    activities.value.splice(index, 1);
  }
};

const removeNewActivity = (index) => {
  // Remove the clicked activity from the "Create New Activities" section and move it back to the source container
  const clickedActivity = newActivities.value[index];
  if (clickedActivity) {
    activities.value.push(clickedActivity);
    newActivities.value.splice(index, 1);
  }
};

const saveNewActivities = () => {
  // Send newActivities to Firebase or perform other actions
  console.log('New Activities:', newActivities.value);
};
</script>

<style scoped>
.travel-builder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.activity-container,
.new-activities-container {
  border: 1px solid #ccc;
  padding: 16px;
  min-height: 200px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 16px;
}

.activity-container h2,
.new-activities-container h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.activity-block,
.new-activity-block {
  background-color: #f0f0f0;
  padding: 12px;
  margin: 8px 0;
  cursor: grab;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.activity-block:hover,
.new-activity-block:hover {
  background-color: #d4d4d4;
}

.is-dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.highlighted {
  background-color: #007bff !important;
  color: #fff;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
