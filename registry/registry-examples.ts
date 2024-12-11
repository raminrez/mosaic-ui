import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "field-demo",
    type: "registry:example",
    registryDependencies: ["field"],
    files: [
      {
        path: "example/field-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
