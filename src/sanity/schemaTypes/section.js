const Category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "tagname",
      title: "Tag Name",
      type: "string",
      options: {
        source: "tagname",
        unique: true,
        slugify: (/** @type {string} */ input) => {
          return input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
        },
      },
      validation: (/** @type {{ custom: (arg0: (fields: any) => true | "Tags must be lowercase and not be included space") => any; }} */ Rule) =>
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
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};
export default Category;