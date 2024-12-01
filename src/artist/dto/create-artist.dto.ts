import { z } from 'zod';

export const createArtistSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }),
});

export type CreateArtistDto = z.infer<typeof createArtistSchema>;
