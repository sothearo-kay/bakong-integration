<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { products, type Product } from '@/product'

interface CartItem extends Product {
  quantity: number
}

const searchTerm = ref<string>('')
const cart = ref<CartItem[]>([])

const filteredProducts = computed(() => {
  if (searchTerm.value.trim() === '') return []

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})

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
  searchTerm.value = ''
}

const updateQuantity = (productId: number, newQuantity: number) => {
  if (newQuantity < 1) return

  const item = cart.value.find((item) => item.id === productId)
  if (item) {
    item.quantity = newQuantity
  }
}

const removeFromCart = (productId: number) => {
  cart.value = cart.value.filter((product) => product.id !== productId)
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

    <main class="grid items-start gap-6 md:grid-cols-3">
      <div class="space-y-5 md:col-span-2">
        <div class="relative">
          <form @submit.prevent="">
            <input
              v-model="searchTerm"
              placeholder="Search product..."
              class="w-full rounded-lg px-4 py-2 shadow"
            />
          </form>

          <template v-if="filteredProducts.length">
            <div
              :class="[
                'absolute inset-x-0 z-10 mt-2 rounded-lg bg-white/80 shadow backdrop-blur-md',
                'max-h-60 snap-y snap-mandatory overflow-auto',
              ]"
            >
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                :class="[
                  'flex cursor-pointer snap-center items-end justify-between p-4',
                  'border-b transition-colors last:border-0 hover:bg-neutral-100',
                ]"
                @click="addToCart(product)"
              >
                <div class="space-y-1">
                  <h4 class="text-base font-medium">{{ product.name }}</h4>
                  <p class="text-sm text-neutral-500">
                    {{ product.description }}
                  </p>
                </div>
                <p class="text-sm font-medium">
                  {{ formatCurrency(product.price) }}
                </p>
              </div>
            </div>
          </template>
        </div>

        <ui-card>
          <div>
            <div class="flex items-center gap-x-2">
              <icon-cart class="h-5 w-5" />
              <h2 class="text-lg font-bold">Your Cart</h2>
            </div>

            <div v-if="cart.length" class="mt-4 space-y-4">
              <div
                v-for="item in cart"
                :key="item.id"
                class="relative flex items-end justify-between rounded-lg bg-neutral-100 p-4"
              >
                <div class="space-y-2">
                  <h4 class="text-base font-medium">{{ item.name }}</h4>
                  <p class="text-neutral-500">
                    {{ item.description }}
                  </p>

                  <div
                    class="mt-1 inline-flex items-center gap-x-2 rounded-full bg-white shadow-xs"
                  >
                    <button
                      class="flex-center h-7 w-7 rounded-full transition-colors hover:bg-neutral-100"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                    >
                      <icon-minus class="h-4 w-4" />
                    </button>
                    <span class="text-base font-medium">
                      {{ item.quantity }}
                    </span>
                    <button
                      class="flex-center h-7 w-7 rounded-full transition-colors hover:bg-neutral-100"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      <icon-plus name="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p class="font-medium">{{ formatCurrency(item.price) }}</p>

                <button
                  class="flex-center absolute top-4 right-4 h-7 w-7 rounded-full bg-white transition-colors hover:bg-neutral-200"
                  @click="removeFromCart(item.id)"
                >
                  <icon-x class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div v-else class="flex flex-col items-center py-10">
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
          class="my-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0071e3] py-2 text-white hover:bg-[#0077ED] disabled:opacity-70"
          :disabled="cart.length === 0"
        >
          <span>Checkout</span>
          <icon-chevron-right class="h-4 w-4" />
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
