<script lang="ts">
	import Layout from "./+layout.svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let tasks: { text: string, width: number, height: number }[] = [{ text: '', width: 200, height: 100 }];
	let isResizing: boolean = false;
	let resizingIndex: number | null = null;
	let checkWordCount = false;

	let taskClicked: boolean[] = new Array(tasks.length).fill(false); // Initialize array to track clicked state for each task
  
	interface Task {
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

let tasklist: Task[] = [
  {
        id: "uuid4",
        name: "name of task 1",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "1",
        assignee: []
    },
    {
        id: "uuid4",
        name: "name of task 2",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "2",
        assignee: []
    },
    {
        id: "uuid6",
        name: "perhaps this is a much longer name",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "3",
        assignee: []
    },
    {
        id: "uuid4",
        name: "WOWOWOEAKDSAODKASOPDKAOWDKPOAWDKOPO",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "4",
        assignee: []
    },
    {
        id: "uuid4",
        name: "asdklasdjaldjsaldkjawlkdjalkawjdlawdjawdlkajdlakwsjlka",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "5",
        assignee: []
    },
    {
        id: "uuid4",
        name: "afskldjaklsdjaslkdalkdwajk",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "6",
        assignee: []
    },
    {
        id: "uuid4",
        name: "asdkalsdjklakldjlkawjdkladwljkajkl",
        isRendered: true,
        created_at: new Date(), // Replace with your timestamp object without timezone
        updated_at: new Date(), // Replace with your timestamp object without timezone
        description: "description here",
        start_date: new Date(), // Replace with your timestamp object without timezone
        due_date: new Date(), // Replace with your timestamp object without timezone
        project_id: "uuid4",
        status: "incomplete",
        priority: "7",
        assignee: []
    }
];

  function setRender(index:number)
  {
    if(tasklist[index].isRendered == false)
    tasklist[index].isRendered = true;
    else
    tasklist[index].isRendered = false;

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

  

let months: { month: string, days: Date[] }[] = [];

// Get the current date
let currentDate = new Date();

// Loop through the next 12 months
for (let i = 0; i < 12; i++) {
    // Create a new date for the current month
    let currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);

    // Get the number of days in the current month
    let daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    // Create an array to hold the days of the current month
    let monthDays: Date[] = [];

    // Loop through the days of the current month
    for (let j = 1; j <= daysInMonth; j++) {
        // Create a new date for each day
        let day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), j);
        
        // Add the day to the array of days for the current month
        monthDays.push(day);
    }

    // Add the array of days and the month label to the array of months
    months.push({ month: currentMonth.toLocaleString('default', { month: 'long' }), days: monthDays });
}
</script>

<style lang="postcss">
	.btn {
		@apply border border-gray-300 w-12;
	}
	.timeline{
		@apply flex w-full overflow-x-scroll border border-gray-300;
	}
	.tl-months{
		@apply flex flex-col  border-y border-gray-300;
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
</style>


<h1 class="mb-20">Team Tenacity</h1>

<div class="timeline">
	{#each months as month}
		<div class="tl-months">
			<p>{month.month}</p>
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

<div class="flex relative">
	<!-- TaskList -->
	<table class="border-collapse border border-gray-300 absolute hidden">
	
		{#each tasklist as task, index}
			<tr class="border border-r-0 border-gray-300 h-12 w-full flex flex-row justify-between align-middle">
				<td class="my-auto mx-2">{task.name}</td>
				<button class="btn" on:click={() => setRender(index)}>
					{task.isRendered ? '+' : '-'}
				</button>
			</tr>
		{/each}
	</table>

	<!-- Rendered table -->
	<table class="border-collapse border border-gray-300 w-full">
		{#each tasklist as task}
			{#if task.isRendered}
				<tr class="border border-gray-300 h-12 w-full flex flex-row justify-between align-middle">
					<td class="my-auto mx-2">{task.name}</td>
				</tr>
			{:else}
				<tr class="border border-gray-300 h-12 w-full flex flex-row justify-between align-middle">
					<td class="my-auto mx-2"></td>
				</tr>
			{/if}
		{/each}
	</table>
</div>