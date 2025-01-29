import { defineCollection, z } from 'astro:content';

/**
 * ---
title: Birou Mihai Alb
aff_code: https://event.2performant.com/events/click?ad_type=product_store&unique=99a08e80f&aff_code=bf1d69700&campaign_unique=bb24d9ce5
price: 353.8
category: Birouri
subcategory: Birouri
brand: Mobila Laguna
url: https://mobilalaguna.ro/mobilier/produs/birou-mihai-alb/
created_at: 2025-01-23T11:51:33.976280
---
 */
export const collections = {

    produse: defineCollection({
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            heroImage: z.string().optional(),
            category: z.string().optional().nullable(),
            tags: z.array(z.string()),
            pubDate: z.date(),
        }),
    }),


    categorie: defineCollection({
        schema: z.object({
            name: z.string(),
            description: z.string(),
        }),
    }),
};