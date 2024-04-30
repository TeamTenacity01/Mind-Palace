import { supabase } from '../../supabaseClient';

export const actions = {
  uploadFile: async ({ request }) => {
    const data = await request.formData();

    const file = data.get('file');
    const storageRes = await supabase.storage
      .from('test')
      .upload(file.name + '/', file, {
        contentType: file.type
      });

    console.log({ storageRes });
  }
}