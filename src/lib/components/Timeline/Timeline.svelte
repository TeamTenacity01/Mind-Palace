<script lang="ts">
    import { onMount } from "svelte";
    import Fa from 'svelte-fa'
    import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    
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
    }
    
    // Get the current date
    let currentDate = new Date();
    let months: { month: string, days: Date[] }[] = [];

    let tenDaysAgo = new Date();
    tenDaysAgo.setDate(currentDate.getDate() - 10);
    
    let initial = 4;

    // Function to generate the months array
    function generateMonthsArray(startDate: Date, numMonths: number): void {
        // Loop to add the next 'numMonths' months to the months list
        for (let i = 0; i < numMonths; i++) {
            let currentMonth = new Date(startDate.getFullYear(), startDate.getMonth() - 1 + i, 1);
            let daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
            let monthDays: Date[] = [];

            // Loop to generate days for the current month
            for (let j = 1; j <= daysInMonth; j++) {
                let day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), j);
                monthDays.push(day);
            }
            months.push({ month: currentMonth.toLocaleString('default', { month: 'long' }), days: monthDays });
            months = [...months];
        }
    }

    // Generate the initial months array
    generateMonthsArray(currentDate, initial);

    function nextDateRange(){
        const lastMonth = months[months.length - 1];
        const lastDate = lastMonth.days[lastMonth.days.length - 1];

        const currentMonth = lastDate.getMonth(); // Get the current month (0-11)
        const nextMonth = (currentMonth + 2) % 12; // Get the next month (0-11)
        const currentYear = lastDate.getFullYear(); // Get the current year
        const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear; // If the next month is January, increment the year

        const final = new Date(nextYear, nextMonth, 1);

        months.splice(0, months.length);
        months = [...months];
        generateMonthsArray(final, initial);
    }

    function pastDateRange(){
        const firstDateInMonthsList = months[0].days[0];
        const sevenMonthsBefore = new Date(firstDateInMonthsList.getFullYear(), firstDateInMonthsList.getMonth() - (initial-1), firstDateInMonthsList.getDate());
        months.splice(0, months.length);
        months = [...months];
        generateMonthsArray(sevenMonthsBefore, initial);
    }

    let tasklist: Task[] = [
      {
            id: "uuid4",
            name: "Build Amazing Tool",
            isRendered: true,
            created_at: currentDate,
            updated_at: currentDate,
            description: "description here",
            start_date: new Date(2024, 4, 4, 12, 0, 0),
            due_date: new Date(2024, 4, 10, 12, 0, 0),
            project_id: "uuid4",
            status: "incomplete",
            priority: "1",
            assignee: [],
        },
        {
            id: "uuid2",
            name: "OFWGKTA is so underrated",
            isRendered: true,
            created_at: currentDate,
            updated_at: currentDate,
            description: "description here",
            start_date: new Date(2024, 4, 9, 12, 0, 0),
            due_date: new Date(2024, 4, 15, 12, 0, 0),
            project_id: "uuid4",
            status: "incomplete",
            priority: "1",
            assignee: [],
        },
        {
            id: "uuid1",
            name: "Apple pen pinaple pen",
            isRendered: true,
            created_at: currentDate,
            updated_at: currentDate,
            description: "description here",
            start_date: new Date(2024, 4, 7, 12, 0, 0),
            due_date: new Date(2024, 4, 12, 12, 0, 0),
            project_id: "uuid4",
            status: "incomplete",
            priority: "1",
            assignee: [],
        },
    ];
    
    
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
    let additembtn: HTMLDivElement;
    
    
    function handleScrollTimeline() {
        return () => {
            for (let i = 0; i < taskDivs.length; i++) {
                taskDivs[i].scrollTop = timelineDiv.scrollTop;
                taskDivs[i].scrollLeft = timelineDiv.scrollLeft;
            }
        };
    }

    function handleScrollAdd(){
        return () => {
            for (let i = 0; i < taskDivs.length; i++) {
                taskDivs[i].scrollTop = additembtn.scrollTop;
                taskDivs[i].scrollLeft = additembtn.scrollLeft;
            }
            timelineDiv.scrollTop = additembtn.scrollTop;
            timelineDiv.scrollLeft = additembtn.scrollLeft;
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
        timelineDiv.scrollLeft = 40 * Math.ceil((tenDaysAgo.getTime() - months[0].days[0].getTime()) / (1000 * 60 * 60 * 24));
        timelineDiv.addEventListener('scroll', handleScrollTimeline());
    
        taskDivs.forEach((div, index) => {
          const scrollHandler = handleScrollTask(index);
          div.addEventListener('scroll', scrollHandler);
        });

        taskDivs.push(additembtn);
    
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

    function addTask() {
        // Generate a new unique ID for the task (you can use a UUID library or any other method)
        const newTaskId = "uuid" + (tasklist.length + 1);

        const currDate = new Date(); 
        currDate.setDate(currentDate.getDate() - 1);

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 6);
        
        // Create a new task object with default values or prompt the user for input
        const newTask: Task = {
            id: newTaskId,
            name: "New Task",
            isRendered: true,
            created_at: new Date(),
            updated_at: new Date(),
            description: "",
            start_date: currDate,
            due_date: dueDate,
            project_id: "",
            status: "incomplete",
            priority: "1",
            assignee: [],
        };
        
        // Add the new task to the tasklist array
        tasklist.push(newTask);
        tasklist = [...tasklist];

        timelineDiv.scrollLeft += 1;
    }

</script>
    
    <style lang="postcss">
        .btn {
            @apply flex justify-center items-center opacity-70;
        }

        .timeline{
            @apply  border-x border-gray-300;
        }
        .timeline::-webkit-scrollbar {
            @apply hidden;
        }
        .timeline, .task{
            @apply flex w-full overflow-x-scroll;
        }
        .tl-months{
            @apply flex flex-col border border-gray-300;
        }
        .tld-months{
            @apply flex flex-col;
        }
        .tl-months > p{
            @apply ml-2;
        }
        .tl-days{
            @apply flex  align-middle;
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
        
        .task-thumb{
            @apply pl-2;
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
        .task:not(:last-child)::-webkit-scrollbar {
            @apply hidden;
        }
        .task:last-child {
            @apply pb-4;
        }

    
    </style>

    <div class="w-full relative">
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
                            <div class="tld-months">
                                <div class="tl-days" style="border-width: 0;">
                                    {#each month.days as day}
                                        <div class="tl-day"></div>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                        
                        {#if (task.start_date.getTime() > months[0].days[0].getTime()) && (task.due_date.getTime() < months[months.length - 1].days[months[months.length - 1].days.length - 1].getTime())}
                            {#if task.isRendered}
                                <td class="task-thumb my-auto absolute" style="width: { 40 * (Math.ceil((task.due_date.getTime() - task.start_date.getTime()) / (1000 * 60 * 60 * 24)) )}px; margin-left: {40 * Math.ceil((task.start_date.getTime() - months[0].days[0].getTime()) / (1000 * 60 * 60 * 24))}px;">
                                    <p><span>{task.name}</span></p>
                                </td>
                            {/if}
                        {/if}
                    </div>
                {/each}

                <div class="task relative my-3" bind:this={additembtn} on:scroll={handleScrollAdd()}>
                    {#each months as month}
                        <div class="tld-months">
                            <div class="tl-days" style="border-width: 0;">
                                {#each month.days as day}
                                    <div class="tl-day"></div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
    
            <!-- Task list -->
            <table class="border-collapse border border-gray-300 absolute top-0 bg-white">
                {#each tasklist as task, index}
                    <tr class=" my-2 h-[40px] w-[360px] flex flex-row justify-between align-middle">
                        <td class="my-auto mx-2">{task.name}</td>
                        <button class="btn" on:click={() => setRender(index)}>
                            {#if task.isRendered}
                                <Fa icon={faEyeSlash} size="0.9x"/>
                            {:else}
                                <Fa icon={faEye} size="0.9x"/>
                            {/if}
                        </button>
                    </tr>
                {/each}
                    <tr role="button" on:click={addTask} class=" my-3 mx-2 h-[40px] w-[360px] flex flex-row justify-between align-middle border border-gray-300 rounded-lg">
                        <td class="my-auto mx-auto ">﹢Add Item</td>
                    </tr>
            </table>
        </div>
    </div>
    
    <div class="flex justify-end pt-2">
        <button class="border border-gray-400 rounded-lg px-4 py-1 mr-6" on:click={() => pastDateRange()}>
            <p>Today</p>
        </button>
        <button class="border border-gray-400 rounded-lg px-4 py-1 mr-2" on:click={() => pastDateRange()}>
            <p>{"<"}</p>
        </button>
        <button  class="border border-gray-400 rounded-lg px-4 py-1"on:click={() => nextDateRange()}>
            <p> {">"} </p>
        </button>
    </div>