declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"categorie": {
"birouri.md": {
	id: "birouri.md";
  slug: "birouri";
  body: string;
  collection: "categorie";
  data: any
} & { render(): Render[".md"] };
"mobila-copii.md": {
	id: "mobila-copii.md";
  slug: "mobila-copii";
  body: string;
  collection: "categorie";
  data: any
} & { render(): Render[".md"] };
"mobila-de-bucatarie.md": {
	id: "mobila-de-bucatarie.md";
  slug: "mobila-de-bucatarie";
  body: string;
  collection: "categorie";
  data: any
} & { render(): Render[".md"] };
"mobila-dormitor.md": {
	id: "mobila-dormitor.md";
  slug: "mobila-dormitor";
  body: string;
  collection: "categorie";
  data: any
} & { render(): Render[".md"] };
"mobila-living.md": {
	id: "mobila-living.md";
  slug: "mobila-living";
  body: string;
  collection: "categorie";
  data: any
} & { render(): Render[".md"] };
"paturi.md": {
	id: "paturi.md";
  slug: "paturi";
  body: string;
  collection: "categorie";
  data: any
} & { render(): Render[".md"] };
};
"produse": {
"birou-mihai-alb.md": {
	id: "birou-mihai-alb.md";
  slug: "birou-mihai-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"birou-mihai-gri--alb.md": {
	id: "birou-mihai-gri--alb.md";
  slug: "birou-mihai-gri--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"birou-mihai-stejar-k02--alb.md": {
	id: "birou-mihai-stejar-k02--alb.md";
  slug: "birou-mihai-stejar-k02--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-110-alb-lucios--c36.md": {
	id: "bucatarie-italia-110-alb-lucios--c36.md";
  slug: "bucatarie-italia-110-alb-lucios--c36";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-110-alb-luciosferrara--c35.md": {
	id: "bucatarie-italia-110-alb-luciosferrara--c35.md";
  slug: "bucatarie-italia-110-alb-luciosferrara--c35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-110-urbanoalb-lucios--c33.md": {
	id: "bucatarie-italia-110-urbanoalb-lucios--c33.md";
  slug: "bucatarie-italia-110-urbanoalb-lucios--c33";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-110-urbanoferrara--c34.md": {
	id: "bucatarie-italia-110-urbanoferrara--c34.md";
  slug: "bucatarie-italia-110-urbanoferrara--c34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175215-alb-lucios--c42.md": {
	id: "bucatarie-italia-175215-alb-lucios--c42.md";
  slug: "bucatarie-italia-175215-alb-lucios--c42";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175215-alb-luciosferrara--c41.md": {
	id: "bucatarie-italia-175215-alb-luciosferrara--c41.md";
  slug: "bucatarie-italia-175215-alb-luciosferrara--c41";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175215-urbanoalb-lucios--c39.md": {
	id: "bucatarie-italia-175215-urbanoalb-lucios--c39.md";
  slug: "bucatarie-italia-175215-urbanoalb-lucios--c39";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175215-urbanoferrara--c40.md": {
	id: "bucatarie-italia-175215-urbanoferrara--c40.md";
  slug: "bucatarie-italia-175215-urbanoferrara--c40";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175281-alb-lucios--c48.md": {
	id: "bucatarie-italia-175281-alb-lucios--c48.md";
  slug: "bucatarie-italia-175281-alb-lucios--c48";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175281-alb-luciosferrara--c47.md": {
	id: "bucatarie-italia-175281-alb-luciosferrara--c47.md";
  slug: "bucatarie-italia-175281-alb-luciosferrara--c47";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175281-urbanoalb-lucios--c45.md": {
	id: "bucatarie-italia-175281-urbanoalb-lucios--c45.md";
  slug: "bucatarie-italia-175281-urbanoalb-lucios--c45";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-175281-urbanoferrara--c46.md": {
	id: "bucatarie-italia-175281-urbanoferrara--c46.md";
  slug: "bucatarie-italia-175281-urbanoferrara--c46";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-210-alb-lucios--c24.md": {
	id: "bucatarie-italia-210-alb-lucios--c24.md";
  slug: "bucatarie-italia-210-alb-lucios--c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-210-alb-luciosferrara--c23.md": {
	id: "bucatarie-italia-210-alb-luciosferrara--c23.md";
  slug: "bucatarie-italia-210-alb-luciosferrara--c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-210-urbanoalb-lucios--c21.md": {
	id: "bucatarie-italia-210-urbanoalb-lucios--c21.md";
  slug: "bucatarie-italia-210-urbanoalb-lucios--c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-210-urbanoferrara--c22.md": {
	id: "bucatarie-italia-210-urbanoferrara--c22.md";
  slug: "bucatarie-italia-210-urbanoferrara--c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-240240-alb-lucios--c60.md": {
	id: "bucatarie-italia-240240-alb-lucios--c60.md";
  slug: "bucatarie-italia-240240-alb-lucios--c60";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-240240-alb-luciosferrara--c59.md": {
	id: "bucatarie-italia-240240-alb-luciosferrara--c59.md";
  slug: "bucatarie-italia-240240-alb-luciosferrara--c59";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-240240-urbanoalb-lucios--c57.md": {
	id: "bucatarie-italia-240240-urbanoalb-lucios--c57.md";
  slug: "bucatarie-italia-240240-urbanoalb-lucios--c57";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-240240-urbanoferrara--c58.md": {
	id: "bucatarie-italia-240240-urbanoferrara--c58.md";
  slug: "bucatarie-italia-240240-urbanoferrara--c58";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-250-alb-lucios--c06.md": {
	id: "bucatarie-italia-250-alb-lucios--c06.md";
  slug: "bucatarie-italia-250-alb-lucios--c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-250-alb-luciosferrara--c05.md": {
	id: "bucatarie-italia-250-alb-luciosferrara--c05.md";
  slug: "bucatarie-italia-250-alb-luciosferrara--c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-250-ferraraalb-lucios-7c.md": {
	id: "bucatarie-italia-250-ferraraalb-lucios-7c.md";
  slug: "bucatarie-italia-250-ferraraalb-lucios-7c";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-250-ferraraalb-lucios-8c.md": {
	id: "bucatarie-italia-250-ferraraalb-lucios-8c.md";
  slug: "bucatarie-italia-250-ferraraalb-lucios-8c";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-250-urbanoalb-lucios--c03.md": {
	id: "bucatarie-italia-250-urbanoalb-lucios--c03.md";
  slug: "bucatarie-italia-250-urbanoalb-lucios--c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-250-urbanoferrara--c04.md": {
	id: "bucatarie-italia-250-urbanoferrara--c04.md";
  slug: "bucatarie-italia-250-urbanoferrara--c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-270-alb-lucios--c12.md": {
	id: "bucatarie-italia-270-alb-lucios--c12.md";
  slug: "bucatarie-italia-270-alb-lucios--c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-270-alb-luciosferrara--c11.md": {
	id: "bucatarie-italia-270-alb-luciosferrara--c11.md";
  slug: "bucatarie-italia-270-alb-luciosferrara--c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-270-urbanoalb-lucios--c09.md": {
	id: "bucatarie-italia-270-urbanoalb-lucios--c09.md";
  slug: "bucatarie-italia-270-urbanoalb-lucios--c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-270-urbanoferrara--c10.md": {
	id: "bucatarie-italia-270-urbanoferrara--c10.md";
  slug: "bucatarie-italia-270-urbanoferrara--c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-alb-lucios--c18.md": {
	id: "bucatarie-italia-280-alb-lucios--c18.md";
  slug: "bucatarie-italia-280-alb-lucios--c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-alb-lucios--c30.md": {
	id: "bucatarie-italia-280-alb-lucios--c30.md";
  slug: "bucatarie-italia-280-alb-lucios--c30";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-alb-luciosferrara--c17.md": {
	id: "bucatarie-italia-280-alb-luciosferrara--c17.md";
  slug: "bucatarie-italia-280-alb-luciosferrara--c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-alb-luciosferrara--c29.md": {
	id: "bucatarie-italia-280-alb-luciosferrara--c29.md";
  slug: "bucatarie-italia-280-alb-luciosferrara--c29";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-urbanoalb-lucios--c15.md": {
	id: "bucatarie-italia-280-urbanoalb-lucios--c15.md";
  slug: "bucatarie-italia-280-urbanoalb-lucios--c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-urbanoalb-lucios--c27.md": {
	id: "bucatarie-italia-280-urbanoalb-lucios--c27.md";
  slug: "bucatarie-italia-280-urbanoalb-lucios--c27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-urbanoferrara--c16.md": {
	id: "bucatarie-italia-280-urbanoferrara--c16.md";
  slug: "bucatarie-italia-280-urbanoferrara--c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-280-urbanoferrara--c28.md": {
	id: "bucatarie-italia-280-urbanoferrara--c28.md";
  slug: "bucatarie-italia-280-urbanoferrara--c28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-300240-alb-lucios--c54.md": {
	id: "bucatarie-italia-300240-alb-lucios--c54.md";
  slug: "bucatarie-italia-300240-alb-lucios--c54";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-300240-alb-luciosferrara--c53.md": {
	id: "bucatarie-italia-300240-alb-luciosferrara--c53.md";
  slug: "bucatarie-italia-300240-alb-luciosferrara--c53";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-300240-urbanoalb-lucios--c51.md": {
	id: "bucatarie-italia-300240-urbanoalb-lucios--c51.md";
  slug: "bucatarie-italia-300240-urbanoalb-lucios--c51";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"bucatarie-italia-300240-urbanoferrara--c52.md": {
	id: "bucatarie-italia-300240-urbanoferrara--c52.md";
  slug: "bucatarie-italia-300240-urbanoferrara--c52";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea--fotolii-bar-centauri-28.md": {
	id: "canapea--fotolii-bar-centauri-28.md";
  slug: "canapea--fotolii-bar-centauri-28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-albastra.md": {
	id: "canapea-bali-albastra.md";
  slug: "canapea-bali-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-coral-45.md": {
	id: "canapea-bali-coral-45.md";
  slug: "canapea-bali-coral-45";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-crem.md": {
	id: "canapea-bali-crem.md";
  slug: "canapea-bali-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-gri.md": {
	id: "canapea-bali-gri.md";
  slug: "canapea-bali-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-maro.md": {
	id: "canapea-bali-maro.md";
  slug: "canapea-bali-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-portocalie.md": {
	id: "canapea-bali-portocalie.md";
  slug: "canapea-bali-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-roz-pudrat.md": {
	id: "canapea-bali-roz-pudrat.md";
  slug: "canapea-bali-roz-pudrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-vardo-35.md": {
	id: "canapea-bali-vardo-35.md";
  slug: "canapea-bali-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-verde.md": {
	id: "canapea-bali-verde.md";
  slug: "canapea-bali-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bali-whisper-17.md": {
	id: "canapea-bali-whisper-17.md";
  slug: "canapea-bali-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bar.md": {
	id: "canapea-bar.md";
  slug: "canapea-bar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-albastra.md": {
	id: "canapea-barini-albastra.md";
  slug: "canapea-barini-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-coral-50.md": {
	id: "canapea-barini-coral-50.md";
  slug: "canapea-barini-coral-50";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-crem.md": {
	id: "canapea-barini-crem.md";
  slug: "canapea-barini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-gri-antracit.md": {
	id: "canapea-barini-gri-antracit.md";
  slug: "canapea-barini-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-gri-deschis.md": {
	id: "canapea-barini-gri-deschis.md";
  slug: "canapea-barini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-harmony-85.md": {
	id: "canapea-barini-harmony-85.md";
  slug: "canapea-barini-harmony-85";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-portocalie.md": {
	id: "canapea-barini-portocalie.md";
  slug: "canapea-barini-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-roze.md": {
	id: "canapea-barini-roze.md";
  slug: "canapea-barini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-verde.md": {
	id: "canapea-barini-verde.md";
  slug: "canapea-barini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-barini-whisper-3.md": {
	id: "canapea-barini-whisper-3.md";
  slug: "canapea-barini-whisper-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-albastra.md": {
	id: "canapea-bella-albastra.md";
  slug: "canapea-bella-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-castel-15.md": {
	id: "canapea-bella-castel-15.md";
  slug: "canapea-bella-castel-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-crem--maro.md": {
	id: "canapea-bella-crem--maro.md";
  slug: "canapea-bella-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-gri-antracit.md": {
	id: "canapea-bella-gri-antracit.md";
  slug: "canapea-bella-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-gri-deschis--gri-antracit.md": {
	id: "canapea-bella-gri-deschis--gri-antracit.md";
  slug: "canapea-bella-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-havana-6.md": {
	id: "canapea-bella-havana-6.md";
  slug: "canapea-bella-havana-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-portocalie.md": {
	id: "canapea-bella-portocalie.md";
  slug: "canapea-bella-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-roze.md": {
	id: "canapea-bella-roze.md";
  slug: "canapea-bella-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bella-verde.md": {
	id: "canapea-bella-verde.md";
  slug: "canapea-bella-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-albastra.md": {
	id: "canapea-biano-albastra.md";
  slug: "canapea-biano-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-crem.md": {
	id: "canapea-biano-crem.md";
  slug: "canapea-biano-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-gri-antracit.md": {
	id: "canapea-biano-gri-antracit.md";
  slug: "canapea-biano-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-gri-deschis.md": {
	id: "canapea-biano-gri-deschis.md";
  slug: "canapea-biano-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-maro.md": {
	id: "canapea-biano-maro.md";
  slug: "canapea-biano-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-now-or-never-05.md": {
	id: "canapea-biano-now-or-never-05.md";
  slug: "canapea-biano-now-or-never-05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-portocalie.md": {
	id: "canapea-biano-portocalie.md";
  slug: "canapea-biano-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-roze.md": {
	id: "canapea-biano-roze.md";
  slug: "canapea-biano-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-verde.md": {
	id: "canapea-biano-verde.md";
  slug: "canapea-biano-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-whisper-3.md": {
	id: "canapea-biano-whisper-3.md";
  slug: "canapea-biano-whisper-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-biano-whisper-5.md": {
	id: "canapea-biano-whisper-5.md";
  slug: "canapea-biano-whisper-5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-blanca-castel-70.md": {
	id: "canapea-blanca-castel-70.md";
  slug: "canapea-blanca-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-blanca-coral-55.md": {
	id: "canapea-blanca-coral-55.md";
  slug: "canapea-blanca-coral-55";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-blanca-coral-65.md": {
	id: "canapea-blanca-coral-65.md";
  slug: "canapea-blanca-coral-65";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-blanca-coral-75.md": {
	id: "canapea-blanca-coral-75.md";
  slug: "canapea-blanca-coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-blanca-coral-80.md": {
	id: "canapea-blanca-coral-80.md";
  slug: "canapea-blanca-coral-80";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-blanca-vardo-91.md": {
	id: "canapea-blanca-vardo-91.md";
  slug: "canapea-blanca-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-albastra.md": {
	id: "canapea-bravisimo-albastra.md";
  slug: "canapea-bravisimo-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-blur-18--blur-20.md": {
	id: "canapea-bravisimo-blur-18--blur-20.md";
  slug: "canapea-bravisimo-blur-18--blur-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-crem--maro.md": {
	id: "canapea-bravisimo-crem--maro.md";
  slug: "canapea-bravisimo-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-crem.md": {
	id: "canapea-bravisimo-crem.md";
  slug: "canapea-bravisimo-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-gri-antracit--gri-deschis.md": {
	id: "canapea-bravisimo-gri-antracit--gri-deschis.md";
  slug: "canapea-bravisimo-gri-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-gri-antracit.md": {
	id: "canapea-bravisimo-gri-antracit.md";
  slug: "canapea-bravisimo-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-gri-deschis.md": {
	id: "canapea-bravisimo-gri-deschis.md";
  slug: "canapea-bravisimo-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-maro--crem.md": {
	id: "canapea-bravisimo-maro--crem.md";
  slug: "canapea-bravisimo-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-maro.md": {
	id: "canapea-bravisimo-maro.md";
  slug: "canapea-bravisimo-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-portocalie.md": {
	id: "canapea-bravisimo-portocalie.md";
  slug: "canapea-bravisimo-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-roze.md": {
	id: "canapea-bravisimo-roze.md";
  slug: "canapea-bravisimo-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-vardo-80--vardo-6.md": {
	id: "canapea-bravisimo-vardo-80--vardo-6.md";
  slug: "canapea-bravisimo-vardo-80--vardo-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-bravisimo-verde.md": {
	id: "canapea-bravisimo-verde.md";
  slug: "canapea-bravisimo-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-albastra.md": {
	id: "canapea-camila-albastra.md";
  slug: "canapea-camila-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-castel-20.md": {
	id: "canapea-camila-castel-20.md";
  slug: "canapea-camila-castel-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-crem.md": {
	id: "canapea-camila-crem.md";
  slug: "canapea-camila-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-gri-antracit--gri-deschis.md": {
	id: "canapea-camila-gri-antracit--gri-deschis.md";
  slug: "canapea-camila-gri-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-gri-deschis.md": {
	id: "canapea-camila-gri-deschis.md";
  slug: "canapea-camila-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-maro--crem.md": {
	id: "canapea-camila-maro--crem.md";
  slug: "canapea-camila-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-portocalie.md": {
	id: "canapea-camila-portocalie.md";
  slug: "canapea-camila-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-roze.md": {
	id: "canapea-camila-roze.md";
  slug: "canapea-camila-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-vardo-35--vardo-43.md": {
	id: "canapea-camila-vardo-35--vardo-43.md";
  slug: "canapea-camila-vardo-35--vardo-43";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-verde.md": {
	id: "canapea-camila-verde.md";
  slug: "canapea-camila-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-camila-whisper-17--whisper-18.md": {
	id: "canapea-camila-whisper-17--whisper-18.md";
  slug: "canapea-camila-whisper-17--whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-castel-70.md": {
	id: "canapea-candy-castel-70.md";
  slug: "canapea-candy-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-coral-20.md": {
	id: "canapea-candy-coral-20.md";
  slug: "canapea-candy-coral-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-coral-75.md": {
	id: "canapea-candy-coral-75.md";
  slug: "canapea-candy-coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-now-or-never-02.md": {
	id: "canapea-candy-now-or-never-02.md";
  slug: "canapea-candy-now-or-never-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-vardo-91.md": {
	id: "canapea-candy-vardo-91.md";
  slug: "canapea-candy-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-whisper-18.md": {
	id: "canapea-candy-whisper-18.md";
  slug: "canapea-candy-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-candy-whisper-2.md": {
	id: "canapea-candy-whisper-2.md";
  slug: "canapea-candy-whisper-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-clin-crem.md": {
	id: "canapea-clin-crem.md";
  slug: "canapea-clin-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-clin-gri-antracit.md": {
	id: "canapea-clin-gri-antracit.md";
  slug: "canapea-clin-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-clin-gri-deschis.md": {
	id: "canapea-clin-gri-deschis.md";
  slug: "canapea-clin-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-clin-maro.md": {
	id: "canapea-clin-maro.md";
  slug: "canapea-clin-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-albastra.md": {
	id: "canapea-dante-l-albastra.md";
  slug: "canapea-dante-l-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-crem.md": {
	id: "canapea-dante-l-crem.md";
  slug: "canapea-dante-l-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-gri-antracit.md": {
	id: "canapea-dante-l-gri-antracit.md";
  slug: "canapea-dante-l-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-gri-deschis.md": {
	id: "canapea-dante-l-gri-deschis.md";
  slug: "canapea-dante-l-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-maro.md": {
	id: "canapea-dante-l-maro.md";
  slug: "canapea-dante-l-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-portocalie.md": {
	id: "canapea-dante-l-portocalie.md";
  slug: "canapea-dante-l-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-roze.md": {
	id: "canapea-dante-l-roze.md";
  slug: "canapea-dante-l-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-dante-l-verde.md": {
	id: "canapea-dante-l-verde.md";
  slug: "canapea-dante-l-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-albastra.md": {
	id: "canapea-ema-albastra.md";
  slug: "canapea-ema-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-crem--maro.md": {
	id: "canapea-ema-crem--maro.md";
  slug: "canapea-ema-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-cremona-95.md": {
	id: "canapea-ema-cremona-95.md";
  slug: "canapea-ema-cremona-95";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-gri-antracit.md": {
	id: "canapea-ema-gri-antracit.md";
  slug: "canapea-ema-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-gri-deschis--gri-antracit.md": {
	id: "canapea-ema-gri-deschis--gri-antracit.md";
  slug: "canapea-ema-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-gri-deschis.md": {
	id: "canapea-ema-gri-deschis.md";
  slug: "canapea-ema-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-portocalie.md": {
	id: "canapea-ema-portocalie.md";
  slug: "canapea-ema-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-roze.md": {
	id: "canapea-ema-roze.md";
  slug: "canapea-ema-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ema-verde.md": {
	id: "canapea-ema-verde.md";
  slug: "canapea-ema-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-cali-crem--maro.md": {
	id: "canapea-extensibila-cali-crem--maro.md";
  slug: "canapea-extensibila-cali-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-cali-gri--negru.md": {
	id: "canapea-extensibila-cali-gri--negru.md";
  slug: "canapea-extensibila-cali-gri--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-cali-gri--petrol.md": {
	id: "canapea-extensibila-cali-gri--petrol.md";
  slug: "canapea-extensibila-cali-gri--petrol";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-cali-gri-antracit--negru.md": {
	id: "canapea-extensibila-cali-gri-antracit--negru.md";
  slug: "canapea-extensibila-cali-gri-antracit--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-camino-gri-antracit--turcoaz.md": {
	id: "canapea-extensibila-camino-gri-antracit--turcoaz.md";
  slug: "canapea-extensibila-camino-gri-antracit--turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-camino-gri-antracit--vernil.md": {
	id: "canapea-extensibila-camino-gri-antracit--vernil.md";
  slug: "canapea-extensibila-camino-gri-antracit--vernil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-corsica-crem--maro.md": {
	id: "canapea-extensibila-corsica-crem--maro.md";
  slug: "canapea-extensibila-corsica-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-corsica-crem.md": {
	id: "canapea-extensibila-corsica-crem.md";
  slug: "canapea-extensibila-corsica-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-corsica-gri--gri-antracit.md": {
	id: "canapea-extensibila-corsica-gri--gri-antracit.md";
  slug: "canapea-extensibila-corsica-gri--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-corsica-gri-antracit.md": {
	id: "canapea-extensibila-corsica-gri-antracit.md";
  slug: "canapea-extensibila-corsica-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-corsica-verde--negru.md": {
	id: "canapea-extensibila-corsica-verde--negru.md";
  slug: "canapea-extensibila-corsica-verde--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-corsica-vernil--gri-antracit.md": {
	id: "canapea-extensibila-corsica-vernil--gri-antracit.md";
  slug: "canapea-extensibila-corsica-vernil--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-faro-crem--maro.md": {
	id: "canapea-extensibila-faro-crem--maro.md";
  slug: "canapea-extensibila-faro-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-faro-gri--negru.md": {
	id: "canapea-extensibila-faro-gri--negru.md";
  slug: "canapea-extensibila-faro-gri--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-faro-gri--petrol.md": {
	id: "canapea-extensibila-faro-gri--petrol.md";
  slug: "canapea-extensibila-faro-gri--petrol";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-faro-gri-antracit--negru.md": {
	id: "canapea-extensibila-faro-gri-antracit--negru.md";
  slug: "canapea-extensibila-faro-gri-antracit--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-magic-cappuccino.md": {
	id: "canapea-extensibila-magic-cappuccino.md";
  slug: "canapea-extensibila-magic-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-magic-crem.md": {
	id: "canapea-extensibila-magic-crem.md";
  slug: "canapea-extensibila-magic-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-magic-gri-deschis.md": {
	id: "canapea-extensibila-magic-gri-deschis.md";
  slug: "canapea-extensibila-magic-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-magic-gri-inchis.md": {
	id: "canapea-extensibila-magic-gri-inchis.md";
  slug: "canapea-extensibila-magic-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-gri-antracit.md": {
	id: "canapea-extensibila-maroc-gri-antracit.md";
  slug: "canapea-extensibila-maroc-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-gri-deschis.md": {
	id: "canapea-extensibila-maroc-gri-deschis.md";
  slug: "canapea-extensibila-maroc-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-maro.md": {
	id: "canapea-extensibila-maroc-maro.md";
  slug: "canapea-extensibila-maroc-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-neagra.md": {
	id: "canapea-extensibila-maroc-neagra.md";
  slug: "canapea-extensibila-maroc-neagra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-plusata-aspect-lana-alba.md": {
	id: "canapea-extensibila-maroc-plusata-aspect-lana-alba.md";
  slug: "canapea-extensibila-maroc-plusata-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-plusata-aspect-lana-gri.md": {
	id: "canapea-extensibila-maroc-plusata-aspect-lana-gri.md";
  slug: "canapea-extensibila-maroc-plusata-aspect-lana-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-maroc-turcoaz.md": {
	id: "canapea-extensibila-maroc-turcoaz.md";
  slug: "canapea-extensibila-maroc-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-barrel-72.md": {
	id: "canapea-extensibila-morelia-barrel-72.md";
  slug: "canapea-extensibila-morelia-barrel-72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-cappuccino.md": {
	id: "canapea-extensibila-morelia-cappuccino.md";
  slug: "canapea-extensibila-morelia-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-crem.md": {
	id: "canapea-extensibila-morelia-crem.md";
  slug: "canapea-extensibila-morelia-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-gri-antracit.md": {
	id: "canapea-extensibila-morelia-gri-antracit.md";
  slug: "canapea-extensibila-morelia-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-gri-deschis.md": {
	id: "canapea-extensibila-morelia-gri-deschis.md";
  slug: "canapea-extensibila-morelia-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-maro.md": {
	id: "canapea-extensibila-morelia-maro.md";
  slug: "canapea-extensibila-morelia-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-plusata-aspect-lana-alba.md": {
	id: "canapea-extensibila-morelia-plusata-aspect-lana-alba.md";
  slug: "canapea-extensibila-morelia-plusata-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-roze.md": {
	id: "canapea-extensibila-morelia-roze.md";
  slug: "canapea-extensibila-morelia-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-verde.md": {
	id: "canapea-extensibila-morelia-verde.md";
  slug: "canapea-extensibila-morelia-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-morelia-visinie.md": {
	id: "canapea-extensibila-morelia-visinie.md";
  slug: "canapea-extensibila-morelia-visinie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-cappuccino.md": {
	id: "canapea-extensibila-sensi-cappuccino.md";
  slug: "canapea-extensibila-sensi-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-crem.md": {
	id: "canapea-extensibila-sensi-crem.md";
  slug: "canapea-extensibila-sensi-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-gri-antracit.md": {
	id: "canapea-extensibila-sensi-gri-antracit.md";
  slug: "canapea-extensibila-sensi-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-gri-deschis.md": {
	id: "canapea-extensibila-sensi-gri-deschis.md";
  slug: "canapea-extensibila-sensi-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-neagra.md": {
	id: "canapea-extensibila-sensi-neagra.md";
  slug: "canapea-extensibila-sensi-neagra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-plusata-aspect-lana-alba.md": {
	id: "canapea-extensibila-sensi-plusata-aspect-lana-alba.md";
  slug: "canapea-extensibila-sensi-plusata-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-plusata-aspect-lana-gri.md": {
	id: "canapea-extensibila-sensi-plusata-aspect-lana-gri.md";
  slug: "canapea-extensibila-sensi-plusata-aspect-lana-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-reiat-zoom-new-15.md": {
	id: "canapea-extensibila-sensi-reiat-zoom-new-15.md";
  slug: "canapea-extensibila-sensi-reiat-zoom-new-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-reiat-zoom-new-2.md": {
	id: "canapea-extensibila-sensi-reiat-zoom-new-2.md";
  slug: "canapea-extensibila-sensi-reiat-zoom-new-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-reiat-zoom-new-20.md": {
	id: "canapea-extensibila-sensi-reiat-zoom-new-20.md";
  slug: "canapea-extensibila-sensi-reiat-zoom-new-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-reiat-zoom-new-22.md": {
	id: "canapea-extensibila-sensi-reiat-zoom-new-22.md";
  slug: "canapea-extensibila-sensi-reiat-zoom-new-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-reiat-zoom-new-25.md": {
	id: "canapea-extensibila-sensi-reiat-zoom-new-25.md";
  slug: "canapea-extensibila-sensi-reiat-zoom-new-25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-roze.md": {
	id: "canapea-extensibila-sensi-roze.md";
  slug: "canapea-extensibila-sensi-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-extensibila-sensi-turcoaz.md": {
	id: "canapea-extensibila-sensi-turcoaz.md";
  slug: "canapea-extensibila-sensi-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-castel-70.md": {
	id: "canapea-gloria-castel-70.md";
  slug: "canapea-gloria-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-harmony-90.md": {
	id: "canapea-gloria-harmony-90.md";
  slug: "canapea-gloria-harmony-90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-havana-6.md": {
	id: "canapea-gloria-havana-6.md";
  slug: "canapea-gloria-havana-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-now-or-never-05.md": {
	id: "canapea-gloria-now-or-never-05.md";
  slug: "canapea-gloria-now-or-never-05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-odin-24.md": {
	id: "canapea-gloria-odin-24.md";
  slug: "canapea-gloria-odin-24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-roze.md": {
	id: "canapea-gloria-roze.md";
  slug: "canapea-gloria-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-gloria-vardo-35.md": {
	id: "canapea-gloria-vardo-35.md";
  slug: "canapea-gloria-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-11.md": {
	id: "canapea-granity-whisper-11.md";
  slug: "canapea-granity-whisper-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-14.md": {
	id: "canapea-granity-whisper-14.md";
  slug: "canapea-granity-whisper-14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-17.md": {
	id: "canapea-granity-whisper-17.md";
  slug: "canapea-granity-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-18.md": {
	id: "canapea-granity-whisper-18.md";
  slug: "canapea-granity-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-3.md": {
	id: "canapea-granity-whisper-3.md";
  slug: "canapea-granity-whisper-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-5.md": {
	id: "canapea-granity-whisper-5.md";
  slug: "canapea-granity-whisper-5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-granity-whisper-9.md": {
	id: "canapea-granity-whisper-9.md";
  slug: "canapea-granity-whisper-9";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-albastra.md": {
	id: "canapea-iris-albastra.md";
  slug: "canapea-iris-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-crem--maro.md": {
	id: "canapea-iris-crem--maro.md";
  slug: "canapea-iris-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-crem.md": {
	id: "canapea-iris-crem.md";
  slug: "canapea-iris-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-gri-deschis--gri-antracit.md": {
	id: "canapea-iris-gri-deschis--gri-antracit.md";
  slug: "canapea-iris-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-gri-deschis.md": {
	id: "canapea-iris-gri-deschis.md";
  slug: "canapea-iris-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-portocalie.md": {
	id: "canapea-iris-portocalie.md";
  slug: "canapea-iris-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-roze.md": {
	id: "canapea-iris-roze.md";
  slug: "canapea-iris-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-iris-verde.md": {
	id: "canapea-iris-verde.md";
  slug: "canapea-iris-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-albastra.md": {
	id: "canapea-ivy-albastra.md";
  slug: "canapea-ivy-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-crem--maro.md": {
	id: "canapea-ivy-crem--maro.md";
  slug: "canapea-ivy-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-cremona-70.md": {
	id: "canapea-ivy-cremona-70.md";
  slug: "canapea-ivy-cremona-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-gri-antracit.md": {
	id: "canapea-ivy-gri-antracit.md";
  slug: "canapea-ivy-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-gri-deschis--gri-antracit.md": {
	id: "canapea-ivy-gri-deschis--gri-antracit.md";
  slug: "canapea-ivy-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-havana-65--havana-10.md": {
	id: "canapea-ivy-havana-65--havana-10.md";
  slug: "canapea-ivy-havana-65--havana-10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-portocalie.md": {
	id: "canapea-ivy-portocalie.md";
  slug: "canapea-ivy-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-roze.md": {
	id: "canapea-ivy-roze.md";
  slug: "canapea-ivy-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-verde.md": {
	id: "canapea-ivy-verde.md";
  slug: "canapea-ivy-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-ivy-whisper-17.md": {
	id: "canapea-ivy-whisper-17.md";
  slug: "canapea-ivy-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-albastra.md": {
	id: "canapea-julia-albastra.md";
  slug: "canapea-julia-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-crem--maro.md": {
	id: "canapea-julia-crem--maro.md";
  slug: "canapea-julia-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-crem.md": {
	id: "canapea-julia-crem.md";
  slug: "canapea-julia-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-gri-deschis--gri-antracit.md": {
	id: "canapea-julia-gri-deschis--gri-antracit.md";
  slug: "canapea-julia-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-gri-deschis.md": {
	id: "canapea-julia-gri-deschis.md";
  slug: "canapea-julia-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-maro--crem.md": {
	id: "canapea-julia-maro--crem.md";
  slug: "canapea-julia-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-maro.md": {
	id: "canapea-julia-maro.md";
  slug: "canapea-julia-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-portocalie.md": {
	id: "canapea-julia-portocalie.md";
  slug: "canapea-julia-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-roze.md": {
	id: "canapea-julia-roze.md";
  slug: "canapea-julia-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-julia-verde.md": {
	id: "canapea-julia-verde.md";
  slug: "canapea-julia-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-03-crem.md": {
	id: "canapea-leto-03-crem.md";
  slug: "canapea-leto-03-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-38-olive.md": {
	id: "canapea-leto-38-olive.md";
  slug: "canapea-leto-38-olive";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-69-visinie.md": {
	id: "canapea-leto-69-visinie.md";
  slug: "canapea-leto-69-visinie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-73-gri-petrol.md": {
	id: "canapea-leto-73-gri-petrol.md";
  slug: "canapea-leto-73-gri-petrol";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-75-vernil.md": {
	id: "canapea-leto-75-vernil.md";
  slug: "canapea-leto-75-vernil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-77-albastra.md": {
	id: "canapea-leto-77-albastra.md";
  slug: "canapea-leto-77-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-85-gri.md": {
	id: "canapea-leto-85-gri.md";
  slug: "canapea-leto-85-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-92-cappuccino.md": {
	id: "canapea-leto-92-cappuccino.md";
  slug: "canapea-leto-92-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-blur-18.md": {
	id: "canapea-leto-blur-18.md";
  slug: "canapea-leto-blur-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-leto-cremona-02.md": {
	id: "canapea-leto-cremona-02.md";
  slug: "canapea-leto-cremona-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-barrel-19.md": {
	id: "canapea-londa-barrel-19.md";
  slug: "canapea-londa-barrel-19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-barrel-90.md": {
	id: "canapea-londa-barrel-90.md";
  slug: "canapea-londa-barrel-90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-caramizie.md": {
	id: "canapea-londa-caramizie.md";
  slug: "canapea-londa-caramizie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-crem.md": {
	id: "canapea-londa-crem.md";
  slug: "canapea-londa-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-gri-inchis.md": {
	id: "canapea-londa-gri-inchis.md";
  slug: "canapea-londa-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-maro.md": {
	id: "canapea-londa-maro.md";
  slug: "canapea-londa-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-londa-verde.md": {
	id: "canapea-londa-verde.md";
  slug: "canapea-londa-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-albastra.md": {
	id: "canapea-luna-albastra.md";
  slug: "canapea-luna-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-antracit--gri-deschis.md": {
	id: "canapea-luna-antracit--gri-deschis.md";
  slug: "canapea-luna-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-crem--maro.md": {
	id: "canapea-luna-crem--maro.md";
  slug: "canapea-luna-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-gri-deschis--antracit.md": {
	id: "canapea-luna-gri-deschis--antracit.md";
  slug: "canapea-luna-gri-deschis--antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-havana-10.md": {
	id: "canapea-luna-havana-10.md";
  slug: "canapea-luna-havana-10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-letto-92.md": {
	id: "canapea-luna-letto-92.md";
  slug: "canapea-luna-letto-92";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-maro--crem.md": {
	id: "canapea-luna-maro--crem.md";
  slug: "canapea-luna-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-portocalie.md": {
	id: "canapea-luna-portocalie.md";
  slug: "canapea-luna-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-roze.md": {
	id: "canapea-luna-roze.md";
  slug: "canapea-luna-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-luna-verde.md": {
	id: "canapea-luna-verde.md";
  slug: "canapea-luna-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-castel-70.md": {
	id: "canapea-mely-castel-70.md";
  slug: "canapea-mely-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-coral-15.md": {
	id: "canapea-mely-coral-15.md";
  slug: "canapea-mely-coral-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-coral-45.md": {
	id: "canapea-mely-coral-45.md";
  slug: "canapea-mely-coral-45";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-cremona-02.md": {
	id: "canapea-mely-cremona-02.md";
  slug: "canapea-mely-cremona-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-cremona-34.md": {
	id: "canapea-mely-cremona-34.md";
  slug: "canapea-mely-cremona-34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-gri-antracit.md": {
	id: "canapea-mely-gri-antracit.md";
  slug: "canapea-mely-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-gri-deschis.md": {
	id: "canapea-mely-gri-deschis.md";
  slug: "canapea-mely-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-harmony-52.md": {
	id: "canapea-mely-harmony-52.md";
  slug: "canapea-mely-harmony-52";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mely-roze.md": {
	id: "canapea-mely-roze.md";
  slug: "canapea-mely-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-albastra.md": {
	id: "canapea-mexic-albastra.md";
  slug: "canapea-mexic-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-aphrodite-20--aphrodite-22.md": {
	id: "canapea-mexic-aphrodite-20--aphrodite-22.md";
  slug: "canapea-mexic-aphrodite-20--aphrodite-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-arne-18--arne-7.md": {
	id: "canapea-mexic-arne-18--arne-7.md";
  slug: "canapea-mexic-arne-18--arne-7";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-crem--maro.md": {
	id: "canapea-mexic-crem--maro.md";
  slug: "canapea-mexic-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-crem.md": {
	id: "canapea-mexic-crem.md";
  slug: "canapea-mexic-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-gri-deschis--gri-antracit.md": {
	id: "canapea-mexic-gri-deschis--gri-antracit.md";
  slug: "canapea-mexic-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-gri-deschis.md": {
	id: "canapea-mexic-gri-deschis.md";
  slug: "canapea-mexic-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-havana-39--24.md": {
	id: "canapea-mexic-havana-39--24.md";
  slug: "canapea-mexic-havana-39--24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-portocalie.md": {
	id: "canapea-mexic-portocalie.md";
  slug: "canapea-mexic-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-roze.md": {
	id: "canapea-mexic-roze.md";
  slug: "canapea-mexic-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mexic-verde.md": {
	id: "canapea-mexic-verde.md";
  slug: "canapea-mexic-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-albastra.md": {
	id: "canapea-mini-albastra.md";
  slug: "canapea-mini-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-crem--maro.md": {
	id: "canapea-mini-crem--maro.md";
  slug: "canapea-mini-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-crem.md": {
	id: "canapea-mini-crem.md";
  slug: "canapea-mini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-gri-deschis--gri-antracit.md": {
	id: "canapea-mini-gri-deschis--gri-antracit.md";
  slug: "canapea-mini-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-gri-deschis.md": {
	id: "canapea-mini-gri-deschis.md";
  slug: "canapea-mini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-portocalie.md": {
	id: "canapea-mini-portocalie.md";
  slug: "canapea-mini-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-roze.md": {
	id: "canapea-mini-roze.md";
  slug: "canapea-mini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mini-verde.md": {
	id: "canapea-mini-verde.md";
  slug: "canapea-mini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-albastra.md": {
	id: "canapea-mira-albastra.md";
  slug: "canapea-mira-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-crem--maro.md": {
	id: "canapea-mira-crem--maro.md";
  slug: "canapea-mira-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-crem.md": {
	id: "canapea-mira-crem.md";
  slug: "canapea-mira-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-portocalie.md": {
	id: "canapea-mira-portocalie.md";
  slug: "canapea-mira-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-roze.md": {
	id: "canapea-mira-roze.md";
  slug: "canapea-mira-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-vardo-6--vardo-19.md": {
	id: "canapea-mira-vardo-6--vardo-19.md";
  slug: "canapea-mira-vardo-6--vardo-19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-vardo-6.md": {
	id: "canapea-mira-vardo-6.md";
  slug: "canapea-mira-vardo-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-mira-verde.md": {
	id: "canapea-mira-verde.md";
  slug: "canapea-mira-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-albastra.md": {
	id: "canapea-nova-albastra.md";
  slug: "canapea-nova-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-crem--maro.md": {
	id: "canapea-nova-crem--maro.md";
  slug: "canapea-nova-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-crem.md": {
	id: "canapea-nova-crem.md";
  slug: "canapea-nova-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-gri-deschis--gri-antracit.md": {
	id: "canapea-nova-gri-deschis--gri-antracit.md";
  slug: "canapea-nova-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-gri-deschis.md": {
	id: "canapea-nova-gri-deschis.md";
  slug: "canapea-nova-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-portocalie.md": {
	id: "canapea-nova-portocalie.md";
  slug: "canapea-nova-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-roze.md": {
	id: "canapea-nova-roze.md";
  slug: "canapea-nova-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-nova-verde.md": {
	id: "canapea-nova-verde.md";
  slug: "canapea-nova-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-albastra.md": {
	id: "canapea-olimp-albastra.md";
  slug: "canapea-olimp-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-aphrodite-22.md": {
	id: "canapea-olimp-aphrodite-22.md";
  slug: "canapea-olimp-aphrodite-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-aphrodite-3.md": {
	id: "canapea-olimp-aphrodite-3.md";
  slug: "canapea-olimp-aphrodite-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-coral-45.md": {
	id: "canapea-olimp-coral-45.md";
  slug: "canapea-olimp-coral-45";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-crem.md": {
	id: "canapea-olimp-crem.md";
  slug: "canapea-olimp-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-gri-antracit.md": {
	id: "canapea-olimp-gri-antracit.md";
  slug: "canapea-olimp-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-gri-deschis.md": {
	id: "canapea-olimp-gri-deschis.md";
  slug: "canapea-olimp-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-maro.md": {
	id: "canapea-olimp-maro.md";
  slug: "canapea-olimp-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-portocalie.md": {
	id: "canapea-olimp-portocalie.md";
  slug: "canapea-olimp-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-royal-8.md": {
	id: "canapea-olimp-royal-8.md";
  slug: "canapea-olimp-royal-8";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-roze.md": {
	id: "canapea-olimp-roze.md";
  slug: "canapea-olimp-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-olimp-verde.md": {
	id: "canapea-olimp-verde.md";
  slug: "canapea-olimp-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-albastra.md": {
	id: "canapea-one-albastra.md";
  slug: "canapea-one-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-crem.md": {
	id: "canapea-one-crem.md";
  slug: "canapea-one-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-gri-antracit.md": {
	id: "canapea-one-gri-antracit.md";
  slug: "canapea-one-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-gri-deschis.md": {
	id: "canapea-one-gri-deschis.md";
  slug: "canapea-one-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-maro.md": {
	id: "canapea-one-maro.md";
  slug: "canapea-one-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-portocalie.md": {
	id: "canapea-one-portocalie.md";
  slug: "canapea-one-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-roze.md": {
	id: "canapea-one-roze.md";
  slug: "canapea-one-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-one-verde.md": {
	id: "canapea-one-verde.md";
  slug: "canapea-one-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-paloma-crem--maro.md": {
	id: "canapea-paloma-crem--maro.md";
  slug: "canapea-paloma-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-paloma-gri-deschis.md": {
	id: "canapea-paloma-gri-deschis.md";
  slug: "canapea-paloma-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-paloma-plusata-aspect-lana-alba.md": {
	id: "canapea-paloma-plusata-aspect-lana-alba.md";
  slug: "canapea-paloma-plusata-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-paloma-plusata-aspect-lana-gri.md": {
	id: "canapea-paloma-plusata-aspect-lana-gri.md";
  slug: "canapea-paloma-plusata-aspect-lana-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-paloma-roze.md": {
	id: "canapea-paloma-roze.md";
  slug: "canapea-paloma-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-albastra.md": {
	id: "canapea-quinn-albastra.md";
  slug: "canapea-quinn-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-crem--maro.md": {
	id: "canapea-quinn-crem--maro.md";
  slug: "canapea-quinn-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-crem.md": {
	id: "canapea-quinn-crem.md";
  slug: "canapea-quinn-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-gri-deschis--gri-antracit.md": {
	id: "canapea-quinn-gri-deschis--gri-antracit.md";
  slug: "canapea-quinn-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-harmony-63--harmony-85.md": {
	id: "canapea-quinn-harmony-63--harmony-85.md";
  slug: "canapea-quinn-harmony-63--harmony-85";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-havana-10.md": {
	id: "canapea-quinn-havana-10.md";
  slug: "canapea-quinn-havana-10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-now-or-never-05.md": {
	id: "canapea-quinn-now-or-never-05.md";
  slug: "canapea-quinn-now-or-never-05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-portocalie.md": {
	id: "canapea-quinn-portocalie.md";
  slug: "canapea-quinn-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-roze.md": {
	id: "canapea-quinn-roze.md";
  slug: "canapea-quinn-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-verde.md": {
	id: "canapea-quinn-verde.md";
  slug: "canapea-quinn-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-quinn-whisper-17.md": {
	id: "canapea-quinn-whisper-17.md";
  slug: "canapea-quinn-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-albastra.md": {
	id: "canapea-roma-albastra.md";
  slug: "canapea-roma-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-cremona-24.md": {
	id: "canapea-roma-cremona-24.md";
  slug: "canapea-roma-cremona-24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-cremona-95.md": {
	id: "canapea-roma-cremona-95.md";
  slug: "canapea-roma-cremona-95";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-gri-antracit.md": {
	id: "canapea-roma-gri-antracit.md";
  slug: "canapea-roma-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-gri-deschis.md": {
	id: "canapea-roma-gri-deschis.md";
  slug: "canapea-roma-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-maro.md": {
	id: "canapea-roma-maro.md";
  slug: "canapea-roma-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-portocalie.md": {
	id: "canapea-roma-portocalie.md";
  slug: "canapea-roma-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-roze.md": {
	id: "canapea-roma-roze.md";
  slug: "canapea-roma-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-verde.md": {
	id: "canapea-roma-verde.md";
  slug: "canapea-roma-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-roma-whisper-2.md": {
	id: "canapea-roma-whisper-2.md";
  slug: "canapea-roma-whisper-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-albastra.md": {
	id: "canapea-santorini-albastra.md";
  slug: "canapea-santorini-albastra";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-aphrodite-3.md": {
	id: "canapea-santorini-aphrodite-3.md";
  slug: "canapea-santorini-aphrodite-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-coral-75.md": {
	id: "canapea-santorini-coral-75.md";
  slug: "canapea-santorini-coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-crem.md": {
	id: "canapea-santorini-crem.md";
  slug: "canapea-santorini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-gri-antracit.md": {
	id: "canapea-santorini-gri-antracit.md";
  slug: "canapea-santorini-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-gri.md": {
	id: "canapea-santorini-gri.md";
  slug: "canapea-santorini-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-maro.md": {
	id: "canapea-santorini-maro.md";
  slug: "canapea-santorini-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-portocalie.md": {
	id: "canapea-santorini-portocalie.md";
  slug: "canapea-santorini-portocalie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-royal-19.md": {
	id: "canapea-santorini-royal-19.md";
  slug: "canapea-santorini-royal-19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-roz-pudrat.md": {
	id: "canapea-santorini-roz-pudrat.md";
  slug: "canapea-santorini-roz-pudrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-santorini-verde.md": {
	id: "canapea-santorini-verde.md";
  slug: "canapea-santorini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-valencia-coral-50.md": {
	id: "canapea-valencia-coral-50.md";
  slug: "canapea-valencia-coral-50";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-valencia-cremona-02.md": {
	id: "canapea-valencia-cremona-02.md";
  slug: "canapea-valencia-cremona-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-valencia-cremona-70.md": {
	id: "canapea-valencia-cremona-70.md";
  slug: "canapea-valencia-cremona-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-valencia-whisper-17.md": {
	id: "canapea-valencia-whisper-17.md";
  slug: "canapea-valencia-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-valencia-whisper-18.md": {
	id: "canapea-valencia-whisper-18.md";
  slug: "canapea-valencia-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-barrel-72.md": {
	id: "canapea-velur-barrel-72.md";
  slug: "canapea-velur-barrel-72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-cappuccino.md": {
	id: "canapea-velur-cappuccino.md";
  slug: "canapea-velur-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-crem--maro.md": {
	id: "canapea-velur-crem--maro.md";
  slug: "canapea-velur-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-crem.md": {
	id: "canapea-velur-crem.md";
  slug: "canapea-velur-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-gri-deschis--gri.md": {
	id: "canapea-velur-gri-deschis--gri.md";
  slug: "canapea-velur-gri-deschis--gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-gri-deschis.md": {
	id: "canapea-velur-gri-deschis.md";
  slug: "canapea-velur-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-gri.md": {
	id: "canapea-velur-gri.md";
  slug: "canapea-velur-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-roze.md": {
	id: "canapea-velur-roze.md";
  slug: "canapea-velur-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-velur-verde.md": {
	id: "canapea-velur-verde.md";
  slug: "canapea-velur-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-word-crem.md": {
	id: "canapea-word-crem.md";
  slug: "canapea-word-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"canapea-word-gri.md": {
	id: "canapea-word-gri.md";
  slug: "canapea-word-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-albastru.md": {
	id: "coltar-aria--1-loc-albastru.md";
  slug: "coltar-aria--1-loc-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-crem--maro.md": {
	id: "coltar-aria--1-loc-crem--maro.md";
  slug: "coltar-aria--1-loc-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-crem.md": {
	id: "coltar-aria--1-loc-crem.md";
  slug: "coltar-aria--1-loc-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-gri-deschis-gri-antracit.md": {
	id: "coltar-aria--1-loc-gri-deschis-gri-antracit.md";
  slug: "coltar-aria--1-loc-gri-deschis-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-gri-deschis.md": {
	id: "coltar-aria--1-loc-gri-deschis.md";
  slug: "coltar-aria--1-loc-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-portocaliu.md": {
	id: "coltar-aria--1-loc-portocaliu.md";
  slug: "coltar-aria--1-loc-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-roze.md": {
	id: "coltar-aria--1-loc-roze.md";
  slug: "coltar-aria--1-loc-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria--1-loc-verde.md": {
	id: "coltar-aria--1-loc-verde.md";
  slug: "coltar-aria--1-loc-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-albastru.md": {
	id: "coltar-aria-albastru.md";
  slug: "coltar-aria-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-crem--maro.md": {
	id: "coltar-aria-crem--maro.md";
  slug: "coltar-aria-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-crem.md": {
	id: "coltar-aria-crem.md";
  slug: "coltar-aria-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-gri-deschis--gri-antracit.md": {
	id: "coltar-aria-gri-deschis--gri-antracit.md";
  slug: "coltar-aria-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-gri-deschis.md": {
	id: "coltar-aria-gri-deschis.md";
  slug: "coltar-aria-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-portocaliu.md": {
	id: "coltar-aria-portocaliu.md";
  slug: "coltar-aria-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-roze.md": {
	id: "coltar-aria-roze.md";
  slug: "coltar-aria-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria-verde.md": {
	id: "coltar-aria-verde.md";
  slug: "coltar-aria-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-aria1-loc.md": {
	id: "coltar-aria1-loc.md";
  slug: "coltar-aria1-loc";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-albastru.md": {
	id: "coltar-bali-albastru.md";
  slug: "coltar-bali-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-crem.md": {
	id: "coltar-bali-crem.md";
  slug: "coltar-bali-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-gri-deschis.md": {
	id: "coltar-bali-gri-deschis.md";
  slug: "coltar-bali-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-gri.md": {
	id: "coltar-bali-gri.md";
  slug: "coltar-bali-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-portocaliu.md": {
	id: "coltar-bali-portocaliu.md";
  slug: "coltar-bali-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-roz-pudrat.md": {
	id: "coltar-bali-roz-pudrat.md";
  slug: "coltar-bali-roz-pudrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-vardo-11.md": {
	id: "coltar-bali-vardo-11.md";
  slug: "coltar-bali-vardo-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-verde.md": {
	id: "coltar-bali-verde.md";
  slug: "coltar-bali-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-bali-whisper-3.md": {
	id: "coltar-bali-whisper-3.md";
  slug: "coltar-bali-whisper-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-albastru.md": {
	id: "coltar-barini-albastru.md";
  slug: "coltar-barini-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-castel-93.md": {
	id: "coltar-barini-castel-93.md";
  slug: "coltar-barini-castel-93";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-crem.md": {
	id: "coltar-barini-crem.md";
  slug: "coltar-barini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-gri-antracit.md": {
	id: "coltar-barini-gri-antracit.md";
  slug: "coltar-barini-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-gri-deschis.md": {
	id: "coltar-barini-gri-deschis.md";
  slug: "coltar-barini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-harmony-72.md": {
	id: "coltar-barini-harmony-72.md";
  slug: "coltar-barini-harmony-72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-maro.md": {
	id: "coltar-barini-maro.md";
  slug: "coltar-barini-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-neve-04.md": {
	id: "coltar-barini-neve-04.md";
  slug: "coltar-barini-neve-04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-portocaliu.md": {
	id: "coltar-barini-portocaliu.md";
  slug: "coltar-barini-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-roze.md": {
	id: "coltar-barini-roze.md";
  slug: "coltar-barini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-barini-verde.md": {
	id: "coltar-barini-verde.md";
  slug: "coltar-barini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-albastru.md": {
	id: "coltar-biano-albastru.md";
  slug: "coltar-biano-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-crem.md": {
	id: "coltar-biano-crem.md";
  slug: "coltar-biano-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-gri-antracit.md": {
	id: "coltar-biano-gri-antracit.md";
  slug: "coltar-biano-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-gri-deschis.md": {
	id: "coltar-biano-gri-deschis.md";
  slug: "coltar-biano-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-maro-whisper-5.md": {
	id: "coltar-biano-maro-whisper-5.md";
  slug: "coltar-biano-maro-whisper-5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-portocaliu.md": {
	id: "coltar-biano-portocaliu.md";
  slug: "coltar-biano-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-roze.md": {
	id: "coltar-biano-roze.md";
  slug: "coltar-biano-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-biano-verde.md": {
	id: "coltar-biano-verde.md";
  slug: "coltar-biano-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-castel-70.md": {
	id: "coltar-blanca-castel-70.md";
  slug: "coltar-blanca-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-cremona-02.md": {
	id: "coltar-blanca-cremona-02.md";
  slug: "coltar-blanca-cremona-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-cremona-24.md": {
	id: "coltar-blanca-cremona-24.md";
  slug: "coltar-blanca-cremona-24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-cremona-34.md": {
	id: "coltar-blanca-cremona-34.md";
  slug: "coltar-blanca-cremona-34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-cremona-81.md": {
	id: "coltar-blanca-cremona-81.md";
  slug: "coltar-blanca-cremona-81";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-cremona-95.md": {
	id: "coltar-blanca-cremona-95.md";
  slug: "coltar-blanca-cremona-95";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-blanca-vardo-91.md": {
	id: "coltar-blanca-vardo-91.md";
  slug: "coltar-blanca-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-castel-70.md": {
	id: "coltar-candy-castel-70.md";
  slug: "coltar-candy-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-coral-20.md": {
	id: "coltar-candy-coral-20.md";
  slug: "coltar-candy-coral-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-coral-75.md": {
	id: "coltar-candy-coral-75.md";
  slug: "coltar-candy-coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-now-or-never-02.md": {
	id: "coltar-candy-now-or-never-02.md";
  slug: "coltar-candy-now-or-never-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-vardo-91.md": {
	id: "coltar-candy-vardo-91.md";
  slug: "coltar-candy-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-whisper-18.md": {
	id: "coltar-candy-whisper-18.md";
  slug: "coltar-candy-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-candy-whisper-2.md": {
	id: "coltar-candy-whisper-2.md";
  slug: "coltar-candy-whisper-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-albastru.md": {
	id: "coltar-cargo-albastru.md";
  slug: "coltar-cargo-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-caramiziu.md": {
	id: "coltar-cargo-caramiziu.md";
  slug: "coltar-cargo-caramiziu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-crem.md": {
	id: "coltar-cargo-crem.md";
  slug: "coltar-cargo-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-gri-deschis.md": {
	id: "coltar-cargo-gri-deschis.md";
  slug: "coltar-cargo-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-gri-inchis.md": {
	id: "coltar-cargo-gri-inchis.md";
  slug: "coltar-cargo-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-maro.md": {
	id: "coltar-cargo-maro.md";
  slug: "coltar-cargo-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-cargo-verde.md": {
	id: "coltar-cargo-verde.md";
  slug: "coltar-cargo-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-de-bucatarie-smart-blur-18pal-alb.md": {
	id: "coltar-de-bucatarie-smart-blur-18pal-alb.md";
  slug: "coltar-de-bucatarie-smart-blur-18pal-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-de-bucatarie-smart-blur-18pal-wenge.md": {
	id: "coltar-de-bucatarie-smart-blur-18pal-wenge.md";
  slug: "coltar-de-bucatarie-smart-blur-18pal-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-de-bucatarie-smart-blur-4pal-alb.md": {
	id: "coltar-de-bucatarie-smart-blur-4pal-alb.md";
  slug: "coltar-de-bucatarie-smart-blur-4pal-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-de-bucatarie-smart-blur-4pal-wenge.md": {
	id: "coltar-de-bucatarie-smart-blur-4pal-wenge.md";
  slug: "coltar-de-bucatarie-smart-blur-4pal-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-albastru.md": {
	id: "coltar-delta-mixt-albastru.md";
  slug: "coltar-delta-mixt-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-crem.md": {
	id: "coltar-delta-mixt-crem.md";
  slug: "coltar-delta-mixt-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-gri-antracit--gri-deschis.md": {
	id: "coltar-delta-mixt-gri-antracit--gri-deschis.md";
  slug: "coltar-delta-mixt-gri-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-gri-deschis.md": {
	id: "coltar-delta-mixt-gri-deschis.md";
  slug: "coltar-delta-mixt-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-maro--crem.md": {
	id: "coltar-delta-mixt-maro--crem.md";
  slug: "coltar-delta-mixt-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-portocaliu.md": {
	id: "coltar-delta-mixt-portocaliu.md";
  slug: "coltar-delta-mixt-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-roze.md": {
	id: "coltar-delta-mixt-roze.md";
  slug: "coltar-delta-mixt-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-vardo-6--olifante-12.md": {
	id: "coltar-delta-mixt-vardo-6--olifante-12.md";
  slug: "coltar-delta-mixt-vardo-6--olifante-12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-delta-mixt-verde.md": {
	id: "coltar-delta-mixt-verde.md";
  slug: "coltar-delta-mixt-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-barrel-72.md": {
	id: "coltar-extensibil-alfa-barrel-72.md";
  slug: "coltar-extensibil-alfa-barrel-72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-crem.md": {
	id: "coltar-extensibil-alfa-crem.md";
  slug: "coltar-extensibil-alfa-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-gri-deschis.md": {
	id: "coltar-extensibil-alfa-gri-deschis.md";
  slug: "coltar-extensibil-alfa-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-gri-inchis.md": {
	id: "coltar-extensibil-alfa-gri-inchis.md";
  slug: "coltar-extensibil-alfa-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-maro.md": {
	id: "coltar-extensibil-alfa-maro.md";
  slug: "coltar-extensibil-alfa-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-negru.md": {
	id: "coltar-extensibil-alfa-negru.md";
  slug: "coltar-extensibil-alfa-negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-plusat-aspect-lana-alba.md": {
	id: "coltar-extensibil-alfa-plusat-aspect-lana-alba.md";
  slug: "coltar-extensibil-alfa-plusat-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-plusat-aspect-lana-gri.md": {
	id: "coltar-extensibil-alfa-plusat-aspect-lana-gri.md";
  slug: "coltar-extensibil-alfa-plusat-aspect-lana-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-reiat-zoom-new-15.md": {
	id: "coltar-extensibil-alfa-reiat-zoom-new-15.md";
  slug: "coltar-extensibil-alfa-reiat-zoom-new-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-reiat-zoom-new-2.md": {
	id: "coltar-extensibil-alfa-reiat-zoom-new-2.md";
  slug: "coltar-extensibil-alfa-reiat-zoom-new-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-reiat-zoom-new-20.md": {
	id: "coltar-extensibil-alfa-reiat-zoom-new-20.md";
  slug: "coltar-extensibil-alfa-reiat-zoom-new-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-reiat-zoom-new-22.md": {
	id: "coltar-extensibil-alfa-reiat-zoom-new-22.md";
  slug: "coltar-extensibil-alfa-reiat-zoom-new-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-reiat-zoom-new-25.md": {
	id: "coltar-extensibil-alfa-reiat-zoom-new-25.md";
  slug: "coltar-extensibil-alfa-reiat-zoom-new-25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-alfa-turcoaz.md": {
	id: "coltar-extensibil-alfa-turcoaz.md";
  slug: "coltar-extensibil-alfa-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-barrel-72.md": {
	id: "coltar-extensibil-bonito-barrel-72.md";
  slug: "coltar-extensibil-bonito-barrel-72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-crem.md": {
	id: "coltar-extensibil-bonito-crem.md";
  slug: "coltar-extensibil-bonito-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-gri-antracit.md": {
	id: "coltar-extensibil-bonito-gri-antracit.md";
  slug: "coltar-extensibil-bonito-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-gri-deschis.md": {
	id: "coltar-extensibil-bonito-gri-deschis.md";
  slug: "coltar-extensibil-bonito-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-plusat-aspect-lana-alba.md": {
	id: "coltar-extensibil-bonito-plusat-aspect-lana-alba.md";
  slug: "coltar-extensibil-bonito-plusat-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-plusat-aspect-lana-gri.md": {
	id: "coltar-extensibil-bonito-plusat-aspect-lana-gri.md";
  slug: "coltar-extensibil-bonito-plusat-aspect-lana-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-bonito-turcoaz.md": {
	id: "coltar-extensibil-bonito-turcoaz.md";
  slug: "coltar-extensibil-bonito-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-cali-crem--maro.md": {
	id: "coltar-extensibil-cali-crem--maro.md";
  slug: "coltar-extensibil-cali-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-cali-gri--negru.md": {
	id: "coltar-extensibil-cali-gri--negru.md";
  slug: "coltar-extensibil-cali-gri--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-cali-gri--petrol.md": {
	id: "coltar-extensibil-cali-gri--petrol.md";
  slug: "coltar-extensibil-cali-gri--petrol";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-cali-gri-antracit--negru.md": {
	id: "coltar-extensibil-cali-gri-antracit--negru.md";
  slug: "coltar-extensibil-cali-gri-antracit--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-faro-crem--maro.md": {
	id: "coltar-extensibil-faro-crem--maro.md";
  slug: "coltar-extensibil-faro-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-faro-gri--negru.md": {
	id: "coltar-extensibil-faro-gri--negru.md";
  slug: "coltar-extensibil-faro-gri--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-faro-gri--petrol.md": {
	id: "coltar-extensibil-faro-gri--petrol.md";
  slug: "coltar-extensibil-faro-gri--petrol";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-faro-gri-antracit--negru.md": {
	id: "coltar-extensibil-faro-gri-antracit--negru.md";
  slug: "coltar-extensibil-faro-gri-antracit--negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-juno-gri--gri-deschis.md": {
	id: "coltar-extensibil-juno-gri--gri-deschis.md";
  slug: "coltar-extensibil-juno-gri--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-juno-gri-deschis.md": {
	id: "coltar-extensibil-juno-gri-deschis.md";
  slug: "coltar-extensibil-juno-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-barrel-72.md": {
	id: "coltar-extensibil-morelia-barrel-72.md";
  slug: "coltar-extensibil-morelia-barrel-72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-cappuccino.md": {
	id: "coltar-extensibil-morelia-cappuccino.md";
  slug: "coltar-extensibil-morelia-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-crem.md": {
	id: "coltar-extensibil-morelia-crem.md";
  slug: "coltar-extensibil-morelia-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-gri-antracit.md": {
	id: "coltar-extensibil-morelia-gri-antracit.md";
  slug: "coltar-extensibil-morelia-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-gri-deschis.md": {
	id: "coltar-extensibil-morelia-gri-deschis.md";
  slug: "coltar-extensibil-morelia-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-maro.md": {
	id: "coltar-extensibil-morelia-maro.md";
  slug: "coltar-extensibil-morelia-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-plusat-aspect-lana-alba.md": {
	id: "coltar-extensibil-morelia-plusat-aspect-lana-alba.md";
  slug: "coltar-extensibil-morelia-plusat-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-roze.md": {
	id: "coltar-extensibil-morelia-roze.md";
  slug: "coltar-extensibil-morelia-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-verde.md": {
	id: "coltar-extensibil-morelia-verde.md";
  slug: "coltar-extensibil-morelia-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-morelia-visiniu.md": {
	id: "coltar-extensibil-morelia-visiniu.md";
  slug: "coltar-extensibil-morelia-visiniu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-cappuccino.md": {
	id: "coltar-extensibil-paloma-cappuccino.md";
  slug: "coltar-extensibil-paloma-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-crem--maro.md": {
	id: "coltar-extensibil-paloma-crem--maro.md";
  slug: "coltar-extensibil-paloma-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-crem.md": {
	id: "coltar-extensibil-paloma-crem.md";
  slug: "coltar-extensibil-paloma-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-gri-deschis--gri.md": {
	id: "coltar-extensibil-paloma-gri-deschis--gri.md";
  slug: "coltar-extensibil-paloma-gri-deschis--gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-gri-deschis.md": {
	id: "coltar-extensibil-paloma-gri-deschis.md";
  slug: "coltar-extensibil-paloma-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-gri.md": {
	id: "coltar-extensibil-paloma-gri.md";
  slug: "coltar-extensibil-paloma-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-plusat-aspect-lana-alba.md": {
	id: "coltar-extensibil-paloma-plusat-aspect-lana-alba.md";
  slug: "coltar-extensibil-paloma-plusat-aspect-lana-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-plusat-aspect-lana-gri.md": {
	id: "coltar-extensibil-paloma-plusat-aspect-lana-gri.md";
  slug: "coltar-extensibil-paloma-plusat-aspect-lana-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-reiat-zoom-new-15.md": {
	id: "coltar-extensibil-paloma-reiat-zoom-new-15.md";
  slug: "coltar-extensibil-paloma-reiat-zoom-new-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-reiat-zoom-new-2.md": {
	id: "coltar-extensibil-paloma-reiat-zoom-new-2.md";
  slug: "coltar-extensibil-paloma-reiat-zoom-new-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-reiat-zoom-new-20.md": {
	id: "coltar-extensibil-paloma-reiat-zoom-new-20.md";
  slug: "coltar-extensibil-paloma-reiat-zoom-new-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-reiat-zoom-new-22.md": {
	id: "coltar-extensibil-paloma-reiat-zoom-new-22.md";
  slug: "coltar-extensibil-paloma-reiat-zoom-new-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-reiat-zoom-new-25.md": {
	id: "coltar-extensibil-paloma-reiat-zoom-new-25.md";
  slug: "coltar-extensibil-paloma-reiat-zoom-new-25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-roze.md": {
	id: "coltar-extensibil-paloma-roze.md";
  slug: "coltar-extensibil-paloma-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-turcoaz.md": {
	id: "coltar-extensibil-paloma-turcoaz.md";
  slug: "coltar-extensibil-paloma-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-paloma-verde.md": {
	id: "coltar-extensibil-paloma-verde.md";
  slug: "coltar-extensibil-paloma-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-cappuccino.md": {
	id: "coltar-extensibil-roma-cappuccino.md";
  slug: "coltar-extensibil-roma-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-crem.md": {
	id: "coltar-extensibil-roma-crem.md";
  slug: "coltar-extensibil-roma-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-gri-deschis.md": {
	id: "coltar-extensibil-roma-gri-deschis.md";
  slug: "coltar-extensibil-roma-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-gri.md": {
	id: "coltar-extensibil-roma-gri.md";
  slug: "coltar-extensibil-roma-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-maro.md": {
	id: "coltar-extensibil-roma-maro.md";
  slug: "coltar-extensibil-roma-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-roze.md": {
	id: "coltar-extensibil-roma-roze.md";
  slug: "coltar-extensibil-roma-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-turcoaz.md": {
	id: "coltar-extensibil-roma-turcoaz.md";
  slug: "coltar-extensibil-roma-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-roma-verde.md": {
	id: "coltar-extensibil-roma-verde.md";
  slug: "coltar-extensibil-roma-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-cappuccino.md": {
	id: "coltar-extensibil-zoy-cappuccino.md";
  slug: "coltar-extensibil-zoy-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-crem--maro.md": {
	id: "coltar-extensibil-zoy-crem--maro.md";
  slug: "coltar-extensibil-zoy-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-crem.md": {
	id: "coltar-extensibil-zoy-crem.md";
  slug: "coltar-extensibil-zoy-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-gri-deschis--gri.md": {
	id: "coltar-extensibil-zoy-gri-deschis--gri.md";
  slug: "coltar-extensibil-zoy-gri-deschis--gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-gri-deschis.md": {
	id: "coltar-extensibil-zoy-gri-deschis.md";
  slug: "coltar-extensibil-zoy-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-roze.md": {
	id: "coltar-extensibil-zoy-roze.md";
  slug: "coltar-extensibil-zoy-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-turcoaz.md": {
	id: "coltar-extensibil-zoy-turcoaz.md";
  slug: "coltar-extensibil-zoy-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-extensibil-zoy-verde.md": {
	id: "coltar-extensibil-zoy-verde.md";
  slug: "coltar-extensibil-zoy-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-gloria-odin-24.md": {
	id: "coltar-gloria-odin-24.md";
  slug: "coltar-gloria-odin-24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-gloria-roze.md": {
	id: "coltar-gloria-roze.md";
  slug: "coltar-gloria-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-gloria-turcoaz.md": {
	id: "coltar-gloria-turcoaz.md";
  slug: "coltar-gloria-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-gloria-vardo-11.md": {
	id: "coltar-gloria-vardo-11.md";
  slug: "coltar-gloria-vardo-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-gloria-vardo-35.md": {
	id: "coltar-gloria-vardo-35.md";
  slug: "coltar-gloria-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-gloria-vardo-6.md": {
	id: "coltar-gloria-vardo-6.md";
  slug: "coltar-gloria-vardo-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-albastru.md": {
	id: "coltar-grace-albastru.md";
  slug: "coltar-grace-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-crem.md": {
	id: "coltar-grace-crem.md";
  slug: "coltar-grace-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-gri-antracit.md": {
	id: "coltar-grace-gri-antracit.md";
  slug: "coltar-grace-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-gri-deschis.md": {
	id: "coltar-grace-gri-deschis.md";
  slug: "coltar-grace-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-leto-75.md": {
	id: "coltar-grace-leto-75.md";
  slug: "coltar-grace-leto-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-maro.md": {
	id: "coltar-grace-maro.md";
  slug: "coltar-grace-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-portocaliu.md": {
	id: "coltar-grace-portocaliu.md";
  slug: "coltar-grace-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-roze.md": {
	id: "coltar-grace-roze.md";
  slug: "coltar-grace-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-grace-verde.md": {
	id: "coltar-grace-verde.md";
  slug: "coltar-grace-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-11.md": {
	id: "coltar-granity-whisper-11.md";
  slug: "coltar-granity-whisper-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-14.md": {
	id: "coltar-granity-whisper-14.md";
  slug: "coltar-granity-whisper-14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-17.md": {
	id: "coltar-granity-whisper-17.md";
  slug: "coltar-granity-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-18.md": {
	id: "coltar-granity-whisper-18.md";
  slug: "coltar-granity-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-3.md": {
	id: "coltar-granity-whisper-3.md";
  slug: "coltar-granity-whisper-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-5.md": {
	id: "coltar-granity-whisper-5.md";
  slug: "coltar-granity-whisper-5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-granity-whisper-9.md": {
	id: "coltar-granity-whisper-9.md";
  slug: "coltar-granity-whisper-9";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-albastru.md": {
	id: "coltar-ivy-albastru.md";
  slug: "coltar-ivy-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-crem--maro.md": {
	id: "coltar-ivy-crem--maro.md";
  slug: "coltar-ivy-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-gri-antracit.md": {
	id: "coltar-ivy-gri-antracit.md";
  slug: "coltar-ivy-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-gri-deschis--gri-antracit.md": {
	id: "coltar-ivy-gri-deschis--gri-antracit.md";
  slug: "coltar-ivy-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-gri-deschis.md": {
	id: "coltar-ivy-gri-deschis.md";
  slug: "coltar-ivy-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-portocaliu.md": {
	id: "coltar-ivy-portocaliu.md";
  slug: "coltar-ivy-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-roze.md": {
	id: "coltar-ivy-roze.md";
  slug: "coltar-ivy-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-ivy-verde.md": {
	id: "coltar-ivy-verde.md";
  slug: "coltar-ivy-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leon-stella-capucino--olifante.md": {
	id: "coltar-leon-stella-capucino--olifante.md";
  slug: "coltar-leon-stella-capucino--olifante";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-albastru.md": {
	id: "coltar-leto-albastru.md";
  slug: "coltar-leto-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-castel-97.md": {
	id: "coltar-leto-castel-97.md";
  slug: "coltar-leto-castel-97";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-crem.md": {
	id: "coltar-leto-crem.md";
  slug: "coltar-leto-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-gri-antracit.md": {
	id: "coltar-leto-gri-antracit.md";
  slug: "coltar-leto-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-gri-deschis.md": {
	id: "coltar-leto-gri-deschis.md";
  slug: "coltar-leto-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-maro.md": {
	id: "coltar-leto-maro.md";
  slug: "coltar-leto-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-portocaliu.md": {
	id: "coltar-leto-portocaliu.md";
  slug: "coltar-leto-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-roze.md": {
	id: "coltar-leto-roze.md";
  slug: "coltar-leto-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-velvet-3.md": {
	id: "coltar-leto-velvet-3.md";
  slug: "coltar-leto-velvet-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-leto-verde.md": {
	id: "coltar-leto-verde.md";
  slug: "coltar-leto-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-londa-caramiziu.md": {
	id: "coltar-londa-caramiziu.md";
  slug: "coltar-londa-caramiziu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-londa-crem.md": {
	id: "coltar-londa-crem.md";
  slug: "coltar-londa-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-londa-gri-inchis.md": {
	id: "coltar-londa-gri-inchis.md";
  slug: "coltar-londa-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-londa-maro.md": {
	id: "coltar-londa-maro.md";
  slug: "coltar-londa-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-londa-verde.md": {
	id: "coltar-londa-verde.md";
  slug: "coltar-londa-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-albastru.md": {
	id: "coltar-luna-albastru.md";
  slug: "coltar-luna-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-antracit--gri-deschis.md": {
	id: "coltar-luna-antracit--gri-deschis.md";
  slug: "coltar-luna-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-crem--maro.md": {
	id: "coltar-luna-crem--maro.md";
  slug: "coltar-luna-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-gri-deschis--antracit.md": {
	id: "coltar-luna-gri-deschis--antracit.md";
  slug: "coltar-luna-gri-deschis--antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-maro--crem.md": {
	id: "coltar-luna-maro--crem.md";
  slug: "coltar-luna-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-portocaliu.md": {
	id: "coltar-luna-portocaliu.md";
  slug: "coltar-luna-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-roze.md": {
	id: "coltar-luna-roze.md";
  slug: "coltar-luna-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-luna-verde.md": {
	id: "coltar-luna-verde.md";
  slug: "coltar-luna-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-albastru.md": {
	id: "coltar-mely-albastru.md";
  slug: "coltar-mely-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-aphrodite-3.md": {
	id: "coltar-mely-aphrodite-3.md";
  slug: "coltar-mely-aphrodite-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-crem.md": {
	id: "coltar-mely-crem.md";
  slug: "coltar-mely-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-gri-antracit.md": {
	id: "coltar-mely-gri-antracit.md";
  slug: "coltar-mely-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-gri-deschis.md": {
	id: "coltar-mely-gri-deschis.md";
  slug: "coltar-mely-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-harmony-52.md": {
	id: "coltar-mely-harmony-52.md";
  slug: "coltar-mely-harmony-52";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-maro.md": {
	id: "coltar-mely-maro.md";
  slug: "coltar-mely-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-portocaliu.md": {
	id: "coltar-mely-portocaliu.md";
  slug: "coltar-mely-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-roze.md": {
	id: "coltar-mely-roze.md";
  slug: "coltar-mely-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mely-verde.md": {
	id: "coltar-mely-verde.md";
  slug: "coltar-mely-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-albastru.md": {
	id: "coltar-mia-albastru.md";
  slug: "coltar-mia-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-crem.md": {
	id: "coltar-mia-crem.md";
  slug: "coltar-mia-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-gri-antracit.md": {
	id: "coltar-mia-gri-antracit.md";
  slug: "coltar-mia-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-gri-deschis.md": {
	id: "coltar-mia-gri-deschis.md";
  slug: "coltar-mia-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-maro.md": {
	id: "coltar-mia-maro.md";
  slug: "coltar-mia-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-portocaliu.md": {
	id: "coltar-mia-portocaliu.md";
  slug: "coltar-mia-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-roze.md": {
	id: "coltar-mia-roze.md";
  slug: "coltar-mia-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-mia-verde.md": {
	id: "coltar-mia-verde.md";
  slug: "coltar-mia-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-milos-bej.md": {
	id: "coltar-milos-bej.md";
  slug: "coltar-milos-bej";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-milos-gri-deschis.md": {
	id: "coltar-milos-gri-deschis.md";
  slug: "coltar-milos-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-milos-gri-inchis.md": {
	id: "coltar-milos-gri-inchis.md";
  slug: "coltar-milos-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-milos-maro.md": {
	id: "coltar-milos-maro.md";
  slug: "coltar-milos-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-milos-verde.md": {
	id: "coltar-milos-verde.md";
  slug: "coltar-milos-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-albastru.md": {
	id: "coltar-nova-albastru.md";
  slug: "coltar-nova-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-crem--maro.md": {
	id: "coltar-nova-crem--maro.md";
  slug: "coltar-nova-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-crem.md": {
	id: "coltar-nova-crem.md";
  slug: "coltar-nova-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-gri-deschis--gri-antracit.md": {
	id: "coltar-nova-gri-deschis--gri-antracit.md";
  slug: "coltar-nova-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-gri-deschis.md": {
	id: "coltar-nova-gri-deschis.md";
  slug: "coltar-nova-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-havana-6--olifante-13.md": {
	id: "coltar-nova-havana-6--olifante-13.md";
  slug: "coltar-nova-havana-6--olifante-13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-portocaliu.md": {
	id: "coltar-nova-portocaliu.md";
  slug: "coltar-nova-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-roze.md": {
	id: "coltar-nova-roze.md";
  slug: "coltar-nova-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-nova-verde.md": {
	id: "coltar-nova-verde.md";
  slug: "coltar-nova-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-11.md": {
	id: "coltar-olimp-whisper-11.md";
  slug: "coltar-olimp-whisper-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-14.md": {
	id: "coltar-olimp-whisper-14.md";
  slug: "coltar-olimp-whisper-14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-17.md": {
	id: "coltar-olimp-whisper-17.md";
  slug: "coltar-olimp-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-18.md": {
	id: "coltar-olimp-whisper-18.md";
  slug: "coltar-olimp-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-3.md": {
	id: "coltar-olimp-whisper-3.md";
  slug: "coltar-olimp-whisper-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-5.md": {
	id: "coltar-olimp-whisper-5.md";
  slug: "coltar-olimp-whisper-5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-olimp-whisper-9.md": {
	id: "coltar-olimp-whisper-9.md";
  slug: "coltar-olimp-whisper-9";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-albastru.md": {
	id: "coltar-paloma--1-loc-albastru.md";
  slug: "coltar-paloma--1-loc-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-crem--maro.md": {
	id: "coltar-paloma--1-loc-crem--maro.md";
  slug: "coltar-paloma--1-loc-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-gri-antracit.md": {
	id: "coltar-paloma--1-loc-gri-antracit.md";
  slug: "coltar-paloma--1-loc-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-gri-deschis--gri-antracit.md": {
	id: "coltar-paloma--1-loc-gri-deschis--gri-antracit.md";
  slug: "coltar-paloma--1-loc-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-gri-deschis.md": {
	id: "coltar-paloma--1-loc-gri-deschis.md";
  slug: "coltar-paloma--1-loc-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-portocaliu.md": {
	id: "coltar-paloma--1-loc-portocaliu.md";
  slug: "coltar-paloma--1-loc-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-roze.md": {
	id: "coltar-paloma--1-loc-roze.md";
  slug: "coltar-paloma--1-loc-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-paloma--1-loc-verde.md": {
	id: "coltar-paloma--1-loc-verde.md";
  slug: "coltar-paloma--1-loc-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-albastru.md": {
	id: "coltar-quinn-albastru.md";
  slug: "coltar-quinn-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-crem--maro.md": {
	id: "coltar-quinn-crem--maro.md";
  slug: "coltar-quinn-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-crem.md": {
	id: "coltar-quinn-crem.md";
  slug: "coltar-quinn-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-gri-deschis--gri-antracit.md": {
	id: "coltar-quinn-gri-deschis--gri-antracit.md";
  slug: "coltar-quinn-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-gri-deschis.md": {
	id: "coltar-quinn-gri-deschis.md";
  slug: "coltar-quinn-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-harmony-82--harmony-90.md": {
	id: "coltar-quinn-harmony-82--harmony-90.md";
  slug: "coltar-quinn-harmony-82--harmony-90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-portocaliu.md": {
	id: "coltar-quinn-portocaliu.md";
  slug: "coltar-quinn-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-roze.md": {
	id: "coltar-quinn-roze.md";
  slug: "coltar-quinn-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-quinn-verde.md": {
	id: "coltar-quinn-verde.md";
  slug: "coltar-quinn-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-albastru.md": {
	id: "coltar-roma--1-loc-albastru.md";
  slug: "coltar-roma--1-loc-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-crem.md": {
	id: "coltar-roma--1-loc-crem.md";
  slug: "coltar-roma--1-loc-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-gri-antracit.md": {
	id: "coltar-roma--1-loc-gri-antracit.md";
  slug: "coltar-roma--1-loc-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-gri-deschis.md": {
	id: "coltar-roma--1-loc-gri-deschis.md";
  slug: "coltar-roma--1-loc-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-maro.md": {
	id: "coltar-roma--1-loc-maro.md";
  slug: "coltar-roma--1-loc-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-portocaliu.md": {
	id: "coltar-roma--1-loc-portocaliu.md";
  slug: "coltar-roma--1-loc-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-roze.md": {
	id: "coltar-roma--1-loc-roze.md";
  slug: "coltar-roma--1-loc-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roma--1-loc-verde.md": {
	id: "coltar-roma--1-loc-verde.md";
  slug: "coltar-roma--1-loc-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-castel-70.md": {
	id: "coltar-roua-castel-70.md";
  slug: "coltar-roua-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-coral-55.md": {
	id: "coltar-roua-coral-55.md";
  slug: "coltar-roua-coral-55";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-cremona-70.md": {
	id: "coltar-roua-cremona-70.md";
  slug: "coltar-roua-cremona-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-vardo-91.md": {
	id: "coltar-roua-vardo-91.md";
  slug: "coltar-roua-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-whisper-17.md": {
	id: "coltar-roua-whisper-17.md";
  slug: "coltar-roua-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-whisper-18.md": {
	id: "coltar-roua-whisper-18.md";
  slug: "coltar-roua-whisper-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-roua-whisper-2.md": {
	id: "coltar-roua-whisper-2.md";
  slug: "coltar-roua-whisper-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-albastru.md": {
	id: "coltar-santorini-albastru.md";
  slug: "coltar-santorini-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-castel-15.md": {
	id: "coltar-santorini-castel-15.md";
  slug: "coltar-santorini-castel-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-crem.md": {
	id: "coltar-santorini-crem.md";
  slug: "coltar-santorini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-gri-antracit.md": {
	id: "coltar-santorini-gri-antracit.md";
  slug: "coltar-santorini-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-gri-deschis.md": {
	id: "coltar-santorini-gri-deschis.md";
  slug: "coltar-santorini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-gri.md": {
	id: "coltar-santorini-gri.md";
  slug: "coltar-santorini-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-harmony-04.md": {
	id: "coltar-santorini-harmony-04.md";
  slug: "coltar-santorini-harmony-04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-maro.md": {
	id: "coltar-santorini-maro.md";
  slug: "coltar-santorini-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-portocaliu.md": {
	id: "coltar-santorini-portocaliu.md";
  slug: "coltar-santorini-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-roz-pudrat.md": {
	id: "coltar-santorini-roz-pudrat.md";
  slug: "coltar-santorini-roz-pudrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-santorini-verde.md": {
	id: "coltar-santorini-verde.md";
  slug: "coltar-santorini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-word-bej.md": {
	id: "coltar-word-bej.md";
  slug: "coltar-word-bej";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-word-gri-deschis.md": {
	id: "coltar-word-gri-deschis.md";
  slug: "coltar-word-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-word-maro.md": {
	id: "coltar-word-maro.md";
  slug: "coltar-word-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-word-mustar.md": {
	id: "coltar-word-mustar.md";
  slug: "coltar-word-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"coltar-word-verde.md": {
	id: "coltar-word-verde.md";
  slug: "coltar-word-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"colțar-leon.md": {
	id: "colțar-leon.md";
  slug: "colțar-leon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-class-cu-sertare.md": {
	id: "comoda-class-cu-sertare.md";
  slug: "comoda-class-cu-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-class-cu-usi.md": {
	id: "comoda-class-cu-usi.md";
  slug: "comoda-class-cu-usi";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-dormitor-casmir--alb-soares.md": {
	id: "comoda-dormitor-casmir--alb-soares.md";
  slug: "comoda-dormitor-casmir--alb-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-dormitor-mario.md": {
	id: "comoda-dormitor-mario.md";
  slug: "comoda-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-dormitor-nuc--casmir-solomon.md": {
	id: "comoda-dormitor-nuc--casmir-solomon.md";
  slug: "comoda-dormitor-nuc--casmir-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-grafit-cu-sertare.md": {
	id: "comoda-grafit-cu-sertare.md";
  slug: "comoda-grafit-cu-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-grafit-cu-usi.md": {
	id: "comoda-grafit-cu-usi.md";
  slug: "comoda-grafit-cu-usi";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-inalta-melo---modul-b.md": {
	id: "comoda-inalta-melo---modul-b.md";
  slug: "comoda-inalta-melo---modul-b";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-noce-gri.md": {
	id: "comoda-noce-gri.md";
  slug: "comoda-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-noel-cu-sertare---albstejar-k005.md": {
	id: "comoda-noel-cu-sertare---albstejar-k005.md";
  slug: "comoda-noel-cu-sertare---albstejar-k005";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-noel-cu-sertare---gristejar-k005.md": {
	id: "comoda-noel-cu-sertare---gristejar-k005.md";
  slug: "comoda-noel-cu-sertare---gristejar-k005";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-1000-azur.md": {
	id: "comoda-tv-1000-azur.md";
  slug: "comoda-tv-1000-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-1000-belo.md": {
	id: "comoda-tv-1000-belo.md";
  slug: "comoda-tv-1000-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-1000-nori.md": {
	id: "comoda-tv-1000-nori.md";
  slug: "comoda-tv-1000-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-1600-azur.md": {
	id: "comoda-tv-1600-azur.md";
  slug: "comoda-tv-1600-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-1600-belo.md": {
	id: "comoda-tv-1600-belo.md";
  slug: "comoda-tv-1600-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-1600-nori.md": {
	id: "comoda-tv-1600-nori.md";
  slug: "comoda-tv-1600-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-melo---modul-a.md": {
	id: "comoda-tv-melo---modul-a.md";
  slug: "comoda-tv-melo---modul-a";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"comoda-tv-timea.md": {
	id: "comoda-tv-timea.md";
  slug: "comoda-tv-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-decorativ-cu-polite-azur.md": {
	id: "corp-decorativ-cu-polite-azur.md";
  slug: "corp-decorativ-cu-polite-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-decorativ-cu-polite-belo.md": {
	id: "corp-decorativ-cu-polite-belo.md";
  slug: "corp-decorativ-cu-polite-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-decorativ-cu-polite-nori.md": {
	id: "corp-decorativ-cu-polite-nori.md";
  slug: "corp-decorativ-cu-polite-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-inferior-azur.md": {
	id: "corp-inferior-azur.md";
  slug: "corp-inferior-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-inferior-belo.md": {
	id: "corp-inferior-belo.md";
  slug: "corp-inferior-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-inferior-nori.md": {
	id: "corp-inferior-nori.md";
  slug: "corp-inferior-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-polite-0.28m-dormitor-bingo-f.md": {
	id: "corp-polite-0.28m-dormitor-bingo-f.md";
  slug: "corp-polite-028m-dormitor-bingo-f";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-polite-0.28m-noce.md": {
	id: "corp-polite-0.28m-noce.md";
  slug: "corp-polite-028m-noce";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-polite-0.28m-timea.md": {
	id: "corp-polite-0.28m-timea.md";
  slug: "corp-polite-028m-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-polite-alb-0.28m-soares.md": {
	id: "corp-polite-alb-0.28m-soares.md";
  slug: "corp-polite-alb-028m-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-polite-melo---modul-d.md": {
	id: "corp-polite-melo---modul-d.md";
  slug: "corp-polite-melo---modul-d";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-polite-nuc-0.28m-solomon.md": {
	id: "corp-polite-nuc-0.28m-solomon.md";
  slug: "corp-polite-nuc-028m-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-superior-azur.md": {
	id: "corp-superior-azur.md";
  slug: "corp-superior-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-superior-belo.md": {
	id: "corp-superior-belo.md";
  slug: "corp-superior-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-superior-nori.md": {
	id: "corp-superior-nori.md";
  slug: "corp-superior-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-suprapozabil-casmir--alb.md": {
	id: "corp-suprapozabil-casmir--alb.md";
  slug: "corp-suprapozabil-casmir--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-suprapozabil-ferrara.md": {
	id: "corp-suprapozabil-ferrara.md";
  slug: "corp-suprapozabil-ferrara";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-suprapozabil-noce.md": {
	id: "corp-suprapozabil-noce.md";
  slug: "corp-suprapozabil-noce";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-suprapozabil-nuc--casmir-solomon.md": {
	id: "corp-suprapozabil-nuc--casmir-solomon.md";
  slug: "corp-suprapozabil-nuc--casmir-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-suprapozabil.md": {
	id: "corp-suprapozabil.md";
  slug: "corp-suprapozabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"corp-suspendat-melo---modul-e.md": {
	id: "corp-suspendat-melo---modul-e.md";
  slug: "corp-suspendat-melo---modul-e";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem--maro-story-fix.md": {
	id: "divan--pat-o-persoana-tapitat-crem--maro-story-fix.md";
  slug: "divan--pat-o-persoana-tapitat-crem--maro-story-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem--maro-story-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-crem--maro-story-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-crem--maro-story-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem-round-fix.md": {
	id: "divan--pat-o-persoana-tapitat-crem-round-fix.md";
  slug: "divan--pat-o-persoana-tapitat-crem-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem-round-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-crem-round-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-crem-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem-soft-fix.md": {
	id: "divan--pat-o-persoana-tapitat-crem-soft-fix.md";
  slug: "divan--pat-o-persoana-tapitat-crem-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem-soft-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-crem-soft-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-crem-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem-story-fix.md": {
	id: "divan--pat-o-persoana-tapitat-crem-story-fix.md";
  slug: "divan--pat-o-persoana-tapitat-crem-story-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-crem-story-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-crem-story-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-crem-story-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-antracit-story-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-antracit-story-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-antracit-story-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-antracit-story-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-antracit-story-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-antracit-story-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis--gri-antracit-story-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis--gri-antracit-story-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis--gri-antracit-story-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis--gri-antracit-story-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis--gri-antracit-story-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis--gri-antracit-story-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis-round-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis-round-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis-round-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis-round-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis-soft-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis-soft-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis-soft-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis-soft-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis-story-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis-story-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis-story-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-deschis-story-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-deschis-story-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-deschis-story-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-inchis-round-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-inchis-round-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-inchis-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-inchis-round-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-inchis-round-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-inchis-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-inchis-soft-fix.md": {
	id: "divan--pat-o-persoana-tapitat-gri-inchis-soft-fix.md";
  slug: "divan--pat-o-persoana-tapitat-gri-inchis-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-gri-inchis-soft-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-gri-inchis-soft-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-gri-inchis-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-maro-round-fix.md": {
	id: "divan--pat-o-persoana-tapitat-maro-round-fix.md";
  slug: "divan--pat-o-persoana-tapitat-maro-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-maro-round-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-maro-round-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-maro-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-maro-soft-fix.md": {
	id: "divan--pat-o-persoana-tapitat-maro-soft-fix.md";
  slug: "divan--pat-o-persoana-tapitat-maro-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-maro-soft-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-maro-soft-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-maro-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-maro-story-fix.md": {
	id: "divan--pat-o-persoana-tapitat-maro-story-fix.md";
  slug: "divan--pat-o-persoana-tapitat-maro-story-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-o-persoana-tapitat-maro-story-rabatabil.md": {
	id: "divan--pat-o-persoana-tapitat-maro-story-rabatabil.md";
  slug: "divan--pat-o-persoana-tapitat-maro-story-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-tapitat-crem--maro-story-extensibil.md": {
	id: "divan--pat-tapitat-crem--maro-story-extensibil.md";
  slug: "divan--pat-tapitat-crem--maro-story-extensibil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-tapitat-crem-story-extensibil.md": {
	id: "divan--pat-tapitat-crem-story-extensibil.md";
  slug: "divan--pat-tapitat-crem-story-extensibil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-tapitat-gri-antracit-story-extensibil.md": {
	id: "divan--pat-tapitat-gri-antracit-story-extensibil.md";
  slug: "divan--pat-tapitat-gri-antracit-story-extensibil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-tapitat-gri-deschis--gri-antracit-story-extensibil.md": {
	id: "divan--pat-tapitat-gri-deschis--gri-antracit-story-extensibil.md";
  slug: "divan--pat-tapitat-gri-deschis--gri-antracit-story-extensibil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-tapitat-gri-deschis-story-extensibil.md": {
	id: "divan--pat-tapitat-gri-deschis-story-extensibil.md";
  slug: "divan--pat-tapitat-gri-deschis-story-extensibil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan--pat-tapitat-maro-story-extensibil.md": {
	id: "divan--pat-tapitat-maro-story-extensibil.md";
  slug: "divan--pat-tapitat-maro-story-extensibil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-crem-round-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-crem-round-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-crem-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-crem-round-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-crem-round-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-crem-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-crem-soft-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-crem-soft-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-crem-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-crem-soft-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-crem-soft-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-crem-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-deschis-round-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-round-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-deschis-round-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-round-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-deschis-soft-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-soft-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-deschis-soft-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-soft-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-deschis-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-inchis-round-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-round-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-inchis-round-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-round-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-inchis-soft-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-soft-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-gri-inchis-soft-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-soft-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-gri-inchis-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-maro-round-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-maro-round-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-maro-round-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-maro-round-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-maro-round-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-maro-round-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-maro-soft-fix.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-maro-soft-fix.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-maro-soft-fix";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"divan-dublu--pat-matrimonial-tapitat-maro-soft-rabatabil.md": {
	id: "divan-dublu--pat-matrimonial-tapitat-maro-soft-rabatabil.md";
  slug: "divan-dublu--pat-matrimonial-tapitat-maro-soft-rabatabil";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-0.79m--dulap-dormitor-timea.md": {
	id: "dressing-0.79m--dulap-dormitor-timea.md";
  slug: "dressing-079m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-1.07m--dulap-dormitor-timea.md": {
	id: "dressing-1.07m--dulap-dormitor-timea.md";
  slug: "dressing-107m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-1.30m--dulap-dormitor-timea.md": {
	id: "dressing-1.30m--dulap-dormitor-timea.md";
  slug: "dressing-130m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-1.33m--dulap-dormitor-mario.md": {
	id: "dressing-1.33m--dulap-dormitor-mario.md";
  slug: "dressing-133m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-1.79m--dulap-dormitor-timea.md": {
	id: "dressing-1.79m--dulap-dormitor-timea.md";
  slug: "dressing-179m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-1.89m--dulap-dormitor-mario.md": {
	id: "dressing-1.89m--dulap-dormitor-mario.md";
  slug: "dressing-189m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-124-cm-alb-c01.md": {
	id: "dressing-124-cm-alb-c01.md";
  slug: "dressing-124-cm-alb-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-124-cm-alb-c02.md": {
	id: "dressing-124-cm-alb-c02.md";
  slug: "dressing-124-cm-alb-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-124-cm-gri-c01.md": {
	id: "dressing-124-cm-gri-c01.md";
  slug: "dressing-124-cm-gri-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-124-cm-gri-c02.md": {
	id: "dressing-124-cm-gri-c02.md";
  slug: "dressing-124-cm-gri-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-124-cm-stejar-auriu-c01.md": {
	id: "dressing-124-cm-stejar-auriu-c01.md";
  slug: "dressing-124-cm-stejar-auriu-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-124-cm-stejar-auriu-c02.md": {
	id: "dressing-124-cm-stejar-auriu-c02.md";
  slug: "dressing-124-cm-stejar-auriu-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-164.4-cm-alb-c03.md": {
	id: "dressing-164.4-cm-alb-c03.md";
  slug: "dressing-1644-cm-alb-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-164.4-cm-alb-c04.md": {
	id: "dressing-164.4-cm-alb-c04.md";
  slug: "dressing-1644-cm-alb-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-164.4-cm-gri-c03.md": {
	id: "dressing-164.4-cm-gri-c03.md";
  slug: "dressing-1644-cm-gri-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-164.4-cm-gri-c04.md": {
	id: "dressing-164.4-cm-gri-c04.md";
  slug: "dressing-1644-cm-gri-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-164.4-cm-stejar-auriu-c03.md": {
	id: "dressing-164.4-cm-stejar-auriu-c03.md";
  slug: "dressing-1644-cm-stejar-auriu-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-164.4-cm-stejar-auriu-c04.md": {
	id: "dressing-164.4-cm-stejar-auriu-c04.md";
  slug: "dressing-1644-cm-stejar-auriu-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.25m-dulap-dormitor-bingo-f.md": {
	id: "dressing-2.25m-dulap-dormitor-bingo-f.md";
  slug: "dressing-225m-dulap-dormitor-bingo-f";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.25m-dulap-dormitor-nuc--casmir-solomon.md": {
	id: "dressing-2.25m-dulap-dormitor-nuc--casmir-solomon.md";
  slug: "dressing-225m-dulap-dormitor-nuc--casmir-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.30m--dulap-dormitor-mario.md": {
	id: "dressing-2.30m--dulap-dormitor-mario.md";
  slug: "dressing-230m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.30m--dulap-dormitor-timea.md": {
	id: "dressing-2.30m--dulap-dormitor-timea.md";
  slug: "dressing-230m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.46m--dulap-dormitor-mario.md": {
	id: "dressing-2.46m--dulap-dormitor-mario.md";
  slug: "dressing-246m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.56m--dulap-dormitor-mario.md": {
	id: "dressing-2.56m--dulap-dormitor-mario.md";
  slug: "dressing-256m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.58m--dulap-dormitor-timea.md": {
	id: "dressing-2.58m--dulap-dormitor-timea.md";
  slug: "dressing-258m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.86m--dulap-dormitor-timea.md": {
	id: "dressing-2.86m--dulap-dormitor-timea.md";
  slug: "dressing-286m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-2.97m--dulap-dormitor-mario.md": {
	id: "dressing-2.97m--dulap-dormitor-mario.md";
  slug: "dressing-297m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-205.4-cm-alb-c05.md": {
	id: "dressing-205.4-cm-alb-c05.md";
  slug: "dressing-2054-cm-alb-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-205.4-cm-alb-c06.md": {
	id: "dressing-205.4-cm-alb-c06.md";
  slug: "dressing-2054-cm-alb-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-205.4-cm-gri-c05.md": {
	id: "dressing-205.4-cm-gri-c05.md";
  slug: "dressing-2054-cm-gri-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-205.4-cm-gri-c06.md": {
	id: "dressing-205.4-cm-gri-c06.md";
  slug: "dressing-2054-cm-gri-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-205.4-cm-stejar-auriu-c05.md": {
	id: "dressing-205.4-cm-stejar-auriu-c05.md";
  slug: "dressing-2054-cm-stejar-auriu-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-205.4-cm-stejar-auriu-c06.md": {
	id: "dressing-205.4-cm-stejar-auriu-c06.md";
  slug: "dressing-2054-cm-stejar-auriu-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-246.4-cm-alb-c07.md": {
	id: "dressing-246.4-cm-alb-c07.md";
  slug: "dressing-2464-cm-alb-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-246.4-cm-alb-c08.md": {
	id: "dressing-246.4-cm-alb-c08.md";
  slug: "dressing-2464-cm-alb-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-246.4-cm-gri-c07.md": {
	id: "dressing-246.4-cm-gri-c07.md";
  slug: "dressing-2464-cm-gri-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-246.4-cm-gri-c08.md": {
	id: "dressing-246.4-cm-gri-c08.md";
  slug: "dressing-2464-cm-gri-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-246.4-cm-stejar-auriu-c07.md": {
	id: "dressing-246.4-cm-stejar-auriu-c07.md";
  slug: "dressing-2464-cm-stejar-auriu-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-246.4-cm-stejar-auriu-c08.md": {
	id: "dressing-246.4-cm-stejar-auriu-c08.md";
  slug: "dressing-2464-cm-stejar-auriu-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-247.4-cm-alb-c10.md": {
	id: "dressing-247.4-cm-alb-c10.md";
  slug: "dressing-2474-cm-alb-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-247.4-cm-gri-c10.md": {
	id: "dressing-247.4-cm-gri-c10.md";
  slug: "dressing-2474-cm-gri-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-247.4-cm-stejar-auriu-c10.md": {
	id: "dressing-247.4-cm-stejar-auriu-c10.md";
  slug: "dressing-2474-cm-stejar-auriu-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-288.4-cm-alb-c11.md": {
	id: "dressing-288.4-cm-alb-c11.md";
  slug: "dressing-2884-cm-alb-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-288.4-cm-gri-c11.md": {
	id: "dressing-288.4-cm-gri-c11.md";
  slug: "dressing-2884-cm-gri-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-288.4-cm-stejar-auriu-c11.md": {
	id: "dressing-288.4-cm-stejar-auriu-c11.md";
  slug: "dressing-2884-cm-stejar-auriu-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.02m--dulap-dormitor-timea.md": {
	id: "dressing-3.02m--dulap-dormitor-timea.md";
  slug: "dressing-302m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.06m--dulap-dormitor-timea.md": {
	id: "dressing-3.06m--dulap-dormitor-timea.md";
  slug: "dressing-306m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.09m--dulap-dormitor-timea.md": {
	id: "dressing-3.09m--dulap-dormitor-timea.md";
  slug: "dressing-309m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.13m--dulap-dormitor-mario.md": {
	id: "dressing-3.13m--dulap-dormitor-mario.md";
  slug: "dressing-313m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.28m--dulap-dormitor-mario.md": {
	id: "dressing-3.28m--dulap-dormitor-mario.md";
  slug: "dressing-328m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.34m--dulap-dormitor-timea.md": {
	id: "dressing-3.34m--dulap-dormitor-timea.md";
  slug: "dressing-334m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.37m--dulap-dormitor-timea.md": {
	id: "dressing-3.37m--dulap-dormitor-timea.md";
  slug: "dressing-337m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.57m--dulap-dormitor-timea.md": {
	id: "dressing-3.57m--dulap-dormitor-timea.md";
  slug: "dressing-357m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.62m--dulap-dormitor-timea.md": {
	id: "dressing-3.62m--dulap-dormitor-timea.md";
  slug: "dressing-362m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.69m--dulap-dormitor-mario.md": {
	id: "dressing-3.69m--dulap-dormitor-mario.md";
  slug: "dressing-369m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.86m--dulap-dormitor-timea.md": {
	id: "dressing-3.86m--dulap-dormitor-timea.md";
  slug: "dressing-386m--dulap-dormitor-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-3.95m--dulap-dormitor-mario.md": {
	id: "dressing-3.95m--dulap-dormitor-mario.md";
  slug: "dressing-395m--dulap-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-328.8-cm-alb-c12.md": {
	id: "dressing-328.8-cm-alb-c12.md";
  slug: "dressing-3288-cm-alb-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-328.8-cm-gri-c12.md": {
	id: "dressing-328.8-cm-gri-c12.md";
  slug: "dressing-3288-cm-gri-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-328.8-cm-stejar-auriu-c12.md": {
	id: "dressing-328.8-cm-stejar-auriu-c12.md";
  slug: "dressing-3288-cm-stejar-auriu-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-369.8-cm-alb-c13.md": {
	id: "dressing-369.8-cm-alb-c13.md";
  slug: "dressing-3698-cm-alb-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-369.8-cm-gri-c13.md": {
	id: "dressing-369.8-cm-gri-c13.md";
  slug: "dressing-3698-cm-gri-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-369.8-cm-stejar-auriu-c13.md": {
	id: "dressing-369.8-cm-stejar-auriu-c13.md";
  slug: "dressing-3698-cm-stejar-auriu-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-411.8-cm-alb-c14.md": {
	id: "dressing-411.8-cm-alb-c14.md";
  slug: "dressing-4118-cm-alb-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-411.8-cm-gri-c14.md": {
	id: "dressing-411.8-cm-gri-c14.md";
  slug: "dressing-4118-cm-gri-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-411.8-cm-stejar-auriu-c14.md": {
	id: "dressing-411.8-cm-stejar-auriu-c14.md";
  slug: "dressing-4118-cm-stejar-auriu-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-83-cm-alb-c09.md": {
	id: "dressing-83-cm-alb-c09.md";
  slug: "dressing-83-cm-alb-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-83-cm-gri-c09.md": {
	id: "dressing-83-cm-gri-c09.md";
  slug: "dressing-83-cm-gri-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-83-cm-stejar-auriu-c09.md": {
	id: "dressing-83-cm-stejar-auriu-c09.md";
  slug: "dressing-83-cm-stejar-auriu-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8130-cm-alb-c15.md": {
	id: "dressing-colt-169.8130-cm-alb-c15.md";
  slug: "dressing-colt-1698130-cm-alb-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8130-cm-gri-c15.md": {
	id: "dressing-colt-169.8130-cm-gri-c15.md";
  slug: "dressing-colt-1698130-cm-gri-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8130-cm-stejar-auriu-c15.md": {
	id: "dressing-colt-169.8130-cm-stejar-auriu-c15.md";
  slug: "dressing-colt-1698130-cm-stejar-auriu-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8172-cm-alb-c16.md": {
	id: "dressing-colt-169.8172-cm-alb-c16.md";
  slug: "dressing-colt-1698172-cm-alb-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8172-cm-gri-c16.md": {
	id: "dressing-colt-169.8172-cm-gri-c16.md";
  slug: "dressing-colt-1698172-cm-gri-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8172-cm-stejar-auriu-c16.md": {
	id: "dressing-colt-169.8172-cm-stejar-auriu-c16.md";
  slug: "dressing-colt-1698172-cm-stejar-auriu-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8213-cm-alb-c17.md": {
	id: "dressing-colt-169.8213-cm-alb-c17.md";
  slug: "dressing-colt-1698213-cm-alb-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8213-cm-gri-c17.md": {
	id: "dressing-colt-169.8213-cm-gri-c17.md";
  slug: "dressing-colt-1698213-cm-gri-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8213-cm-stejar-auriu-c17.md": {
	id: "dressing-colt-169.8213-cm-stejar-auriu-c17.md";
  slug: "dressing-colt-1698213-cm-stejar-auriu-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8216.8172-cm-alb-c30.md": {
	id: "dressing-colt-169.8216.8172-cm-alb-c30.md";
  slug: "dressing-colt-16982168172-cm-alb-c30";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8216.8172-cm-gri-c30.md": {
	id: "dressing-colt-169.8216.8172-cm-gri-c30.md";
  slug: "dressing-colt-16982168172-cm-gri-c30";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8216.8172-cm-stejar-auriu-c30.md": {
	id: "dressing-colt-169.8216.8172-cm-stejar-auriu-c30.md";
  slug: "dressing-colt-16982168172-cm-stejar-auriu-c30";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8253.4-cm-alb-c18.md": {
	id: "dressing-colt-169.8253.4-cm-alb-c18.md";
  slug: "dressing-colt-16982534-cm-alb-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8253.4-cm-gri-c18.md": {
	id: "dressing-colt-169.8253.4-cm-gri-c18.md";
  slug: "dressing-colt-16982534-cm-gri-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8253.4-cm-stejar-auriu-c18.md": {
	id: "dressing-colt-169.8253.4-cm-stejar-auriu-c18.md";
  slug: "dressing-colt-16982534-cm-stejar-auriu-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8258.8172-cm-alb-c31.md": {
	id: "dressing-colt-169.8258.8172-cm-alb-c31.md";
  slug: "dressing-colt-16982588172-cm-alb-c31";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8258.8172-cm-gri-c31.md": {
	id: "dressing-colt-169.8258.8172-cm-gri-c31.md";
  slug: "dressing-colt-16982588172-cm-gri-c31";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8258.8172-cm-stejar-auriu-c31.md": {
	id: "dressing-colt-169.8258.8172-cm-stejar-auriu-c31.md";
  slug: "dressing-colt-16982588172-cm-stejar-auriu-c31";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8258.8253.4-cm-alb-c32.md": {
	id: "dressing-colt-169.8258.8253.4-cm-alb-c32.md";
  slug: "dressing-colt-169825882534-cm-alb-c32";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8258.8253.4-cm-gri-c32.md": {
	id: "dressing-colt-169.8258.8253.4-cm-gri-c32.md";
  slug: "dressing-colt-169825882534-cm-gri-c32";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8258.8253.4-cm-stejar-auriu-c32.md": {
	id: "dressing-colt-169.8258.8253.4-cm-stejar-auriu-c32.md";
  slug: "dressing-colt-169825882534-cm-stejar-auriu-c32";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8336.4-cm-alb-c19.md": {
	id: "dressing-colt-169.8336.4-cm-alb-c19.md";
  slug: "dressing-colt-16983364-cm-alb-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8336.4-cm-gri-c19.md": {
	id: "dressing-colt-169.8336.4-cm-gri-c19.md";
  slug: "dressing-colt-16983364-cm-gri-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8336.4-cm-stejar-auriu-c19.md": {
	id: "dressing-colt-169.8336.4-cm-stejar-auriu-c19.md";
  slug: "dressing-colt-16983364-cm-stejar-auriu-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8340.2172-cm-alb-c33.md": {
	id: "dressing-colt-169.8340.2172-cm-alb-c33.md";
  slug: "dressing-colt-16983402172-cm-alb-c33";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8340.2172-cm-gri-c33.md": {
	id: "dressing-colt-169.8340.2172-cm-gri-c33.md";
  slug: "dressing-colt-16983402172-cm-gri-c33";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8340.2172-cm-stejar-auriu-c33.md": {
	id: "dressing-colt-169.8340.2172-cm-stejar-auriu-c33.md";
  slug: "dressing-colt-16983402172-cm-stejar-auriu-c33";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8377.4-cm-alb-c20.md": {
	id: "dressing-colt-169.8377.4-cm-alb-c20.md";
  slug: "dressing-colt-16983774-cm-alb-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8377.4-cm-gri-c20.md": {
	id: "dressing-colt-169.8377.4-cm-gri-c20.md";
  slug: "dressing-colt-16983774-cm-gri-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-169.8377.4-cm-stejar-auriu-c20.md": {
	id: "dressing-colt-169.8377.4-cm-stejar-auriu-c20.md";
  slug: "dressing-colt-16983774-cm-stejar-auriu-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8130-cm-alb-c21.md": {
	id: "dressing-colt-210.8130-cm-alb-c21.md";
  slug: "dressing-colt-2108130-cm-alb-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8130-cm-gri-c21.md": {
	id: "dressing-colt-210.8130-cm-gri-c21.md";
  slug: "dressing-colt-2108130-cm-gri-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8130-cm-stejar-auriu-c21.md": {
	id: "dressing-colt-210.8130-cm-stejar-auriu-c21.md";
  slug: "dressing-colt-2108130-cm-stejar-auriu-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8172-cm-alb-c22.md": {
	id: "dressing-colt-210.8172-cm-alb-c22.md";
  slug: "dressing-colt-2108172-cm-alb-c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8172-cm-gri-c22.md": {
	id: "dressing-colt-210.8172-cm-gri-c22.md";
  slug: "dressing-colt-2108172-cm-gri-c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8172-cm-stejar-auriu-c22.md": {
	id: "dressing-colt-210.8172-cm-stejar-auriu-c22.md";
  slug: "dressing-colt-2108172-cm-stejar-auriu-c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8253.4-cm-alb-c23.md": {
	id: "dressing-colt-210.8253.4-cm-alb-c23.md";
  slug: "dressing-colt-21082534-cm-alb-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8253.4-cm-gri-c23.md": {
	id: "dressing-colt-210.8253.4-cm-gri-c23.md";
  slug: "dressing-colt-21082534-cm-gri-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8253.4-cm-stejar-auriu-c23.md": {
	id: "dressing-colt-210.8253.4-cm-stejar-auriu-c23.md";
  slug: "dressing-colt-21082534-cm-stejar-auriu-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8336.4-cm-alb-c24.md": {
	id: "dressing-colt-210.8336.4-cm-alb-c24.md";
  slug: "dressing-colt-21083364-cm-alb-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8336.4-cm-gri-c24.md": {
	id: "dressing-colt-210.8336.4-cm-gri-c24.md";
  slug: "dressing-colt-21083364-cm-gri-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-210.8336.4-cm-stejar-auriu-c24.md": {
	id: "dressing-colt-210.8336.4-cm-stejar-auriu-c24.md";
  slug: "dressing-colt-21083364-cm-stejar-auriu-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2130-cm-alb-c25.md": {
	id: "dressing-colt-251.2130-cm-alb-c25.md";
  slug: "dressing-colt-2512130-cm-alb-c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2130-cm-gri-c25.md": {
	id: "dressing-colt-251.2130-cm-gri-c25.md";
  slug: "dressing-colt-2512130-cm-gri-c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2130-cm-stejar-auriu-c25.md": {
	id: "dressing-colt-251.2130-cm-stejar-auriu-c25.md";
  slug: "dressing-colt-2512130-cm-stejar-auriu-c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2172-cm-alb-c26.md": {
	id: "dressing-colt-251.2172-cm-alb-c26.md";
  slug: "dressing-colt-2512172-cm-alb-c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2172-cm-gri-c26.md": {
	id: "dressing-colt-251.2172-cm-gri-c26.md";
  slug: "dressing-colt-2512172-cm-gri-c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2172-cm-stejar-auriu-c26.md": {
	id: "dressing-colt-251.2172-cm-stejar-auriu-c26.md";
  slug: "dressing-colt-2512172-cm-stejar-auriu-c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2213-cm-alb-c27.md": {
	id: "dressing-colt-251.2213-cm-alb-c27.md";
  slug: "dressing-colt-2512213-cm-alb-c27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2213-cm-gri-c27.md": {
	id: "dressing-colt-251.2213-cm-gri-c27.md";
  slug: "dressing-colt-2512213-cm-gri-c27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2213-cm-stejar-auriu-c27.md": {
	id: "dressing-colt-251.2213-cm-stejar-auriu-c27.md";
  slug: "dressing-colt-2512213-cm-stejar-auriu-c27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2216.8172-cm-alb-c34.md": {
	id: "dressing-colt-251.2216.8172-cm-alb-c34.md";
  slug: "dressing-colt-25122168172-cm-alb-c34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2216.8172-cm-gri-c34.md": {
	id: "dressing-colt-251.2216.8172-cm-gri-c34.md";
  slug: "dressing-colt-25122168172-cm-gri-c34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2216.8172-cm-stejar-auriu-c34.md": {
	id: "dressing-colt-251.2216.8172-cm-stejar-auriu-c34.md";
  slug: "dressing-colt-25122168172-cm-stejar-auriu-c34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2216.8253.4-cm-alb-c35.md": {
	id: "dressing-colt-251.2216.8253.4-cm-alb-c35.md";
  slug: "dressing-colt-251221682534-cm-alb-c35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2216.8253.4-cm-gri-c35.md": {
	id: "dressing-colt-251.2216.8253.4-cm-gri-c35.md";
  slug: "dressing-colt-251221682534-cm-gri-c35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2216.8253.4-cm-stejar-auriu-c35.md": {
	id: "dressing-colt-251.2216.8253.4-cm-stejar-auriu-c35.md";
  slug: "dressing-colt-251221682534-cm-stejar-auriu-c35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2258.8172-cm-alb-c38.md": {
	id: "dressing-colt-251.2258.8172-cm-alb-c38.md";
  slug: "dressing-colt-25122588172-cm-alb-c38";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2258.8172-cm-gri-c38.md": {
	id: "dressing-colt-251.2258.8172-cm-gri-c38.md";
  slug: "dressing-colt-25122588172-cm-gri-c38";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2258.8172-cm-stejar-auriu-c38.md": {
	id: "dressing-colt-251.2258.8172-cm-stejar-auriu-c38.md";
  slug: "dressing-colt-25122588172-cm-stejar-auriu-c38";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2336.4-cm-alb-c28.md": {
	id: "dressing-colt-251.2336.4-cm-alb-c28.md";
  slug: "dressing-colt-25123364-cm-alb-c28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2336.4-cm-gri-c28.md": {
	id: "dressing-colt-251.2336.4-cm-gri-c28.md";
  slug: "dressing-colt-25123364-cm-gri-c28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2336.4-cm-stejar-auriu-c28.md": {
	id: "dressing-colt-251.2336.4-cm-stejar-auriu-c28.md";
  slug: "dressing-colt-25123364-cm-stejar-auriu-c28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2340.2172-cm-alb-c36.md": {
	id: "dressing-colt-251.2340.2172-cm-alb-c36.md";
  slug: "dressing-colt-25123402172-cm-alb-c36";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2340.2172-cm-gri-c36.md": {
	id: "dressing-colt-251.2340.2172-cm-gri-c36.md";
  slug: "dressing-colt-25123402172-cm-gri-c36";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2340.2172-cm-stejar-auriu-c36.md": {
	id: "dressing-colt-251.2340.2172-cm-stejar-auriu-c36.md";
  slug: "dressing-colt-25123402172-cm-stejar-auriu-c36";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2340.2253.4-cm-alb-c37.md": {
	id: "dressing-colt-251.2340.2253.4-cm-alb-c37.md";
  slug: "dressing-colt-251234022534-cm-alb-c37";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2340.2253.4-cm-gri-c37.md": {
	id: "dressing-colt-251.2340.2253.4-cm-gri-c37.md";
  slug: "dressing-colt-251234022534-cm-gri-c37";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2340.2253.4-cm-stejar-auriu-c37.md": {
	id: "dressing-colt-251.2340.2253.4-cm-stejar-auriu-c37.md";
  slug: "dressing-colt-251234022534-cm-stejar-auriu-c37";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2377.4-cm-alb-c29.md": {
	id: "dressing-colt-251.2377.4-cm-alb-c29.md";
  slug: "dressing-colt-25123774-cm-alb-c29";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2377.4-cm-gri-c29.md": {
	id: "dressing-colt-251.2377.4-cm-gri-c29.md";
  slug: "dressing-colt-25123774-cm-gri-c29";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dressing-colt-251.2377.4-cm-stejar-auriu-c29.md": {
	id: "dressing-colt-251.2377.4-cm-stejar-auriu-c29.md";
  slug: "dressing-colt-25123774-cm-stejar-auriu-c29";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-0.44m-dormitor-soldat-bingo-f.md": {
	id: "dulap-0.44m-dormitor-soldat-bingo-f.md";
  slug: "dulap-044m-dormitor-soldat-bingo-f";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-0.51m-noce-gri.md": {
	id: "dulap-0.51m-noce-gri.md";
  slug: "dulap-051m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-0.51m-timea.md": {
	id: "dulap-0.51m-timea.md";
  slug: "dulap-051m-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-0.79m-noce-gri.md": {
	id: "dulap-0.79m-noce-gri.md";
  slug: "dulap-079m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-1.51m-noce-gri.md": {
	id: "dulap-1.51m-noce-gri.md";
  slug: "dulap-151m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-1.51m-timea.md": {
	id: "dulap-1.51m-timea.md";
  slug: "dulap-151m-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-1.79m-noce-gri.md": {
	id: "dulap-1.79m-noce-gri.md";
  slug: "dulap-179m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-1u-nuc-0.44m-solomon.md": {
	id: "dulap-1u-nuc-0.44m-solomon.md";
  slug: "dulap-1u-nuc-044m-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-2.3m-noce-gri.md": {
	id: "dulap-2.3m-noce-gri.md";
  slug: "dulap-23m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-2m-noce-gri.md": {
	id: "dulap-2m-noce-gri.md";
  slug: "dulap-2m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-3m-noce-gri.md": {
	id: "dulap-3m-noce-gri.md";
  slug: "dulap-3m-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-avangard-138-usi-albgri.md": {
	id: "dulap-avangard-138-usi-albgri.md";
  slug: "dulap-avangard-138-usi-albgri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-avangard-138-usi-gri.md": {
	id: "dulap-avangard-138-usi-gri.md";
  slug: "dulap-avangard-138-usi-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-avangard-138-usi-grioglinda.md": {
	id: "dulap-avangard-138-usi-grioglinda.md";
  slug: "dulap-avangard-138-usi-grioglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-avangard-184-usi-albgri.md": {
	id: "dulap-avangard-184-usi-albgri.md";
  slug: "dulap-avangard-184-usi-albgri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-avangard-184-usi-gri.md": {
	id: "dulap-avangard-184-usi-gri.md";
  slug: "dulap-avangard-184-usi-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-avangard-184-usi-grioglinda.md": {
	id: "dulap-avangard-184-usi-grioglinda.md";
  slug: "dulap-avangard-184-usi-grioglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb---c16401.md": {
	id: "dulap-benjamin-gri--alb---c16401.md";
  slug: "dulap-benjamin-gri--alb---c16401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c12401.md": {
	id: "dulap-benjamin-gri--alb--c12401.md";
  slug: "dulap-benjamin-gri--alb--c12401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c12402.md": {
	id: "dulap-benjamin-gri--alb--c12402.md";
  slug: "dulap-benjamin-gri--alb--c12402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c12403.md": {
	id: "dulap-benjamin-gri--alb--c12403.md";
  slug: "dulap-benjamin-gri--alb--c12403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c12404-cu-oglinda.md": {
	id: "dulap-benjamin-gri--alb--c12404-cu-oglinda.md";
  slug: "dulap-benjamin-gri--alb--c12404-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c12405.md": {
	id: "dulap-benjamin-gri--alb--c12405.md";
  slug: "dulap-benjamin-gri--alb--c12405";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16402.md": {
	id: "dulap-benjamin-gri--alb--c16402.md";
  slug: "dulap-benjamin-gri--alb--c16402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16403.md": {
	id: "dulap-benjamin-gri--alb--c16403.md";
  slug: "dulap-benjamin-gri--alb--c16403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16404-cu-oglinda.md": {
	id: "dulap-benjamin-gri--alb--c16404-cu-oglinda.md";
  slug: "dulap-benjamin-gri--alb--c16404-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16405-cu-oglinda.md": {
	id: "dulap-benjamin-gri--alb--c16405-cu-oglinda.md";
  slug: "dulap-benjamin-gri--alb--c16405-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16406-cu-oglinda.md": {
	id: "dulap-benjamin-gri--alb--c16406-cu-oglinda.md";
  slug: "dulap-benjamin-gri--alb--c16406-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16407.md": {
	id: "dulap-benjamin-gri--alb--c16407.md";
  slug: "dulap-benjamin-gri--alb--c16407";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16501-cu-oglinda.md": {
	id: "dulap-benjamin-gri--alb--c16501-cu-oglinda.md";
  slug: "dulap-benjamin-gri--alb--c16501-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16502.md": {
	id: "dulap-benjamin-gri--alb--c16502.md";
  slug: "dulap-benjamin-gri--alb--c16502";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c16503.md": {
	id: "dulap-benjamin-gri--alb--c16503.md";
  slug: "dulap-benjamin-gri--alb--c16503";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c41.md": {
	id: "dulap-benjamin-gri--alb--c41.md";
  slug: "dulap-benjamin-gri--alb--c41";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c8301.md": {
	id: "dulap-benjamin-gri--alb--c8301.md";
  slug: "dulap-benjamin-gri--alb--c8301";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c8302.md": {
	id: "dulap-benjamin-gri--alb--c8302.md";
  slug: "dulap-benjamin-gri--alb--c8302";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c8303.md": {
	id: "dulap-benjamin-gri--alb--c8303.md";
  slug: "dulap-benjamin-gri--alb--c8303";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c8304-cu-oglinda.md": {
	id: "dulap-benjamin-gri--alb--c8304-cu-oglinda.md";
  slug: "dulap-benjamin-gri--alb--c8304-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-benjamin-gri--alb--c8305.md": {
	id: "dulap-benjamin-gri--alb--c8305.md";
  slug: "dulap-benjamin-gri--alb--c8305";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-bingo-f-dressing-3-usi-glisante.md": {
	id: "dulap-bingo-f-dressing-3-usi-glisante.md";
  slug: "dulap-bingo-f-dressing-3-usi-glisante";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-casmir--alb-0.51m-soares.md": {
	id: "dulap-casmir--alb-0.51m-soares.md";
  slug: "dulap-casmir--alb-051m-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-casmir--alb-1.51m-soares.md": {
	id: "dulap-casmir--alb-1.51m-soares.md";
  slug: "dulap-casmir--alb-151m-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-casmir--alb-2.3m-soares.md": {
	id: "dulap-casmir--alb-2.3m-soares.md";
  slug: "dulap-casmir--alb-23m-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-casmir--alb-2m-soares.md": {
	id: "dulap-casmir--alb-2m-soares.md";
  slug: "dulap-casmir--alb-2m-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c12401.md": {
	id: "dulap-class-alb---c12401.md";
  slug: "dulap-class-alb---c12401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c12402.md": {
	id: "dulap-class-alb---c12402.md";
  slug: "dulap-class-alb---c12402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c16401.md": {
	id: "dulap-class-alb---c16401.md";
  slug: "dulap-class-alb---c16401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c16402.md": {
	id: "dulap-class-alb---c16402.md";
  slug: "dulap-class-alb---c16402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c16403.md": {
	id: "dulap-class-alb---c16403.md";
  slug: "dulap-class-alb---c16403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c8301.md": {
	id: "dulap-class-alb---c8301.md";
  slug: "dulap-class-alb---c8301";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb---c8302.md": {
	id: "dulap-class-alb---c8302.md";
  slug: "dulap-class-alb---c8302";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c12403.md": {
	id: "dulap-class-alb-cu-oglinda---c12403.md";
  slug: "dulap-class-alb-cu-oglinda---c12403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c12404.md": {
	id: "dulap-class-alb-cu-oglinda---c12404.md";
  slug: "dulap-class-alb-cu-oglinda---c12404";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c16404.md": {
	id: "dulap-class-alb-cu-oglinda---c16404.md";
  slug: "dulap-class-alb-cu-oglinda---c16404";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c16405.md": {
	id: "dulap-class-alb-cu-oglinda---c16405.md";
  slug: "dulap-class-alb-cu-oglinda---c16405";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c16406.md": {
	id: "dulap-class-alb-cu-oglinda---c16406.md";
  slug: "dulap-class-alb-cu-oglinda---c16406";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c8303.md": {
	id: "dulap-class-alb-cu-oglinda---c8303.md";
  slug: "dulap-class-alb-cu-oglinda---c8303";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-class-alb-cu-oglinda---c8304.md": {
	id: "dulap-class-alb-cu-oglinda---c8304.md";
  slug: "dulap-class-alb-cu-oglinda---c8304";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-dormitor-3u-nuc--casmir-solomon.md": {
	id: "dulap-dormitor-3u-nuc--casmir-solomon.md";
  slug: "dulap-dormitor-3u-nuc--casmir-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-dormitor-mario-1u-cu-oglinda.md": {
	id: "dulap-dormitor-mario-1u-cu-oglinda.md";
  slug: "dulap-dormitor-mario-1u-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-dormitor-mario-1u.md": {
	id: "dulap-dormitor-mario-1u.md";
  slug: "dulap-dormitor-mario-1u";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-dormitor-mario-3u.md": {
	id: "dulap-dormitor-mario-3u.md";
  slug: "dulap-dormitor-mario-3u";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-dormitor-mario-4u.md": {
	id: "dulap-dormitor-mario-4u.md";
  slug: "dulap-dormitor-mario-4u";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-douglas-4u.md": {
	id: "dulap-douglas-4u.md";
  slug: "dulap-douglas-4u";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-138-usi-albstejar-k02.md": {
	id: "dulap-forest-138-usi-albstejar-k02.md";
  slug: "dulap-forest-138-usi-albstejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-138-usi-gristejar-k02.md": {
	id: "dulap-forest-138-usi-gristejar-k02.md";
  slug: "dulap-forest-138-usi-gristejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-138-usi-oglindastejar-k02.md": {
	id: "dulap-forest-138-usi-oglindastejar-k02.md";
  slug: "dulap-forest-138-usi-oglindastejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-138-usi-stejar-k02.md": {
	id: "dulap-forest-138-usi-stejar-k02.md";
  slug: "dulap-forest-138-usi-stejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-184-usi-albstejar-k02.md": {
	id: "dulap-forest-184-usi-albstejar-k02.md";
  slug: "dulap-forest-184-usi-albstejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-184-usi-gristejar-k02.md": {
	id: "dulap-forest-184-usi-gristejar-k02.md";
  slug: "dulap-forest-184-usi-gristejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-184-usi-oglindastejar-k02.md": {
	id: "dulap-forest-184-usi-oglindastejar-k02.md";
  slug: "dulap-forest-184-usi-oglindastejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-forest-184-usi-stejar-k02.md": {
	id: "dulap-forest-184-usi-stejar-k02.md";
  slug: "dulap-forest-184-usi-stejar-k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c12401.md": {
	id: "dulap-grafit-grialb---c12401.md";
  slug: "dulap-grafit-grialb---c12401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c12402.md": {
	id: "dulap-grafit-grialb---c12402.md";
  slug: "dulap-grafit-grialb---c12402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c16401.md": {
	id: "dulap-grafit-grialb---c16401.md";
  slug: "dulap-grafit-grialb---c16401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c16402.md": {
	id: "dulap-grafit-grialb---c16402.md";
  slug: "dulap-grafit-grialb---c16402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c16403.md": {
	id: "dulap-grafit-grialb---c16403.md";
  slug: "dulap-grafit-grialb---c16403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c8301.md": {
	id: "dulap-grafit-grialb---c8301.md";
  slug: "dulap-grafit-grialb---c8301";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb---c8302.md": {
	id: "dulap-grafit-grialb---c8302.md";
  slug: "dulap-grafit-grialb---c8302";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c12403.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c12403.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c12403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c12404.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c12404.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c12404";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c16404.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c16404.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c16404";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c16405.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c16405.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c16405";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c16406.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c16406.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c16406";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c8303.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c8303.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c8303";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-grafit-grialb-cu-oglinda---c8304.md": {
	id: "dulap-grafit-grialb-cu-oglinda---c8304.md";
  slug: "dulap-grafit-grialb-cu-oglinda---c8304";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-haine-azur.md": {
	id: "dulap-haine-azur.md";
  slug: "dulap-haine-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-haine-belo.md": {
	id: "dulap-haine-belo.md";
  slug: "dulap-haine-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-haine-melo---modul-h.md": {
	id: "dulap-haine-melo---modul-h.md";
  slug: "dulap-haine-melo---modul-h";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-haine-nori.md": {
	id: "dulap-haine-nori.md";
  slug: "dulap-haine-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-haine-sori.md": {
	id: "dulap-haine-sori.md";
  slug: "dulap-haine-sori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-noel-4-usi-cu-oglinda---albstejar-k005.md": {
	id: "dulap-noel-4-usi-cu-oglinda---albstejar-k005.md";
  slug: "dulap-noel-4-usi-cu-oglinda---albstejar-k005";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-noel-4-usi-cu-oglinda---gristejar-k005.md": {
	id: "dulap-noel-4-usi-cu-oglinda---gristejar-k005.md";
  slug: "dulap-noel-4-usi-cu-oglinda---gristejar-k005";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-138-oglinda.md": {
	id: "dulap-nordis-138-oglinda.md";
  slug: "dulap-nordis-138-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-138-usi-albe.md": {
	id: "dulap-nordis-138-usi-albe.md";
  slug: "dulap-nordis-138-usi-albe";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-138-usi-alboglinda.md": {
	id: "dulap-nordis-138-usi-alboglinda.md";
  slug: "dulap-nordis-138-usi-alboglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-138-usi-oglindaalb.md": {
	id: "dulap-nordis-138-usi-oglindaalb.md";
  slug: "dulap-nordis-138-usi-oglindaalb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-184-oglinda.md": {
	id: "dulap-nordis-184-oglinda.md";
  slug: "dulap-nordis-184-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-184-usi-albe.md": {
	id: "dulap-nordis-184-usi-albe.md";
  slug: "dulap-nordis-184-usi-albe";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-184-usi-alboglinda.md": {
	id: "dulap-nordis-184-usi-alboglinda.md";
  slug: "dulap-nordis-184-usi-alboglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-184-usi-oglindaalb.md": {
	id: "dulap-nordis-184-usi-oglindaalb.md";
  slug: "dulap-nordis-184-usi-oglindaalb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-210-oglinda.md": {
	id: "dulap-nordis-210-oglinda.md";
  slug: "dulap-nordis-210-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-210-usi-albe.md": {
	id: "dulap-nordis-210-usi-albe.md";
  slug: "dulap-nordis-210-usi-albe";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-210-usi-alboglinda.md": {
	id: "dulap-nordis-210-usi-alboglinda.md";
  slug: "dulap-nordis-210-usi-alboglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-210-usi-oglindaalb.md": {
	id: "dulap-nordis-210-usi-oglindaalb.md";
  slug: "dulap-nordis-210-usi-oglindaalb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-256-oglinda.md": {
	id: "dulap-nordis-256-oglinda.md";
  slug: "dulap-nordis-256-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-256-usi-albe.md": {
	id: "dulap-nordis-256-usi-albe.md";
  slug: "dulap-nordis-256-usi-albe";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-256-usi-alboglinda.md": {
	id: "dulap-nordis-256-usi-alboglinda.md";
  slug: "dulap-nordis-256-usi-alboglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-256-usi-oglindaalb.md": {
	id: "dulap-nordis-256-usi-oglindaalb.md";
  slug: "dulap-nordis-256-usi-oglindaalb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-alb-cu-polite.md": {
	id: "dulap-nordis-alb-cu-polite.md";
  slug: "dulap-nordis-alb-cu-polite";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-nordis-soldat-alb.md": {
	id: "dulap-nordis-soldat-alb.md";
  slug: "dulap-nordis-soldat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c12401.md": {
	id: "dulap-relax-alb--stejar-k02---c12401.md";
  slug: "dulap-relax-alb--stejar-k02---c12401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c12402.md": {
	id: "dulap-relax-alb--stejar-k02---c12402.md";
  slug: "dulap-relax-alb--stejar-k02---c12402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c12403.md": {
	id: "dulap-relax-alb--stejar-k02---c12403.md";
  slug: "dulap-relax-alb--stejar-k02---c12403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c12404.md": {
	id: "dulap-relax-alb--stejar-k02---c12404.md";
  slug: "dulap-relax-alb--stejar-k02---c12404";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c12405-cu-oglinda.md": {
	id: "dulap-relax-alb--stejar-k02---c12405-cu-oglinda.md";
  slug: "dulap-relax-alb--stejar-k02---c12405-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16401.md": {
	id: "dulap-relax-alb--stejar-k02---c16401.md";
  slug: "dulap-relax-alb--stejar-k02---c16401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16402.md": {
	id: "dulap-relax-alb--stejar-k02---c16402.md";
  slug: "dulap-relax-alb--stejar-k02---c16402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16403.md": {
	id: "dulap-relax-alb--stejar-k02---c16403.md";
  slug: "dulap-relax-alb--stejar-k02---c16403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16404.md": {
	id: "dulap-relax-alb--stejar-k02---c16404.md";
  slug: "dulap-relax-alb--stejar-k02---c16404";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16405-cu-oglinda.md": {
	id: "dulap-relax-alb--stejar-k02---c16405-cu-oglinda.md";
  slug: "dulap-relax-alb--stejar-k02---c16405-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16406-cu-oglinda.md": {
	id: "dulap-relax-alb--stejar-k02---c16406-cu-oglinda.md";
  slug: "dulap-relax-alb--stejar-k02---c16406-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16407-cu-oglinda.md": {
	id: "dulap-relax-alb--stejar-k02---c16407-cu-oglinda.md";
  slug: "dulap-relax-alb--stejar-k02---c16407-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16501.md": {
	id: "dulap-relax-alb--stejar-k02---c16501.md";
  slug: "dulap-relax-alb--stejar-k02---c16501";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16502.md": {
	id: "dulap-relax-alb--stejar-k02---c16502.md";
  slug: "dulap-relax-alb--stejar-k02---c16502";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c16503-cu-oglinda.md": {
	id: "dulap-relax-alb--stejar-k02---c16503-cu-oglinda.md";
  slug: "dulap-relax-alb--stejar-k02---c16503-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c41.md": {
	id: "dulap-relax-alb--stejar-k02---c41.md";
  slug: "dulap-relax-alb--stejar-k02---c41";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c8301.md": {
	id: "dulap-relax-alb--stejar-k02---c8301.md";
  slug: "dulap-relax-alb--stejar-k02---c8301";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c8302.md": {
	id: "dulap-relax-alb--stejar-k02---c8302.md";
  slug: "dulap-relax-alb--stejar-k02---c8302";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c8303.md": {
	id: "dulap-relax-alb--stejar-k02---c8303.md";
  slug: "dulap-relax-alb--stejar-k02---c8303";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c8304.md": {
	id: "dulap-relax-alb--stejar-k02---c8304.md";
  slug: "dulap-relax-alb--stejar-k02---c8304";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-relax-alb--stejar-k02---c8305-cu-oglinda.md": {
	id: "dulap-relax-alb--stejar-k02---c8305-cu-oglinda.md";
  slug: "dulap-relax-alb--stejar-k02---c8305-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c12401.md": {
	id: "dulap-snow-alb---c12401.md";
  slug: "dulap-snow-alb---c12401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c12402.md": {
	id: "dulap-snow-alb---c12402.md";
  slug: "dulap-snow-alb---c12402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c12403-cu-oglinda.md": {
	id: "dulap-snow-alb---c12403-cu-oglinda.md";
  slug: "dulap-snow-alb---c12403-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16401.md": {
	id: "dulap-snow-alb---c16401.md";
  slug: "dulap-snow-alb---c16401";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16402.md": {
	id: "dulap-snow-alb---c16402.md";
  slug: "dulap-snow-alb---c16402";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16403.md": {
	id: "dulap-snow-alb---c16403.md";
  slug: "dulap-snow-alb---c16403";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16404-cu-oglinda.md": {
	id: "dulap-snow-alb---c16404-cu-oglinda.md";
  slug: "dulap-snow-alb---c16404-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16405-cu-oglinda.md": {
	id: "dulap-snow-alb---c16405-cu-oglinda.md";
  slug: "dulap-snow-alb---c16405-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16406-cu-oglinda.md": {
	id: "dulap-snow-alb---c16406-cu-oglinda.md";
  slug: "dulap-snow-alb---c16406-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16501.md": {
	id: "dulap-snow-alb---c16501.md";
  slug: "dulap-snow-alb---c16501";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c16502-cu-oglinda.md": {
	id: "dulap-snow-alb---c16502-cu-oglinda.md";
  slug: "dulap-snow-alb---c16502-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c41.md": {
	id: "dulap-snow-alb---c41.md";
  slug: "dulap-snow-alb---c41";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c8301.md": {
	id: "dulap-snow-alb---c8301.md";
  slug: "dulap-snow-alb---c8301";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c8302.md": {
	id: "dulap-snow-alb---c8302.md";
  slug: "dulap-snow-alb---c8302";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"dulap-snow-alb---c8303-cu-oglinda.md": {
	id: "dulap-snow-alb---c8303-cu-oglinda.md";
  slug: "dulap-snow-alb---c8303-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-bar.md": {
	id: "fotoliu-bar.md";
  slug: "fotoliu-bar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-albastru.md": {
	id: "fotoliu-barini-albastru.md";
  slug: "fotoliu-barini-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-crem.md": {
	id: "fotoliu-barini-crem.md";
  slug: "fotoliu-barini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-gri-antracit.md": {
	id: "fotoliu-barini-gri-antracit.md";
  slug: "fotoliu-barini-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-gri-deschis.md": {
	id: "fotoliu-barini-gri-deschis.md";
  slug: "fotoliu-barini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-portocaliu.md": {
	id: "fotoliu-barini-portocaliu.md";
  slug: "fotoliu-barini-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-roze.md": {
	id: "fotoliu-barini-roze.md";
  slug: "fotoliu-barini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-barini-verde.md": {
	id: "fotoliu-barini-verde.md";
  slug: "fotoliu-barini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-albastru.md": {
	id: "fotoliu-biano-albastru.md";
  slug: "fotoliu-biano-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-crem.md": {
	id: "fotoliu-biano-crem.md";
  slug: "fotoliu-biano-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-gri-antracit.md": {
	id: "fotoliu-biano-gri-antracit.md";
  slug: "fotoliu-biano-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-gri-deschis.md": {
	id: "fotoliu-biano-gri-deschis.md";
  slug: "fotoliu-biano-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-maro.md": {
	id: "fotoliu-biano-maro.md";
  slug: "fotoliu-biano-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-portocaliu.md": {
	id: "fotoliu-biano-portocaliu.md";
  slug: "fotoliu-biano-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-roze.md": {
	id: "fotoliu-biano-roze.md";
  slug: "fotoliu-biano-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-biano-verde.md": {
	id: "fotoliu-biano-verde.md";
  slug: "fotoliu-biano-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-albastru.md": {
	id: "fotoliu-camila-albastru.md";
  slug: "fotoliu-camila-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-crem.md": {
	id: "fotoliu-camila-crem.md";
  slug: "fotoliu-camila-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-gri-antracit--gri-deschis.md": {
	id: "fotoliu-camila-gri-antracit--gri-deschis.md";
  slug: "fotoliu-camila-gri-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-gri-deschis.md": {
	id: "fotoliu-camila-gri-deschis.md";
  slug: "fotoliu-camila-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-maro--crem.md": {
	id: "fotoliu-camila-maro--crem.md";
  slug: "fotoliu-camila-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-portocaliu.md": {
	id: "fotoliu-camila-portocaliu.md";
  slug: "fotoliu-camila-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-roze.md": {
	id: "fotoliu-camila-roze.md";
  slug: "fotoliu-camila-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-camila-verde.md": {
	id: "fotoliu-camila-verde.md";
  slug: "fotoliu-camila-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ema-crem--maro.md": {
	id: "fotoliu-ema-crem--maro.md";
  slug: "fotoliu-ema-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ema-crem.md": {
	id: "fotoliu-ema-crem.md";
  slug: "fotoliu-ema-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ema-gri-deschis--gri.md": {
	id: "fotoliu-ema-gri-deschis--gri.md";
  slug: "fotoliu-ema-gri-deschis--gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ema-gri-deschis.md": {
	id: "fotoliu-ema-gri-deschis.md";
  slug: "fotoliu-ema-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ema-gri.md": {
	id: "fotoliu-ema-gri.md";
  slug: "fotoliu-ema-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ema-maro.md": {
	id: "fotoliu-ema-maro.md";
  slug: "fotoliu-ema-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-albastru.md": {
	id: "fotoliu-ivy-albastru.md";
  slug: "fotoliu-ivy-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-crem--maro.md": {
	id: "fotoliu-ivy-crem--maro.md";
  slug: "fotoliu-ivy-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-gri-antracit.md": {
	id: "fotoliu-ivy-gri-antracit.md";
  slug: "fotoliu-ivy-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-gri-deschis--gri-antracit.md": {
	id: "fotoliu-ivy-gri-deschis--gri-antracit.md";
  slug: "fotoliu-ivy-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-portocaliu.md": {
	id: "fotoliu-ivy-portocaliu.md";
  slug: "fotoliu-ivy-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-roze.md": {
	id: "fotoliu-ivy-roze.md";
  slug: "fotoliu-ivy-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-verde.md": {
	id: "fotoliu-ivy-verde.md";
  slug: "fotoliu-ivy-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-ivy-whisper-17.md": {
	id: "fotoliu-ivy-whisper-17.md";
  slug: "fotoliu-ivy-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-albastru.md": {
	id: "fotoliu-julia-albastru.md";
  slug: "fotoliu-julia-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-crem--maro.md": {
	id: "fotoliu-julia-crem--maro.md";
  slug: "fotoliu-julia-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-crem.md": {
	id: "fotoliu-julia-crem.md";
  slug: "fotoliu-julia-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-gri-deschis--gri-antracit.md": {
	id: "fotoliu-julia-gri-deschis--gri-antracit.md";
  slug: "fotoliu-julia-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-gri-deschis.md": {
	id: "fotoliu-julia-gri-deschis.md";
  slug: "fotoliu-julia-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-maro--crem.md": {
	id: "fotoliu-julia-maro--crem.md";
  slug: "fotoliu-julia-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-maro.md": {
	id: "fotoliu-julia-maro.md";
  slug: "fotoliu-julia-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-portocaliu.md": {
	id: "fotoliu-julia-portocaliu.md";
  slug: "fotoliu-julia-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-roze.md": {
	id: "fotoliu-julia-roze.md";
  slug: "fotoliu-julia-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-julia-verde.md": {
	id: "fotoliu-julia-verde.md";
  slug: "fotoliu-julia-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-albastru.md": {
	id: "fotoliu-mini-albastru.md";
  slug: "fotoliu-mini-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-crem--maro.md": {
	id: "fotoliu-mini-crem--maro.md";
  slug: "fotoliu-mini-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-crem.md": {
	id: "fotoliu-mini-crem.md";
  slug: "fotoliu-mini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-gri-deschis--gri-antracit.md": {
	id: "fotoliu-mini-gri-deschis--gri-antracit.md";
  slug: "fotoliu-mini-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-gri-deschis.md": {
	id: "fotoliu-mini-gri-deschis.md";
  slug: "fotoliu-mini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-portocaliu.md": {
	id: "fotoliu-mini-portocaliu.md";
  slug: "fotoliu-mini-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-roze.md": {
	id: "fotoliu-mini-roze.md";
  slug: "fotoliu-mini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini-verde.md": {
	id: "fotoliu-mini-verde.md";
  slug: "fotoliu-mini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-mini.md": {
	id: "fotoliu-mini.md";
  slug: "fotoliu-mini";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-albastru.md": {
	id: "fotoliu-nova-albastru.md";
  slug: "fotoliu-nova-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-crem--maro.md": {
	id: "fotoliu-nova-crem--maro.md";
  slug: "fotoliu-nova-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-crem.md": {
	id: "fotoliu-nova-crem.md";
  slug: "fotoliu-nova-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-gri-deschis--gri-antracit.md": {
	id: "fotoliu-nova-gri-deschis--gri-antracit.md";
  slug: "fotoliu-nova-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-gri-deschis.md": {
	id: "fotoliu-nova-gri-deschis.md";
  slug: "fotoliu-nova-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-portocaliu.md": {
	id: "fotoliu-nova-portocaliu.md";
  slug: "fotoliu-nova-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-roze.md": {
	id: "fotoliu-nova-roze.md";
  slug: "fotoliu-nova-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-nova-verde.md": {
	id: "fotoliu-nova-verde.md";
  slug: "fotoliu-nova-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-albastru.md": {
	id: "fotoliu-olimp-albastru.md";
  slug: "fotoliu-olimp-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-crem.md": {
	id: "fotoliu-olimp-crem.md";
  slug: "fotoliu-olimp-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-gri-antracit.md": {
	id: "fotoliu-olimp-gri-antracit.md";
  slug: "fotoliu-olimp-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-gri-deschis.md": {
	id: "fotoliu-olimp-gri-deschis.md";
  slug: "fotoliu-olimp-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-maro.md": {
	id: "fotoliu-olimp-maro.md";
  slug: "fotoliu-olimp-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-portocaliu.md": {
	id: "fotoliu-olimp-portocaliu.md";
  slug: "fotoliu-olimp-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-roze.md": {
	id: "fotoliu-olimp-roze.md";
  slug: "fotoliu-olimp-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-olimp-verde.md": {
	id: "fotoliu-olimp-verde.md";
  slug: "fotoliu-olimp-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-albastru.md": {
	id: "fotoliu-quinn-albastru.md";
  slug: "fotoliu-quinn-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-crem--maro.md": {
	id: "fotoliu-quinn-crem--maro.md";
  slug: "fotoliu-quinn-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-crem.md": {
	id: "fotoliu-quinn-crem.md";
  slug: "fotoliu-quinn-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-gri-deschis--gri-antracit.md": {
	id: "fotoliu-quinn-gri-deschis--gri-antracit.md";
  slug: "fotoliu-quinn-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-portocaliu.md": {
	id: "fotoliu-quinn-portocaliu.md";
  slug: "fotoliu-quinn-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-roze.md": {
	id: "fotoliu-quinn-roze.md";
  slug: "fotoliu-quinn-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-verde.md": {
	id: "fotoliu-quinn-verde.md";
  slug: "fotoliu-quinn-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-quinn-whisper-17.md": {
	id: "fotoliu-quinn-whisper-17.md";
  slug: "fotoliu-quinn-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-cappuccino.md": {
	id: "fotoliu-rici-cappuccino.md";
  slug: "fotoliu-rici-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-crem.md": {
	id: "fotoliu-rici-crem.md";
  slug: "fotoliu-rici-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-gri-deschis.md": {
	id: "fotoliu-rici-gri-deschis.md";
  slug: "fotoliu-rici-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-gri-inchis.md": {
	id: "fotoliu-rici-gri-inchis.md";
  slug: "fotoliu-rici-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-maro.md": {
	id: "fotoliu-rici-maro.md";
  slug: "fotoliu-rici-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-roze.md": {
	id: "fotoliu-rici-roze.md";
  slug: "fotoliu-rici-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-turcoaz.md": {
	id: "fotoliu-rici-turcoaz.md";
  slug: "fotoliu-rici-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-rici-verde.md": {
	id: "fotoliu-rici-verde.md";
  slug: "fotoliu-rici-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-albastru.md": {
	id: "fotoliu-roma-albastru.md";
  slug: "fotoliu-roma-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-gri-antracit.md": {
	id: "fotoliu-roma-gri-antracit.md";
  slug: "fotoliu-roma-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-gri-deschis.md": {
	id: "fotoliu-roma-gri-deschis.md";
  slug: "fotoliu-roma-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-maro.md": {
	id: "fotoliu-roma-maro.md";
  slug: "fotoliu-roma-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-portocaliu.md": {
	id: "fotoliu-roma-portocaliu.md";
  slug: "fotoliu-roma-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-roze.md": {
	id: "fotoliu-roma-roze.md";
  slug: "fotoliu-roma-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-verde.md": {
	id: "fotoliu-roma-verde.md";
  slug: "fotoliu-roma-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-roma-whisper-2.md": {
	id: "fotoliu-roma-whisper-2.md";
  slug: "fotoliu-roma-whisper-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-cappuccino.md": {
	id: "fotoliu-vibe-cappuccino.md";
  slug: "fotoliu-vibe-cappuccino";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-crem.md": {
	id: "fotoliu-vibe-crem.md";
  slug: "fotoliu-vibe-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-gri-deschis.md": {
	id: "fotoliu-vibe-gri-deschis.md";
  slug: "fotoliu-vibe-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-gri-inchis.md": {
	id: "fotoliu-vibe-gri-inchis.md";
  slug: "fotoliu-vibe-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-maro.md": {
	id: "fotoliu-vibe-maro.md";
  slug: "fotoliu-vibe-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-roze.md": {
	id: "fotoliu-vibe-roze.md";
  slug: "fotoliu-vibe-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-turcoaz.md": {
	id: "fotoliu-vibe-turcoaz.md";
  slug: "fotoliu-vibe-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"fotoliu-vibe-verde.md": {
	id: "fotoliu-vibe-verde.md";
  slug: "fotoliu-vibe-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c01---mobila-sufragerie.md": {
	id: "living-azur-c01---mobila-sufragerie.md";
  slug: "living-azur-c01---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c02---mobila-sufragerie.md": {
	id: "living-azur-c02---mobila-sufragerie.md";
  slug: "living-azur-c02---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c03---mobila-sufragerie.md": {
	id: "living-azur-c03---mobila-sufragerie.md";
  slug: "living-azur-c03---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c04---mobila-sufragerie.md": {
	id: "living-azur-c04---mobila-sufragerie.md";
  slug: "living-azur-c04---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c05---mobila-sufragerie.md": {
	id: "living-azur-c05---mobila-sufragerie.md";
  slug: "living-azur-c05---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c06---mobila-sufragerie.md": {
	id: "living-azur-c06---mobila-sufragerie.md";
  slug: "living-azur-c06---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c07---mobila-sufragerie.md": {
	id: "living-azur-c07---mobila-sufragerie.md";
  slug: "living-azur-c07---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c08---mobila-sufragerie.md": {
	id: "living-azur-c08---mobila-sufragerie.md";
  slug: "living-azur-c08---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c09---mobila-sufragerie.md": {
	id: "living-azur-c09---mobila-sufragerie.md";
  slug: "living-azur-c09---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c10---mobila-sufragerie.md": {
	id: "living-azur-c10---mobila-sufragerie.md";
  slug: "living-azur-c10---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c11---mobila-sufragerie.md": {
	id: "living-azur-c11---mobila-sufragerie.md";
  slug: "living-azur-c11---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c12---mobila-sufragerie.md": {
	id: "living-azur-c12---mobila-sufragerie.md";
  slug: "living-azur-c12---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c13---mobila-sufragerie.md": {
	id: "living-azur-c13---mobila-sufragerie.md";
  slug: "living-azur-c13---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c14---mobila-sufragerie.md": {
	id: "living-azur-c14---mobila-sufragerie.md";
  slug: "living-azur-c14---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-azur-c15---mobila-sufragerie.md": {
	id: "living-azur-c15---mobila-sufragerie.md";
  slug: "living-azur-c15---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-balance-configuratia-1.md": {
	id: "living-balance-configuratia-1.md";
  slug: "living-balance-configuratia-1";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-balance-configuratia-2.md": {
	id: "living-balance-configuratia-2.md";
  slug: "living-balance-configuratia-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-balance-configuratia-3.md": {
	id: "living-balance-configuratia-3.md";
  slug: "living-balance-configuratia-3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-balance-configuratia-4.md": {
	id: "living-balance-configuratia-4.md";
  slug: "living-balance-configuratia-4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-balance-configuratia-5.md": {
	id: "living-balance-configuratia-5.md";
  slug: "living-balance-configuratia-5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-balance-configuratia-6.md": {
	id: "living-balance-configuratia-6.md";
  slug: "living-balance-configuratia-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c01---mobila-sufragerie.md": {
	id: "living-belo-c01---mobila-sufragerie.md";
  slug: "living-belo-c01---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c02---mobila-sufragerie.md": {
	id: "living-belo-c02---mobila-sufragerie.md";
  slug: "living-belo-c02---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c03---mobila-sufragerie.md": {
	id: "living-belo-c03---mobila-sufragerie.md";
  slug: "living-belo-c03---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c04---mobila-sufragerie.md": {
	id: "living-belo-c04---mobila-sufragerie.md";
  slug: "living-belo-c04---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c05---mobila-sufragerie.md": {
	id: "living-belo-c05---mobila-sufragerie.md";
  slug: "living-belo-c05---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c06---mobila-sufragerie.md": {
	id: "living-belo-c06---mobila-sufragerie.md";
  slug: "living-belo-c06---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c07---mobila-sufragerie.md": {
	id: "living-belo-c07---mobila-sufragerie.md";
  slug: "living-belo-c07---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c08---mobila-sufragerie.md": {
	id: "living-belo-c08---mobila-sufragerie.md";
  slug: "living-belo-c08---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c09---mobila-sufragerie.md": {
	id: "living-belo-c09---mobila-sufragerie.md";
  slug: "living-belo-c09---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c10---mobila-sufragerie.md": {
	id: "living-belo-c10---mobila-sufragerie.md";
  slug: "living-belo-c10---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c11---mobila-sufragerie.md": {
	id: "living-belo-c11---mobila-sufragerie.md";
  slug: "living-belo-c11---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c12---mobila-sufragerie.md": {
	id: "living-belo-c12---mobila-sufragerie.md";
  slug: "living-belo-c12---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c13---mobila-sufragerie.md": {
	id: "living-belo-c13---mobila-sufragerie.md";
  slug: "living-belo-c13---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-belo-c14---mobila-sufragerie.md": {
	id: "living-belo-c14---mobila-sufragerie.md";
  slug: "living-belo-c14---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c1---mobila-sufragerie.md": {
	id: "living-melo-c1---mobila-sufragerie.md";
  slug: "living-melo-c1---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c1-duo---mobila-sufragerie.md": {
	id: "living-melo-c1-duo---mobila-sufragerie.md";
  slug: "living-melo-c1-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c1-uno---mobila-sufragerie.md": {
	id: "living-melo-c1-uno---mobila-sufragerie.md";
  slug: "living-melo-c1-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c2---mobila-sufragerie.md": {
	id: "living-melo-c2---mobila-sufragerie.md";
  slug: "living-melo-c2---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c2-duo---mobila-sufragerie.md": {
	id: "living-melo-c2-duo---mobila-sufragerie.md";
  slug: "living-melo-c2-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c2-uno---mobila-sufragerie.md": {
	id: "living-melo-c2-uno---mobila-sufragerie.md";
  slug: "living-melo-c2-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c3---mobila-sufragerie.md": {
	id: "living-melo-c3---mobila-sufragerie.md";
  slug: "living-melo-c3---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c3-duo---mobila-sufragerie.md": {
	id: "living-melo-c3-duo---mobila-sufragerie.md";
  slug: "living-melo-c3-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c3-uno---mobila-sufragerie.md": {
	id: "living-melo-c3-uno---mobila-sufragerie.md";
  slug: "living-melo-c3-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c4---mobila-sufragerie.md": {
	id: "living-melo-c4---mobila-sufragerie.md";
  slug: "living-melo-c4---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c4-duo---mobila-sufragerie.md": {
	id: "living-melo-c4-duo---mobila-sufragerie.md";
  slug: "living-melo-c4-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-melo-c4-uno---mobila-sufragerie.md": {
	id: "living-melo-c4-uno---mobila-sufragerie.md";
  slug: "living-melo-c4-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c01---mobila-sufragerie.md": {
	id: "living-nori-c01---mobila-sufragerie.md";
  slug: "living-nori-c01---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c02---mobila-sufragerie.md": {
	id: "living-nori-c02---mobila-sufragerie.md";
  slug: "living-nori-c02---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c03---mobila-sufragerie.md": {
	id: "living-nori-c03---mobila-sufragerie.md";
  slug: "living-nori-c03---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c04---mobila-sufragerie.md": {
	id: "living-nori-c04---mobila-sufragerie.md";
  slug: "living-nori-c04---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c05---mobila-sufragerie.md": {
	id: "living-nori-c05---mobila-sufragerie.md";
  slug: "living-nori-c05---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c06---mobila-sufragerie.md": {
	id: "living-nori-c06---mobila-sufragerie.md";
  slug: "living-nori-c06---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c07---mobila-sufragerie.md": {
	id: "living-nori-c07---mobila-sufragerie.md";
  slug: "living-nori-c07---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c08---mobila-sufragerie.md": {
	id: "living-nori-c08---mobila-sufragerie.md";
  slug: "living-nori-c08---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c09---mobila-sufragerie.md": {
	id: "living-nori-c09---mobila-sufragerie.md";
  slug: "living-nori-c09---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c10---mobila-sufragerie.md": {
	id: "living-nori-c10---mobila-sufragerie.md";
  slug: "living-nori-c10---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c11---mobila-sufragerie.md": {
	id: "living-nori-c11---mobila-sufragerie.md";
  slug: "living-nori-c11---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c12---mobila-sufragerie.md": {
	id: "living-nori-c12---mobila-sufragerie.md";
  slug: "living-nori-c12---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c13---mobila-sufragerie.md": {
	id: "living-nori-c13---mobila-sufragerie.md";
  slug: "living-nori-c13---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c14---mobila-sufragerie.md": {
	id: "living-nori-c14---mobila-sufragerie.md";
  slug: "living-nori-c14---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-nori-c15---mobila-sufragerie.md": {
	id: "living-nori-c15---mobila-sufragerie.md";
  slug: "living-nori-c15---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c1---mobila-sufragerie.md": {
	id: "living-ontario-c1---mobila-sufragerie.md";
  slug: "living-ontario-c1---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c1-duo---mobila-sufragerie.md": {
	id: "living-ontario-c1-duo---mobila-sufragerie.md";
  slug: "living-ontario-c1-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c1-uno---mobila-sufragerie.md": {
	id: "living-ontario-c1-uno---mobila-sufragerie.md";
  slug: "living-ontario-c1-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c2---mobila-sufragerie.md": {
	id: "living-ontario-c2---mobila-sufragerie.md";
  slug: "living-ontario-c2---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c2-duo---mobila-sufragerie.md": {
	id: "living-ontario-c2-duo---mobila-sufragerie.md";
  slug: "living-ontario-c2-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c2-uno---mobila-sufragerie.md": {
	id: "living-ontario-c2-uno---mobila-sufragerie.md";
  slug: "living-ontario-c2-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c3---mobila-sufragerie.md": {
	id: "living-ontario-c3---mobila-sufragerie.md";
  slug: "living-ontario-c3---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c3-duo---mobila-sufragerie.md": {
	id: "living-ontario-c3-duo---mobila-sufragerie.md";
  slug: "living-ontario-c3-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c3-uno---mobila-sufragerie.md": {
	id: "living-ontario-c3-uno---mobila-sufragerie.md";
  slug: "living-ontario-c3-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c4---mobila-sufragerie.md": {
	id: "living-ontario-c4---mobila-sufragerie.md";
  slug: "living-ontario-c4---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c4-duo---mobila-sufragerie.md": {
	id: "living-ontario-c4-duo---mobila-sufragerie.md";
  slug: "living-ontario-c4-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c4-uno---mobila-sufragerie.md": {
	id: "living-ontario-c4-uno---mobila-sufragerie.md";
  slug: "living-ontario-c4-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c5---mobila-sufragerie.md": {
	id: "living-ontario-c5---mobila-sufragerie.md";
  slug: "living-ontario-c5---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c5-duo---mobila-sufragerie.md": {
	id: "living-ontario-c5-duo---mobila-sufragerie.md";
  slug: "living-ontario-c5-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c5-uno---mobila-sufragerie.md": {
	id: "living-ontario-c5-uno---mobila-sufragerie.md";
  slug: "living-ontario-c5-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c6---mobila-sufragerie.md": {
	id: "living-ontario-c6---mobila-sufragerie.md";
  slug: "living-ontario-c6---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c6-duo---mobila-sufragerie.md": {
	id: "living-ontario-c6-duo---mobila-sufragerie.md";
  slug: "living-ontario-c6-duo---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-ontario-c6-uno---mobila-sufragerie.md": {
	id: "living-ontario-c6-uno---mobila-sufragerie.md";
  slug: "living-ontario-c6-uno---mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-001---mobila-sufragerie-stejar.md": {
	id: "living-pati-001---mobila-sufragerie-stejar.md";
  slug: "living-pati-001---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-002---mobila-sufragerie-alba.md": {
	id: "living-pati-002---mobila-sufragerie-alba.md";
  slug: "living-pati-002---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-003---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-003---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-003---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-004---mobila-sufragerie-stejar.md": {
	id: "living-pati-004---mobila-sufragerie-stejar.md";
  slug: "living-pati-004---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-005---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-005---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-005---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-006---mobila-sufragerie-alba.md": {
	id: "living-pati-006---mobila-sufragerie-alba.md";
  slug: "living-pati-006---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-007---mobila-sufragerie-stejar.md": {
	id: "living-pati-007---mobila-sufragerie-stejar.md";
  slug: "living-pati-007---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-008---mobila-sufragerie-alb--stejar.md": {
	id: "living-pati-008---mobila-sufragerie-alb--stejar.md";
  slug: "living-pati-008---mobila-sufragerie-alb--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-009---mobila-sufragerie-alb--stejar.md": {
	id: "living-pati-009---mobila-sufragerie-alb--stejar.md";
  slug: "living-pati-009---mobila-sufragerie-alb--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-010---mobila-sufragerie-stejar.md": {
	id: "living-pati-010---mobila-sufragerie-stejar.md";
  slug: "living-pati-010---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-011---mobila-sufragerie-alba.md": {
	id: "living-pati-011---mobila-sufragerie-alba.md";
  slug: "living-pati-011---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-012---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-012---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-012---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-013---mobila-sufragerie-stejar.md": {
	id: "living-pati-013---mobila-sufragerie-stejar.md";
  slug: "living-pati-013---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-014---mobila-sufragerie-alba.md": {
	id: "living-pati-014---mobila-sufragerie-alba.md";
  slug: "living-pati-014---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-015---mobila-sufragerie-alb--stejar.md": {
	id: "living-pati-015---mobila-sufragerie-alb--stejar.md";
  slug: "living-pati-015---mobila-sufragerie-alb--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-016---mobila-sufragerie-stejar.md": {
	id: "living-pati-016---mobila-sufragerie-stejar.md";
  slug: "living-pati-016---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-017---mobila-sufragerie-alba.md": {
	id: "living-pati-017---mobila-sufragerie-alba.md";
  slug: "living-pati-017---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-018---mobila-sufragerie-alb--stejar.md": {
	id: "living-pati-018---mobila-sufragerie-alb--stejar.md";
  slug: "living-pati-018---mobila-sufragerie-alb--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-019---mobila-sufragerie-stejar.md": {
	id: "living-pati-019---mobila-sufragerie-stejar.md";
  slug: "living-pati-019---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-020---mobila-sufragerie-alba.md": {
	id: "living-pati-020---mobila-sufragerie-alba.md";
  slug: "living-pati-020---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-021---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-021---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-021---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-022---mobila-sufragerie-stejar.md": {
	id: "living-pati-022---mobila-sufragerie-stejar.md";
  slug: "living-pati-022---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-023---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-023---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-023---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-024---mobila-sufragerie-alba.md": {
	id: "living-pati-024---mobila-sufragerie-alba.md";
  slug: "living-pati-024---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-025---mobila-sufragerie-stejar.md": {
	id: "living-pati-025---mobila-sufragerie-stejar.md";
  slug: "living-pati-025---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-026---mobila-sufragerie-alba.md": {
	id: "living-pati-026---mobila-sufragerie-alba.md";
  slug: "living-pati-026---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-027---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-027---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-027---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-028---mobila-sufragerie-stejar.md": {
	id: "living-pati-028---mobila-sufragerie-stejar.md";
  slug: "living-pati-028---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-029---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-029---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-029---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-030---mobila-sufragerie-alba.md": {
	id: "living-pati-030---mobila-sufragerie-alba.md";
  slug: "living-pati-030---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-031---mobila-sufragerie-stejar.md": {
	id: "living-pati-031---mobila-sufragerie-stejar.md";
  slug: "living-pati-031---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-032---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-032---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-032---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-033---mobila-sufragerie-alba.md": {
	id: "living-pati-033---mobila-sufragerie-alba.md";
  slug: "living-pati-033---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-034---mobila-sufragerie-stejar.md": {
	id: "living-pati-034---mobila-sufragerie-stejar.md";
  slug: "living-pati-034---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-035---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-035---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-035---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-036---mobila-sufragerie-alba.md": {
	id: "living-pati-036---mobila-sufragerie-alba.md";
  slug: "living-pati-036---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-037---mobila-sufragerie-stejar.md": {
	id: "living-pati-037---mobila-sufragerie-stejar.md";
  slug: "living-pati-037---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-038---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-038---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-038---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-039---mobila-sufragerie-alba.md": {
	id: "living-pati-039---mobila-sufragerie-alba.md";
  slug: "living-pati-039---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-040---mobila-sufragerie-stejar.md": {
	id: "living-pati-040---mobila-sufragerie-stejar.md";
  slug: "living-pati-040---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-041---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-041---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-041---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-042--mobila-sufragerie-alba.md": {
	id: "living-pati-042--mobila-sufragerie-alba.md";
  slug: "living-pati-042--mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-043---mobila-sufragerie-stejar.md": {
	id: "living-pati-043---mobila-sufragerie-stejar.md";
  slug: "living-pati-043---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-044---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-044---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-044---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-045---mobila-sufragerie-alba.md": {
	id: "living-pati-045---mobila-sufragerie-alba.md";
  slug: "living-pati-045---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-046---mobila-sufragerie-stejar.md": {
	id: "living-pati-046---mobila-sufragerie-stejar.md";
  slug: "living-pati-046---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-047---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-047---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-047---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-048---mobila-sufragerie-alba.md": {
	id: "living-pati-048---mobila-sufragerie-alba.md";
  slug: "living-pati-048---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-049---mobila-sufragerie-stejar.md": {
	id: "living-pati-049---mobila-sufragerie-stejar.md";
  slug: "living-pati-049---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-050---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-050---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-050---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-051---mobila-sufragerie-alba.md": {
	id: "living-pati-051---mobila-sufragerie-alba.md";
  slug: "living-pati-051---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-052---mobila-sufragerie-stejar.md": {
	id: "living-pati-052---mobila-sufragerie-stejar.md";
  slug: "living-pati-052---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-053---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-053---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-053---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-054---mobila-sufragerie-alba.md": {
	id: "living-pati-054---mobila-sufragerie-alba.md";
  slug: "living-pati-054---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-055---mobila-sufragerie-stejar.md": {
	id: "living-pati-055---mobila-sufragerie-stejar.md";
  slug: "living-pati-055---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-056---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-056---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-056---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-057---mobila-sufragerie-alba.md": {
	id: "living-pati-057---mobila-sufragerie-alba.md";
  slug: "living-pati-057---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-058---mobila-sufragerie-stejar.md": {
	id: "living-pati-058---mobila-sufragerie-stejar.md";
  slug: "living-pati-058---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-059---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-059---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-059---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-060---mobila-sufragerie-alba.md": {
	id: "living-pati-060---mobila-sufragerie-alba.md";
  slug: "living-pati-060---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-061---mobila-sufragerie-stejar.md": {
	id: "living-pati-061---mobila-sufragerie-stejar.md";
  slug: "living-pati-061---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-062---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-062---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-062---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-063---mobila-sufragerie-alba.md": {
	id: "living-pati-063---mobila-sufragerie-alba.md";
  slug: "living-pati-063---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-064---mobila-sufragerie-stejar.md": {
	id: "living-pati-064---mobila-sufragerie-stejar.md";
  slug: "living-pati-064---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-065---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-065---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-065---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-066---mobila-sufragerie-alba.md": {
	id: "living-pati-066---mobila-sufragerie-alba.md";
  slug: "living-pati-066---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-067---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-067---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-067---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-068---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-068---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-068---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-069---mobila-sufragerie-alba.md": {
	id: "living-pati-069---mobila-sufragerie-alba.md";
  slug: "living-pati-069---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-070---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-070---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-070---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-071---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-071---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-071---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-072---mobila-sufragerie-alba.md": {
	id: "living-pati-072---mobila-sufragerie-alba.md";
  slug: "living-pati-072---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-073---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-073---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-073---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-074---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-074---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-074---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-075---mobila-sufragerie-alba.md": {
	id: "living-pati-075---mobila-sufragerie-alba.md";
  slug: "living-pati-075---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-076---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-076---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-076---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-077---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-077---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-077---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-078---mobila-sufragerie-alba.md": {
	id: "living-pati-078---mobila-sufragerie-alba.md";
  slug: "living-pati-078---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-079---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-079---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-079---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-080---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-080---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-080---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-081---mobila-sufragerie-alba.md": {
	id: "living-pati-081---mobila-sufragerie-alba.md";
  slug: "living-pati-081---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-082---mobila-sufragerie-stejar.md": {
	id: "living-pati-082---mobila-sufragerie-stejar.md";
  slug: "living-pati-082---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-083---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-083---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-083---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-084---mobila-sufragerie-alba.md": {
	id: "living-pati-084---mobila-sufragerie-alba.md";
  slug: "living-pati-084---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-085---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-085---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-085---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-086---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-086---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-086---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-087---mobila-sufragerie-alba.md": {
	id: "living-pati-087---mobila-sufragerie-alba.md";
  slug: "living-pati-087---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-088---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-088---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-088---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-089---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-089---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-089---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-090---mobila-sufragerie-alba.md": {
	id: "living-pati-090---mobila-sufragerie-alba.md";
  slug: "living-pati-090---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-091---mobila-sufragerie-alba.md": {
	id: "living-pati-091---mobila-sufragerie-alba.md";
  slug: "living-pati-091---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-092---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-092---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-092---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-093---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-093---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-093---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-094---mobila-sufragerie-alba.md": {
	id: "living-pati-094---mobila-sufragerie-alba.md";
  slug: "living-pati-094---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-095---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-095---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-095---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-096---mobila-sufragerie-stejar.md": {
	id: "living-pati-096---mobila-sufragerie-stejar.md";
  slug: "living-pati-096---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-097---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-097---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-097---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-098---mobila-sufragerie-alba--stejar.md": {
	id: "living-pati-098---mobila-sufragerie-alba--stejar.md";
  slug: "living-pati-098---mobila-sufragerie-alba--stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-099---mobila-sufragerie-alba.md": {
	id: "living-pati-099---mobila-sufragerie-alba.md";
  slug: "living-pati-099---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-100---mobila-sufragerie-stejar.md": {
	id: "living-pati-100---mobila-sufragerie-stejar.md";
  slug: "living-pati-100---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-101---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-101---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-101---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-102---mobila-sufragerie-alba.md": {
	id: "living-pati-102---mobila-sufragerie-alba.md";
  slug: "living-pati-102---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-103---mobila-sufragerie-stejar.md": {
	id: "living-pati-103---mobila-sufragerie-stejar.md";
  slug: "living-pati-103---mobila-sufragerie-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-104---mobila-sufragerie-stejar--alb.md": {
	id: "living-pati-104---mobila-sufragerie-stejar--alb.md";
  slug: "living-pati-104---mobila-sufragerie-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-105---mobila-sufragerie-alba.md": {
	id: "living-pati-105---mobila-sufragerie-alba.md";
  slug: "living-pati-105---mobila-sufragerie-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-106---mobila-sufragerie-gri--alb.md": {
	id: "living-pati-106---mobila-sufragerie-gri--alb.md";
  slug: "living-pati-106---mobila-sufragerie-gri--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-108---mobila-sufragerie-gri--alb.md": {
	id: "living-pati-108---mobila-sufragerie-gri--alb.md";
  slug: "living-pati-108---mobila-sufragerie-gri--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-110---mobila-sufragerie-gri.md": {
	id: "living-pati-110---mobila-sufragerie-gri.md";
  slug: "living-pati-110---mobila-sufragerie-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-112---mobila-sufragerie-gri--alb.md": {
	id: "living-pati-112---mobila-sufragerie-gri--alb.md";
  slug: "living-pati-112---mobila-sufragerie-gri--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-114---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-114---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-114---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-115---mobila-sufragerie-gri-beton--alb.md": {
	id: "living-pati-115---mobila-sufragerie-gri-beton--alb.md";
  slug: "living-pati-115---mobila-sufragerie-gri-beton--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-116---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-116---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-116---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-118---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-118---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-118---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-120---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-120---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-120---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-121---mobila-sufragerie-gri-beton.md": {
	id: "living-pati-121---mobila-sufragerie-gri-beton.md";
  slug: "living-pati-121---mobila-sufragerie-gri-beton";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-122---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-122---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-122---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-124---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-124---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-124---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-126---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-126---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-126---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-128---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-128---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-128---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-129---mobila-sufragerie-gri-beton.md": {
	id: "living-pati-129---mobila-sufragerie-gri-beton.md";
  slug: "living-pati-129---mobila-sufragerie-gri-beton";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-130---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-130---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-130---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-132---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-132---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-132---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-134---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-134---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-134---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-136---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-136---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-136---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-138---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-138---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-138---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-140---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-140---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-140---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-142---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-142---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-142---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-144---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-144---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-144---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-146---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-146---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-146---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-147---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-147---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-147---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-150---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-150---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-150---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-151---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-151---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-151---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-154---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-154---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-154---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-155---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-155---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-155---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-158---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-158---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-158---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-159---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-159---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-159---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-162---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-162---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-162---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-163---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-163---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-163---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-166---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-166---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-166---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-167---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-167---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-167---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-170---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-170---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-170---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-171---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-171---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-171---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-174---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-174---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-174---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-175---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-175---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-175---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-178---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-178---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-178---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-179---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-179---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-179---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-182---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-182---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-182---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-183---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-183---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-183---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-186---mobila-sufragerie-gri-antracit-alb.md": {
	id: "living-pati-186---mobila-sufragerie-gri-antracit-alb.md";
  slug: "living-pati-186---mobila-sufragerie-gri-antracit-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-187---mobila-sufragerie-gri-antracit-alb.md": {
	id: "living-pati-187---mobila-sufragerie-gri-antracit-alb.md";
  slug: "living-pati-187---mobila-sufragerie-gri-antracit-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-190---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-190---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-190---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-191---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-191---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-191---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-194---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-194---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-194---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-196---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-196---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-196---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-197---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-197---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-197---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-200---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-200---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-200---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-201---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-201---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-201---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-204---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-204---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-204---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-205---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-205---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-205---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-208--mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-208--mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-208--mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-210---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-210---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-210---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-211---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-211---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-211---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-214---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-214---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-214---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-215---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-215---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-215---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-218---mobila-sufragerie-gri-antracit.md": {
	id: "living-pati-218---mobila-sufragerie-gri-antracit.md";
  slug: "living-pati-218---mobila-sufragerie-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-pati-219---mobila-sufragerie-gri-antracit--alb.md": {
	id: "living-pati-219---mobila-sufragerie-gri-antracit--alb.md";
  slug: "living-pati-219---mobila-sufragerie-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-picolo--mobila-sufragerie.md": {
	id: "living-picolo--mobila-sufragerie.md";
  slug: "living-picolo--mobila-sufragerie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-sori-combo-plus.md": {
	id: "living-sori-combo-plus.md";
  slug: "living-sori-combo-plus";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-sori-combo.md": {
	id: "living-sori-combo.md";
  slug: "living-sori-combo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"living-sori.md": {
	id: "living-sori.md";
  slug: "living-sori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-extensibila-rosa-alba-rotunjita.md": {
	id: "masa-extensibila-rosa-alba-rotunjita.md";
  slug: "masa-extensibila-rosa-alba-rotunjita";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-grand-alba.md": {
	id: "masa-grand-alba.md";
  slug: "masa-grand-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-grand-gri.md": {
	id: "masa-grand-gri.md";
  slug: "masa-grand-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-grand-stejar-auriu.md": {
	id: "masa-grand-stejar-auriu.md";
  slug: "masa-grand-stejar-auriu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-talin---alb-mat.md": {
	id: "masa-talin---alb-mat.md";
  slug: "masa-talin---alb-mat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-talin---negru-ferrara.md": {
	id: "masa-talin---negru-ferrara.md";
  slug: "masa-talin---negru-ferrara";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-talin---sonoma.md": {
	id: "masa-talin---sonoma.md";
  slug: "masa-talin---sonoma";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-torino-alba.md": {
	id: "masa-torino-alba.md";
  slug: "masa-torino-alba";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masa-torino-wenghe.md": {
	id: "masa-torino-wenghe.md";
  slug: "masa-torino-wenghe";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masă-smart-wenghe-bucătărie.md": {
	id: "masă-smart-wenghe-bucătărie.md";
  slug: "masă-smart-wenghe-bucătărie";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masă-venetia---sonoma.md": {
	id: "masă-venetia---sonoma.md";
  slug: "masă-venetia---sonoma";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masă-venetia---white-douglas.md": {
	id: "masă-venetia---white-douglas.md";
  slug: "masă-venetia---white-douglas";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"masă-venetia-wenge.md": {
	id: "masă-venetia-wenge.md";
  slug: "masă-venetia-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c1-duo-stejar.md": {
	id: "mobila-sufragerie---living-milan-c1-duo-stejar.md";
  slug: "mobila-sufragerie---living-milan-c1-duo-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c1-duo.md": {
	id: "mobila-sufragerie---living-milan-c1-duo.md";
  slug: "mobila-sufragerie---living-milan-c1-duo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c1-stejar.md": {
	id: "mobila-sufragerie---living-milan-c1-stejar.md";
  slug: "mobila-sufragerie---living-milan-c1-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c1-uno-stejar.md": {
	id: "mobila-sufragerie---living-milan-c1-uno-stejar.md";
  slug: "mobila-sufragerie---living-milan-c1-uno-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c1-uno.md": {
	id: "mobila-sufragerie---living-milan-c1-uno.md";
  slug: "mobila-sufragerie---living-milan-c1-uno";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c1.md": {
	id: "mobila-sufragerie---living-milan-c1.md";
  slug: "mobila-sufragerie---living-milan-c1";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c2-duo-stejar.md": {
	id: "mobila-sufragerie---living-milan-c2-duo-stejar.md";
  slug: "mobila-sufragerie---living-milan-c2-duo-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c2-duo.md": {
	id: "mobila-sufragerie---living-milan-c2-duo.md";
  slug: "mobila-sufragerie---living-milan-c2-duo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c2-stejar.md": {
	id: "mobila-sufragerie---living-milan-c2-stejar.md";
  slug: "mobila-sufragerie---living-milan-c2-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c2-uno-stejar.md": {
	id: "mobila-sufragerie---living-milan-c2-uno-stejar.md";
  slug: "mobila-sufragerie---living-milan-c2-uno-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c2-uno.md": {
	id: "mobila-sufragerie---living-milan-c2-uno.md";
  slug: "mobila-sufragerie---living-milan-c2-uno";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c2.md": {
	id: "mobila-sufragerie---living-milan-c2.md";
  slug: "mobila-sufragerie---living-milan-c2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c3-duo-stejar.md": {
	id: "mobila-sufragerie---living-milan-c3-duo-stejar.md";
  slug: "mobila-sufragerie---living-milan-c3-duo-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c3-duo.md": {
	id: "mobila-sufragerie---living-milan-c3-duo.md";
  slug: "mobila-sufragerie---living-milan-c3-duo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c3-stejar.md": {
	id: "mobila-sufragerie---living-milan-c3-stejar.md";
  slug: "mobila-sufragerie---living-milan-c3-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c3-uno-stejar.md": {
	id: "mobila-sufragerie---living-milan-c3-uno-stejar.md";
  slug: "mobila-sufragerie---living-milan-c3-uno-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c3-uno.md": {
	id: "mobila-sufragerie---living-milan-c3-uno.md";
  slug: "mobila-sufragerie---living-milan-c3-uno";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c3.md": {
	id: "mobila-sufragerie---living-milan-c3.md";
  slug: "mobila-sufragerie---living-milan-c3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c4-duo-stejar.md": {
	id: "mobila-sufragerie---living-milan-c4-duo-stejar.md";
  slug: "mobila-sufragerie---living-milan-c4-duo-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c4-duo.md": {
	id: "mobila-sufragerie---living-milan-c4-duo.md";
  slug: "mobila-sufragerie---living-milan-c4-duo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c4-stejar.md": {
	id: "mobila-sufragerie---living-milan-c4-stejar.md";
  slug: "mobila-sufragerie---living-milan-c4-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c4-uno-stejar.md": {
	id: "mobila-sufragerie---living-milan-c4-uno-stejar.md";
  slug: "mobila-sufragerie---living-milan-c4-uno-stejar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c4-uno.md": {
	id: "mobila-sufragerie---living-milan-c4-uno.md";
  slug: "mobila-sufragerie---living-milan-c4-uno";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"mobila-sufragerie---living-milan-c4.md": {
	id: "mobila-sufragerie---living-milan-c4.md";
  slug: "mobila-sufragerie---living-milan-c4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"modul-leganza-b1.md": {
	id: "modul-leganza-b1.md";
  slug: "modul-leganza-b1";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"modul-leganza-c.md": {
	id: "modul-leganza-c.md";
  slug: "modul-leganza-c";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"modul-leganza-e.md": {
	id: "modul-leganza-e.md";
  slug: "modul-leganza-e";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-bucatarie--living-ferrara--alb.md": {
	id: "pachet-mobila-bucatarie--living-ferrara--alb.md";
  slug: "pachet-mobila-bucatarie--living-ferrara--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-bucatarie--living-stejar--alb.md": {
	id: "pachet-mobila-bucatarie--living-stejar--alb.md";
  slug: "pachet-mobila-bucatarie--living-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-cali-gri--petrol--masa-grand-alba--4-scaune-grand-gri-deschis.md": {
	id: "pachet-mobila-canapea-cali-gri--petrol--masa-grand-alba--4-scaune-grand-gri-deschis.md";
  slug: "pachet-mobila-canapea-cali-gri--petrol--masa-grand-alba--4-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-cali-gri-antracit--negru--masa-grand-alba--4-scaune-grand-gri-inchis.md": {
	id: "pachet-mobila-canapea-cali-gri-antracit--negru--masa-grand-alba--4-scaune-grand-gri-inchis.md";
  slug: "pachet-mobila-canapea-cali-gri-antracit--negru--masa-grand-alba--4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-corsica-crem--maro--masa-grand-stejar-auriu--4-scaune-grand-crem.md": {
	id: "pachet-mobila-canapea-corsica-crem--maro--masa-grand-stejar-auriu--4-scaune-grand-crem.md";
  slug: "pachet-mobila-canapea-corsica-crem--maro--masa-grand-stejar-auriu--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-corsica-gri--gri-antracit--masa-grand-alba--4-scaune-grand-gri-inchis.md": {
	id: "pachet-mobila-canapea-corsica-gri--gri-antracit--masa-grand-alba--4-scaune-grand-gri-inchis.md";
  slug: "pachet-mobila-canapea-corsica-gri--gri-antracit--masa-grand-alba--4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-maroc-gri-deschis--masa-grand-alba--4-scaune-grand-gri-inchis.md": {
	id: "pachet-mobila-canapea-maroc-gri-deschis--masa-grand-alba--4-scaune-grand-gri-inchis.md";
  slug: "pachet-mobila-canapea-maroc-gri-deschis--masa-grand-alba--4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-maroc-maro--masa-grand-stejar-auriu--4-scaune-grand-crem.md": {
	id: "pachet-mobila-canapea-maroc-maro--masa-grand-stejar-auriu--4-scaune-grand-crem.md";
  slug: "pachet-mobila-canapea-maroc-maro--masa-grand-stejar-auriu--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-morelia-cappuccino--masa-grand-stejar-auriu--4-scaune-grand-crem.md": {
	id: "pachet-mobila-canapea-morelia-cappuccino--masa-grand-stejar-auriu--4-scaune-grand-crem.md";
  slug: "pachet-mobila-canapea-morelia-cappuccino--masa-grand-stejar-auriu--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-canapea-morelia-visinie--masa-grand-alba--4-scaune-grand-gri-inchis.md": {
	id: "pachet-mobila-canapea-morelia-visinie--masa-grand-alba--4-scaune-grand-gri-inchis.md";
  slug: "pachet-mobila-canapea-morelia-visinie--masa-grand-alba--4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-alfa-crem--masa-grand-stejar-auriu--4-scaune-grand-verde.md": {
	id: "pachet-mobila-coltar-alfa-crem--masa-grand-stejar-auriu--4-scaune-grand-verde.md";
  slug: "pachet-mobila-coltar-alfa-crem--masa-grand-stejar-auriu--4-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-alfa-maro--masa-grand-stejar-auriu--4-scaune-grand-crem.md": {
	id: "pachet-mobila-coltar-alfa-maro--masa-grand-stejar-auriu--4-scaune-grand-crem.md";
  slug: "pachet-mobila-coltar-alfa-maro--masa-grand-stejar-auriu--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-bonito-gri-antracit--masa-grand-alba--4-scaune-grand-mustar.md": {
	id: "pachet-mobila-coltar-bonito-gri-antracit--masa-grand-alba--4-scaune-grand-mustar.md";
  slug: "pachet-mobila-coltar-bonito-gri-antracit--masa-grand-alba--4-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-bonito-turcoaz--masa-grand-alba--4-scaune-grand-gri-deschis.md": {
	id: "pachet-mobila-coltar-bonito-turcoaz--masa-grand-alba--4-scaune-grand-gri-deschis.md";
  slug: "pachet-mobila-coltar-bonito-turcoaz--masa-grand-alba--4-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-cali-cremmaro--masa-grand-stejar-auriu--4-scaune-grand-crem.md": {
	id: "pachet-mobila-coltar-cali-cremmaro--masa-grand-stejar-auriu--4-scaune-grand-crem.md";
  slug: "pachet-mobila-coltar-cali-cremmaro--masa-grand-stejar-auriu--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-cali-grinegru--masa-grand-alba--4-scaune-grand-gri-deschis.md": {
	id: "pachet-mobila-coltar-cali-grinegru--masa-grand-alba--4-scaune-grand-gri-deschis.md";
  slug: "pachet-mobila-coltar-cali-grinegru--masa-grand-alba--4-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-morelia-crem--masa-grand-stejar-auriu--4-scaune-grand-crem.md": {
	id: "pachet-mobila-coltar-morelia-crem--masa-grand-stejar-auriu--4-scaune-grand-crem.md";
  slug: "pachet-mobila-coltar-morelia-crem--masa-grand-stejar-auriu--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-coltar-morelia-verde--masa-grand-stejar-auriu--4-scaune-grand-maro.md": {
	id: "pachet-mobila-coltar-morelia-verde--masa-grand-stejar-auriu--4-scaune-grand-maro.md";
  slug: "pachet-mobila-coltar-morelia-verde--masa-grand-stejar-auriu--4-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-dormitor--living-alb.md": {
	id: "pachet-mobila-dormitor--living-alb.md";
  slug: "pachet-mobila-dormitor--living-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-dormitor--living-gri-antracit--alb.md": {
	id: "pachet-mobila-dormitor--living-gri-antracit--alb.md";
  slug: "pachet-mobila-dormitor--living-gri-antracit--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-dormitor--living-gri-antracit--k02.md": {
	id: "pachet-mobila-dormitor--living-gri-antracit--k02.md";
  slug: "pachet-mobila-dormitor--living-gri-antracit--k02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pachet-mobila-dormitor--living-stejar--alb.md": {
	id: "pachet-mobila-dormitor--living-stejar--alb.md";
  slug: "pachet-mobila-dormitor--living-stejar--alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb--casmir-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb--casmir-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb--casmir-tapitat-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb--stejar-k02-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb--stejar-k02-tapitat-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb-tapitat-gri-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-alb-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-alb-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-alb-tapitat-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-blanco-fix-tapitat-gri-pentru-saltea-aplicata-180x200.md": {
	id: "pat-blanco-fix-tapitat-gri-pentru-saltea-aplicata-180x200.md";
  slug: "pat-blanco-fix-tapitat-gri-pentru-saltea-aplicata-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-class-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-class-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-class-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-class-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-class-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-class-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-class-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-class-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-class-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-class-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-class-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-class-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-class-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-class-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-class-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-class-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-class-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-class-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-class-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-2-persoane-mondo-140x200.md": {
	id: "pat-dormitor-2-persoane-mondo-140x200.md";
  slug: "pat-dormitor-2-persoane-mondo-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-2-persoane-mondo-160x200.md": {
	id: "pat-dormitor-2-persoane-mondo-160x200.md";
  slug: "pat-dormitor-2-persoane-mondo-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-2-persoane-mondo-180x200.md": {
	id: "pat-dormitor-2-persoane-mondo-180x200.md";
  slug: "pat-dormitor-2-persoane-mondo-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-axel-tapitat-bej-plusat.md": {
	id: "pat-dormitor-axel-tapitat-bej-plusat.md";
  slug: "pat-dormitor-axel-tapitat-bej-plusat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-netapitat-ferrara-140x200.md": {
	id: "pat-dormitor-netapitat-ferrara-140x200.md";
  slug: "pat-dormitor-netapitat-ferrara-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-netapitat-ferrara-160x200.md": {
	id: "pat-dormitor-netapitat-ferrara-160x200.md";
  slug: "pat-dormitor-netapitat-ferrara-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-netapitat-ferrara-180x200.md": {
	id: "pat-dormitor-netapitat-ferrara-180x200.md";
  slug: "pat-dormitor-netapitat-ferrara-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-netapitat-sonoma-180x200.md": {
	id: "pat-dormitor-netapitat-sonoma-180x200.md";
  slug: "pat-dormitor-netapitat-sonoma-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-alb-ferrara-140x200.md": {
	id: "pat-dormitor-tapitat-alb-ferrara-140x200.md";
  slug: "pat-dormitor-tapitat-alb-ferrara-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-alb-ferrara-160x200.md": {
	id: "pat-dormitor-tapitat-alb-ferrara-160x200.md";
  slug: "pat-dormitor-tapitat-alb-ferrara-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-alb-ferrara-180x200.md": {
	id: "pat-dormitor-tapitat-alb-ferrara-180x200.md";
  slug: "pat-dormitor-tapitat-alb-ferrara-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-alb-sonoma-180x200.md": {
	id: "pat-dormitor-tapitat-alb-sonoma-180x200.md";
  slug: "pat-dormitor-tapitat-alb-sonoma-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-wenge-ferrara-140x200.md": {
	id: "pat-dormitor-tapitat-wenge-ferrara-140x200.md";
  slug: "pat-dormitor-tapitat-wenge-ferrara-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-wenge-ferrara-160x200.md": {
	id: "pat-dormitor-tapitat-wenge-ferrara-160x200.md";
  slug: "pat-dormitor-tapitat-wenge-ferrara-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-wenge-ferrara-180x200.md": {
	id: "pat-dormitor-tapitat-wenge-ferrara-180x200.md";
  slug: "pat-dormitor-tapitat-wenge-ferrara-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-dormitor-tapitat-wenge-sonoma-180x200.md": {
	id: "pat-dormitor-tapitat-wenge-sonoma-180x200.md";
  slug: "pat-dormitor-tapitat-wenge-sonoma-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-140x200.md": {
	id: "pat-douglas-140x200.md";
  slug: "pat-douglas-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-160x200.md": {
	id: "pat-douglas-160x200.md";
  slug: "pat-douglas-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-180x200.md": {
	id: "pat-douglas-180x200.md";
  slug: "pat-douglas-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-tapitat-alb-140x200.md": {
	id: "pat-douglas-tapitat-alb-140x200.md";
  slug: "pat-douglas-tapitat-alb-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-tapitat-alb-160x200.md": {
	id: "pat-douglas-tapitat-alb-160x200.md";
  slug: "pat-douglas-tapitat-alb-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-tapitat-alb-180x200.md": {
	id: "pat-douglas-tapitat-alb-180x200.md";
  slug: "pat-douglas-tapitat-alb-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-tapitat-wenge-140x200.md": {
	id: "pat-douglas-tapitat-wenge-140x200.md";
  slug: "pat-douglas-tapitat-wenge-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-tapitat-wenge-160x200.md": {
	id: "pat-douglas-tapitat-wenge-160x200.md";
  slug: "pat-douglas-tapitat-wenge-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-douglas-tapitat-wenge-180x200.md": {
	id: "pat-douglas-tapitat-wenge-180x200.md";
  slug: "pat-douglas-tapitat-wenge-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-fox-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-fox-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-fox-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-fox-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-fox-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-fox-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-fox-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-fox-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-fox-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-fox-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-fox-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-fox-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-fox-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-fox-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-fox-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-fox-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-fox-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-fox-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-fox-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-grafit-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-grafit-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-grafit-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-grafit-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-grafit-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-grafit-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-grafit-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-grafit-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-grafit-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-grafit-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-grafit-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-grafit-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-grafit-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-grafit-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-grafit-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-grafit-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-grafit-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-grafit-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-grafit-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-gri-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-gri-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-gri-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-gri-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-gri-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-gri-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-gri-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-gri-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-gri-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-gri-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-gri-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-gri-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-gri-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-gri-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-gri-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-gri-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-gri-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-gri-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-gri-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-gri-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-gri-tapitat-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-netapitat-140x200.md": {
	id: "pat-matrimonial-mario-netapitat-140x200.md";
  slug: "pat-matrimonial-mario-netapitat-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-netapitat-160x200.md": {
	id: "pat-matrimonial-mario-netapitat-160x200.md";
  slug: "pat-matrimonial-mario-netapitat-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-netapitat-180x200.md": {
	id: "pat-matrimonial-mario-netapitat-180x200.md";
  slug: "pat-matrimonial-mario-netapitat-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-tapitat-alb-140x200.md": {
	id: "pat-matrimonial-mario-tapitat-alb-140x200.md";
  slug: "pat-matrimonial-mario-tapitat-alb-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-tapitat-alb-160x200.md": {
	id: "pat-matrimonial-mario-tapitat-alb-160x200.md";
  slug: "pat-matrimonial-mario-tapitat-alb-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-tapitat-alb-180x200.md": {
	id: "pat-matrimonial-mario-tapitat-alb-180x200.md";
  slug: "pat-matrimonial-mario-tapitat-alb-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-tapitat-wenge-140x200.md": {
	id: "pat-matrimonial-mario-tapitat-wenge-140x200.md";
  slug: "pat-matrimonial-mario-tapitat-wenge-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-tapitat-wenge-160x200.md": {
	id: "pat-matrimonial-mario-tapitat-wenge-160x200.md";
  slug: "pat-matrimonial-mario-tapitat-wenge-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-matrimonial-mario-tapitat-wenge-180x200.md": {
	id: "pat-matrimonial-mario-tapitat-wenge-180x200.md";
  slug: "pat-matrimonial-mario-tapitat-wenge-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-mono-fix-tapitat-crem-cu-saltea-aplicata-160x200.md": {
	id: "pat-mono-fix-tapitat-crem-cu-saltea-aplicata-160x200.md";
  slug: "pat-mono-fix-tapitat-crem-cu-saltea-aplicata-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-mono-fix-tapitat-crem-cu-saltea-aplicata-180x200.md": {
	id: "pat-mono-fix-tapitat-crem-cu-saltea-aplicata-180x200.md";
  slug: "pat-mono-fix-tapitat-crem-cu-saltea-aplicata-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-mono-rabatabil-tapitat-crem.md": {
	id: "pat-mono-rabatabil-tapitat-crem.md";
  slug: "pat-mono-rabatabil-tapitat-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-nuc-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-nuc-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-nuc-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-nuc-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-nuc-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-nuc-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-nuc-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-nuc-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-nuc-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-nuc-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-nuc-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-nuc-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-nuc-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-nuc-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-nuc-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-nuc-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-nuc-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-nuc-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-nuc-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-nuc-tapitat-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-nuc-tapitat-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-o-persoana-mihai-alb-cu-lada.md": {
	id: "pat-o-persoana-mihai-alb-cu-lada.md";
  slug: "pat-o-persoana-mihai-alb-cu-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-royal-1.60-orion-03.md": {
	id: "pat-royal-1.60-orion-03.md";
  slug: "pat-royal-160-orion-03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-royal-1.60-orion-18.md": {
	id: "pat-royal-1.60-orion-18.md";
  slug: "pat-royal-160-orion-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-royal-rabatabil-1.60-orion-03.md": {
	id: "pat-royal-rabatabil-1.60-orion-03.md";
  slug: "pat-royal-rabatabil-160-orion-03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-royal-rabatabil-1.60-orion-18.md": {
	id: "pat-royal-rabatabil-1.60-orion-18.md";
  slug: "pat-royal-rabatabil-160-orion-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-2-persoane-melody-fix-hunter-expresso.md": {
	id: "pat-tapitat-2-persoane-melody-fix-hunter-expresso.md";
  slug: "pat-tapitat-2-persoane-melody-fix-hunter-expresso";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-2-persoane-melody-fix-pure-white.md": {
	id: "pat-tapitat-2-persoane-melody-fix-pure-white.md";
  slug: "pat-tapitat-2-persoane-melody-fix-pure-white";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-albastru---falcone-80-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---eden-4-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---falcone-102-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-bej---poso-02-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-galben---eden-11-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---eden-18-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---falcone-21-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri---poso-22-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-gri-deschis---poso-55-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-negru---poso-135-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-roz---poso-27-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-verde-inchis---eden-12-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-fixa-vernil---poso-47-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---falcone-80-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---falcone-102-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-bej---poso-02-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-galben---eden-11-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---falcone-21-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri---poso-22-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-gri-deschis---poso-55-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-negru---poso-135-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-roz---poso-27-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-140x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-140x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-160x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-160x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-180x200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-180x200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-90-x-200.md": {
	id: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-90-x-200.md";
  slug: "pat-tapitat-adam-cu-somiera-rabatabila-si-lada-de-depozitare-vernil---poso-47-90-x-200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-albastru---falcone-80.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-albastru---falcone-80.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-albastru---falcone-80";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-bej---eden-4.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-bej---eden-4.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-bej---eden-4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-bej---falcone-102.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-bej---falcone-102.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-bej---falcone-102";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-bej---poso-02.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-bej---poso-02.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-bej---poso-02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-galben---eden-11.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-galben---eden-11.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-galben---eden-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-gri---eden-18.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-gri---eden-18.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-gri---eden-18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-gri---falcone-21.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-gri---falcone-21.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-gri---falcone-21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-gri---poso-22.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-gri---poso-22.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-gri---poso-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-gri-deschis---poso-55.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-gri-deschis---poso-55.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-gri-deschis---poso-55";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-negru---poso-135.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-negru---poso-135.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-negru---poso-135";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-roz---poso-27.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-roz---poso-27.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-roz---poso-27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-verde-inchis---eden-12.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-verde-inchis---eden-12.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-verde-inchis---eden-12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-adam-cu-somiera-si-sertar-vernil---poso-47.md": {
	id: "pat-tapitat-adam-cu-somiera-si-sertar-vernil---poso-47.md";
  slug: "pat-tapitat-adam-cu-somiera-si-sertar-vernil---poso-47";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-albastru-inchis---riviera-81-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-bej---riviera-16-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-galben-mustar--riviera-41-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri---riviera-91-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-gri-antracit---riviera-97-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-maro---riviera-26-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-mov---riviera-69-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-negru---riviera-100-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-roz---riviera-62-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-deschis---riviera-36-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-verde-inchis---riviera-38-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-fixa-visiniu---riviera-61-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-bej---riviera-16-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-galben-mustar--riviera-41-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri---riviera-91-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-gri-antracit---riviera-97-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-maro---riviera-26-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-negru---riviera-100-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-roz---riviera-62-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---riviera-38-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-140x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-140x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-160x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-160x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-180x200.md": {
	id: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-180x200.md";
  slug: "pat-tapitat-catifea-mega-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-140x200-2-sertare.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-140x200-2-sertare.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-140x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-140x200-4-sertare.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-140x200-4-sertare.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-140x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-140x200-fara-lada.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-140x200-fara-lada.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-140x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-160x200-2-sertare.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-160x200-2-sertare.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-160x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-160x200-4-sertare.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-160x200-4-sertare.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-160x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-160x200-fara-lada.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-160x200-fara-lada.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-160x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-180x200-2-sertare.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-180x200-2-sertare.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-180x200-2-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-180x200-4-sertare.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-180x200-4-sertare.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-180x200-4-sertare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-fox-optional-lada-de-depozitare-180x200-fara-lada.md": {
	id: "pat-tapitat-fox-optional-lada-de-depozitare-180x200-fara-lada.md";
  slug: "pat-tapitat-fox-optional-lada-de-depozitare-180x200-fara-lada";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galacto-cu-somiera-fixa.md": {
	id: "pat-tapitat-galacto-cu-somiera-fixa.md";
  slug: "pat-tapitat-galacto-cu-somiera-fixa";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galacto-cu-somiera-rabatabila-si-lada-de-depozitare.md": {
	id: "pat-tapitat-galacto-cu-somiera-rabatabila-si-lada-de-depozitare.md";
  slug: "pat-tapitat-galacto-cu-somiera-rabatabila-si-lada-de-depozitare";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galacto-cu-somiera-si-sertar.md": {
	id: "pat-tapitat-galacto-cu-somiera-si-sertar.md";
  slug: "pat-tapitat-galacto-cu-somiera-si-sertar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-alb---coral-15-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-albastru---jasmine-90-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bej---eden-4-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bej---jasmine-22-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-bleumarin---eden-16-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-gri---coral-75-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-gri-inchis---coral-80-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-mov---riviera-69-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-mov-deschis---jasmine-62-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-negru---eden-21-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-portocaliu---riviera-51-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-fixa-verde-deschis---riviera-36-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-alb---coral-15-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-alb---coral-15-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-alb---coral-15-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---jasmine-90-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---jasmine-90-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---jasmine-90-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---jasmine-90-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---jasmine-90-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru---jasmine-90-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---eden-4-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---jasmine-22-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---jasmine-22-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---jasmine-22-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---jasmine-22-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---jasmine-22-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bej---jasmine-22-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bleumarin---eden-16-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bleumarin---eden-16-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bleumarin---eden-16-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bleumarin---eden-16-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bleumarin---eden-16-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-bleumarin---eden-16-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---coral-75-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---coral-75-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---coral-75-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---coral-75-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---coral-75-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---coral-75-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-gri-inchis---coral-80-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov---riviera-69-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-160x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-160x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---eden-21-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---eden-21-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---eden-21-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---eden-21-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---eden-21-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---eden-21-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-portocaliu---riviera-51-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-portocaliu---riviera-51-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-portocaliu---riviera-51-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-portocaliu---riviera-51-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-portocaliu---riviera-51-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-portocaliu---riviera-51-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-140x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-140x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-180x200.md": {
	id: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-180x200.md";
  slug: "pat-tapitat-galileo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-deschis---riviera-36-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-alb---coral-15.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-alb---coral-15.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-alb---coral-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-albastru---jasmine-90.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-albastru---jasmine-90.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-albastru---jasmine-90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-bej---eden-4.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-bej---eden-4.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-bej---eden-4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-bej---jasmine-22.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-bej---jasmine-22.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-bej---jasmine-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-bleumarin---eden-16.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-bleumarin---eden-16.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-bleumarin---eden-16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-gri---coral-75.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-gri---coral-75.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-gri---coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-gri-inchis---coral-80.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-gri-inchis---coral-80.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-gri-inchis---coral-80";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-mov---riviera-69.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-mov---riviera-69.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-mov---riviera-69";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-mov-deschis---jasmine-62.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-mov-deschis---jasmine-62.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-mov-deschis---jasmine-62";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-negru---eden-21.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-negru---eden-21.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-negru---eden-21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-portocaliu---riviera-51.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-portocaliu---riviera-51.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-portocaliu---riviera-51";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-galileo-cu-somiera-si-sertar-verde-deschis---riviera-36.md": {
	id: "pat-tapitat-galileo-cu-somiera-si-sertar-verde-deschis---riviera-36.md";
  slug: "pat-tapitat-galileo-cu-somiera-si-sertar-verde-deschis---riviera-36";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-albastru-deschis---poso-26-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-albastru-inchis---riviera-81-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-grena---eden-9-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-grena---eden-9-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-grena---eden-9-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-grena---eden-9-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-grena---eden-9-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-grena---eden-9-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-gri---eden-18-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-maro---poso-06-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-mov-deschis---jasmine-62-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-verde---falcone-22-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-verde-inchis---eden-12-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-fixa-visiniu---riviera-61-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-deschis---poso-26-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-albastru-inchis---riviera-81-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-bej-swing-2-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-grena---eden-9-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---eden-18-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-gri---swing-17-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-maro---poso-06-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-mov-deschis---jasmine-62-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-negru---falcone-14-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde---falcone-22-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-verde-inchis---eden-12-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-140x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-140x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-180x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-180x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-rabatabila-si-lada-de-depozitare-visiniu---riviera-61-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-albastru-deschis---poso-26-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-albastru-deschis---poso-26-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-albastru-deschis---poso-26-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-albastru-inchis---riviera-81-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-albastru-inchis---riviera-81-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-albastru-inchis---riviera-81-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-bej-swing-2-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-bej-swing-2-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-bej-swing-2-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-grena---eden-9-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-grena---eden-9-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-grena---eden-9-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-gri---eden-18-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-gri---eden-18-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-gri---eden-18-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-gri---swing-17-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-gri---swing-17-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-gri---swing-17-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-maro---poso-06-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-maro---poso-06-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-maro---poso-06-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-mov-deschis---jasmine-62-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-mov-deschis---jasmine-62-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-mov-deschis---jasmine-62-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-negru---falcone-14-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-negru---falcone-14-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-negru---falcone-14-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-verde---falcone-22-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-verde---falcone-22-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-verde---falcone-22-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-verde-inchis---eden-12-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-verde-inchis---eden-12-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-verde-inchis---eden-12-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-tapitat-rivo-cu-somiera-si-sertar-visiniu---riviera-61-160x200.md": {
	id: "pat-tapitat-rivo-cu-somiera-si-sertar-visiniu---riviera-61-160x200.md";
  slug: "pat-tapitat-rivo-cu-somiera-si-sertar-visiniu---riviera-61-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-140x200.md": {
	id: "pat-timea-140x200.md";
  slug: "pat-timea-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-160x200.md": {
	id: "pat-timea-160x200.md";
  slug: "pat-timea-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-180x200.md": {
	id: "pat-timea-180x200.md";
  slug: "pat-timea-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-tapitat-alb-140x200.md": {
	id: "pat-timea-tapitat-alb-140x200.md";
  slug: "pat-timea-tapitat-alb-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-tapitat-alb-160x200.md": {
	id: "pat-timea-tapitat-alb-160x200.md";
  slug: "pat-timea-tapitat-alb-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-tapitat-alb-180x200.md": {
	id: "pat-timea-tapitat-alb-180x200.md";
  slug: "pat-timea-tapitat-alb-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-tapitat-wenge-140x200.md": {
	id: "pat-timea-tapitat-wenge-140x200.md";
  slug: "pat-timea-tapitat-wenge-140x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-tapitat-wenge-160x200.md": {
	id: "pat-timea-tapitat-wenge-160x200.md";
  slug: "pat-timea-tapitat-wenge-160x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"pat-timea-tapitat-wenge-180x200.md": {
	id: "pat-timea-tapitat-wenge-180x200.md";
  slug: "pat-timea-tapitat-wenge-180x200";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"polita-suspendata-1390-melo---modul-f.md": {
	id: "polita-suspendata-1390-melo---modul-f.md";
  slug: "polita-suspendata-1390-melo---modul-f";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"polita-suspendata-1800-melo---modul-g.md": {
	id: "polita-suspendata-1800-melo---modul-g.md";
  slug: "polita-suspendata-1800-melo---modul-g";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-01---living-scandinav.md": {
	id: "rafa-01---living-scandinav.md";
  slug: "rafa-01---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-02---living-scandinav.md": {
	id: "rafa-02---living-scandinav.md";
  slug: "rafa-02---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-03---living-scandinav.md": {
	id: "rafa-03---living-scandinav.md";
  slug: "rafa-03---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-04---living-scandinav.md": {
	id: "rafa-04---living-scandinav.md";
  slug: "rafa-04---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-05---living-scandinav.md": {
	id: "rafa-05---living-scandinav.md";
  slug: "rafa-05---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-06---living-scandinav.md": {
	id: "rafa-06---living-scandinav.md";
  slug: "rafa-06---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-07---living-scandinav.md": {
	id: "rafa-07---living-scandinav.md";
  slug: "rafa-07---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-08---living-scandinav.md": {
	id: "rafa-08---living-scandinav.md";
  slug: "rafa-08---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-09---living-scandinav.md": {
	id: "rafa-09---living-scandinav.md";
  slug: "rafa-09---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-10---living-scandinav.md": {
	id: "rafa-10---living-scandinav.md";
  slug: "rafa-10---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-11---living-scandinav.md": {
	id: "rafa-11---living-scandinav.md";
  slug: "rafa-11---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-12---living-scandinav.md": {
	id: "rafa-12---living-scandinav.md";
  slug: "rafa-12---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-13---living-scandinav.md": {
	id: "rafa-13---living-scandinav.md";
  slug: "rafa-13---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-14---living-scandinav.md": {
	id: "rafa-14---living-scandinav.md";
  slug: "rafa-14---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-15---living-scandinav.md": {
	id: "rafa-15---living-scandinav.md";
  slug: "rafa-15---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-16---living-scandinav.md": {
	id: "rafa-16---living-scandinav.md";
  slug: "rafa-16---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-17---living-scandinav.md": {
	id: "rafa-17---living-scandinav.md";
  slug: "rafa-17---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-18---living-scandinav.md": {
	id: "rafa-18---living-scandinav.md";
  slug: "rafa-18---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-19---living-scandinav.md": {
	id: "rafa-19---living-scandinav.md";
  slug: "rafa-19---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-20---living-scandinav.md": {
	id: "rafa-20---living-scandinav.md";
  slug: "rafa-20---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-21---living-scandinav.md": {
	id: "rafa-21---living-scandinav.md";
  slug: "rafa-21---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-22---living-scandinav.md": {
	id: "rafa-22---living-scandinav.md";
  slug: "rafa-22---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-23---living-scandinav.md": {
	id: "rafa-23---living-scandinav.md";
  slug: "rafa-23---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-24---living-scandinav.md": {
	id: "rafa-24---living-scandinav.md";
  slug: "rafa-24---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-25---living-scandinav.md": {
	id: "rafa-25---living-scandinav.md";
  slug: "rafa-25---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-26---living-scandinav.md": {
	id: "rafa-26---living-scandinav.md";
  slug: "rafa-26---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-27---living-scandinav.md": {
	id: "rafa-27---living-scandinav.md";
  slug: "rafa-27---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-28---living-scandinav.md": {
	id: "rafa-28---living-scandinav.md";
  slug: "rafa-28---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-29---living-scandinav.md": {
	id: "rafa-29---living-scandinav.md";
  slug: "rafa-29---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"rafa-30---living-scandinav.md": {
	id: "rafa-30---living-scandinav.md";
  slug: "rafa-30---living-scandinav";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-atena-havana-10.md": {
	id: "scaun-atena-havana-10.md";
  slug: "scaun-atena-havana-10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-atena-havana-17.md": {
	id: "scaun-atena-havana-17.md";
  slug: "scaun-atena-havana-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-atena-havana-39.md": {
	id: "scaun-atena-havana-39.md";
  slug: "scaun-atena-havana-39";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-atena-havana-65.md": {
	id: "scaun-atena-havana-65.md";
  slug: "scaun-atena-havana-65";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-eco-crem---outlet.md": {
	id: "scaun-eco-crem---outlet.md";
  slug: "scaun-eco-crem---outlet";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-eco-crem.md": {
	id: "scaun-eco-crem.md";
  slug: "scaun-eco-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-eco-savio-16.md": {
	id: "scaun-eco-savio-16.md";
  slug: "scaun-eco-savio-16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-eco-savio-38.md": {
	id: "scaun-eco-savio-38.md";
  slug: "scaun-eco-savio-38";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-eco-wenge---outlet.md": {
	id: "scaun-eco-wenge---outlet.md";
  slug: "scaun-eco-wenge---outlet";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-eco-wenge.md": {
	id: "scaun-eco-wenge.md";
  slug: "scaun-eco-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-grand-crem.md": {
	id: "scaun-grand-crem.md";
  slug: "scaun-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-grand-gri-deschis.md": {
	id: "scaun-grand-gri-deschis.md";
  slug: "scaun-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-grand-gri-inchis.md": {
	id: "scaun-grand-gri-inchis.md";
  slug: "scaun-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-grand-maro.md": {
	id: "scaun-grand-maro.md";
  slug: "scaun-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-grand-mustar.md": {
	id: "scaun-grand-mustar.md";
  slug: "scaun-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-grand-verde.md": {
	id: "scaun-grand-verde.md";
  slug: "scaun-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-karma-tapitat-galben---havana-65.md": {
	id: "scaun-karma-tapitat-galben---havana-65.md";
  slug: "scaun-karma-tapitat-galben---havana-65";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-karma-tapitat-gri---havana-6.md": {
	id: "scaun-karma-tapitat-gri---havana-6.md";
  slug: "scaun-karma-tapitat-gri---havana-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-karma-tapitat-maro---havana-39.md": {
	id: "scaun-karma-tapitat-maro---havana-39.md";
  slug: "scaun-karma-tapitat-maro---havana-39";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-karma-tapitat-negru---havana-19.md": {
	id: "scaun-karma-tapitat-negru---havana-19.md";
  slug: "scaun-karma-tapitat-negru---havana-19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-lima-vardo-19.md": {
	id: "scaun-lima-vardo-19.md";
  slug: "scaun-lima-vardo-19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-lima-vardo-35.md": {
	id: "scaun-lima-vardo-35.md";
  slug: "scaun-lima-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-lima-vardo-43.md": {
	id: "scaun-lima-vardo-43.md";
  slug: "scaun-lima-vardo-43";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-lima-vardo-6.md": {
	id: "scaun-lima-vardo-6.md";
  slug: "scaun-lima-vardo-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-oslo-castel-20.md": {
	id: "scaun-oslo-castel-20.md";
  slug: "scaun-oslo-castel-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-oslo-castel-91.md": {
	id: "scaun-oslo-castel-91.md";
  slug: "scaun-oslo-castel-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-oslo-royal-velvet-12.md": {
	id: "scaun-oslo-royal-velvet-12.md";
  slug: "scaun-oslo-royal-velvet-12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-oslo-royal-velvet-6.md": {
	id: "scaun-oslo-royal-velvet-6.md";
  slug: "scaun-oslo-royal-velvet-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-paris-castel-34.md": {
	id: "scaun-paris-castel-34.md";
  slug: "scaun-paris-castel-34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-paris-castel-55.md": {
	id: "scaun-paris-castel-55.md";
  slug: "scaun-paris-castel-55";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-paris-vardo-11.md": {
	id: "scaun-paris-vardo-11.md";
  slug: "scaun-paris-vardo-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-paris-vardo-35.md": {
	id: "scaun-paris-vardo-35.md";
  slug: "scaun-paris-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-paris-westa-8.md": {
	id: "scaun-paris-westa-8.md";
  slug: "scaun-paris-westa-8";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-paris-westa-9.md": {
	id: "scaun-paris-westa-9.md";
  slug: "scaun-paris-westa-9";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-2-crem.md": {
	id: "scaun-plus-2-crem.md";
  slug: "scaun-plus-2-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-2-gri-deschis.md": {
	id: "scaun-plus-2-gri-deschis.md";
  slug: "scaun-plus-2-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-2-gri-inchis.md": {
	id: "scaun-plus-2-gri-inchis.md";
  slug: "scaun-plus-2-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-2-maro.md": {
	id: "scaun-plus-2-maro.md";
  slug: "scaun-plus-2-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-crem.md": {
	id: "scaun-plus-crem.md";
  slug: "scaun-plus-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-gri-deschis.md": {
	id: "scaun-plus-gri-deschis.md";
  slug: "scaun-plus-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-gri-inchis.md": {
	id: "scaun-plus-gri-inchis.md";
  slug: "scaun-plus-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-plus-maro.md": {
	id: "scaun-plus-maro.md";
  slug: "scaun-plus-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-rosa-crem--rino-6---tip-scoica-tapitat.md": {
	id: "scaun-rosa-crem--rino-6---tip-scoica-tapitat.md";
  slug: "scaun-rosa-crem--rino-6---tip-scoica-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-rosa-gri---rino-88---tip-scoica-tapitat.md": {
	id: "scaun-rosa-gri---rino-88---tip-scoica-tapitat.md";
  slug: "scaun-rosa-gri---rino-88---tip-scoica-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-rosa-gri-inchis---westa-8---tip-scoica-tapitat.md": {
	id: "scaun-rosa-gri-inchis---westa-8---tip-scoica-tapitat.md";
  slug: "scaun-rosa-gri-inchis---westa-8---tip-scoica-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-rosa-maro-deschis---rino-16---tip-scoica-tapitat.md": {
	id: "scaun-rosa-maro-deschis---rino-16---tip-scoica-tapitat.md";
  slug: "scaun-rosa-maro-deschis---rino-16---tip-scoica-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-venetia-castel-97.md": {
	id: "scaun-venetia-castel-97.md";
  slug: "scaun-venetia-castel-97";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-venetia-centauri-28.md": {
	id: "scaun-venetia-centauri-28.md";
  slug: "scaun-venetia-centauri-28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-venetia-centauri-48.md": {
	id: "scaun-venetia-centauri-48.md";
  slug: "scaun-venetia-centauri-48";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-venetia-malmo-90.md": {
	id: "scaun-venetia-malmo-90.md";
  slug: "scaun-venetia-malmo-90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-wog-castel-20.md": {
	id: "scaun-wog-castel-20.md";
  slug: "scaun-wog-castel-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-wog-moric-2.md": {
	id: "scaun-wog-moric-2.md";
  slug: "scaun-wog-moric-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-wog-vardo-11.md": {
	id: "scaun-wog-vardo-11.md";
  slug: "scaun-wog-vardo-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"scaun-wog-vardo-43.md": {
	id: "scaun-wog-vardo-43.md";
  slug: "scaun-wog-vardo-43";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-casmir--alb-soares.md": {
	id: "set-2-noptiere-casmir--alb-soares.md";
  slug: "set-2-noptiere-casmir--alb-soares";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-class.md": {
	id: "set-2-noptiere-class.md";
  slug: "set-2-noptiere-class";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-dormitor-mario.md": {
	id: "set-2-noptiere-dormitor-mario.md";
  slug: "set-2-noptiere-dormitor-mario";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-grafit.md": {
	id: "set-2-noptiere-grafit.md";
  slug: "set-2-noptiere-grafit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-noce-gri.md": {
	id: "set-2-noptiere-noce-gri.md";
  slug: "set-2-noptiere-noce-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-nuc--casmir-solomon.md": {
	id: "set-2-noptiere-nuc--casmir-solomon.md";
  slug: "set-2-noptiere-nuc--casmir-solomon";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-noptiere-timea.md": {
	id: "set-2-noptiere-timea.md";
  slug: "set-2-noptiere-timea";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-perne--pilota.md": {
	id: "set-2-perne--pilota.md";
  slug: "set-2-perne--pilota";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-polite-suspendate-azur.md": {
	id: "set-2-polite-suspendate-azur.md";
  slug: "set-2-polite-suspendate-azur";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-polite-suspendate-belo.md": {
	id: "set-2-polite-suspendate-belo.md";
  slug: "set-2-polite-suspendate-belo";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-2-polite-suspendate-nori.md": {
	id: "set-2-polite-suspendate-nori.md";
  slug: "set-2-polite-suspendate-nori";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-4-scaune-grand-crem.md": {
	id: "set-4-scaune-grand-crem.md";
  slug: "set-4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-4-scaune-grand-gri-deschis.md": {
	id: "set-4-scaune-grand-gri-deschis.md";
  slug: "set-4-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-4-scaune-grand-gri-inchis.md": {
	id: "set-4-scaune-grand-gri-inchis.md";
  slug: "set-4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-4-scaune-grand-maro.md": {
	id: "set-4-scaune-grand-maro.md";
  slug: "set-4-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-4-scaune-grand-mustar.md": {
	id: "set-4-scaune-grand-mustar.md";
  slug: "set-4-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-4-scaune-grand-verde.md": {
	id: "set-4-scaune-grand-verde.md";
  slug: "set-4-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-6-scaune-grand-crem.md": {
	id: "set-6-scaune-grand-crem.md";
  slug: "set-6-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-6-scaune-grand-gri-deschis.md": {
	id: "set-6-scaune-grand-gri-deschis.md";
  slug: "set-6-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-6-scaune-grand-gri-inchis.md": {
	id: "set-6-scaune-grand-gri-inchis.md";
  slug: "set-6-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-6-scaune-grand-maro.md": {
	id: "set-6-scaune-grand-maro.md";
  slug: "set-6-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-6-scaune-grand-mustar.md": {
	id: "set-6-scaune-grand-mustar.md";
  slug: "set-6-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-6-scaune-grand-verde.md": {
	id: "set-6-scaune-grand-verde.md";
  slug: "set-6-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-albastru.md": {
	id: "set-canapea-si-fotolii-barini-albastru.md";
  slug: "set-canapea-si-fotolii-barini-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-crem.md": {
	id: "set-canapea-si-fotolii-barini-crem.md";
  slug: "set-canapea-si-fotolii-barini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-gri-antracit.md": {
	id: "set-canapea-si-fotolii-barini-gri-antracit.md";
  slug: "set-canapea-si-fotolii-barini-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-gri-deschis.md": {
	id: "set-canapea-si-fotolii-barini-gri-deschis.md";
  slug: "set-canapea-si-fotolii-barini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-portocaliu.md": {
	id: "set-canapea-si-fotolii-barini-portocaliu.md";
  slug: "set-canapea-si-fotolii-barini-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-roze.md": {
	id: "set-canapea-si-fotolii-barini-roze.md";
  slug: "set-canapea-si-fotolii-barini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-barini-verde.md": {
	id: "set-canapea-si-fotolii-barini-verde.md";
  slug: "set-canapea-si-fotolii-barini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-albastru.md": {
	id: "set-canapea-si-fotolii-biano-albastru.md";
  slug: "set-canapea-si-fotolii-biano-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-crem.md": {
	id: "set-canapea-si-fotolii-biano-crem.md";
  slug: "set-canapea-si-fotolii-biano-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-gri-antracit.md": {
	id: "set-canapea-si-fotolii-biano-gri-antracit.md";
  slug: "set-canapea-si-fotolii-biano-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-gri-deschis.md": {
	id: "set-canapea-si-fotolii-biano-gri-deschis.md";
  slug: "set-canapea-si-fotolii-biano-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-maro.md": {
	id: "set-canapea-si-fotolii-biano-maro.md";
  slug: "set-canapea-si-fotolii-biano-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-portocaliu.md": {
	id: "set-canapea-si-fotolii-biano-portocaliu.md";
  slug: "set-canapea-si-fotolii-biano-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-roze.md": {
	id: "set-canapea-si-fotolii-biano-roze.md";
  slug: "set-canapea-si-fotolii-biano-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-biano-verde.md": {
	id: "set-canapea-si-fotolii-biano-verde.md";
  slug: "set-canapea-si-fotolii-biano-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-albastru.md": {
	id: "set-canapea-si-fotolii-camila-albastru.md";
  slug: "set-canapea-si-fotolii-camila-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-crem.md": {
	id: "set-canapea-si-fotolii-camila-crem.md";
  slug: "set-canapea-si-fotolii-camila-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-gri-antracit--gri-deschis.md": {
	id: "set-canapea-si-fotolii-camila-gri-antracit--gri-deschis.md";
  slug: "set-canapea-si-fotolii-camila-gri-antracit--gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-gri-deschis.md": {
	id: "set-canapea-si-fotolii-camila-gri-deschis.md";
  slug: "set-canapea-si-fotolii-camila-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-maro--crem.md": {
	id: "set-canapea-si-fotolii-camila-maro--crem.md";
  slug: "set-canapea-si-fotolii-camila-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-portocaliu.md": {
	id: "set-canapea-si-fotolii-camila-portocaliu.md";
  slug: "set-canapea-si-fotolii-camila-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-roze.md": {
	id: "set-canapea-si-fotolii-camila-roze.md";
  slug: "set-canapea-si-fotolii-camila-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-camila-verde.md": {
	id: "set-canapea-si-fotolii-camila-verde.md";
  slug: "set-canapea-si-fotolii-camila-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-albastru.md": {
	id: "set-canapea-si-fotolii-ivy-albastru.md";
  slug: "set-canapea-si-fotolii-ivy-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-crem--maro.md": {
	id: "set-canapea-si-fotolii-ivy-crem--maro.md";
  slug: "set-canapea-si-fotolii-ivy-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-gri-antracit.md": {
	id: "set-canapea-si-fotolii-ivy-gri-antracit.md";
  slug: "set-canapea-si-fotolii-ivy-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-gri-deschis--gri-antracit.md": {
	id: "set-canapea-si-fotolii-ivy-gri-deschis--gri-antracit.md";
  slug: "set-canapea-si-fotolii-ivy-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-portocaliu.md": {
	id: "set-canapea-si-fotolii-ivy-portocaliu.md";
  slug: "set-canapea-si-fotolii-ivy-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-roze.md": {
	id: "set-canapea-si-fotolii-ivy-roze.md";
  slug: "set-canapea-si-fotolii-ivy-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-verde.md": {
	id: "set-canapea-si-fotolii-ivy-verde.md";
  slug: "set-canapea-si-fotolii-ivy-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-ivy-whisper-17.md": {
	id: "set-canapea-si-fotolii-ivy-whisper-17.md";
  slug: "set-canapea-si-fotolii-ivy-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-albastru.md": {
	id: "set-canapea-si-fotolii-julia-albastru.md";
  slug: "set-canapea-si-fotolii-julia-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-crem--maro.md": {
	id: "set-canapea-si-fotolii-julia-crem--maro.md";
  slug: "set-canapea-si-fotolii-julia-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-crem.md": {
	id: "set-canapea-si-fotolii-julia-crem.md";
  slug: "set-canapea-si-fotolii-julia-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-gri-deschis--gri-antracit.md": {
	id: "set-canapea-si-fotolii-julia-gri-deschis--gri-antracit.md";
  slug: "set-canapea-si-fotolii-julia-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-gri-deschis.md": {
	id: "set-canapea-si-fotolii-julia-gri-deschis.md";
  slug: "set-canapea-si-fotolii-julia-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-maro--crem.md": {
	id: "set-canapea-si-fotolii-julia-maro--crem.md";
  slug: "set-canapea-si-fotolii-julia-maro--crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-maro.md": {
	id: "set-canapea-si-fotolii-julia-maro.md";
  slug: "set-canapea-si-fotolii-julia-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-portocaliu.md": {
	id: "set-canapea-si-fotolii-julia-portocaliu.md";
  slug: "set-canapea-si-fotolii-julia-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-roze.md": {
	id: "set-canapea-si-fotolii-julia-roze.md";
  slug: "set-canapea-si-fotolii-julia-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-julia-verde.md": {
	id: "set-canapea-si-fotolii-julia-verde.md";
  slug: "set-canapea-si-fotolii-julia-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-albastru.md": {
	id: "set-canapea-si-fotolii-mini-albastru.md";
  slug: "set-canapea-si-fotolii-mini-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-crem--maro.md": {
	id: "set-canapea-si-fotolii-mini-crem--maro.md";
  slug: "set-canapea-si-fotolii-mini-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-crem.md": {
	id: "set-canapea-si-fotolii-mini-crem.md";
  slug: "set-canapea-si-fotolii-mini-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-gri-deschis--gri-antracit.md": {
	id: "set-canapea-si-fotolii-mini-gri-deschis--gri-antracit.md";
  slug: "set-canapea-si-fotolii-mini-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-gri-deschis.md": {
	id: "set-canapea-si-fotolii-mini-gri-deschis.md";
  slug: "set-canapea-si-fotolii-mini-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-portocaliu.md": {
	id: "set-canapea-si-fotolii-mini-portocaliu.md";
  slug: "set-canapea-si-fotolii-mini-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-roze.md": {
	id: "set-canapea-si-fotolii-mini-roze.md";
  slug: "set-canapea-si-fotolii-mini-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-mini-verde.md": {
	id: "set-canapea-si-fotolii-mini-verde.md";
  slug: "set-canapea-si-fotolii-mini-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-albastru.md": {
	id: "set-canapea-si-fotolii-nova-albastru.md";
  slug: "set-canapea-si-fotolii-nova-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-crem--maro.md": {
	id: "set-canapea-si-fotolii-nova-crem--maro.md";
  slug: "set-canapea-si-fotolii-nova-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-crem.md": {
	id: "set-canapea-si-fotolii-nova-crem.md";
  slug: "set-canapea-si-fotolii-nova-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-gri-deschis--gri-antracit.md": {
	id: "set-canapea-si-fotolii-nova-gri-deschis--gri-antracit.md";
  slug: "set-canapea-si-fotolii-nova-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-gri-deschis.md": {
	id: "set-canapea-si-fotolii-nova-gri-deschis.md";
  slug: "set-canapea-si-fotolii-nova-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-portocaliu.md": {
	id: "set-canapea-si-fotolii-nova-portocaliu.md";
  slug: "set-canapea-si-fotolii-nova-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-roze.md": {
	id: "set-canapea-si-fotolii-nova-roze.md";
  slug: "set-canapea-si-fotolii-nova-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-nova-verde.md": {
	id: "set-canapea-si-fotolii-nova-verde.md";
  slug: "set-canapea-si-fotolii-nova-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-albastru.md": {
	id: "set-canapea-si-fotolii-olimp-albastru.md";
  slug: "set-canapea-si-fotolii-olimp-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-crem.md": {
	id: "set-canapea-si-fotolii-olimp-crem.md";
  slug: "set-canapea-si-fotolii-olimp-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-gri-antracit.md": {
	id: "set-canapea-si-fotolii-olimp-gri-antracit.md";
  slug: "set-canapea-si-fotolii-olimp-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-gri-deschis.md": {
	id: "set-canapea-si-fotolii-olimp-gri-deschis.md";
  slug: "set-canapea-si-fotolii-olimp-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-maro.md": {
	id: "set-canapea-si-fotolii-olimp-maro.md";
  slug: "set-canapea-si-fotolii-olimp-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-portocaliu.md": {
	id: "set-canapea-si-fotolii-olimp-portocaliu.md";
  slug: "set-canapea-si-fotolii-olimp-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-roze.md": {
	id: "set-canapea-si-fotolii-olimp-roze.md";
  slug: "set-canapea-si-fotolii-olimp-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-olimp-verde.md": {
	id: "set-canapea-si-fotolii-olimp-verde.md";
  slug: "set-canapea-si-fotolii-olimp-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-albastru.md": {
	id: "set-canapea-si-fotolii-quinn-albastru.md";
  slug: "set-canapea-si-fotolii-quinn-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-crem--maro.md": {
	id: "set-canapea-si-fotolii-quinn-crem--maro.md";
  slug: "set-canapea-si-fotolii-quinn-crem--maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-crem.md": {
	id: "set-canapea-si-fotolii-quinn-crem.md";
  slug: "set-canapea-si-fotolii-quinn-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-gri-deschis--gri-antracit.md": {
	id: "set-canapea-si-fotolii-quinn-gri-deschis--gri-antracit.md";
  slug: "set-canapea-si-fotolii-quinn-gri-deschis--gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-portocaliu.md": {
	id: "set-canapea-si-fotolii-quinn-portocaliu.md";
  slug: "set-canapea-si-fotolii-quinn-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-roze.md": {
	id: "set-canapea-si-fotolii-quinn-roze.md";
  slug: "set-canapea-si-fotolii-quinn-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-verde.md": {
	id: "set-canapea-si-fotolii-quinn-verde.md";
  slug: "set-canapea-si-fotolii-quinn-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-quinn-whisper-17.md": {
	id: "set-canapea-si-fotolii-quinn-whisper-17.md";
  slug: "set-canapea-si-fotolii-quinn-whisper-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-albastru.md": {
	id: "set-canapea-si-fotolii-roma-albastru.md";
  slug: "set-canapea-si-fotolii-roma-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-antracit.md": {
	id: "set-canapea-si-fotolii-roma-antracit.md";
  slug: "set-canapea-si-fotolii-roma-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-gri-deschis.md": {
	id: "set-canapea-si-fotolii-roma-gri-deschis.md";
  slug: "set-canapea-si-fotolii-roma-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-maro.md": {
	id: "set-canapea-si-fotolii-roma-maro.md";
  slug: "set-canapea-si-fotolii-roma-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-portocaliu.md": {
	id: "set-canapea-si-fotolii-roma-portocaliu.md";
  slug: "set-canapea-si-fotolii-roma-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-roze.md": {
	id: "set-canapea-si-fotolii-roma-roze.md";
  slug: "set-canapea-si-fotolii-roma-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-verde.md": {
	id: "set-canapea-si-fotolii-roma-verde.md";
  slug: "set-canapea-si-fotolii-roma-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-canapea-si-fotolii-roma-whisper-2.md": {
	id: "set-canapea-si-fotolii-roma-whisper-2.md";
  slug: "set-canapea-si-fotolii-roma-whisper-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-coltar-bucatarie-smart-blur-18pal-alb--masa--2-scaune-rosa-rino-88.md": {
	id: "set-coltar-bucatarie-smart-blur-18pal-alb--masa--2-scaune-rosa-rino-88.md";
  slug: "set-coltar-bucatarie-smart-blur-18pal-alb--masa--2-scaune-rosa-rino-88";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-coltar-bucatarie-smart-blur-18pal-wenge--masa--2-scaune-rosa-rino-88.md": {
	id: "set-coltar-bucatarie-smart-blur-18pal-wenge--masa--2-scaune-rosa-rino-88.md";
  slug: "set-coltar-bucatarie-smart-blur-18pal-wenge--masa--2-scaune-rosa-rino-88";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-coltar-bucatarie-smart-blur-4pal-alb--masa--2-scaune-rosa-rino-6.md": {
	id: "set-coltar-bucatarie-smart-blur-4pal-alb--masa--2-scaune-rosa-rino-6.md";
  slug: "set-coltar-bucatarie-smart-blur-4pal-alb--masa--2-scaune-rosa-rino-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-coltar-bucatarie-smart-blur-4pal-wenge--masa--2-scaune-rosa-rino-6.md": {
	id: "set-coltar-bucatarie-smart-blur-4pal-wenge--masa--2-scaune-rosa-rino-6.md";
  slug: "set-coltar-bucatarie-smart-blur-4pal-wenge--masa--2-scaune-rosa-rino-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-coltar-de-bucatarie-smart-rino-6pal-wenge--masa--2-scaune.md": {
	id: "set-coltar-de-bucatarie-smart-rino-6pal-wenge--masa--2-scaune.md";
  slug: "set-coltar-de-bucatarie-smart-rino-6pal-wenge--masa--2-scaune";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-soares-2.33m-cu-pat-incadrat.md": {
	id: "set-dormitor-soares-2.33m-cu-pat-incadrat.md";
  slug: "set-dormitor-soares-233m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-soares-2.56m-cu-pat-incadrat.md": {
	id: "set-dormitor-soares-2.56m-cu-pat-incadrat.md";
  slug: "set-dormitor-soares-256m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-solomon-2.27m-cu-pat-incadrat.md": {
	id: "set-dormitor-solomon-2.27m-cu-pat-incadrat.md";
  slug: "set-dormitor-solomon-227m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-solomon-2.43m-cu-pat-incadrat.md": {
	id: "set-dormitor-solomon-2.43m-cu-pat-incadrat.md";
  slug: "set-dormitor-solomon-243m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-solomon-3.35m-cu-pat-incadrat.md": {
	id: "set-dormitor-solomon-3.35m-cu-pat-incadrat.md";
  slug: "set-dormitor-solomon-335m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.33m-cu-pat-incadrat.md": {
	id: "set-dormitor-timea-2.33m-cu-pat-incadrat.md";
  slug: "set-dormitor-timea-233m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.33m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-dormitor-timea-2.33m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-dormitor-timea-233m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.33m-cu-pat-tapitat-wenge-incadrat.md": {
	id: "set-dormitor-timea-2.33m-cu-pat-tapitat-wenge-incadrat.md";
  slug: "set-dormitor-timea-233m-cu-pat-tapitat-wenge-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.56m-cu-pat-incadrat.md": {
	id: "set-dormitor-timea-2.56m-cu-pat-incadrat.md";
  slug: "set-dormitor-timea-256m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.56m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-dormitor-timea-2.56m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-dormitor-timea-256m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.56m-cu-pat-tapitat-wenge-incadrat.md": {
	id: "set-dormitor-timea-2.56m-cu-pat-tapitat-wenge-incadrat.md";
  slug: "set-dormitor-timea-256m-cu-pat-tapitat-wenge-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.84m-cu-pat-incadrat.md": {
	id: "set-dormitor-timea-2.84m-cu-pat-incadrat.md";
  slug: "set-dormitor-timea-284m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.84m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-dormitor-timea-2.84m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-dormitor-timea-284m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-2.84m-cu-pat-tapitat-wenge-incadrat.md": {
	id: "set-dormitor-timea-2.84m-cu-pat-tapitat-wenge-incadrat.md";
  slug: "set-dormitor-timea-284m-cu-pat-tapitat-wenge-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.05m-cu-pat-incadrat.md": {
	id: "set-dormitor-timea-3.05m-cu-pat-incadrat.md";
  slug: "set-dormitor-timea-305m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.05m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-dormitor-timea-3.05m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-dormitor-timea-305m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.05m-cu-pat-tapitat-wenge-incadrat.md": {
	id: "set-dormitor-timea-3.05m-cu-pat-tapitat-wenge-incadrat.md";
  slug: "set-dormitor-timea-305m-cu-pat-tapitat-wenge-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.12m-cu-pat-incadrat.md": {
	id: "set-dormitor-timea-3.12m-cu-pat-incadrat.md";
  slug: "set-dormitor-timea-312m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.12m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-dormitor-timea-3.12m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-dormitor-timea-312m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.12m-cu-pat-tapitat-wenge-incadrat.md": {
	id: "set-dormitor-timea-3.12m-cu-pat-tapitat-wenge-incadrat.md";
  slug: "set-dormitor-timea-312m-cu-pat-tapitat-wenge-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.33m-cu-pat-incadrat.md": {
	id: "set-dormitor-timea-3.33m-cu-pat-incadrat.md";
  slug: "set-dormitor-timea-333m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.33m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-dormitor-timea-3.33m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-dormitor-timea-333m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-dormitor-timea-3.33m-cu-pat-tapitat-wenge-incadrat.md": {
	id: "set-dormitor-timea-3.33m-cu-pat-tapitat-wenge-incadrat.md";
  slug: "set-dormitor-timea-333m-cu-pat-tapitat-wenge-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-living-join-sonoma-c1.md": {
	id: "set-living-join-sonoma-c1.md";
  slug: "set-living-join-sonoma-c1";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-living-join-sonoma-c2.md": {
	id: "set-living-join-sonoma-c2.md";
  slug: "set-living-join-sonoma-c2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-living-join-sonoma-c3.md": {
	id: "set-living-join-sonoma-c3.md";
  slug: "set-living-join-sonoma-c3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-living-join-sonoma-c4.md": {
	id: "set-living-join-sonoma-c4.md";
  slug: "set-living-join-sonoma-c4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-living-join-sonoma-c5.md": {
	id: "set-living-join-sonoma-c5.md";
  slug: "set-living-join-sonoma-c5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila--6-scaune-venetia-castel-97.md": {
	id: "set-masa-extensibila--6-scaune-venetia-castel-97.md";
  slug: "set-masa-extensibila--6-scaune-venetia-castel-97";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila--6-scaune-venetia-centauri-28.md": {
	id: "set-masa-extensibila--6-scaune-venetia-centauri-28.md";
  slug: "set-masa-extensibila--6-scaune-venetia-centauri-28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila--6-scaune-venetia-centauri-48.md": {
	id: "set-masa-extensibila--6-scaune-venetia-centauri-48.md";
  slug: "set-masa-extensibila--6-scaune-venetia-centauri-48";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila--6-scaune-venetia-malmo-90.md": {
	id: "set-masa-extensibila--6-scaune-venetia-malmo-90.md";
  slug: "set-masa-extensibila--6-scaune-venetia-malmo-90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-rosa--4-scaune-karma-tapitate-galbene.md": {
	id: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-galbene.md";
  slug: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-galbene";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-rosa--4-scaune-karma-tapitate-gri.md": {
	id: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-gri.md";
  slug: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-rosa--4-scaune-karma-tapitate-maro.md": {
	id: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-maro.md";
  slug: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-rosa--4-scaune-karma-tapitate-negru.md": {
	id: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-negru.md";
  slug: "set-masa-extensibila-rosa--4-scaune-karma-tapitate-negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-si-4-scaune-rosa-crem.md": {
	id: "set-masa-extensibila-si-4-scaune-rosa-crem.md";
  slug: "set-masa-extensibila-si-4-scaune-rosa-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-si-4-scaune-rosa-gri-inchis.md": {
	id: "set-masa-extensibila-si-4-scaune-rosa-gri-inchis.md";
  slug: "set-masa-extensibila-si-4-scaune-rosa-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-si-4-scaune-rosa-gri.md": {
	id: "set-masa-extensibila-si-4-scaune-rosa-gri.md";
  slug: "set-masa-extensibila-si-4-scaune-rosa-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-extensibila-si-4-scaune-rosa-maro-deschis.md": {
	id: "set-masa-extensibila-si-4-scaune-rosa-maro-deschis.md";
  slug: "set-masa-extensibila-si-4-scaune-rosa-maro-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--4-scaune-grand-gri-deschis.md": {
	id: "set-masa-grand-alba--4-scaune-grand-gri-deschis.md";
  slug: "set-masa-grand-alba--4-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--4-scaune-grand-gri-inchis.md": {
	id: "set-masa-grand-alba--4-scaune-grand-gri-inchis.md";
  slug: "set-masa-grand-alba--4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--4-scaune-grand-maro.md": {
	id: "set-masa-grand-alba--4-scaune-grand-maro.md";
  slug: "set-masa-grand-alba--4-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--4-scaune-grand-mustar.md": {
	id: "set-masa-grand-alba--4-scaune-grand-mustar.md";
  slug: "set-masa-grand-alba--4-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--6-scaune-grand-gri-deschis.md": {
	id: "set-masa-grand-alba--6-scaune-grand-gri-deschis.md";
  slug: "set-masa-grand-alba--6-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--6-scaune-grand-gri-inchis.md": {
	id: "set-masa-grand-alba--6-scaune-grand-gri-inchis.md";
  slug: "set-masa-grand-alba--6-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--6-scaune-grand-maro.md": {
	id: "set-masa-grand-alba--6-scaune-grand-maro.md";
  slug: "set-masa-grand-alba--6-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-alba--6-scaune-grand-mustar.md": {
	id: "set-masa-grand-alba--6-scaune-grand-mustar.md";
  slug: "set-masa-grand-alba--6-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--4-scaune-grand-crem.md": {
	id: "set-masa-grand-gri--4-scaune-grand-crem.md";
  slug: "set-masa-grand-gri--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--4-scaune-grand-gri-deschis.md": {
	id: "set-masa-grand-gri--4-scaune-grand-gri-deschis.md";
  slug: "set-masa-grand-gri--4-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--4-scaune-grand-gri-inchis.md": {
	id: "set-masa-grand-gri--4-scaune-grand-gri-inchis.md";
  slug: "set-masa-grand-gri--4-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--4-scaune-grand-verde.md": {
	id: "set-masa-grand-gri--4-scaune-grand-verde.md";
  slug: "set-masa-grand-gri--4-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--6-scaune-grand-crem.md": {
	id: "set-masa-grand-gri--6-scaune-grand-crem.md";
  slug: "set-masa-grand-gri--6-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--6-scaune-grand-gri-deschis.md": {
	id: "set-masa-grand-gri--6-scaune-grand-gri-deschis.md";
  slug: "set-masa-grand-gri--6-scaune-grand-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--6-scaune-grand-gri-inchis.md": {
	id: "set-masa-grand-gri--6-scaune-grand-gri-inchis.md";
  slug: "set-masa-grand-gri--6-scaune-grand-gri-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-gri--6-scaune-grand-verde.md": {
	id: "set-masa-grand-gri--6-scaune-grand-verde.md";
  slug: "set-masa-grand-gri--6-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--4-scaune-grand-crem.md": {
	id: "set-masa-grand-stejar--4-scaune-grand-crem.md";
  slug: "set-masa-grand-stejar--4-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--4-scaune-grand-maro.md": {
	id: "set-masa-grand-stejar--4-scaune-grand-maro.md";
  slug: "set-masa-grand-stejar--4-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--4-scaune-grand-mustar.md": {
	id: "set-masa-grand-stejar--4-scaune-grand-mustar.md";
  slug: "set-masa-grand-stejar--4-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--4-scaune-grand-verde.md": {
	id: "set-masa-grand-stejar--4-scaune-grand-verde.md";
  slug: "set-masa-grand-stejar--4-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--6-scaune-grand-crem.md": {
	id: "set-masa-grand-stejar--6-scaune-grand-crem.md";
  slug: "set-masa-grand-stejar--6-scaune-grand-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--6-scaune-grand-maro.md": {
	id: "set-masa-grand-stejar--6-scaune-grand-maro.md";
  slug: "set-masa-grand-stejar--6-scaune-grand-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--6-scaune-grand-mustar.md": {
	id: "set-masa-grand-stejar--6-scaune-grand-mustar.md";
  slug: "set-masa-grand-stejar--6-scaune-grand-mustar";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-grand-stejar--6-scaune-grand-verde.md": {
	id: "set-masa-grand-stejar--6-scaune-grand-verde.md";
  slug: "set-masa-grand-stejar--6-scaune-grand-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-atena-havana-10.md": {
	id: "set-masa-rosa-extensibila--4-scaune-atena-havana-10.md";
  slug: "set-masa-rosa-extensibila--4-scaune-atena-havana-10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-atena-havana-17.md": {
	id: "set-masa-rosa-extensibila--4-scaune-atena-havana-17.md";
  slug: "set-masa-rosa-extensibila--4-scaune-atena-havana-17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-atena-havana-39.md": {
	id: "set-masa-rosa-extensibila--4-scaune-atena-havana-39.md";
  slug: "set-masa-rosa-extensibila--4-scaune-atena-havana-39";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-atena-havana-65.md": {
	id: "set-masa-rosa-extensibila--4-scaune-atena-havana-65.md";
  slug: "set-masa-rosa-extensibila--4-scaune-atena-havana-65";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-paris-castel-34.md": {
	id: "set-masa-rosa-extensibila--4-scaune-paris-castel-34.md";
  slug: "set-masa-rosa-extensibila--4-scaune-paris-castel-34";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-paris-castel-55.md": {
	id: "set-masa-rosa-extensibila--4-scaune-paris-castel-55.md";
  slug: "set-masa-rosa-extensibila--4-scaune-paris-castel-55";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-paris-vardo-11.md": {
	id: "set-masa-rosa-extensibila--4-scaune-paris-vardo-11.md";
  slug: "set-masa-rosa-extensibila--4-scaune-paris-vardo-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-paris-vardo-35.md": {
	id: "set-masa-rosa-extensibila--4-scaune-paris-vardo-35.md";
  slug: "set-masa-rosa-extensibila--4-scaune-paris-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-paris-westa-8.md": {
	id: "set-masa-rosa-extensibila--4-scaune-paris-westa-8.md";
  slug: "set-masa-rosa-extensibila--4-scaune-paris-westa-8";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-rosa-extensibila--4-scaune-paris-westa-9.md": {
	id: "set-masa-rosa-extensibila--4-scaune-paris-westa-9.md";
  slug: "set-masa-rosa-extensibila--4-scaune-paris-westa-9";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-smart-wenghe--4-scaune-oslo-castel-20.md": {
	id: "set-masa-smart-wenghe--4-scaune-oslo-castel-20.md";
  slug: "set-masa-smart-wenghe--4-scaune-oslo-castel-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-smart-wenghe--4-scaune-oslo-castel-91.md": {
	id: "set-masa-smart-wenghe--4-scaune-oslo-castel-91.md";
  slug: "set-masa-smart-wenghe--4-scaune-oslo-castel-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-smart-wenghe--4-scaune-oslo-royal-velvet-12.md": {
	id: "set-masa-smart-wenghe--4-scaune-oslo-royal-velvet-12.md";
  slug: "set-masa-smart-wenghe--4-scaune-oslo-royal-velvet-12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-smart-wenghe--4-scaune-oslo-royal-velvet-6.md": {
	id: "set-masa-smart-wenghe--4-scaune-oslo-royal-velvet-6.md";
  slug: "set-masa-smart-wenghe--4-scaune-oslo-royal-velvet-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-torino-alba--4-scaune-lima-vardo-19.md": {
	id: "set-masa-torino-alba--4-scaune-lima-vardo-19.md";
  slug: "set-masa-torino-alba--4-scaune-lima-vardo-19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-torino-alba--4-scaune-lima-vardo-35.md": {
	id: "set-masa-torino-alba--4-scaune-lima-vardo-35.md";
  slug: "set-masa-torino-alba--4-scaune-lima-vardo-35";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-torino-alba--4-scaune-lima-vardo-43.md": {
	id: "set-masa-torino-alba--4-scaune-lima-vardo-43.md";
  slug: "set-masa-torino-alba--4-scaune-lima-vardo-43";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-torino-alba--4-scaune-lima-vardo-6.md": {
	id: "set-masa-torino-alba--4-scaune-lima-vardo-6.md";
  slug: "set-masa-torino-alba--4-scaune-lima-vardo-6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-eco-crem.md": {
	id: "set-masa-venetia-extensibila--6-scaune-eco-crem.md";
  slug: "set-masa-venetia-extensibila--6-scaune-eco-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-eco-savio-16.md": {
	id: "set-masa-venetia-extensibila--6-scaune-eco-savio-16.md";
  slug: "set-masa-venetia-extensibila--6-scaune-eco-savio-16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-eco-savio-38.md": {
	id: "set-masa-venetia-extensibila--6-scaune-eco-savio-38.md";
  slug: "set-masa-venetia-extensibila--6-scaune-eco-savio-38";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-eco-wenge.md": {
	id: "set-masa-venetia-extensibila--6-scaune-eco-wenge.md";
  slug: "set-masa-venetia-extensibila--6-scaune-eco-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-wog-castel-20.md": {
	id: "set-masa-venetia-extensibila--6-scaune-wog-castel-20.md";
  slug: "set-masa-venetia-extensibila--6-scaune-wog-castel-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-wog-moric-2.md": {
	id: "set-masa-venetia-extensibila--6-scaune-wog-moric-2.md";
  slug: "set-masa-venetia-extensibila--6-scaune-wog-moric-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-wog-vardo-11.md": {
	id: "set-masa-venetia-extensibila--6-scaune-wog-vardo-11.md";
  slug: "set-masa-venetia-extensibila--6-scaune-wog-vardo-11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-masa-venetia-extensibila--6-scaune-wog-vardo-43.md": {
	id: "set-masa-venetia-extensibila--6-scaune-wog-vardo-43.md";
  slug: "set-masa-venetia-extensibila--6-scaune-wog-vardo-43";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-140300-albstejar---c29.md": {
	id: "set-mobila-bucatarie-colt-gastro-140300-albstejar---c29.md";
  slug: "set-mobila-bucatarie-colt-gastro-140300-albstejar---c29";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-180220-albstejar---c26.md": {
	id: "set-mobila-bucatarie-colt-gastro-180220-albstejar---c26.md";
  slug: "set-mobila-bucatarie-colt-gastro-180220-albstejar---c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-180220-albstejar---c40.md": {
	id: "set-mobila-bucatarie-colt-gastro-180220-albstejar---c40.md";
  slug: "set-mobila-bucatarie-colt-gastro-180220-albstejar---c40";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-180280-albstejar---c25.md": {
	id: "set-mobila-bucatarie-colt-gastro-180280-albstejar---c25.md";
  slug: "set-mobila-bucatarie-colt-gastro-180280-albstejar---c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-240240-albstejar---c27.md": {
	id: "set-mobila-bucatarie-colt-gastro-240240-albstejar---c27.md";
  slug: "set-mobila-bucatarie-colt-gastro-240240-albstejar---c27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-250320-albstejar---c41.md": {
	id: "set-mobila-bucatarie-colt-gastro-250320-albstejar---c41.md";
  slug: "set-mobila-bucatarie-colt-gastro-250320-albstejar---c41";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-300160-albstejar---c31.md": {
	id: "set-mobila-bucatarie-colt-gastro-300160-albstejar---c31.md";
  slug: "set-mobila-bucatarie-colt-gastro-300160-albstejar---c31";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-300210-albstejar---c37.md": {
	id: "set-mobila-bucatarie-colt-gastro-300210-albstejar---c37.md";
  slug: "set-mobila-bucatarie-colt-gastro-300210-albstejar---c37";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-gastro-300240-albstejar---c28.md": {
	id: "set-mobila-bucatarie-colt-gastro-300240-albstejar---c28.md";
  slug: "set-mobila-bucatarie-colt-gastro-300240-albstejar---c28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-140300-albferrara---c29.md": {
	id: "set-mobila-bucatarie-colt-mina-140300-albferrara---c29.md";
  slug: "set-mobila-bucatarie-colt-mina-140300-albferrara---c29";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-180220-albferrara---c26.md": {
	id: "set-mobila-bucatarie-colt-mina-180220-albferrara---c26.md";
  slug: "set-mobila-bucatarie-colt-mina-180220-albferrara---c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-180220-albferrara--c40.md": {
	id: "set-mobila-bucatarie-colt-mina-180220-albferrara--c40.md";
  slug: "set-mobila-bucatarie-colt-mina-180220-albferrara--c40";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-180260-albferrara---c25.md": {
	id: "set-mobila-bucatarie-colt-mina-180260-albferrara---c25.md";
  slug: "set-mobila-bucatarie-colt-mina-180260-albferrara---c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-240240-albferrara---c27.md": {
	id: "set-mobila-bucatarie-colt-mina-240240-albferrara---c27.md";
  slug: "set-mobila-bucatarie-colt-mina-240240-albferrara---c27";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-280160-albferrara---c31.md": {
	id: "set-mobila-bucatarie-colt-mina-280160-albferrara---c31.md";
  slug: "set-mobila-bucatarie-colt-mina-280160-albferrara---c31";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-280280-albferrara---c36.md": {
	id: "set-mobila-bucatarie-colt-mina-280280-albferrara---c36.md";
  slug: "set-mobila-bucatarie-colt-mina-280280-albferrara---c36";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-300210-albferrara---c37.md": {
	id: "set-mobila-bucatarie-colt-mina-300210-albferrara---c37.md";
  slug: "set-mobila-bucatarie-colt-mina-300210-albferrara---c37";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-300240-albferrara---c28.md": {
	id: "set-mobila-bucatarie-colt-mina-300240-albferrara---c28.md";
  slug: "set-mobila-bucatarie-colt-mina-300240-albferrara---c28";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-300300-albferrara---c32.md": {
	id: "set-mobila-bucatarie-colt-mina-300300-albferrara---c32.md";
  slug: "set-mobila-bucatarie-colt-mina-300300-albferrara---c32";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-140300-gri-antracitalb-c115.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-140300-gri-antracitalb-c115.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-140300-gri-antracitalb-c115";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-180220-gri-antracitalb-c112.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-180220-gri-antracitalb-c112.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-180220-gri-antracitalb-c112";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-180220-gri-antracitalb-c120.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-180220-gri-antracitalb-c120.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-180220-gri-antracitalb-c120";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-180260-gri-antracitalb-c111.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-180260-gri-antracitalb-c111.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-180260-gri-antracitalb-c111";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-240240-gri-antracitalb-c113.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-240240-gri-antracitalb-c113.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-240240-gri-antracitalb-c113";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-280160-gri-antracitalb-c116.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-280160-gri-antracitalb-c116.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-280160-gri-antracitalb-c116";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-280280-gri-antracitalb-c118.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-280280-gri-antracitalb-c118.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-280280-gri-antracitalb-c118";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-300210-gri-antracitalb-c119.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-300210-gri-antracitalb-c119.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-300210-gri-antracitalb-c119";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-300240-gri-antracitalb-c114.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-300240-gri-antracitalb-c114.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-300240-gri-antracitalb-c114";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-dual-300300-gri-antracitalb-c117.md": {
	id: "set-mobila-bucatarie-colt-mina-dual-300300-gri-antracitalb-c117.md";
  slug: "set-mobila-bucatarie-colt-mina-dual-300300-gri-antracitalb-c117";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-140300-gri-antracit---c89.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-140300-gri-antracit---c89.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-140300-gri-antracit---c89";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-180220-gri-antracit---c86.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-180220-gri-antracit---c86.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-180220-gri-antracit---c86";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-180220-gri-antracit---c94.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-180220-gri-antracit---c94.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-180220-gri-antracit---c94";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-180260-gri-antracit---c85.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-180260-gri-antracit---c85.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-180260-gri-antracit---c85";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-240240-gri-antracit---c87.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-240240-gri-antracit---c87.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-240240-gri-antracit---c87";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-280160-gri-antracit---c90.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-280160-gri-antracit---c90.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-280160-gri-antracit---c90";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-280280-gri-antracit---c92.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-280280-gri-antracit---c92.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-280280-gri-antracit---c92";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-300210-gri-antracit---c93.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-300210-gri-antracit---c93.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-300210-gri-antracit---c93";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-300240-gri-antracit---c88.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-300240-gri-antracit---c88.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-300240-gri-antracit---c88";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-grafit-300300-gri-antracit---c91.md": {
	id: "set-mobila-bucatarie-colt-mina-grafit-300300-gri-antracit---c91.md";
  slug: "set-mobila-bucatarie-colt-mina-grafit-300300-gri-antracit---c91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-140300-alb-c62.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-140300-alb-c62.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-140300-alb-c62";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-180220-alb-c59.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-180220-alb-c59.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-180220-alb-c59";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-180220-alb-c67.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-180220-alb-c67.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-180220-alb-c67";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-180260-alb-c58.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-180260-alb-c58.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-180260-alb-c58";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-240240-alb-c60.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-240240-alb-c60.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-240240-alb-c60";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-280160-alb-c63.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-280160-alb-c63.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-280160-alb-c63";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-280280-alb-c65.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-280280-alb-c65.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-280280-alb-c65";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-300210-alb-c66.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-300210-alb-c66.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-300210-alb-c66";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-300240-alb-c61.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-300240-alb-c61.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-300240-alb-c61";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-pure-300300-alb-c64.md": {
	id: "set-mobila-bucatarie-colt-mina-pure-300300-alb-c64.md";
  slug: "set-mobila-bucatarie-colt-mina-pure-300300-alb-c64";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-140300-ferraraalb-c143.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-140300-ferraraalb-c143.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-140300-ferraraalb-c143";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-180220-ferraraalb-c140.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-180220-ferraraalb-c140.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-180220-ferraraalb-c140";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-180220-ferraraalb-c148.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-180220-ferraraalb-c148.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-180220-ferraraalb-c148";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-180260-ferraraalb-c139.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-180260-ferraraalb-c139.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-180260-ferraraalb-c139";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-240240-ferraraalb-c141.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-240240-ferraraalb-c141.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-240240-ferraraalb-c141";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-280160-ferraraalb-c144.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-280160-ferraraalb-c144.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-280160-ferraraalb-c144";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-280280-ferraraalb-c146.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-280280-ferraraalb-c146.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-280280-ferraraalb-c146";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-300210-ferraraalb-c147.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-300210-ferraraalb-c147.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-300210-ferraraalb-c147";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-300240-ferraraalb-c142.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-300240-ferraraalb-c142.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-300240-ferraraalb-c142";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-colt-mina-yang-300300-ferraraalb-c145.md": {
	id: "set-mobila-bucatarie-colt-mina-yang-300300-ferraraalb-c145.md";
  slug: "set-mobila-bucatarie-colt-mina-yang-300300-ferraraalb-c145";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-110-albstejar---c17.md": {
	id: "set-mobila-bucatarie-gastro-110-albstejar---c17.md";
  slug: "set-mobila-bucatarie-gastro-110-albstejar---c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-120-albstejar---c19.md": {
	id: "set-mobila-bucatarie-gastro-120-albstejar---c19.md";
  slug: "set-mobila-bucatarie-gastro-120-albstejar---c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-140-albstejar---c09.md": {
	id: "set-mobila-bucatarie-gastro-140-albstejar---c09.md";
  slug: "set-mobila-bucatarie-gastro-140-albstejar---c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-160-albstejar---c07.md": {
	id: "set-mobila-bucatarie-gastro-160-albstejar---c07.md";
  slug: "set-mobila-bucatarie-gastro-160-albstejar---c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-160-albstejar---c21.md": {
	id: "set-mobila-bucatarie-gastro-160-albstejar---c21.md";
  slug: "set-mobila-bucatarie-gastro-160-albstejar---c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-170-albstejar---c14.md": {
	id: "set-mobila-bucatarie-gastro-170-albstejar---c14.md";
  slug: "set-mobila-bucatarie-gastro-170-albstejar---c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-180-albstejar---c05.md": {
	id: "set-mobila-bucatarie-gastro-180-albstejar---c05.md";
  slug: "set-mobila-bucatarie-gastro-180-albstejar---c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-200-albstejar---c01.md": {
	id: "set-mobila-bucatarie-gastro-200-albstejar---c01.md";
  slug: "set-mobila-bucatarie-gastro-200-albstejar---c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-200-albstejar---c08.md": {
	id: "set-mobila-bucatarie-gastro-200-albstejar---c08.md";
  slug: "set-mobila-bucatarie-gastro-200-albstejar---c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-200-albstejar---c22.md": {
	id: "set-mobila-bucatarie-gastro-200-albstejar---c22.md";
  slug: "set-mobila-bucatarie-gastro-200-albstejar---c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-220-albstejar---c06.md": {
	id: "set-mobila-bucatarie-gastro-220-albstejar---c06.md";
  slug: "set-mobila-bucatarie-gastro-220-albstejar---c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-220-albstejar---c20.md": {
	id: "set-mobila-bucatarie-gastro-220-albstejar---c20.md";
  slug: "set-mobila-bucatarie-gastro-220-albstejar---c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-230-albstejar---c13.md": {
	id: "set-mobila-bucatarie-gastro-230-albstejar---c13.md";
  slug: "set-mobila-bucatarie-gastro-230-albstejar---c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-240-albstejar---c02.md": {
	id: "set-mobila-bucatarie-gastro-240-albstejar---c02.md";
  slug: "set-mobila-bucatarie-gastro-240-albstejar---c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-240-albstejar---c04.md": {
	id: "set-mobila-bucatarie-gastro-240-albstejar---c04.md";
  slug: "set-mobila-bucatarie-gastro-240-albstejar---c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-240-albstejar---c23.md": {
	id: "set-mobila-bucatarie-gastro-240-albstejar---c23.md";
  slug: "set-mobila-bucatarie-gastro-240-albstejar---c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-260-albstejar---c03.md": {
	id: "set-mobila-bucatarie-gastro-260-albstejar---c03.md";
  slug: "set-mobila-bucatarie-gastro-260-albstejar---c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-260-albstejar---c10.md": {
	id: "set-mobila-bucatarie-gastro-260-albstejar---c10.md";
  slug: "set-mobila-bucatarie-gastro-260-albstejar---c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-260-albstejar---c15.md": {
	id: "set-mobila-bucatarie-gastro-260-albstejar---c15.md";
  slug: "set-mobila-bucatarie-gastro-260-albstejar---c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-gastro-260-albstejar---c24.md": {
	id: "set-mobila-bucatarie-gastro-260-albstejar---c24.md";
  slug: "set-mobila-bucatarie-gastro-260-albstejar---c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-110-albferrara-c14.md": {
	id: "set-mobila-bucatarie-mina-110-albferrara-c14.md";
  slug: "set-mobila-bucatarie-mina-110-albferrara-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-120-albferrara-c13.md": {
	id: "set-mobila-bucatarie-mina-120-albferrara-c13.md";
  slug: "set-mobila-bucatarie-mina-120-albferrara-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-140-albferrara-c07.md": {
	id: "set-mobila-bucatarie-mina-140-albferrara-c07.md";
  slug: "set-mobila-bucatarie-mina-140-albferrara-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-160-albferrara-c10.md": {
	id: "set-mobila-bucatarie-mina-160-albferrara-c10.md";
  slug: "set-mobila-bucatarie-mina-160-albferrara-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-180-albferrara-c05.md": {
	id: "set-mobila-bucatarie-mina-180-albferrara-c05.md";
  slug: "set-mobila-bucatarie-mina-180-albferrara-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-180-albferrara-c12.md": {
	id: "set-mobila-bucatarie-mina-180-albferrara-c12.md";
  slug: "set-mobila-bucatarie-mina-180-albferrara-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-200-albferrara-c01.md": {
	id: "set-mobila-bucatarie-mina-200-albferrara-c01.md";
  slug: "set-mobila-bucatarie-mina-200-albferrara-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-200-albferrara-c08.md": {
	id: "set-mobila-bucatarie-mina-200-albferrara-c08.md";
  slug: "set-mobila-bucatarie-mina-200-albferrara-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-220-albferrara-c09.md": {
	id: "set-mobila-bucatarie-mina-220-albferrara-c09.md";
  slug: "set-mobila-bucatarie-mina-220-albferrara-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-220-albferrara-c24.md": {
	id: "set-mobila-bucatarie-mina-220-albferrara-c24.md";
  slug: "set-mobila-bucatarie-mina-220-albferrara-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-230-albferrara-c23.md": {
	id: "set-mobila-bucatarie-mina-230-albferrara-c23.md";
  slug: "set-mobila-bucatarie-mina-230-albferrara-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-240-albferrara-c02.md": {
	id: "set-mobila-bucatarie-mina-240-albferrara-c02.md";
  slug: "set-mobila-bucatarie-mina-240-albferrara-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-240-albferrara-c06.md": {
	id: "set-mobila-bucatarie-mina-240-albferrara-c06.md";
  slug: "set-mobila-bucatarie-mina-240-albferrara-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-244-albferrara-c04.md": {
	id: "set-mobila-bucatarie-mina-244-albferrara-c04.md";
  slug: "set-mobila-bucatarie-mina-244-albferrara-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-244-albferrara-c15.md": {
	id: "set-mobila-bucatarie-mina-244-albferrara-c15.md";
  slug: "set-mobila-bucatarie-mina-244-albferrara-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-260-albferrara-c03.md": {
	id: "set-mobila-bucatarie-mina-260-albferrara-c03.md";
  slug: "set-mobila-bucatarie-mina-260-albferrara-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-260-albferrara-c20.md": {
	id: "set-mobila-bucatarie-mina-260-albferrara-c20.md";
  slug: "set-mobila-bucatarie-mina-260-albferrara-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-110-gri-antracitalb-c107.md": {
	id: "set-mobila-bucatarie-mina-dual-110-gri-antracitalb-c107.md";
  slug: "set-mobila-bucatarie-mina-dual-110-gri-antracitalb-c107";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-120-gri-antracitalb-c106.md": {
	id: "set-mobila-bucatarie-mina-dual-120-gri-antracitalb-c106.md";
  slug: "set-mobila-bucatarie-mina-dual-120-gri-antracitalb-c106";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-140-gri-antracitalb-c101.md": {
	id: "set-mobila-bucatarie-mina-dual-140-gri-antracitalb-c101.md";
  slug: "set-mobila-bucatarie-mina-dual-140-gri-antracitalb-c101";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-160-gri-antracitalb-c104.md": {
	id: "set-mobila-bucatarie-mina-dual-160-gri-antracitalb-c104.md";
  slug: "set-mobila-bucatarie-mina-dual-160-gri-antracitalb-c104";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-180-gri-antracitalb-c105.md": {
	id: "set-mobila-bucatarie-mina-dual-180-gri-antracitalb-c105.md";
  slug: "set-mobila-bucatarie-mina-dual-180-gri-antracitalb-c105";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-180-gri-antracitalb-c99.md": {
	id: "set-mobila-bucatarie-mina-dual-180-gri-antracitalb-c99.md";
  slug: "set-mobila-bucatarie-mina-dual-180-gri-antracitalb-c99";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-200-gri-antracitalb-c102.md": {
	id: "set-mobila-bucatarie-mina-dual-200-gri-antracitalb-c102.md";
  slug: "set-mobila-bucatarie-mina-dual-200-gri-antracitalb-c102";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-200-gri-antracitalb-c95.md": {
	id: "set-mobila-bucatarie-mina-dual-200-gri-antracitalb-c95.md";
  slug: "set-mobila-bucatarie-mina-dual-200-gri-antracitalb-c95";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-220-gri-antracitalb-c103.md": {
	id: "set-mobila-bucatarie-mina-dual-220-gri-antracitalb-c103.md";
  slug: "set-mobila-bucatarie-mina-dual-220-gri-antracitalb-c103";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-220-gri-antracitalb-c110.md": {
	id: "set-mobila-bucatarie-mina-dual-220-gri-antracitalb-c110.md";
  slug: "set-mobila-bucatarie-mina-dual-220-gri-antracitalb-c110";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-230-gri-antracitalb-c109.md": {
	id: "set-mobila-bucatarie-mina-dual-230-gri-antracitalb-c109.md";
  slug: "set-mobila-bucatarie-mina-dual-230-gri-antracitalb-c109";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-240-gri-antracitalb-c100.md": {
	id: "set-mobila-bucatarie-mina-dual-240-gri-antracitalb-c100.md";
  slug: "set-mobila-bucatarie-mina-dual-240-gri-antracitalb-c100";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-240-gri-antracitalb-c96.md": {
	id: "set-mobila-bucatarie-mina-dual-240-gri-antracitalb-c96.md";
  slug: "set-mobila-bucatarie-mina-dual-240-gri-antracitalb-c96";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-244-gri-antracitalb-c121.md": {
	id: "set-mobila-bucatarie-mina-dual-244-gri-antracitalb-c121.md";
  slug: "set-mobila-bucatarie-mina-dual-244-gri-antracitalb-c121";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-244-gri-antracitalb-c98.md": {
	id: "set-mobila-bucatarie-mina-dual-244-gri-antracitalb-c98.md";
  slug: "set-mobila-bucatarie-mina-dual-244-gri-antracitalb-c98";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-260-gri-antracitalb-c108.md": {
	id: "set-mobila-bucatarie-mina-dual-260-gri-antracitalb-c108.md";
  slug: "set-mobila-bucatarie-mina-dual-260-gri-antracitalb-c108";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-dual-260-gri-antracitalb-c97.md": {
	id: "set-mobila-bucatarie-mina-dual-260-gri-antracitalb-c97.md";
  slug: "set-mobila-bucatarie-mina-dual-260-gri-antracitalb-c97";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-110-gri-antracit-c80.md": {
	id: "set-mobila-bucatarie-mina-grafit-110-gri-antracit-c80.md";
  slug: "set-mobila-bucatarie-mina-grafit-110-gri-antracit-c80";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-120-gri-antracit-c79.md": {
	id: "set-mobila-bucatarie-mina-grafit-120-gri-antracit-c79.md";
  slug: "set-mobila-bucatarie-mina-grafit-120-gri-antracit-c79";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-140-gri-antracit-c74.md": {
	id: "set-mobila-bucatarie-mina-grafit-140-gri-antracit-c74.md";
  slug: "set-mobila-bucatarie-mina-grafit-140-gri-antracit-c74";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-160-gri-antracit-c77.md": {
	id: "set-mobila-bucatarie-mina-grafit-160-gri-antracit-c77.md";
  slug: "set-mobila-bucatarie-mina-grafit-160-gri-antracit-c77";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-180-gri-antracit-c72.md": {
	id: "set-mobila-bucatarie-mina-grafit-180-gri-antracit-c72.md";
  slug: "set-mobila-bucatarie-mina-grafit-180-gri-antracit-c72";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-180-gri-antracit-c78.md": {
	id: "set-mobila-bucatarie-mina-grafit-180-gri-antracit-c78.md";
  slug: "set-mobila-bucatarie-mina-grafit-180-gri-antracit-c78";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-200-gri-antracit-c68.md": {
	id: "set-mobila-bucatarie-mina-grafit-200-gri-antracit-c68.md";
  slug: "set-mobila-bucatarie-mina-grafit-200-gri-antracit-c68";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-200-gri-antracit-c75.md": {
	id: "set-mobila-bucatarie-mina-grafit-200-gri-antracit-c75.md";
  slug: "set-mobila-bucatarie-mina-grafit-200-gri-antracit-c75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-220-gri-antracit-c76.md": {
	id: "set-mobila-bucatarie-mina-grafit-220-gri-antracit-c76.md";
  slug: "set-mobila-bucatarie-mina-grafit-220-gri-antracit-c76";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-220-gri-antracit-c84.md": {
	id: "set-mobila-bucatarie-mina-grafit-220-gri-antracit-c84.md";
  slug: "set-mobila-bucatarie-mina-grafit-220-gri-antracit-c84";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-230-gri-antracit-c83.md": {
	id: "set-mobila-bucatarie-mina-grafit-230-gri-antracit-c83.md";
  slug: "set-mobila-bucatarie-mina-grafit-230-gri-antracit-c83";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-240-gri-antracit-c69.md": {
	id: "set-mobila-bucatarie-mina-grafit-240-gri-antracit-c69.md";
  slug: "set-mobila-bucatarie-mina-grafit-240-gri-antracit-c69";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-240-gri-antracit-c73.md": {
	id: "set-mobila-bucatarie-mina-grafit-240-gri-antracit-c73.md";
  slug: "set-mobila-bucatarie-mina-grafit-240-gri-antracit-c73";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-244-gri-antracit-c71.md": {
	id: "set-mobila-bucatarie-mina-grafit-244-gri-antracit-c71.md";
  slug: "set-mobila-bucatarie-mina-grafit-244-gri-antracit-c71";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-244-gri-antracit-c81.md": {
	id: "set-mobila-bucatarie-mina-grafit-244-gri-antracit-c81.md";
  slug: "set-mobila-bucatarie-mina-grafit-244-gri-antracit-c81";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-260-gri-antracit-c70.md": {
	id: "set-mobila-bucatarie-mina-grafit-260-gri-antracit-c70.md";
  slug: "set-mobila-bucatarie-mina-grafit-260-gri-antracit-c70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-grafit-260-gri-antracit-c82.md": {
	id: "set-mobila-bucatarie-mina-grafit-260-gri-antracit-c82.md";
  slug: "set-mobila-bucatarie-mina-grafit-260-gri-antracit-c82";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-110-alb-c53.md": {
	id: "set-mobila-bucatarie-mina-pure-110-alb-c53.md";
  slug: "set-mobila-bucatarie-mina-pure-110-alb-c53";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-120-alb-c52.md": {
	id: "set-mobila-bucatarie-mina-pure-120-alb-c52.md";
  slug: "set-mobila-bucatarie-mina-pure-120-alb-c52";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-140-alb-c47.md": {
	id: "set-mobila-bucatarie-mina-pure-140-alb-c47.md";
  slug: "set-mobila-bucatarie-mina-pure-140-alb-c47";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-160-alb-c50.md": {
	id: "set-mobila-bucatarie-mina-pure-160-alb-c50.md";
  slug: "set-mobila-bucatarie-mina-pure-160-alb-c50";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-180-alb-c45.md": {
	id: "set-mobila-bucatarie-mina-pure-180-alb-c45.md";
  slug: "set-mobila-bucatarie-mina-pure-180-alb-c45";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-180-alb-c51.md": {
	id: "set-mobila-bucatarie-mina-pure-180-alb-c51.md";
  slug: "set-mobila-bucatarie-mina-pure-180-alb-c51";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-200-alb-c41.md": {
	id: "set-mobila-bucatarie-mina-pure-200-alb-c41.md";
  slug: "set-mobila-bucatarie-mina-pure-200-alb-c41";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-200-alb-c48.md": {
	id: "set-mobila-bucatarie-mina-pure-200-alb-c48.md";
  slug: "set-mobila-bucatarie-mina-pure-200-alb-c48";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-220-alb-c49.md": {
	id: "set-mobila-bucatarie-mina-pure-220-alb-c49.md";
  slug: "set-mobila-bucatarie-mina-pure-220-alb-c49";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-220-alb-c57.md": {
	id: "set-mobila-bucatarie-mina-pure-220-alb-c57.md";
  slug: "set-mobila-bucatarie-mina-pure-220-alb-c57";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-230-alb-c56.md": {
	id: "set-mobila-bucatarie-mina-pure-230-alb-c56.md";
  slug: "set-mobila-bucatarie-mina-pure-230-alb-c56";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-240-alb-c42.md": {
	id: "set-mobila-bucatarie-mina-pure-240-alb-c42.md";
  slug: "set-mobila-bucatarie-mina-pure-240-alb-c42";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-240-alb-c46.md": {
	id: "set-mobila-bucatarie-mina-pure-240-alb-c46.md";
  slug: "set-mobila-bucatarie-mina-pure-240-alb-c46";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-244-alb-c44.md": {
	id: "set-mobila-bucatarie-mina-pure-244-alb-c44.md";
  slug: "set-mobila-bucatarie-mina-pure-244-alb-c44";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-244-alb-c54.md": {
	id: "set-mobila-bucatarie-mina-pure-244-alb-c54.md";
  slug: "set-mobila-bucatarie-mina-pure-244-alb-c54";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-260-alb-c43.md": {
	id: "set-mobila-bucatarie-mina-pure-260-alb-c43.md";
  slug: "set-mobila-bucatarie-mina-pure-260-alb-c43";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-pure-260-alb-c55.md": {
	id: "set-mobila-bucatarie-mina-pure-260-alb-c55.md";
  slug: "set-mobila-bucatarie-mina-pure-260-alb-c55";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-110-ferraraalb-c134.md": {
	id: "set-mobila-bucatarie-mina-yang-110-ferraraalb-c134.md";
  slug: "set-mobila-bucatarie-mina-yang-110-ferraraalb-c134";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-120-ferraraalb-c133.md": {
	id: "set-mobila-bucatarie-mina-yang-120-ferraraalb-c133.md";
  slug: "set-mobila-bucatarie-mina-yang-120-ferraraalb-c133";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-140-ferraraalb-c128.md": {
	id: "set-mobila-bucatarie-mina-yang-140-ferraraalb-c128.md";
  slug: "set-mobila-bucatarie-mina-yang-140-ferraraalb-c128";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-160-ferraraalb-c131.md": {
	id: "set-mobila-bucatarie-mina-yang-160-ferraraalb-c131.md";
  slug: "set-mobila-bucatarie-mina-yang-160-ferraraalb-c131";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-180-ferraraalb-c126.md": {
	id: "set-mobila-bucatarie-mina-yang-180-ferraraalb-c126.md";
  slug: "set-mobila-bucatarie-mina-yang-180-ferraraalb-c126";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-180-ferraraalb-c132.md": {
	id: "set-mobila-bucatarie-mina-yang-180-ferraraalb-c132.md";
  slug: "set-mobila-bucatarie-mina-yang-180-ferraraalb-c132";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-200-ferraraalb-c122.md": {
	id: "set-mobila-bucatarie-mina-yang-200-ferraraalb-c122.md";
  slug: "set-mobila-bucatarie-mina-yang-200-ferraraalb-c122";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-200-ferraraalb-c129.md": {
	id: "set-mobila-bucatarie-mina-yang-200-ferraraalb-c129.md";
  slug: "set-mobila-bucatarie-mina-yang-200-ferraraalb-c129";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-220-ferraraalb-c130.md": {
	id: "set-mobila-bucatarie-mina-yang-220-ferraraalb-c130.md";
  slug: "set-mobila-bucatarie-mina-yang-220-ferraraalb-c130";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-220-ferraraalb-c138.md": {
	id: "set-mobila-bucatarie-mina-yang-220-ferraraalb-c138.md";
  slug: "set-mobila-bucatarie-mina-yang-220-ferraraalb-c138";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-230-ferraraalb-c137.md": {
	id: "set-mobila-bucatarie-mina-yang-230-ferraraalb-c137.md";
  slug: "set-mobila-bucatarie-mina-yang-230-ferraraalb-c137";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-240-ferraraalb-c123.md": {
	id: "set-mobila-bucatarie-mina-yang-240-ferraraalb-c123.md";
  slug: "set-mobila-bucatarie-mina-yang-240-ferraraalb-c123";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-240-ferraraalb-c127.md": {
	id: "set-mobila-bucatarie-mina-yang-240-ferraraalb-c127.md";
  slug: "set-mobila-bucatarie-mina-yang-240-ferraraalb-c127";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-244-ferraraalb-c125.md": {
	id: "set-mobila-bucatarie-mina-yang-244-ferraraalb-c125.md";
  slug: "set-mobila-bucatarie-mina-yang-244-ferraraalb-c125";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-244-ferraraalb-c135.md": {
	id: "set-mobila-bucatarie-mina-yang-244-ferraraalb-c135.md";
  slug: "set-mobila-bucatarie-mina-yang-244-ferraraalb-c135";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-260-ferraraalb-c124.md": {
	id: "set-mobila-bucatarie-mina-yang-260-ferraraalb-c124.md";
  slug: "set-mobila-bucatarie-mina-yang-260-ferraraalb-c124";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-bucatarie-mina-yang-260-ferraraalb-c136.md": {
	id: "set-mobila-bucatarie-mina-yang-260-ferraraalb-c136.md";
  slug: "set-mobila-bucatarie-mina-yang-260-ferraraalb-c136";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-camera-tineret-mihai-c01.md": {
	id: "set-mobila-camera-tineret-mihai-c01.md";
  slug: "set-mobila-camera-tineret-mihai-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-camera-tineret-mihai-c02.md": {
	id: "set-mobila-camera-tineret-mihai-c02.md";
  slug: "set-mobila-camera-tineret-mihai-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-camera-tineret-mihai-c03.md": {
	id: "set-mobila-camera-tineret-mihai-c03.md";
  slug: "set-mobila-camera-tineret-mihai-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-camera-tineret-mihai-c04.md": {
	id: "set-mobila-camera-tineret-mihai-c04.md";
  slug: "set-mobila-camera-tineret-mihai-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-camera-tineret-mihai-c05.md": {
	id: "set-mobila-camera-tineret-mihai-c05.md";
  slug: "set-mobila-camera-tineret-mihai-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-camera-tineret-mihai-c06.md": {
	id: "set-mobila-camera-tineret-mihai-c06.md";
  slug: "set-mobila-camera-tineret-mihai-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-alb-noel-tapitat-cu-oglinda-c1.md": {
	id: "set-mobila-dormitor-alb-noel-tapitat-cu-oglinda-c1.md";
  slug: "set-mobila-dormitor-alb-noel-tapitat-cu-oglinda-c1";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-alb-noel-tapitat-cu-oglinda-c2.md": {
	id: "set-mobila-dormitor-alb-noel-tapitat-cu-oglinda-c2.md";
  slug: "set-mobila-dormitor-alb-noel-tapitat-cu-oglinda-c2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c01.md": {
	id: "set-mobila-dormitor-avangard-c01.md";
  slug: "set-mobila-dormitor-avangard-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c02.md": {
	id: "set-mobila-dormitor-avangard-c02.md";
  slug: "set-mobila-dormitor-avangard-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c03-cu-oglinda.md": {
	id: "set-mobila-dormitor-avangard-c03-cu-oglinda.md";
  slug: "set-mobila-dormitor-avangard-c03-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c04.md": {
	id: "set-mobila-dormitor-avangard-c04.md";
  slug: "set-mobila-dormitor-avangard-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c05.md": {
	id: "set-mobila-dormitor-avangard-c05.md";
  slug: "set-mobila-dormitor-avangard-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c06-cu-oglinda.md": {
	id: "set-mobila-dormitor-avangard-c06-cu-oglinda.md";
  slug: "set-mobila-dormitor-avangard-c06-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c07-tapitat.md": {
	id: "set-mobila-dormitor-avangard-c07-tapitat.md";
  slug: "set-mobila-dormitor-avangard-c07-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c08-tapitat.md": {
	id: "set-mobila-dormitor-avangard-c08-tapitat.md";
  slug: "set-mobila-dormitor-avangard-c08-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c09-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-avangard-c09-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-avangard-c09-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c10-tapitat.md": {
	id: "set-mobila-dormitor-avangard-c10-tapitat.md";
  slug: "set-mobila-dormitor-avangard-c10-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c11-tapitat.md": {
	id: "set-mobila-dormitor-avangard-c11-tapitat.md";
  slug: "set-mobila-dormitor-avangard-c11-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c12-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-avangard-c12-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-avangard-c12-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c13.md": {
	id: "set-mobila-dormitor-avangard-c13.md";
  slug: "set-mobila-dormitor-avangard-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c14.md": {
	id: "set-mobila-dormitor-avangard-c14.md";
  slug: "set-mobila-dormitor-avangard-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-avangard-c15-cu-oglinda.md": {
	id: "set-mobila-dormitor-avangard-c15-cu-oglinda.md";
  slug: "set-mobila-dormitor-avangard-c15-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c01.md": {
	id: "set-mobila-dormitor-benjamin-c01.md";
  slug: "set-mobila-dormitor-benjamin-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c02.md": {
	id: "set-mobila-dormitor-benjamin-c02.md";
  slug: "set-mobila-dormitor-benjamin-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c03.md": {
	id: "set-mobila-dormitor-benjamin-c03.md";
  slug: "set-mobila-dormitor-benjamin-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c04-cu-oglinda.md": {
	id: "set-mobila-dormitor-benjamin-c04-cu-oglinda.md";
  slug: "set-mobila-dormitor-benjamin-c04-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c05.md": {
	id: "set-mobila-dormitor-benjamin-c05.md";
  slug: "set-mobila-dormitor-benjamin-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c06.md": {
	id: "set-mobila-dormitor-benjamin-c06.md";
  slug: "set-mobila-dormitor-benjamin-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c07.md": {
	id: "set-mobila-dormitor-benjamin-c07.md";
  slug: "set-mobila-dormitor-benjamin-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c08.md": {
	id: "set-mobila-dormitor-benjamin-c08.md";
  slug: "set-mobila-dormitor-benjamin-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c09-cu-oglinda.md": {
	id: "set-mobila-dormitor-benjamin-c09-cu-oglinda.md";
  slug: "set-mobila-dormitor-benjamin-c09-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c10.md": {
	id: "set-mobila-dormitor-benjamin-c10.md";
  slug: "set-mobila-dormitor-benjamin-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c11-tapitat.md": {
	id: "set-mobila-dormitor-benjamin-c11-tapitat.md";
  slug: "set-mobila-dormitor-benjamin-c11-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c12-tapitat.md": {
	id: "set-mobila-dormitor-benjamin-c12-tapitat.md";
  slug: "set-mobila-dormitor-benjamin-c12-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c13-tapitat.md": {
	id: "set-mobila-dormitor-benjamin-c13-tapitat.md";
  slug: "set-mobila-dormitor-benjamin-c13-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c14-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-benjamin-c14-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-benjamin-c14-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c15-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-benjamin-c15-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-benjamin-c15-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c16-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-benjamin-c16-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-benjamin-c16-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c17-tapitat.md": {
	id: "set-mobila-dormitor-benjamin-c17-tapitat.md";
  slug: "set-mobila-dormitor-benjamin-c17-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c18-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-benjamin-c18-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-benjamin-c18-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c19-tapitat.md": {
	id: "set-mobila-dormitor-benjamin-c19-tapitat.md";
  slug: "set-mobila-dormitor-benjamin-c19-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-benjamin-c20-tapitat.md": {
	id: "set-mobila-dormitor-benjamin-c20-tapitat.md";
  slug: "set-mobila-dormitor-benjamin-c20-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-beverley-cu-oglinda.md": {
	id: "set-mobila-dormitor-beverley-cu-oglinda.md";
  slug: "set-mobila-dormitor-beverley-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-beverley-tapitat-cu-oglinda.md": {
	id: "set-mobila-dormitor-beverley-tapitat-cu-oglinda.md";
  slug: "set-mobila-dormitor-beverley-tapitat-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-beverley-tapitat.md": {
	id: "set-mobila-dormitor-beverley-tapitat.md";
  slug: "set-mobila-dormitor-beverley-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-beverley.md": {
	id: "set-mobila-dormitor-beverley.md";
  slug: "set-mobila-dormitor-beverley";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-dulap-dublu.md": {
	id: "set-mobila-dormitor-bingo-f-dulap-dublu.md";
  slug: "set-mobila-dormitor-bingo-f-dulap-dublu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-netapitat---4p.md": {
	id: "set-mobila-dormitor-bingo-f-netapitat---4p.md";
  slug: "set-mobila-dormitor-bingo-f-netapitat---4p";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-netapitat-6-piese.md": {
	id: "set-mobila-dormitor-bingo-f-netapitat-6-piese.md";
  slug: "set-mobila-dormitor-bingo-f-netapitat-6-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-netapitat-7-piese.md": {
	id: "set-mobila-dormitor-bingo-f-netapitat-7-piese.md";
  slug: "set-mobila-dormitor-bingo-f-netapitat-7-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-netapitat.md": {
	id: "set-mobila-dormitor-bingo-f-netapitat.md";
  slug: "set-mobila-dormitor-bingo-f-netapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-alb---4-piese.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-alb---4-piese.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-alb---4-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-alb-6-piese.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-alb-6-piese.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-alb-6-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-alb-7-piese.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-alb-7-piese.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-alb-7-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-alb-dulap-dublu.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-alb-dulap-dublu.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-alb-dulap-dublu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-alb.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-alb.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-wenge---4-piese.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-wenge---4-piese.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-wenge---4-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-wenge-6-piese.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-wenge-6-piese.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-wenge-6-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-wenge-7-piese.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-wenge-7-piese.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-wenge-7-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-wenge-dulap-dublu.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-wenge-dulap-dublu.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-wenge-dulap-dublu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-bingo-f-tapitat-wenge.md": {
	id: "set-mobila-dormitor-bingo-f-tapitat-wenge.md";
  slug: "set-mobila-dormitor-bingo-f-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c01.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c01.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c03.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c03.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c05.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c05.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c06.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c06.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c07.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c07.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c09.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c09.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c11.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c11.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c12.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c12.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c13.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c13.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c15.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c15.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c17.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c17.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-casmir--alb-soares-c18.md": {
	id: "set-mobila-dormitor-casmir--alb-soares-c18.md";
  slug: "set-mobila-dormitor-casmir--alb-soares-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c01.md": {
	id: "set-mobila-dormitor-class-c01.md";
  slug: "set-mobila-dormitor-class-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c02.md": {
	id: "set-mobila-dormitor-class-c02.md";
  slug: "set-mobila-dormitor-class-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c03.md": {
	id: "set-mobila-dormitor-class-c03.md";
  slug: "set-mobila-dormitor-class-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c04.md": {
	id: "set-mobila-dormitor-class-c04.md";
  slug: "set-mobila-dormitor-class-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c05.md": {
	id: "set-mobila-dormitor-class-c05.md";
  slug: "set-mobila-dormitor-class-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c06.md": {
	id: "set-mobila-dormitor-class-c06.md";
  slug: "set-mobila-dormitor-class-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c07.md": {
	id: "set-mobila-dormitor-class-c07.md";
  slug: "set-mobila-dormitor-class-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c08.md": {
	id: "set-mobila-dormitor-class-c08.md";
  slug: "set-mobila-dormitor-class-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c09.md": {
	id: "set-mobila-dormitor-class-c09.md";
  slug: "set-mobila-dormitor-class-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c10.md": {
	id: "set-mobila-dormitor-class-c10.md";
  slug: "set-mobila-dormitor-class-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c11.md": {
	id: "set-mobila-dormitor-class-c11.md";
  slug: "set-mobila-dormitor-class-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c12.md": {
	id: "set-mobila-dormitor-class-c12.md";
  slug: "set-mobila-dormitor-class-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c13.md": {
	id: "set-mobila-dormitor-class-c13.md";
  slug: "set-mobila-dormitor-class-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c14.md": {
	id: "set-mobila-dormitor-class-c14.md";
  slug: "set-mobila-dormitor-class-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c15.md": {
	id: "set-mobila-dormitor-class-c15.md";
  slug: "set-mobila-dormitor-class-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c16.md": {
	id: "set-mobila-dormitor-class-c16.md";
  slug: "set-mobila-dormitor-class-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c17.md": {
	id: "set-mobila-dormitor-class-c17.md";
  slug: "set-mobila-dormitor-class-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c18.md": {
	id: "set-mobila-dormitor-class-c18.md";
  slug: "set-mobila-dormitor-class-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c19.md": {
	id: "set-mobila-dormitor-class-c19.md";
  slug: "set-mobila-dormitor-class-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c20.md": {
	id: "set-mobila-dormitor-class-c20.md";
  slug: "set-mobila-dormitor-class-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c21.md": {
	id: "set-mobila-dormitor-class-c21.md";
  slug: "set-mobila-dormitor-class-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c22.md": {
	id: "set-mobila-dormitor-class-c22.md";
  slug: "set-mobila-dormitor-class-c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c23.md": {
	id: "set-mobila-dormitor-class-c23.md";
  slug: "set-mobila-dormitor-class-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c24.md": {
	id: "set-mobila-dormitor-class-c24.md";
  slug: "set-mobila-dormitor-class-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c25.md": {
	id: "set-mobila-dormitor-class-c25.md";
  slug: "set-mobila-dormitor-class-c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-class-c26.md": {
	id: "set-mobila-dormitor-class-c26.md";
  slug: "set-mobila-dormitor-class-c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-douglas-c01.md": {
	id: "set-mobila-dormitor-douglas-c01.md";
  slug: "set-mobila-dormitor-douglas-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-douglas-c02-tapitat-alb.md": {
	id: "set-mobila-dormitor-douglas-c02-tapitat-alb.md";
  slug: "set-mobila-dormitor-douglas-c02-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-douglas-c03-tapitat-wenge.md": {
	id: "set-mobila-dormitor-douglas-c03-tapitat-wenge.md";
  slug: "set-mobila-dormitor-douglas-c03-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-douglas-c04.md": {
	id: "set-mobila-dormitor-douglas-c04.md";
  slug: "set-mobila-dormitor-douglas-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-douglas-c05-tapitat-alb.md": {
	id: "set-mobila-dormitor-douglas-c05-tapitat-alb.md";
  slug: "set-mobila-dormitor-douglas-c05-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-douglas-c06-tapitat-wenge.md": {
	id: "set-mobila-dormitor-douglas-c06-tapitat-wenge.md";
  slug: "set-mobila-dormitor-douglas-c06-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c01.md": {
	id: "set-mobila-dormitor-forest-c01.md";
  slug: "set-mobila-dormitor-forest-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c02.md": {
	id: "set-mobila-dormitor-forest-c02.md";
  slug: "set-mobila-dormitor-forest-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c03.md": {
	id: "set-mobila-dormitor-forest-c03.md";
  slug: "set-mobila-dormitor-forest-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c04-cu-oglinda.md": {
	id: "set-mobila-dormitor-forest-c04-cu-oglinda.md";
  slug: "set-mobila-dormitor-forest-c04-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c05-tapitat.md": {
	id: "set-mobila-dormitor-forest-c05-tapitat.md";
  slug: "set-mobila-dormitor-forest-c05-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c06-tapitat.md": {
	id: "set-mobila-dormitor-forest-c06-tapitat.md";
  slug: "set-mobila-dormitor-forest-c06-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c07-tapitat.md": {
	id: "set-mobila-dormitor-forest-c07-tapitat.md";
  slug: "set-mobila-dormitor-forest-c07-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c08-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-forest-c08-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-forest-c08-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c09.md": {
	id: "set-mobila-dormitor-forest-c09.md";
  slug: "set-mobila-dormitor-forest-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c10.md": {
	id: "set-mobila-dormitor-forest-c10.md";
  slug: "set-mobila-dormitor-forest-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c11.md": {
	id: "set-mobila-dormitor-forest-c11.md";
  slug: "set-mobila-dormitor-forest-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c12-cu-oglinda.md": {
	id: "set-mobila-dormitor-forest-c12-cu-oglinda.md";
  slug: "set-mobila-dormitor-forest-c12-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c13-tapitat.md": {
	id: "set-mobila-dormitor-forest-c13-tapitat.md";
  slug: "set-mobila-dormitor-forest-c13-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c14-tapitat.md": {
	id: "set-mobila-dormitor-forest-c14-tapitat.md";
  slug: "set-mobila-dormitor-forest-c14-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c15-tapitat.md": {
	id: "set-mobila-dormitor-forest-c15-tapitat.md";
  slug: "set-mobila-dormitor-forest-c15-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c16-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-forest-c16-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-forest-c16-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c17.md": {
	id: "set-mobila-dormitor-forest-c17.md";
  slug: "set-mobila-dormitor-forest-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c18.md": {
	id: "set-mobila-dormitor-forest-c18.md";
  slug: "set-mobila-dormitor-forest-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c19.md": {
	id: "set-mobila-dormitor-forest-c19.md";
  slug: "set-mobila-dormitor-forest-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-forest-c20-cu-oglinda.md": {
	id: "set-mobila-dormitor-forest-c20-cu-oglinda.md";
  slug: "set-mobila-dormitor-forest-c20-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c01.md": {
	id: "set-mobila-dormitor-grafit-c01.md";
  slug: "set-mobila-dormitor-grafit-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c02.md": {
	id: "set-mobila-dormitor-grafit-c02.md";
  slug: "set-mobila-dormitor-grafit-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c03.md": {
	id: "set-mobila-dormitor-grafit-c03.md";
  slug: "set-mobila-dormitor-grafit-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c04.md": {
	id: "set-mobila-dormitor-grafit-c04.md";
  slug: "set-mobila-dormitor-grafit-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c05.md": {
	id: "set-mobila-dormitor-grafit-c05.md";
  slug: "set-mobila-dormitor-grafit-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c06.md": {
	id: "set-mobila-dormitor-grafit-c06.md";
  slug: "set-mobila-dormitor-grafit-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c07.md": {
	id: "set-mobila-dormitor-grafit-c07.md";
  slug: "set-mobila-dormitor-grafit-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c08.md": {
	id: "set-mobila-dormitor-grafit-c08.md";
  slug: "set-mobila-dormitor-grafit-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c09.md": {
	id: "set-mobila-dormitor-grafit-c09.md";
  slug: "set-mobila-dormitor-grafit-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c10.md": {
	id: "set-mobila-dormitor-grafit-c10.md";
  slug: "set-mobila-dormitor-grafit-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c11.md": {
	id: "set-mobila-dormitor-grafit-c11.md";
  slug: "set-mobila-dormitor-grafit-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c12.md": {
	id: "set-mobila-dormitor-grafit-c12.md";
  slug: "set-mobila-dormitor-grafit-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c13.md": {
	id: "set-mobila-dormitor-grafit-c13.md";
  slug: "set-mobila-dormitor-grafit-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c14.md": {
	id: "set-mobila-dormitor-grafit-c14.md";
  slug: "set-mobila-dormitor-grafit-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c15.md": {
	id: "set-mobila-dormitor-grafit-c15.md";
  slug: "set-mobila-dormitor-grafit-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c16.md": {
	id: "set-mobila-dormitor-grafit-c16.md";
  slug: "set-mobila-dormitor-grafit-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c17.md": {
	id: "set-mobila-dormitor-grafit-c17.md";
  slug: "set-mobila-dormitor-grafit-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c18.md": {
	id: "set-mobila-dormitor-grafit-c18.md";
  slug: "set-mobila-dormitor-grafit-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c19.md": {
	id: "set-mobila-dormitor-grafit-c19.md";
  slug: "set-mobila-dormitor-grafit-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c20.md": {
	id: "set-mobila-dormitor-grafit-c20.md";
  slug: "set-mobila-dormitor-grafit-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c21.md": {
	id: "set-mobila-dormitor-grafit-c21.md";
  slug: "set-mobila-dormitor-grafit-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c22.md": {
	id: "set-mobila-dormitor-grafit-c22.md";
  slug: "set-mobila-dormitor-grafit-c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c23.md": {
	id: "set-mobila-dormitor-grafit-c23.md";
  slug: "set-mobila-dormitor-grafit-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c24.md": {
	id: "set-mobila-dormitor-grafit-c24.md";
  slug: "set-mobila-dormitor-grafit-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c25.md": {
	id: "set-mobila-dormitor-grafit-c25.md";
  slug: "set-mobila-dormitor-grafit-c25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-grafit-c26.md": {
	id: "set-mobila-dormitor-grafit-c26.md";
  slug: "set-mobila-dormitor-grafit-c26";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c1.md": {
	id: "set-mobila-dormitor-gri-noce-c1.md";
  slug: "set-mobila-dormitor-gri-noce-c1";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c10.md": {
	id: "set-mobila-dormitor-gri-noce-c10.md";
  slug: "set-mobila-dormitor-gri-noce-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c11.md": {
	id: "set-mobila-dormitor-gri-noce-c11.md";
  slug: "set-mobila-dormitor-gri-noce-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c12.md": {
	id: "set-mobila-dormitor-gri-noce-c12.md";
  slug: "set-mobila-dormitor-gri-noce-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c2.md": {
	id: "set-mobila-dormitor-gri-noce-c2.md";
  slug: "set-mobila-dormitor-gri-noce-c2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c3.md": {
	id: "set-mobila-dormitor-gri-noce-c3.md";
  slug: "set-mobila-dormitor-gri-noce-c3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c4.md": {
	id: "set-mobila-dormitor-gri-noce-c4.md";
  slug: "set-mobila-dormitor-gri-noce-c4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c5.md": {
	id: "set-mobila-dormitor-gri-noce-c5.md";
  slug: "set-mobila-dormitor-gri-noce-c5";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c6.md": {
	id: "set-mobila-dormitor-gri-noce-c6.md";
  slug: "set-mobila-dormitor-gri-noce-c6";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c7.md": {
	id: "set-mobila-dormitor-gri-noce-c7.md";
  slug: "set-mobila-dormitor-gri-noce-c7";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c8.md": {
	id: "set-mobila-dormitor-gri-noce-c8.md";
  slug: "set-mobila-dormitor-gri-noce-c8";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noce-c9.md": {
	id: "set-mobila-dormitor-gri-noce-c9.md";
  slug: "set-mobila-dormitor-gri-noce-c9";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noel-tapitat-cu-oglinda-c3.md": {
	id: "set-mobila-dormitor-gri-noel-tapitat-cu-oglinda-c3.md";
  slug: "set-mobila-dormitor-gri-noel-tapitat-cu-oglinda-c3";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-gri-noel-tapitat-cu-oglinda-c4.md": {
	id: "set-mobila-dormitor-gri-noel-tapitat-cu-oglinda-c4.md";
  slug: "set-mobila-dormitor-gri-noel-tapitat-cu-oglinda-c4";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-2.87m-pat-incadrat-si-oglinda-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-2.87m-pat-incadrat-si-oglinda-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-287m-pat-incadrat-si-oglinda-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-2.87m-pat-incadrat-si-oglinda-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-2.87m-pat-incadrat-si-oglinda-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-287m-pat-incadrat-si-oglinda-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-2.87m-pat-incadrat-si-oglinda.md": {
	id: "set-mobila-dormitor-mario-2.87m-pat-incadrat-si-oglinda.md";
  slug: "set-mobila-dormitor-mario-287m-pat-incadrat-si-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-2.87m-pat-incadrat-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-2.87m-pat-incadrat-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-287m-pat-incadrat-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-2.87m-pat-incadrat-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-2.87m-pat-incadrat-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-287m-pat-incadrat-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-2.87m-pat-incadrat.md": {
	id: "set-mobila-dormitor-mario-2.87m-pat-incadrat.md";
  slug: "set-mobila-dormitor-mario-287m-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3.44m-pat-incadrat-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-3.44m-pat-incadrat-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-344m-pat-incadrat-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3.44m-pat-incadrat-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-3.44m-pat-incadrat-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-344m-pat-incadrat-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3.44m-pat-incadrat.md": {
	id: "set-mobila-dormitor-mario-3.44m-pat-incadrat.md";
  slug: "set-mobila-dormitor-mario-344m-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3.85m-pat-incadrat-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-3.85m-pat-incadrat-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-385m-pat-incadrat-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3.85m-pat-incadrat-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-3.85m-pat-incadrat-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-385m-pat-incadrat-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3.85m-pat-incadrat.md": {
	id: "set-mobila-dormitor-mario-3.85m-pat-incadrat.md";
  slug: "set-mobila-dormitor-mario-385m-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-4-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-3u-4-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-3u-4-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-4-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-3u-4-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-3u-4-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-4-piese.md": {
	id: "set-mobila-dormitor-mario-3u-4-piese.md";
  slug: "set-mobila-dormitor-mario-3u-4-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-5-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-3u-5-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-3u-5-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-5-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-3u-5-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-3u-5-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-5-piese.md": {
	id: "set-mobila-dormitor-mario-3u-5-piese.md";
  slug: "set-mobila-dormitor-mario-3u-5-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-6-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-3u-6-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-3u-6-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-6-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-3u-6-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-3u-6-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-6-piese.md": {
	id: "set-mobila-dormitor-mario-3u-6-piese.md";
  slug: "set-mobila-dormitor-mario-3u-6-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-3u-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-3u-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-3u-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-3u-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-3u.md": {
	id: "set-mobila-dormitor-mario-3u.md";
  slug: "set-mobila-dormitor-mario-3u";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-4-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-4u-4-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-4u-4-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-4-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-4u-4-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-4u-4-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-4-piese.md": {
	id: "set-mobila-dormitor-mario-4u-4-piese.md";
  slug: "set-mobila-dormitor-mario-4u-4-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-5-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-4u-5-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-4u-5-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-5-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-4u-5-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-4u-5-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-5-piese.md": {
	id: "set-mobila-dormitor-mario-4u-5-piese.md";
  slug: "set-mobila-dormitor-mario-4u-5-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-6-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-4u-6-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-4u-6-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-6-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-4u-6-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-4u-6-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-6-piese.md": {
	id: "set-mobila-dormitor-mario-4u-6-piese.md";
  slug: "set-mobila-dormitor-mario-4u-6-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-tapitat-alb.md": {
	id: "set-mobila-dormitor-mario-4u-tapitat-alb.md";
  slug: "set-mobila-dormitor-mario-4u-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u-tapitat-wenge.md": {
	id: "set-mobila-dormitor-mario-4u-tapitat-wenge.md";
  slug: "set-mobila-dormitor-mario-4u-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-mario-4u.md": {
	id: "set-mobila-dormitor-mario-4u.md";
  slug: "set-mobila-dormitor-mario-4u";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-montero-cu-oglinda.md": {
	id: "set-mobila-dormitor-montero-cu-oglinda.md";
  slug: "set-mobila-dormitor-montero-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-montero-tapitat-cu-oglinda.md": {
	id: "set-mobila-dormitor-montero-tapitat-cu-oglinda.md";
  slug: "set-mobila-dormitor-montero-tapitat-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-montero-tapitat.md": {
	id: "set-mobila-dormitor-montero-tapitat.md";
  slug: "set-mobila-dormitor-montero-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-montero.md": {
	id: "set-mobila-dormitor-montero.md";
  slug: "set-mobila-dormitor-montero";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-2.33m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-noce-2.33m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-noce-233m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-2.33m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-mobila-dormitor-noce-2.33m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-mobila-dormitor-noce-233m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-2.56m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-noce-2.56m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-noce-256m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-2.56m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-mobila-dormitor-noce-2.56m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-mobila-dormitor-noce-256m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-2.84m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-noce-2.84m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-noce-284m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-2.84m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-mobila-dormitor-noce-2.84m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-mobila-dormitor-noce-284m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-3.05m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-noce-3.05m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-noce-305m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-3.05m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-mobila-dormitor-noce-3.05m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-mobila-dormitor-noce-305m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-3.12m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-noce-3.12m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-noce-312m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-noce-3.12m-cu-pat-tapitat-alb-incadrat.md": {
	id: "set-mobila-dormitor-noce-3.12m-cu-pat-tapitat-alb-incadrat.md";
  slug: "set-mobila-dormitor-noce-312m-cu-pat-tapitat-alb-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-2.26m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-nordis-2.26m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-nordis-226m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-2.42m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-nordis-2.42m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-nordis-242m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-2.70m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-nordis-2.70m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-nordis-270m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-2.92m-cu-pat-incadrat-si-oglinda.md": {
	id: "set-mobila-dormitor-nordis-2.92m-cu-pat-incadrat-si-oglinda.md";
  slug: "set-mobila-dormitor-nordis-292m-cu-pat-incadrat-si-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-2.92m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-nordis-2.92m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-nordis-292m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-2.98m-cu-pat-incadrat.md": {
	id: "set-mobila-dormitor-nordis-2.98m-cu-pat-incadrat.md";
  slug: "set-mobila-dormitor-nordis-298m-cu-pat-incadrat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c01.md": {
	id: "set-mobila-dormitor-nordis-alb-c01.md";
  slug: "set-mobila-dormitor-nordis-alb-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c02-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c02-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c02-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c03-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c03-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c03-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c04-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c04-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c04-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c05-tapitat.md": {
	id: "set-mobila-dormitor-nordis-alb-c05-tapitat.md";
  slug: "set-mobila-dormitor-nordis-alb-c05-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c06-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c06-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c06-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c07-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c07-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c07-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c08-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c08-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c08-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c09.md": {
	id: "set-mobila-dormitor-nordis-alb-c09.md";
  slug: "set-mobila-dormitor-nordis-alb-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c10-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c10-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c10-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c11-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c11-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c11-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c12-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c12-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c12-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c13-tapitat.md": {
	id: "set-mobila-dormitor-nordis-alb-c13-tapitat.md";
  slug: "set-mobila-dormitor-nordis-alb-c13-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c14-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c14-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c14-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c15-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c15-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c15-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c16-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c16-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c16-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c17.md": {
	id: "set-mobila-dormitor-nordis-alb-c17.md";
  slug: "set-mobila-dormitor-nordis-alb-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c18-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c18-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c18-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c19-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c19-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c19-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c20-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c20-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c20-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c21.md": {
	id: "set-mobila-dormitor-nordis-alb-c21.md";
  slug: "set-mobila-dormitor-nordis-alb-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c22-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c22-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c22-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c23-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c23-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c23-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c24-cu-oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c24-cu-oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c24-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c25-tapitat.md": {
	id: "set-mobila-dormitor-nordis-alb-c25-tapitat.md";
  slug: "set-mobila-dormitor-nordis-alb-c25-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c26-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c26-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c26-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c27-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c27-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c27-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nordis-alb-c28-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-nordis-alb-c28-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-nordis-alb-c28-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c01.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c01.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c02.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c02.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c03.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c03.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c04.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c04.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c05.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c05.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c05";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c06.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c06.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c07.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c07.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c08.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c08.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c09.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c09.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c10.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c10.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c11.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c11.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-nuc--casmir-solomon-c12.md": {
	id: "set-mobila-dormitor-nuc--casmir-solomon-c12.md";
  slug: "set-mobila-dormitor-nuc--casmir-solomon-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c01.md": {
	id: "set-mobila-dormitor-relax-c01.md";
  slug: "set-mobila-dormitor-relax-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c02.md": {
	id: "set-mobila-dormitor-relax-c02.md";
  slug: "set-mobila-dormitor-relax-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c03.md": {
	id: "set-mobila-dormitor-relax-c03.md";
  slug: "set-mobila-dormitor-relax-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c04.md": {
	id: "set-mobila-dormitor-relax-c04.md";
  slug: "set-mobila-dormitor-relax-c04";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c05-cu-oglinda.md": {
	id: "set-mobila-dormitor-relax-c05-cu-oglinda.md";
  slug: "set-mobila-dormitor-relax-c05-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c06.md": {
	id: "set-mobila-dormitor-relax-c06.md";
  slug: "set-mobila-dormitor-relax-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c07.md": {
	id: "set-mobila-dormitor-relax-c07.md";
  slug: "set-mobila-dormitor-relax-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c08.md": {
	id: "set-mobila-dormitor-relax-c08.md";
  slug: "set-mobila-dormitor-relax-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c09.md": {
	id: "set-mobila-dormitor-relax-c09.md";
  slug: "set-mobila-dormitor-relax-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c10-cu-oglinda.md": {
	id: "set-mobila-dormitor-relax-c10-cu-oglinda.md";
  slug: "set-mobila-dormitor-relax-c10-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c11.md": {
	id: "set-mobila-dormitor-relax-c11.md";
  slug: "set-mobila-dormitor-relax-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c12-cu-oglinda.md": {
	id: "set-mobila-dormitor-relax-c12-cu-oglinda.md";
  slug: "set-mobila-dormitor-relax-c12-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c13-tapitat.md": {
	id: "set-mobila-dormitor-relax-c13-tapitat.md";
  slug: "set-mobila-dormitor-relax-c13-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c14-tapitat.md": {
	id: "set-mobila-dormitor-relax-c14-tapitat.md";
  slug: "set-mobila-dormitor-relax-c14-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c15-tapitat.md": {
	id: "set-mobila-dormitor-relax-c15-tapitat.md";
  slug: "set-mobila-dormitor-relax-c15-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c16-tapitat.md": {
	id: "set-mobila-dormitor-relax-c16-tapitat.md";
  slug: "set-mobila-dormitor-relax-c16-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c17-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-relax-c17-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-relax-c17-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c18-tapitat.md": {
	id: "set-mobila-dormitor-relax-c18-tapitat.md";
  slug: "set-mobila-dormitor-relax-c18-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c19-tapitat.md": {
	id: "set-mobila-dormitor-relax-c19-tapitat.md";
  slug: "set-mobila-dormitor-relax-c19-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c20-tapitat.md": {
	id: "set-mobila-dormitor-relax-c20-tapitat.md";
  slug: "set-mobila-dormitor-relax-c20-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c21-tapitat.md": {
	id: "set-mobila-dormitor-relax-c21-tapitat.md";
  slug: "set-mobila-dormitor-relax-c21-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c22-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-relax-c22-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-relax-c22-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c23-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-relax-c23-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-relax-c23-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c24-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-relax-c24-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-relax-c24-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c25-tapitat.md": {
	id: "set-mobila-dormitor-relax-c25-tapitat.md";
  slug: "set-mobila-dormitor-relax-c25-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c26-tapitat.md": {
	id: "set-mobila-dormitor-relax-c26-tapitat.md";
  slug: "set-mobila-dormitor-relax-c26-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-relax-c27-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-relax-c27-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-relax-c27-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c01.md": {
	id: "set-mobila-dormitor-snow-c01.md";
  slug: "set-mobila-dormitor-snow-c01";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c02.md": {
	id: "set-mobila-dormitor-snow-c02.md";
  slug: "set-mobila-dormitor-snow-c02";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c03.md": {
	id: "set-mobila-dormitor-snow-c03.md";
  slug: "set-mobila-dormitor-snow-c03";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c04-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c04-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c04-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c05-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c05-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c05-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c06.md": {
	id: "set-mobila-dormitor-snow-c06.md";
  slug: "set-mobila-dormitor-snow-c06";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c07.md": {
	id: "set-mobila-dormitor-snow-c07.md";
  slug: "set-mobila-dormitor-snow-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c08-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c08-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c08-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c09.md": {
	id: "set-mobila-dormitor-snow-c09.md";
  slug: "set-mobila-dormitor-snow-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c10.md": {
	id: "set-mobila-dormitor-snow-c10.md";
  slug: "set-mobila-dormitor-snow-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c11-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c11-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c11-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c12.md": {
	id: "set-mobila-dormitor-snow-c12.md";
  slug: "set-mobila-dormitor-snow-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c13-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c13-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c13-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c14.md": {
	id: "set-mobila-dormitor-snow-c14.md";
  slug: "set-mobila-dormitor-snow-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c15-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c15-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c15-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c16.md": {
	id: "set-mobila-dormitor-snow-c16.md";
  slug: "set-mobila-dormitor-snow-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c17-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c17-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c17-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c18.md": {
	id: "set-mobila-dormitor-snow-c18.md";
  slug: "set-mobila-dormitor-snow-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c19-cu-oglinda.md": {
	id: "set-mobila-dormitor-snow-c19-cu-oglinda.md";
  slug: "set-mobila-dormitor-snow-c19-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c20-tapitat.md": {
	id: "set-mobila-dormitor-snow-c20-tapitat.md";
  slug: "set-mobila-dormitor-snow-c20-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c21-tapitat.md": {
	id: "set-mobila-dormitor-snow-c21-tapitat.md";
  slug: "set-mobila-dormitor-snow-c21-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c22-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-snow-c22-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-snow-c22-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c23-tapitat.md": {
	id: "set-mobila-dormitor-snow-c23-tapitat.md";
  slug: "set-mobila-dormitor-snow-c23-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c24-tapitat.md": {
	id: "set-mobila-dormitor-snow-c24-tapitat.md";
  slug: "set-mobila-dormitor-snow-c24-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c25-tapitat.md": {
	id: "set-mobila-dormitor-snow-c25-tapitat.md";
  slug: "set-mobila-dormitor-snow-c25-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c26-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-snow-c26-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-snow-c26-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c27-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-snow-c27-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-snow-c27-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c28-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-snow-c28-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-snow-c28-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c29-tapitat.md": {
	id: "set-mobila-dormitor-snow-c29-tapitat.md";
  slug: "set-mobila-dormitor-snow-c29-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-snow-c30-tapitat--oglinda.md": {
	id: "set-mobila-dormitor-snow-c30-tapitat--oglinda.md";
  slug: "set-mobila-dormitor-snow-c30-tapitat--oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-4-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-timea-4-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-timea-4-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-4-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-timea-4-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-timea-4-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-4-piese.md": {
	id: "set-mobila-dormitor-timea-4-piese.md";
  slug: "set-mobila-dormitor-timea-4-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-5-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-timea-5-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-timea-5-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-5-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-timea-5-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-timea-5-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-5-piese.md": {
	id: "set-mobila-dormitor-timea-5-piese.md";
  slug: "set-mobila-dormitor-timea-5-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-6-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-timea-6-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-timea-6-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-6-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-timea-6-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-timea-6-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-6-piese.md": {
	id: "set-mobila-dormitor-timea-6-piese.md";
  slug: "set-mobila-dormitor-timea-6-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-7-piese-tapitat-alb.md": {
	id: "set-mobila-dormitor-timea-7-piese-tapitat-alb.md";
  slug: "set-mobila-dormitor-timea-7-piese-tapitat-alb";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-7-piese-tapitat-wenge.md": {
	id: "set-mobila-dormitor-timea-7-piese-tapitat-wenge.md";
  slug: "set-mobila-dormitor-timea-7-piese-tapitat-wenge";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-timea-7-piese.md": {
	id: "set-mobila-dormitor-timea-7-piese.md";
  slug: "set-mobila-dormitor-timea-7-piese";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c07.md": {
	id: "set-mobila-dormitor-tineret-mihai-c07.md";
  slug: "set-mobila-dormitor-tineret-mihai-c07";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c08.md": {
	id: "set-mobila-dormitor-tineret-mihai-c08.md";
  slug: "set-mobila-dormitor-tineret-mihai-c08";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c09.md": {
	id: "set-mobila-dormitor-tineret-mihai-c09.md";
  slug: "set-mobila-dormitor-tineret-mihai-c09";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c10.md": {
	id: "set-mobila-dormitor-tineret-mihai-c10.md";
  slug: "set-mobila-dormitor-tineret-mihai-c10";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c11.md": {
	id: "set-mobila-dormitor-tineret-mihai-c11.md";
  slug: "set-mobila-dormitor-tineret-mihai-c11";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c12.md": {
	id: "set-mobila-dormitor-tineret-mihai-c12.md";
  slug: "set-mobila-dormitor-tineret-mihai-c12";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c13.md": {
	id: "set-mobila-dormitor-tineret-mihai-c13.md";
  slug: "set-mobila-dormitor-tineret-mihai-c13";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c14.md": {
	id: "set-mobila-dormitor-tineret-mihai-c14.md";
  slug: "set-mobila-dormitor-tineret-mihai-c14";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c15.md": {
	id: "set-mobila-dormitor-tineret-mihai-c15.md";
  slug: "set-mobila-dormitor-tineret-mihai-c15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c16.md": {
	id: "set-mobila-dormitor-tineret-mihai-c16.md";
  slug: "set-mobila-dormitor-tineret-mihai-c16";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c17.md": {
	id: "set-mobila-dormitor-tineret-mihai-c17.md";
  slug: "set-mobila-dormitor-tineret-mihai-c17";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c18.md": {
	id: "set-mobila-dormitor-tineret-mihai-c18.md";
  slug: "set-mobila-dormitor-tineret-mihai-c18";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c19.md": {
	id: "set-mobila-dormitor-tineret-mihai-c19.md";
  slug: "set-mobila-dormitor-tineret-mihai-c19";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c20.md": {
	id: "set-mobila-dormitor-tineret-mihai-c20.md";
  slug: "set-mobila-dormitor-tineret-mihai-c20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c21.md": {
	id: "set-mobila-dormitor-tineret-mihai-c21.md";
  slug: "set-mobila-dormitor-tineret-mihai-c21";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c22.md": {
	id: "set-mobila-dormitor-tineret-mihai-c22.md";
  slug: "set-mobila-dormitor-tineret-mihai-c22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c23.md": {
	id: "set-mobila-dormitor-tineret-mihai-c23.md";
  slug: "set-mobila-dormitor-tineret-mihai-c23";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-tineret-mihai-c24.md": {
	id: "set-mobila-dormitor-tineret-mihai-c24.md";
  slug: "set-mobila-dormitor-tineret-mihai-c24";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-toronto-cu-oglinda.md": {
	id: "set-mobila-dormitor-toronto-cu-oglinda.md";
  slug: "set-mobila-dormitor-toronto-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-toronto-tapitat-cu-oglinda.md": {
	id: "set-mobila-dormitor-toronto-tapitat-cu-oglinda.md";
  slug: "set-mobila-dormitor-toronto-tapitat-cu-oglinda";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-toronto-tapitat.md": {
	id: "set-mobila-dormitor-toronto-tapitat.md";
  slug: "set-mobila-dormitor-toronto-tapitat";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"set-mobila-dormitor-toronto.md": {
	id: "set-mobila-dormitor-toronto.md";
  slug: "set-mobila-dormitor-toronto";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"soldat-1-usa-melo---modul-c.md": {
	id: "soldat-1-usa-melo---modul-c.md";
  slug: "soldat-1-usa-melo---modul-c";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"solutie-curatare-tapiterie-oa-sofa-care.md": {
	id: "solutie-curatare-tapiterie-oa-sofa-care.md";
  slug: "solutie-curatare-tapiterie-oa-sofa-care";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"solutie-indepartare-miros-animale-oa-pets---odour-removal.md": {
	id: "solutie-indepartare-miros-animale-oa-pets---odour-removal.md";
  slug: "solutie-indepartare-miros-animale-oa-pets---odour-removal";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"solutie-protectie-tapiterie-oa-sofa-protector.md": {
	id: "solutie-protectie-tapiterie-oa-sofa-protector.md";
  slug: "solutie-protectie-tapiterie-oa-sofa-protector";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-albastru.md": {
	id: "taburet-carlos-1l-albastru.md";
  slug: "taburet-carlos-1l-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-crem.md": {
	id: "taburet-carlos-1l-crem.md";
  slug: "taburet-carlos-1l-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-gri-antracit.md": {
	id: "taburet-carlos-1l-gri-antracit.md";
  slug: "taburet-carlos-1l-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-gri-deschis.md": {
	id: "taburet-carlos-1l-gri-deschis.md";
  slug: "taburet-carlos-1l-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-gri.md": {
	id: "taburet-carlos-1l-gri.md";
  slug: "taburet-carlos-1l-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-maro.md": {
	id: "taburet-carlos-1l-maro.md";
  slug: "taburet-carlos-1l-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-portocaliu.md": {
	id: "taburet-carlos-1l-portocaliu.md";
  slug: "taburet-carlos-1l-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-roze.md": {
	id: "taburet-carlos-1l-roze.md";
  slug: "taburet-carlos-1l-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-1l-verde.md": {
	id: "taburet-carlos-1l-verde.md";
  slug: "taburet-carlos-1l-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-albastru.md": {
	id: "taburet-carlos-2l-albastru.md";
  slug: "taburet-carlos-2l-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-crem.md": {
	id: "taburet-carlos-2l-crem.md";
  slug: "taburet-carlos-2l-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-gri-antracit.md": {
	id: "taburet-carlos-2l-gri-antracit.md";
  slug: "taburet-carlos-2l-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-gri-deschis.md": {
	id: "taburet-carlos-2l-gri-deschis.md";
  slug: "taburet-carlos-2l-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-maro-inchis.md": {
	id: "taburet-carlos-2l-maro-inchis.md";
  slug: "taburet-carlos-2l-maro-inchis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-maro.md": {
	id: "taburet-carlos-2l-maro.md";
  slug: "taburet-carlos-2l-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-portocaliu.md": {
	id: "taburet-carlos-2l-portocaliu.md";
  slug: "taburet-carlos-2l-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-roze.md": {
	id: "taburet-carlos-2l-roze.md";
  slug: "taburet-carlos-2l-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-carlos-2l-verde.md": {
	id: "taburet-carlos-2l-verde.md";
  slug: "taburet-carlos-2l-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-albastru.md": {
	id: "taburet-cross-albastru.md";
  slug: "taburet-cross-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-crem.md": {
	id: "taburet-cross-crem.md";
  slug: "taburet-cross-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-gri-antracit.md": {
	id: "taburet-cross-gri-antracit.md";
  slug: "taburet-cross-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-gri-deschis.md": {
	id: "taburet-cross-gri-deschis.md";
  slug: "taburet-cross-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-maro.md": {
	id: "taburet-cross-maro.md";
  slug: "taburet-cross-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-portocaliu.md": {
	id: "taburet-cross-portocaliu.md";
  slug: "taburet-cross-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-roze.md": {
	id: "taburet-cross-roze.md";
  slug: "taburet-cross-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cross-verde.md": {
	id: "taburet-cross-verde.md";
  slug: "taburet-cross-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-albastru.md": {
	id: "taburet-cub-albastru.md";
  slug: "taburet-cub-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-crem.md": {
	id: "taburet-cub-crem.md";
  slug: "taburet-cub-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-gri-antracit.md": {
	id: "taburet-cub-gri-antracit.md";
  slug: "taburet-cub-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-gri-deschis.md": {
	id: "taburet-cub-gri-deschis.md";
  slug: "taburet-cub-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-maro.md": {
	id: "taburet-cub-maro.md";
  slug: "taburet-cub-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-portocaliu.md": {
	id: "taburet-cub-portocaliu.md";
  slug: "taburet-cub-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-roze.md": {
	id: "taburet-cub-roze.md";
  slug: "taburet-cub-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-cub-verde.md": {
	id: "taburet-cub-verde.md";
  slug: "taburet-cub-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-albastru.md": {
	id: "taburet-inimioara-albastru.md";
  slug: "taburet-inimioara-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-crem.md": {
	id: "taburet-inimioara-crem.md";
  slug: "taburet-inimioara-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-gri-antracit.md": {
	id: "taburet-inimioara-gri-antracit.md";
  slug: "taburet-inimioara-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-gri-deschis.md": {
	id: "taburet-inimioara-gri-deschis.md";
  slug: "taburet-inimioara-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-maro.md": {
	id: "taburet-inimioara-maro.md";
  slug: "taburet-inimioara-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-portocaliu.md": {
	id: "taburet-inimioara-portocaliu.md";
  slug: "taburet-inimioara-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-roze.md": {
	id: "taburet-inimioara-roze.md";
  slug: "taburet-inimioara-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-inimioara-verde.md": {
	id: "taburet-inimioara-verde.md";
  slug: "taburet-inimioara-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-castel-70.md": {
	id: "taburet-mega-1l-castel-70.md";
  slug: "taburet-mega-1l-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-coral-15.md": {
	id: "taburet-mega-1l-coral-15.md";
  slug: "taburet-mega-1l-coral-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-coral-50.md": {
	id: "taburet-mega-1l-coral-50.md";
  slug: "taburet-mega-1l-coral-50";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-coral-75.md": {
	id: "taburet-mega-1l-coral-75.md";
  slug: "taburet-mega-1l-coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-coral-80.md": {
	id: "taburet-mega-1l-coral-80.md";
  slug: "taburet-mega-1l-coral-80";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-reiat-zoom-new-15.md": {
	id: "taburet-mega-1l-reiat-zoom-new-15.md";
  slug: "taburet-mega-1l-reiat-zoom-new-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-reiat-zoom-new-2.md": {
	id: "taburet-mega-1l-reiat-zoom-new-2.md";
  slug: "taburet-mega-1l-reiat-zoom-new-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-reiat-zoom-new-20.md": {
	id: "taburet-mega-1l-reiat-zoom-new-20.md";
  slug: "taburet-mega-1l-reiat-zoom-new-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-reiat-zoom-new-22.md": {
	id: "taburet-mega-1l-reiat-zoom-new-22.md";
  slug: "taburet-mega-1l-reiat-zoom-new-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-reiat-zoom-new-25.md": {
	id: "taburet-mega-1l-reiat-zoom-new-25.md";
  slug: "taburet-mega-1l-reiat-zoom-new-25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-1l-vardo-91.md": {
	id: "taburet-mega-1l-vardo-91.md";
  slug: "taburet-mega-1l-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-castel-70.md": {
	id: "taburet-mega-2l-castel-70.md";
  slug: "taburet-mega-2l-castel-70";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-coral-15.md": {
	id: "taburet-mega-2l-coral-15.md";
  slug: "taburet-mega-2l-coral-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-coral-50.md": {
	id: "taburet-mega-2l-coral-50.md";
  slug: "taburet-mega-2l-coral-50";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-coral-75.md": {
	id: "taburet-mega-2l-coral-75.md";
  slug: "taburet-mega-2l-coral-75";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-coral-80.md": {
	id: "taburet-mega-2l-coral-80.md";
  slug: "taburet-mega-2l-coral-80";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-reiat-zoom-new-15.md": {
	id: "taburet-mega-2l-reiat-zoom-new-15.md";
  slug: "taburet-mega-2l-reiat-zoom-new-15";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-reiat-zoom-new-2.md": {
	id: "taburet-mega-2l-reiat-zoom-new-2.md";
  slug: "taburet-mega-2l-reiat-zoom-new-2";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-reiat-zoom-new-20.md": {
	id: "taburet-mega-2l-reiat-zoom-new-20.md";
  slug: "taburet-mega-2l-reiat-zoom-new-20";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-reiat-zoom-new-22.md": {
	id: "taburet-mega-2l-reiat-zoom-new-22.md";
  slug: "taburet-mega-2l-reiat-zoom-new-22";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-reiat-zoom-new-25.md": {
	id: "taburet-mega-2l-reiat-zoom-new-25.md";
  slug: "taburet-mega-2l-reiat-zoom-new-25";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-mega-2l-vardo-91.md": {
	id: "taburet-mega-2l-vardo-91.md";
  slug: "taburet-mega-2l-vardo-91";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-albastru.md": {
	id: "taburet-patrat-albastru.md";
  slug: "taburet-patrat-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-crem.md": {
	id: "taburet-patrat-crem.md";
  slug: "taburet-patrat-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-gri-antracit.md": {
	id: "taburet-patrat-gri-antracit.md";
  slug: "taburet-patrat-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-gri-deschis.md": {
	id: "taburet-patrat-gri-deschis.md";
  slug: "taburet-patrat-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-gri.md": {
	id: "taburet-patrat-gri.md";
  slug: "taburet-patrat-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-maro.md": {
	id: "taburet-patrat-maro.md";
  slug: "taburet-patrat-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-portocaliu.md": {
	id: "taburet-patrat-portocaliu.md";
  slug: "taburet-patrat-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-roze.md": {
	id: "taburet-patrat-roze.md";
  slug: "taburet-patrat-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-patrat-verde.md": {
	id: "taburet-patrat-verde.md";
  slug: "taburet-patrat-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-albastru.md": {
	id: "taburet-puf-albastru.md";
  slug: "taburet-puf-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-crem.md": {
	id: "taburet-puf-crem.md";
  slug: "taburet-puf-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-gri-antracit.md": {
	id: "taburet-puf-gri-antracit.md";
  slug: "taburet-puf-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-gri-deschis.md": {
	id: "taburet-puf-gri-deschis.md";
  slug: "taburet-puf-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-maro.md": {
	id: "taburet-puf-maro.md";
  slug: "taburet-puf-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-portocaliu.md": {
	id: "taburet-puf-portocaliu.md";
  slug: "taburet-puf-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-roze.md": {
	id: "taburet-puf-roze.md";
  slug: "taburet-puf-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-puf-verde.md": {
	id: "taburet-puf-verde.md";
  slug: "taburet-puf-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-albastru.md": {
	id: "taburet-smart-tapitat-albastru.md";
  slug: "taburet-smart-tapitat-albastru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-bleumarin.md": {
	id: "taburet-smart-tapitat-bleumarin.md";
  slug: "taburet-smart-tapitat-bleumarin";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-crem.md": {
	id: "taburet-smart-tapitat-crem.md";
  slug: "taburet-smart-tapitat-crem";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-gri-antracit.md": {
	id: "taburet-smart-tapitat-gri-antracit.md";
  slug: "taburet-smart-tapitat-gri-antracit";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-gri-deschis.md": {
	id: "taburet-smart-tapitat-gri-deschis.md";
  slug: "taburet-smart-tapitat-gri-deschis";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-gri-petrol.md": {
	id: "taburet-smart-tapitat-gri-petrol.md";
  slug: "taburet-smart-tapitat-gri-petrol";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-gri.md": {
	id: "taburet-smart-tapitat-gri.md";
  slug: "taburet-smart-tapitat-gri";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-maro.md": {
	id: "taburet-smart-tapitat-maro.md";
  slug: "taburet-smart-tapitat-maro";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-negru.md": {
	id: "taburet-smart-tapitat-negru.md";
  slug: "taburet-smart-tapitat-negru";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-portocaliu.md": {
	id: "taburet-smart-tapitat-portocaliu.md";
  slug: "taburet-smart-tapitat-portocaliu";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-roze.md": {
	id: "taburet-smart-tapitat-roze.md";
  slug: "taburet-smart-tapitat-roze";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-turcoaz.md": {
	id: "taburet-smart-tapitat-turcoaz.md";
  slug: "taburet-smart-tapitat-turcoaz";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
"taburet-smart-tapitat-verde.md": {
	id: "taburet-smart-tapitat-verde.md";
  slug: "taburet-smart-tapitat-verde";
  body: string;
  collection: "produse";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
