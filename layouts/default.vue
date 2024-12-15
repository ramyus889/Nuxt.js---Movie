<script setup lang="ts"></script>

<template>
  <v-app id="inspire">
    <v-app-bar height="56" color="#111827" class="px-10">
      <v-icon size="48">mdi-movie-open-play</v-icon>

      <v-app-bar-title class="text-h4">Movie Search</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-text-field
        variant="outlined"
        density="compact"
        hide-details
        append-inner-icon="mdi-magnify"
        placeholder="Search for a movie"
      ></v-text-field>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
