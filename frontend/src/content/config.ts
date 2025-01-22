import { defineCollection, z } from 'astro:content';

export const collections = {

    produse: defineCollection({
        schema: z.object({
            title: z.string(),
            description: z.string(),
            price: z.number(),
        }),
    }),


    categorie: defineCollection({
        schema: z.object({
            name: z.string(),
        }),
    }),
};