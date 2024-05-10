<script lang="ts">
    import Kanban from "$lib/components/Kanban/Kanban.svelte";
    import Timeline from "$lib/components/Timeline/Timeline.svelte";
    import Chat from "$lib/components/ProjectChat/Chat.svelte";
    
    let views = [
        // { 
        //     label: "Overview",
        //     value: 1,
        //     component: Kanban,
        // },
        { 
            label: "Board",
            value: 2,
            component: Kanban,
        },
        { 
            label: "Timeline",
            value: 3,
            component: Timeline,
        },
        // { 
        //     label: "Messages",
        //     value: 4,
        //     component: Chat,
        // },
        
    ];

    let currentComponent = views[0].component;
    let activeTab = views[0];

    function changeView(component: any, view: any){
        currentComponent = component;
        activeTab = view;
    }
</script>

<style lang="postcss">
    .view-list{
        @apply flex w-full gap-3;
    }
    .view-option{
        @apply border border-slate-300 w-28 py-3 px-4 rounded-md border-b-0 rounded-b-none;
    }
    .active-tab {
        @apply text-white bg-slate-800;
    }
</style>

<main class="flex flex-auto flex-col pb-3 flex-grow w-full">
    <h1 class="mb-8 screen-header">Team Tenacity</h1>
    <section class="flex flex-auto flex-col">
        <div class="view-list">
            {#each views as view}
                <button class="view-option {activeTab === view ? 'active-tab' : ''}" on:click={() => changeView(view.component, view)}>
                    {view.label}
                </button>
            {/each}
            <!-- <button class="view-option">
                Settings
            </button> -->
        </div>
        <hr class="mb-5">

        <div class="w-full h-full overflow-x-auto flex flex-auto">
            <svelte:component this={currentComponent}></svelte:component>
        </div>
    </section>
</main>
