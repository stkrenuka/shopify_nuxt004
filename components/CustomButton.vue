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
    props.size === "large" ? "text-white w-full lg:w-full md:text-lg font-semibold pt-2 pb-2 rounded-md" : "text-black h-[45px] lg:mt-3 lg:w-5/6";
  const primaryClasses = props.color ? "bg-[#000]" : "bg-[#ececec]";

  return `${baseClasses} ${sizeClasses} ${primaryClasses}`;
});

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
};
</script>
