// +page.svelte
<script>
  import { supabase } from '../../supabaseClient';
</script>

<form action="?/uploadFile" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" value="GO" />
</form>