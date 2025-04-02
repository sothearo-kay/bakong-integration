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

<style scoped>
.container {
  min-height: 100vh;
  padding-block: 2.5rem;
  display: grid;
  grid-template-rows: auto 1fr;
}

main {
  display: grid;
  grid-template-columns: 9fr 3fr;
  min-height: 500px;
}

main > div {
  padding-inline: 1rem;
}

main > div:last-child {
  border-left: 1px solid #b4c8c8;
}
</style>
