import { z } from 'zod';

export const propSchema = z.object({
  name: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'any']).default('any'),
  required: z.boolean().default(false),
  default: z.any().optional()
});

export const componentManifestSchema = z.object({
  name: z.string(),
  importPath: z.string(),
  props: z.array(propSchema).default([]),
  events: z.array(z.string()).default([]),
  slots: z.array(z.string()).optional().default([])
});

export const dataSourceSchema = z.object({
  type: z.enum(['rest']).default('rest'),
  endpoint: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('GET')
});

export const pageComponentInstanceSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.any()).default({}),
  dataSource: dataSourceSchema.optional(),
  events: z
    .record(
      z.object({
        action: z.enum(['navigate', 'apiCall', 'updateState']).default('updateState'),
        params: z.record(z.any()).default({})
      })
    )
    .optional()
});

export const pageSchema = z.object({
  name: z.string(),
  route: z.string(),
  layout: z.string().optional(),
  components: z.array(pageComponentInstanceSchema)
});

export const serviceMethodSchema = z.object({
  name: z.string(),
  endpoint: z.string(),
  method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).default('GET'),
  payload: z.record(z.any()).optional()
});

export const serviceSchema = z.object({
  name: z.string(),
  methods: z.array(serviceMethodSchema)
});

export const projectSchema = z.object({
  name: z.string(),
  outputDir: z.string().default('dist/generated'),
  apiBaseUrl: z.string().default('/api'),
  theme: z.string().optional(),
  componentsPath: z.string().default('React-UI-Collection/src/components/ui'),
  preserveRegions: z.boolean().default(true)
});

export type ComponentManifest = z.infer<typeof componentManifestSchema>;
export type ProjectConfig = z.infer<typeof projectSchema>;
export type PageConfig = z.infer<typeof pageSchema>;
export type ServiceConfig = z.infer<typeof serviceSchema>;

