<script lang="ts">
    import { onMount } from "svelte";
    
    interface Task{
        id: string;
        name: string;
        isRendered: boolean;
        created_at: Date;
        updated_at: Date;
        description: string;
        start_date: Date;
        due_date: Date;
        project_id: string;
        status: string;
        priority: string;
        assignee: string[];
        offset: number;
    }
    
    // Get the current date
    let currentDate = new Date();
    let months: { month: string, days: Date[] }[] = [];
    
    let atEndOfForwardScroll = false;

    let initial = 12;
    // Loop adds the next 12 months in the months list
    for (let i = 0; i < initial; i++) {
        let currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    
        let daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    
        let monthDays: Date[] = [];
    
        for (let j = 1; j <= daysInMonth; j++) {
            let day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), j);
            monthDays.push(day);
        }
        months.push({ month: currentMonth.toLocaleString('default', { month: 'long' }), days: monthDays });
    }
    
    let tasklist: Task[] = [
      {
            id: "uuid4",
            name: "name of task 1",
            isRendered: true,
            created_at: currentDate, // Replace with your timestamp object without timezone
            updated_at: currentDate, // Replace with your timestamp object without timezone
            description: "description here",
            start_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1), // Replace with your timestamp object without timezone
            due_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7), // Replace with your timestamp object without timezone
            project_id: "uuid4",
            status: "incomplete",
            priority: "1",
            assignee: [],
            // offset: Math.ceil((new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)),
            offset: 40 * Math.ceil((new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1).getTime() - months[0].days[0].getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            id: "uuid4",
            name: "perhaps this is a longer name",
            isRendered: true,
            created_at: currentDate, // Replace with your timestamp object without timezone
            updated_at: currentDate, // Replace with your timestamp object without timezone
            description: "description here",
            start_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2), // Replace with your timestamp object without timezone
            due_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 24), // Replace with your timestamp object without timezone
            project_id: "uuid4",
            status: "incomplete",
            priority: "2",
            assignee: [],
            offset: 40 * Math.ceil((new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2).getTime() - months[0].days[0].getTime()) / (1000 * 60 * 60 * 24)),
        },
        {
            id: "uuid6",
            name: "perhaps this is a much longer name",
            isRendered: true,
            created_at: currentDate, // Replace with your timestamp object without timezone
            updated_at: currentDate, // Replace with your timestamp object without timezone
            description: "description here",
            start_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), // Replace with your timestamp object without timezone
            due_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 12), // Replace with your timestamp object without timezone
            project_id: "uuid4",
            status: "incomplete",
            priority: "3",
            assignee: [],
            offset: 40 * Math.ceil((new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime() - months[0].days[0].getTime()) / (1000 * 60 * 60 * 24)),
        }
    ];
    
    function addMonth() {
        console.log("This addmonths() runs");
        currentDate.setMonth(currentDate.getMonth() + 1);
    
        let currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        let monthDays: Date[] = [];
    
        for (let j = 1; j <= daysInMonth; j++) {
            let day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), j);
            monthDays.push(day);
        }
        
        months.push({ month: currentMonth.toLocaleString('default', { month: 'long' }), days: monthDays });
    
        // Trigger reactivity to reflect the change in the timeline
        // This will cause Svelte to re-render the timeline with the new month
        months = [...months];
    }
    
    
    
    tasklist.sort((a, b) => {
        // Convert priority strings to numbers for comparison
        const priorityA = parseInt(a.priority);
        const priorityB = parseInt(b.priority);
    
        // Compare priorities
        if (priorityA < priorityB) {
            return -1; // a comes before b
        } else if (priorityA > priorityB) {
            return 1; // b comes before a
        } else {
            return 0; // priorities are equal
        }
    });
    
    let timelineDiv: HTMLDivElement;
    let taskDivs: HTMLDivElement[] = [];
    
    
    function handleScrollTimeline() {
        return (event: Event) => {
            let timeline = event.target as HTMLElement;
            for (let i = 0; i < taskDivs.length; i++) {
                taskDivs[i].scrollTop = timelineDiv.scrollTop;
                taskDivs[i].scrollLeft = timelineDiv.scrollLeft;
            }
    
            // Check if the timeline has reached the end
            const buffer = 10; // Adjust this value as needed
    
            if (timeline.scrollLeft >= timeline.scrollWidth - timeline.clientWidth - buffer) {
                // Reached the end of the horizontal scroll
               
                atEndOfForwardScroll = true;
    
                console.log("I reached the end of the timelines");
            }
            else
            atEndOfForwardScroll = false;
        };
    }
    
    
    function handleScrollTask(index: number) {
        return () => {
          for (let i = 0; i < taskDivs.length; i++) {
            if (i !== index) {
              taskDivs[i].scrollTop = taskDivs[index].scrollTop;
              taskDivs[i].scrollLeft = taskDivs[index].scrollLeft;
            }
          }
          timelineDiv.scrollTop = taskDivs[index].scrollTop;
          timelineDiv.scrollLeft = taskDivs[index].scrollLeft;
        };
      }
    
      onMount(() => {
        timelineDiv.addEventListener('scroll', handleScrollTimeline());
    
        taskDivs.forEach((div, index) => {
          const scrollHandler = handleScrollTask(index);
          div.addEventListener('scroll', scrollHandler);
        });
    
        return () => {
          timelineDiv.removeEventListener('scroll', handleScrollTimeline());
        };
      });
    
    function setRender(index:number){
        if(tasklist[index].isRendered == false){
            tasklist[index].isRendered = true;
        } else {
            tasklist[index].isRendered = false;
        }
    }
    
    let runOnce = true;
    function shiftTimeline() {
    if (atEndOfForwardScroll) {
        // Remove the first 6 months
        months.splice(0, 6);
        if(runOnce)
        {
            currentDate.setMonth(currentDate.getMonth() - 1);
            runOnce =false;
        }
       
        for (let i = 0; i < 6; i++) {
            addMonth();
        }
        // Calculate the middle index
        const middleIndex = Math.floor(months.length / 2);
        // Calculate the cumulative width of months leading up to the middle
        let cumulativeWidth = 0;
        for (let i = 0; i < middleIndex; i++) {
            cumulativeWidth += months[i].days.length * 40; // Assuming each day cell has a width of 40px
        }
        // Set the scroll position to the middle
        timelineDiv.scrollLeft = cumulativeWidth;
    }
}
function shiftTimelineBackwards() {
    if (!atEndOfForwardScroll) {
        // Remove the last 6 months
        if (!atEndOfForwardScroll) {
    // Add 6 months before the original first month
    for (let i = 1; i <= 6; i++) {
        const prevMonth = new Date(months[0].days[0]);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        months.unshift({
            month: prevMonth.toLocaleString('default', { month: 'long' }),
            days: Array.from({ length: new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate() }, (_, i) => new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i + 1))
        });
    }
    // Remove the last 6 months
    months.splice(months.length - 6, 6);
}
        // Calculate the cumulative width of the added months
        let cumulativeWidth = 0;
        for (let i = 0; i < 6; i++) {
            cumulativeWidth += months[i].days.length * 40; // Assuming each day cell has a width of 40px
        }
        // Set the scroll position to the cumulative width
        timelineDiv.scrollLeft = cumulativeWidth;
        months = [...months];
    }
}


    </script>
    
    <style lang="postcss">
        .btn {
            @apply border border-gray-300 w-12 mx-2;
        }
        .timeline{
            @apply  border border-gray-300;
        }
        .timeline, .task{
            @apply flex w-full overflow-x-scroll;
        }
        .tl-months{
            @apply flex flex-col;
        }
        .tl-months > p{
            @apply ml-2;
        }
        .tl-days{
            @apply flex border border-gray-300 align-middle;
        }
        .tl-day {
            @apply w-[40px] h-[40px] text-center flex justify-center;
        }
        .tl-day-curr {
            @apply  w-[40px] h-[40px] text-center flex justify-center bg-slate-600 text-white;
        }
        .tl-day > p, .tl-day-curr > p{
            @apply my-auto;
        }
        .task{
            @apply my-2; 
        }
        
        .task-thumb > p{
            @apply relative w-full h-full;
        }
        .task-thumb > p > span{
            @apply absolute whitespace-nowrap not-italic h-full flex items-center;
        }
        .task > td{
            @apply border border-gray-300 h-[40px] flex flex-col items-center;
        }
        .task > td > p{
            @apply my-auto;
        }
        .task::-webkit-scrollbar {
            @apply hidden;
        }
    
    </style>
    
    
    <h1 class="mb-20">Team Tenacity</h1>
    
    <div class="w-full border border-gray-300 relative">
        <!-- timeline -->
        <div class="timeline" bind:this={timelineDiv} on:scroll={handleScrollTimeline()}>
            {#each months as month}
                <div class="tl-months">
                    <p>{month.month} {month.days[0].getFullYear()}</p>
                    <div class="tl-days">
                        {#each month.days as day}
                            {#if day.toDateString() == currentDate.toDateString()}
                                <div class="tl-day-curr"><p>{day.getDate()}</p></div>
                            {:else}
                                <div class="tl-day"><p>{day.getDate()}</p></div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    
        <!-- Tasks on timeline -->
        <div class="relative">
            <div class="w-full border border-gray-300">
                {#each tasklist as task, i}
                    <div class="task relative" bind:this={taskDivs[i]} on:scroll={handleScrollTask(i)}>
                        {#each months as month}
                            <div class="tl-months">
                                <div class="tl-days" style="border-width: 0;">
                                    {#each month.days as day}
                                        <div class="tl-day"></div>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                        
                        {#if task.isRendered}
                            <td class="task-thumb my-auto absolute" style="width: { 40 * (Math.ceil((task.due_date.getTime() - task.start_date.getTime()) / (1000 * 60 * 60 * 24)) )}px; margin-left: {task.offset}px;">
                                <p><span>{task.name}</span></p>
                            </td>
                        {/if}
                    </div>
                {/each}
            </div>
    
            <!-- Task list -->
            <table class="border-collapse border border-gray-300 absolute top-0 bg-white">
                {#each tasklist as task, index}
                    <tr class=" my-2 h-[40px] w-full flex flex-row justify-between align-middle">
                        <td class="my-auto mx-2">{task.name}</td>
                        <button class="btn" on:click={() => setRender(index)}>
                            {task.isRendered ? '+' : '-'}
                        </button>
                    </tr>
                {/each}
            </table>
        </div>
    </div>
    <div class="timeline-controls">
        <button class="btn" on:click={shiftTimelineBackwards}>Backwards</button>
        <button class="btn" on:click={shiftTimeline}>Forward</button>
    </div>
    
    
    