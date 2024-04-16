
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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
}

let tasklist: Task[] = [
  {
        id: "uuid4",
        name: "name of task 1",
        isRendered: false,
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
        name: "name of task 2",
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
        priority: "1",
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
        priority: "1",
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
        priority: "1",
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
        priority: "1",
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
        priority: "1",
        assignee: []
    }
];

<<<<<<< Updated upstream
  function setRender(index:number)
  {
    if(tasklist[index].isRendered == false)
    tasklist[index].isRendered = true;
    else
    tasklist[index].isRendered = false;
=======
function addMonth() {
    console.log("This addmonths() runs");
    currentDate.setMonth(currentDate.getMonth()+1);
>>>>>>> Stashed changes

  }


<<<<<<< Updated upstream
  tasklist.sort((a, b) => {
=======
function shiftTimeline() {
    if (atEndOfForwardScroll) {
        // Remove the first 6 months
        months.splice(0, 6);

       
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





tasklist.sort((a, b) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
=======

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
            {
                atEndOfForwardScroll=false;
            }
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

function scrollForward()
{
    timelineDiv.scrollLeft += 100;
}
>>>>>>> Stashed changes
</script>

<!--First task-->
<Layout title="Project Roadmap">
  <div class="flex gap-6">
    <table class="border-collapse border border-gray-300">
        {#each tasklist as task}
        <tr>
            <td class="border border-gray-300 p-4 w-48 h-15">{task.name}</td>
        </tr>
        {/each}
    </table>

    <!--Renderer Table if render or not so the + or - -->
    <table class="border-collapse border border-gray-300">
        {#each tasklist as task, index}
        <tr>
            <td class="border border-gray-300 p-4 cursor-pointer" on:click={() => setRender(index)}>
                {#if task.isRendered}
                  <button class="btn">+</button>
                {:else}
                  <button class="btn">-</button>
                {/if}
            </td>
        </tr>
        {/each}
    </table>

<<<<<<< Updated upstream
    <!-- Vertical line -->
    <div class="border-l border-gray-300 h-full"></div>
=======
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
>>>>>>> Stashed changes

  <!-- Rendered table -->
<table class="border-collapse border border-gray-300">
  {#each tasklist as task, index}
  {#if task.isRendered}
  <tr>
    <td class="border border-gray-300 p-4 w-48 h-15">{task.name}</td>
  </tr>
  {:else}
  <tr>
    <td class="border border-gray-300 p-4 w-48 h-15"></td>
  </tr>
  {/if}
  {/each}
</table>

  </div>
</Layout>
