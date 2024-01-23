<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in fields" :key="field.name" class="mb-4">
      <label :for="field.name" class="block text-gray-700 text-sm font-bold mb-2">
        {{ field.label }}
      </label>
      <input v-if="field.type !== 'textarea'" 
             :type="field.type" 
             v-model="formValues[field.name]"
             :id="field.name"
             :placeholder="field.placeholder"
             class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <textarea v-else
                v-model="formValues[field.name]"
                :id="field.name"
                :placeholder="field.placeholder"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </textarea>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script setup>
import { reactive, onMounted } from 'vue';

const { fields, submitLabel, onSubmit } = defineProps({
  fields: {
    type: Array,
    required: true
  },
  submitLabel: {
    type: String,
    default: 'Submit'
  },
  onSubmit: {
    type: Function,
    required: true
  }
});

const formValues = reactive({});

onMounted(() => {
  fields.forEach(field => {
    formValues[field.name] = ''; // Initialize each field
  });
});

const handleSubmit = () => {
  onSubmit(formValues); // Pass the current form values
};
</script>

