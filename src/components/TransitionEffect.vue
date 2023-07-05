<template>
  <Transition name="fade" appear>
    <slot></slot>
  </Transition>
</template>

<script>
// JavaScript hooks logic...
</script>

<style lang="scss">
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
