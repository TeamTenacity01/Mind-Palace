import { supabase } from '../../../supabaseClient';

export const actions = {
  uploadFile: async ({ request }) => {
    const data = await request.formData();

    const file = data.get('file');
    const storageRes = await supabase.storage
      .from('Tenacity')
      .upload(file.name + '/', file, {
        contentType: file.type
      });

    console.log({ storageRes });
  }
}