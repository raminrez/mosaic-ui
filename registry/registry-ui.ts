import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "field",
    type: "registry:ui",
    dependencies: ["react-hook-form", "zod"],
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui",
      },
    ],
  },
];
