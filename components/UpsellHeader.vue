
<template>
    <section id="logo-bar">
        <div class="container mx-auto lg:w-2/3 bg-white lg:py-4 py-1">
            <div class="flex flex-wrap">
                <!-- Left Column -->
                <div class="lg:w-6/12 w-full flex justify-start">
                    <NuxtImg src="/images/logo.png" loading="eager" alt="logo" class="w-60 lg:mx-0 sm:mx-auto" />
                </div>
                <!-- Right Column -->
                <div class="lg:w-6/12 sm:w-full flex justify-end">
                    <NuxtImg src="/images/warn-img.png" loading="eager" alt="logo" class="w-5/6 lg:w-80"/>

                </div>
            </div>
        </div>
    </section>
    <section  id="topbar" class="bg-black py-3">

        <div class="container mx-auto lg:w-2/3">
            <div class="flex flex-wrap justify-center">
                <!-- STEP 1 -->
                <div class="lg:w-4/12 sm:w-full text-center px-2 d-none">
                    <h3 class="bg-gray text-lg text-gray-800 font-poppins py-3 font-medium d-none"><b>STEP 1 :</b> ORDER
                        PAGE</h3>
                </div>
                <!-- STEP 2 -->
                <div class="lg:w-4/12 sm:w-full text-center px-2">
                    <h3 class="bg-purple sm:w-full text-lg text-white font-poppins py-1 lg:py-3 font-medium"><b>STEP 2 :</b>
                        SPECIAL OFFER</h3>
                </div>
                <!-- STEP 3 -->
                <div class="lg:w-4/12 sm:w-full text-center px-2 d-none">
                    <h3 class="bg-gray text-lg text-gray-800 font-poppins py-3 font-medium d-none"><b>STEP 3 :</b>
                        CONFIRMATION</h3>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>

.bg-purple {
    background: #8f51ac;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}


.bg-gray {
    background: #D9D9D9;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
}

@media (min-width:300px) and (max-width:640px) {


    .d-none {
        display: none;
    }

    #topbar .flex {
        display: block !important;
    }

    #logo-bar .flex {
        display: block !important;
    }

    #logo-bar img {
        margin: 0 auto;
    }
}
</style>