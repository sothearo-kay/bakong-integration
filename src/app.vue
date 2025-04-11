<script setup lang="ts">
import { ref } from "vue";

const searchTerm = ref("");
</script>

<template>
  <main class="container grid gap-6 py-10 md:grid-cols-3">
    <div class="space-y-4 md:col-span-2">
      <form @submit.prevent="">
        <input
          v-model="searchTerm"
          placeholder="Search product..."
          class="w-full rounded-lg px-4 py-2 shadow"
        />
      </form>

      <ui-card>
        <div>
          <h3>Your Cart</h3>
        </div>
      </ui-card>
    </div>

    <ui-card>
      <h3>Order Summary</h3>
    </ui-card>
  </main>
</template>
