<script lang="ts">
    let randTasks: string[] = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"]
</script>

<style lang="postcss">
    .tasklist{
        @apply mt-10;
    }

    .task{
        @apply h-20 border border-black rounded-lg w-full p-3 my-3;
    }
</style>

<div>
    <h1 class="screen-header">Your Tasks</h1>
    <p class="text-lg">Take the day one task at a time.</p>
</div>

<div class="tasklist">
    <p class="italic ml-2 text-lg">Team Tenacity</p>
    {#each randTasks as task }
        <div class="task">
            {task}
        </div>
    {/each}
</div>