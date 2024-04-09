<script lang="ts">
	import { onMount } from "svelte";
	import { supabase } from "../supabaseClient";
    import { redirect } from '@sveltejs/kit'
	import { goto } from "$app/navigation";

    let session0 = null;

    onMount( async () => {
        const { data: { session } } = await supabase.auth.getSession()
        // if the user is already logged in return them to the account page
        if (session) {
            session0 = session;
        }
    })

    if (session0){
        goto("/app")
    }
</script>

<nav>
    <a href="/login">login</a>
    <a href="/signup">sign-up</a>
</nav>

<h1>Landing Page</h1>
<p>M.P Landing page with landing page copy will go here... </p>
