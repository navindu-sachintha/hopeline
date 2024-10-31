import { type SchemaTypeDefinition } from 'sanity'
import Post from "@/sanity/schemaTypes/post";
import Category from "@/sanity/schemaTypes/section";
import teamMember from "@/sanity/schemaTypes/teamMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    Post,Category,teamMember
  ],
}
