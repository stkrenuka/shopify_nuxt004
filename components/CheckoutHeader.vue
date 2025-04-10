<template>
	<section class="border-b border-b-gray-300">
		<div class="container-fluid mx-auto max-w-screen-xl lg:w-full bg-white">
			<div class="flex justify-between items-center py-4 px-4 lg:px-20">
				<!-- Left -->
				<div class="">
					<div class="">
						<NuxtLink to="/"><NuxtImg src="/images/logo.png" class="w-60" /></NuxtLink>

					</div>
				</div>
				<!-- right -->
				<div class="">
					<div class="">
						<NuxtImg src="/images/shopping-cart.png" class="w-5" />
					</div>
				</div>

			</div>
		</div>
	</section>
</template>
<style scoped>
@media (min-width: 1024px) {
	.lg\:px-20 {
		padding-left: 4.6rem;
		padding-right: 8rem;
	}

	.w-60 {
		width: 13.8rem
	}

	.w-5 {
		width: 1.1rem;
	}
}
</style>