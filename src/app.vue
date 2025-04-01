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
