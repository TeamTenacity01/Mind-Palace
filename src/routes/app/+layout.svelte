<script lang="ts">
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    let isSideBarClosed = false;
    let sidebarClass = "sidepanel";
    let closeBtnClass = "close";
    let appClass = "app";

    function closeSideBar(){
        isSideBarClosed = !isSideBarClosed;
        closeBtnClass = isSideBarClosed ? "open" : "close";
        appClass = isSideBarClosed ? "app-sidepanel-closed" : "app";
        sidebarClass = isSideBarClosed ? "sidepanel-closed" : "sidepanel";
    }

    let screenlinks = [
        {
            "name": "Dashboard",
            "link": "/app"
        },
        {
            "name": "My Tasks",
            "link": "/app/tasks"
        },
        {
            "name": "Inbox",
            "link": "/app/inbox"
        }
    ]
</script>

<style lang="postcss">
    .app{
        @apply grid grid-cols-[5fr_5fr] sm:grid-cols-[3fr_7fr] lg:grid-cols-[1.5fr_8.5fr] h-full overflow-hidden;
    }
    .app-sidepanel-closed{
        @apply grid grid-cols-[0fr_10fr] h-full;
    }
    .sidepanel-wrapper{
        @apply relative h-full;
    }
    .sidepanel{
        @apply bg-slate-900 text-white grid grid-rows-[0.5fr_9fr_0.5fr] h-screen;
    }
    .sidepanel-closed{
        @apply hidden;
    }
    .logo{
        @apply px-2 py-4 border-b border-b-slate-600 flex flex-row w-full justify-between;
    }

    /* Bro I overengineered this fucking close sidebar btn just because i wanted it to look good */
    .close-btn{
        @apply absolute -right-4 bottom-1/2 w-2 h-12;
    }
    [class^="th-"] {
        @apply border border-slate-900 bg-slate-900 rounded-lg w-2 h-5 absolute top-3;
    }
    [class^="bh-"] {
        @apply border border-slate-900 bg-slate-900 rounded-lg w-2 h-5 absolute;
    }
    .close-btn:hover .th-close-btn, .bh-open-btn {
        @apply rotate-[15deg];
    }
    .close-btn:hover .bh-close-btn, .th-open-btn{
        @apply -rotate-[15deg];
    }
    .close-btn:hover * {
        @apply border-slate-700 bg-slate-700;
    }
    

    .links{
        @apply grid grid-flow-row grid-rows-2;
    }
    .screenlinks{
        @apply flex flex-col;
    }
    .screenlink{
        @apply p-2;
    }
    .active-screenlink{
        @apply bg-slate-600 p-2;
    }
    .screenlink:hover {
        @apply bg-slate-800;
    }
    .teamlinks{
        @apply flex flex-col gap-3 text-left;
    }
    .teamlinks > a{
        @apply px-2 py-1 bg-slate-700 rounded-sm;
    }
    .teamlinks-wrapper{
        @apply p-2 border-t border-t-slate-600;
    }
    .teamlinks-wrapper > h2{
        @apply my-2 text-slate-300;
    }

    .bottombtns{
        @apply flex flex-col;
    }
    .settingsbtn{
        @apply border-t border-slate-600 text-left p-2;
    }
    .settingsbtn:hover{
        @apply bg-slate-800;
    }
    .screen{
        @apply p-4 h-full;
    }
</style>

<main class={appClass}>
    <div class="sidepanel-wrapper">
        <section class={sidebarClass}>
            <div class="logo">
                <h1>Mind Palace Logo</h1>
            </div>
            <div class="links">
                <div class="screenlinks">
                    {#each screenlinks as linkset}
                        <a href={linkset.link} class={$page.url.pathname === linkset.link ? 'active-screenlink' : 'screenlink'}>{linkset.name}</a>
                    {/each}
                </div>
                <div class="teamlinks-wrapper">
                    <h2>Teams</h2>
                    <!-- <hr> -->
                    <div class="teamlinks">
                        <a href="/app/team">Team Tenacity</a>
                    </div>
                </div>
            </div>
            <form class="bottombtns" method="post" action="/app?/signout" use:enhance>
                <button class="settingsbtn" type="submit">
                    🚪 Sign Out
                </button>
                <button type="button" class="settingsbtn">
                    ⚙️ Settings
                </button>
            </form>
        </section>
        
        <button class="close-btn" on:click={() => closeSideBar()}>
            <div class="th-{closeBtnClass}-btn"></div>
            <div class="bh-{closeBtnClass}-btn"></div>
        </button>
    </div>

    <section class="screen">
        <slot/>
    </section>
</main>