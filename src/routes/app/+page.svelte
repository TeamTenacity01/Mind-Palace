<script lang="ts">

    let randTasks: string[] = ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5", "Task 6"]

</script>

<style lang="postcss">
    .view{
        @apply grid grid-cols-[2fr_1fr] gap-4;
    }
    .header{
        @apply mb-8;
    }

    .teams-block{
        @apply flex flex-row align-middle my-6;
    }

    .dateblock{
        @apply w-28 flex flex-col items-center mr-4 p-4 rounded-xl;
    }

    .teamlinks{
        @apply mx-2 flex flex-row gap-4 items-center;
    }

    .teamlink{
        @apply grid items-center justify-center  text-center border border-black rounded-full w-24 h-24;
    }

    .tasklist{
        @apply h-[calc((100vh/1.5)+10px)] overflow-y-auto;
    }

    .task{
        @apply h-20 border border-black rounded-lg w-full p-3 my-3;
    }

    .inbox{
        @apply h-full border border-black rounded-lg p-2;
    }
</style>

<main class="view">
    <section class="left">
        <div class="header">
            <h1 class="screen-header">Good Morning, Joshua</h1>
            <p class="text-lg">Conquer the day.</p>
        </div>

        <div class="teams-block">
            <div class="dateblock">
                <p>MON</p>
                <p class="font-bold text-3xl">31</p>
                <p class="text-gray-500 text-sm">September</p>
            </div>
            <div class="teamlinks">
                <div class="teamlink">Team Tenacity</div>
                <div class="teamlink">Team Rocket</div>
                <div class="teamlink">Team Moon</div>
            </div>
        </div>

        <div class="tasklist">
            {#each randTasks as task }
                <div class="task">
                    {task}
                </div>
            {/each}
        </div>
    </section>

    <section class="right h-full">
        <div class="inbox">

        </div>
    </section>
</main>