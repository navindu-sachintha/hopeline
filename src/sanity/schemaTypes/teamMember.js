const teamMember = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    },
    {
      name: "memberType",
      title: "Member Type",
      type: "string",
      options: {
        list: [
          { title: "Admin", value: "admin" },
          { title: "Author", value: "author" },
        ],
      },
      validation: (/** @type {{ required: () => any; }} */ Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};

export default teamMember;