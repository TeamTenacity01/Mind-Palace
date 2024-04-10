<!-- Layout.svelte -->
<script>
     export let title;
  </script>
  
  <div class="flex h-screen">

  
    <main class="flex-1 p-4">

      <slot></slot>
    </main>
  </div>
  
  <style>
    /* Add Tailwind CSS styles here */
  </style>
  