<script lang="ts">
    import { onMount } from 'svelte';
    let dates: Date[]= [];
    
    // Function to generate an array of dates
    function generateDates() {
      const startDate = new Date();
      for (let i = 0; i < 100; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }
    }
    
    // Call the function to generate dates when the component is mounted
    onMount(() => {
      generateDates();
      console.log(dates)
    });
  </script>
  
  <div class="horizontal-scroll">
    {#each dates as date}
      <div class="date">{date.toDateString()}</div>
    {/each}
  </div>
  
  <style>
    .horizontal-scroll {
      display: flex;
      overflow-x: auto;
      white-space: nowrap;
    }
    
    .date {
      padding: 10px;
      border: 1px solid #ccc;
      margin-right: 10px;
    }
  </style>

  