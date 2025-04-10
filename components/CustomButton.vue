<template>
  <button :disabled="disabled" :class="computedClasses">
    <slot>{{ placeholder }}</slot>
  </button>
</template>

<script setup>

const props = defineProps({
  placeholder: {
    type: String,
    default: "Click Me",
  },
  color: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const computedClasses = computed(() => {
  const baseClasses = "";
  const sizeClasses =
    props.size === "large" ? "text-white w-full md:text-lg font-semibold pt-3 pb-3 rounded-md" : "text-black h-[52px] lg:mt-3";
  const primaryClasses = props.color ? "bg-[#000]" : "bg-[#ececec]";

  return `${baseClasses} ${sizeClasses} ${primaryClasses}`;
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>
