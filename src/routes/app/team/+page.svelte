
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
  
</script>

<style lang="postcss">
  .btn{
    @apply border border-gray-300 w-12;
  }
</style>

<!--First task-->
<Layout title="Project Roadmap">
  <div class="flex">

    <table class="border-collapse border border-gray-300">
        {#each tasklist as task, index}
          <tr class="border border-r-0 border-gray-300 h-12 w-full flex flex-row justify-between align-middle">
              <td class="my-auto mx-2">{task.name}</td>
              {#if task.isRendered}
                  <button class="btn" on:click={() => setRender(index)}>+</button>
                {:else}
                  <button class="btn" on:click={() => setRender(index)}>-</button>
              {/if}
          </tr>
        {/each}
    </table>

    <!-- Vertical line -->
    <div class="border-l border-gray-300 h-full"></div>

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
</Layout>
