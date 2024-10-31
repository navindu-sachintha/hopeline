
const Post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "metadata",
      title: "Metadata",
      type: "string",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        unique: true,
        slugify: (/** @type {string} */ input) => {
          return input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
        },
      },
      validation: (
        /** @type {{ required: () => { (): any; new (): any; custom: { (arg0: (fields: any) => true | "Slug must be lowercase and not be included space"): any; new (): any; }; }; }} */ Rule,
      ) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required().custom((fields) => {
          if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            fields?.current !== fields?.current?.toLowerCase() ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            fields?.current.split(" ").includes("")
          ) {
            return "Slug must be lowercase and not be included space";
          }
          return true;
        }),
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
      of: [
        {
          type: "string",
          validation: (
            /** @type {{ custom: (arg0: (fields: any) => true | "Tags must be lowercase and not be included space") => any; }} */ Rule,
          ) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            Rule.custom((fields) => {
              if (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                fields !== fields.toLowerCase() ||
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                fields.split(" ").includes("")
              ) {
                return "Tags must be lowercase and not be included space";
              }
              return true;
            }),
        },
      ],
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "teamMember" },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      // validation: (Rule: any) => Rule.required(),
    },
    {
      name: "section",
      title: "Section",
      type: "reference",
      to: [{ type: "category" }],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "teamMember.name",
      media: "mainImage",
    },
  },
};
export default Post