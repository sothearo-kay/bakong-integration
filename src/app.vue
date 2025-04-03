<script setup lang="ts"></script>

<template>
  <div class="container">
    <header></header>

    <main>
      <!-- Product List -->
      <div></div>

      <!-- Checkout Cart -->
      <div></div>
    </main>

    <!-- KHQR Modal -->
    <ui-dialog>
      <template #trigger="{ openDialog }">
        <button @click="openDialog">Open Dialog</button>
      </template>

      <template #content="{ closeDialog }">
        <p>This is the dialog content.</p>
        <button @click="closeDialog">Close</button>
      </template>
    </ui-dialog>
  </div>
</template>

<style scoped></style>
