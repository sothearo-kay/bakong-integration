<script setup lang="ts"></script>

<template>
  <main class="container">
    <!-- Product List -->
    <div></div>

    <!-- Checkout Cart -->
    <div>
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
  </main>
</template>
