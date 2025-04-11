<script setup lang="ts">
import { computed, ref } from 'vue'
import { products, type Product } from '@/product'

interface CartItem extends Product {
  quantity: number
}

const searchTerm = ref<string>('')
const cart = ref<CartItem[]>([])

const filteredProducts = computed(() =>
  products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  ),
)

const subTotal = computed(() =>
  cart.value.reduce((acc, item) => (acc += item.price * item.quantity), 0),
)

const shipping = computed(() => (cart.value.length > 0 ? 5.99 : 0))

const taxRate = 0.1
const tax = computed(() => taxRate * subTotal.value)

const total = computed(() => subTotal.value + shipping.value + tax.value)

const summaryItems = computed(() => [
  { label: 'Subtotal', value: subTotal.value },
  { label: 'Shipping', value: shipping.value },
  { label: 'Tax', value: tax.value },
])

const addToCart = (product: Product) => {
  const item = cart.value.find((item) => item.id === product.id)
  if (item) {
    item.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}
</script>

<template>
  <section class="container space-y-4 py-10">
    <h1 class="text-2xl font-bold">Checkout</h1>

    <main class="grid gap-6 md:grid-cols-3">
      <div class="space-y-4 md:col-span-2">
        <div class="relative">
          <form @submit.prevent="">
            <input
              v-model="searchTerm"
              placeholder="Search product..."
              class="w-full rounded-lg px-4 py-2 shadow"
            />
          </form>

          <template v-if="filteredProducts.length">
            <div class="absolute"></div>
          </template>
        </div>

        <ui-card>
          <div>
            <h2 class="text-lg font-bold">Your Cart</h2>

            <div v-if="cart.length"></div>

            <div v-else class="flex flex-col items-center py-6">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-200"
              >
                <icon-cart class="h-6 w-6 text-neutral-600" />
              </div>
              <h3 class="mt-4 text-lg font-medium">Your cart is empty</h3>
              <p class="text-neutral-500">
                Search for products to add theme to your cart
              </p>
            </div>
          </div>
        </ui-card>
      </div>

      <ui-card>
        <h3 class="mb-4">Order Summary</h3>

        <div class="space-y-2">
          <div
            v-for="{ label, value } in summaryItems"
            :key="label"
            class="flex items-center justify-between"
          >
            <span class="text-neutral-500">{{ label }}</span>
            <span class="font-medium">{{ formatCurrency(value) }}</span>
          </div>
        </div>

        <hr class="my-3" />

        <div class="flex items-center justify-between text-lg font-medium">
          <span>Total</span>
          <span>{{ formatCurrency(total) }}</span>
        </div>

        <button
          class="my-4 w-full rounded-lg bg-[#0071e3] py-2 text-white hover:bg-[#0077ED] disabled:opacity-70"
          :disabled="cart.length === 0"
        >
          <span>Checkout</span>
        </button>

        <div class="space-y-1 text-center text-sm text-neutral-400">
          <p class="space-x-2">
            <span>Shipping & Delivery</span>
            <span>•</span>
            <span>Returns</span>
            <span>•</span>
            <span>Pricing</span>
          </p>
          <p>Payment processed securely</p>
        </div>
      </ui-card>
    </main>
  </section>
</template>
