<script setup lang="ts">
const props = defineProps({
  score: {
    type: Number,
  },
});

const color = computed(() => {
  if (props.score <= 4) return "red";
  if (props.score > 4 && props.score < 7) return "yellow-darken-2";
  return "green";
});
const bgColor = computed(() => {
  if (props.score <= 4) return "red-lighten-4";
  if (props.score > 4 && props.score < 7) return "yellow-lighten-4";
  return "green-lighten-4";
});
</script>

<template>
  <div class="circle">
    <v-progress-circular
      :model-value="score * 10"
      :color="color"
      size="60"
      width="5"
      :bg-color="bgColor"
      ><p class="text-black font-weight-bold text-[20px]">
        {{ score?.toFixed(1) }}
      </p></v-progress-circular
    >
  </div>
</template>

<style scoped>
.circle {
  border-radius: 50%;
  width: 64px;
  height: 64px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
