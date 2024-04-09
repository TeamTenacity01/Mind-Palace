<script lang="ts">
	import { onMount } from "svelte";
    import { redirect } from '@sveltejs/kit'

    export let data
    let { supabase } = data
    $: ({ supabase } = data)

    onMount( async () => {
        const { data: { user } } = await supabase.auth.getUser()
        // if the user is already logged in return them to the account page
        if (user) {
            throw redirect(303, "/app")
        }
    })
</script>

<nav>
    <a href="/login">login</a>
    <a href="/signup">sign-up</a>
</nav>

<h1>Landing Page</h1>
<p>M.P Landing page with landing page copy will go here... </p>
