<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2 font-plusJakartaSans">
    <!-- Left side -->
    <div class="flex flex-col justify-center px-8 md:px-12 bg-gradient-to-br from-[#000FE224] via-white to-[#000FE234]  relative">
        <div class="max-w-md absolute bottom-[100px]">
            <h1 class="text-[20px] md:text-[40px] font-bold mb-4 text-[#010101]">
            Your Tasks, Always under your control
            </h1>
            <p class="text-[#424242] text-[14px] font-normal">
            Whether it's daily reminders or big projects, stay on top of everything with ease.
                Organize, prioritize, and track progress so you never miss what matters most.
            </p>
        </div>
    </div>

    <!-- Right side -->
    <div class="flex justify-center items-center px-8 bg-[#FDFDFD]">
      <slot />
    </div>
  </div>
</template>
