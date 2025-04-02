<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue'

const show = defineModel('show')
const dialog = useTemplateRef<HTMLDialogElement | null>('dialog')

watch(show, (newValue) => {
  nextTick(() => {
    if (newValue) {
      dialog.value?.showModal()
      console.log(dialog.value?.open)
    } else {
      dialog.value?.close()
    }
  })
})

const openDialog = () => (show.value = true)
const closeDialog = () => (show.value = false)
</script>

<template>
  <div>
    <!-- Trigger Slot -->
    <slot name="trigger" :openDialog="openDialog" />

    <Transition name="modal">
      <dialog v-if="show" ref="dialog" @close="closeDialog">
        <slot name="content" :closeDialog="closeDialog" />
      </dialog>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>
