import { projectSchema, componentManifestSchema, pageSchema, serviceSchema } from '../src/validators/schemas';
test('project schema minimal', () => {
    const parsed = projectSchema.parse({ name: 'Test' });
    expect(parsed.name).toBe('Test');
});
test('component manifest minimal', () => {
    const c = componentManifestSchema.parse({ name: 'Input', importPath: './x' });
    expect(c.name).toBe('Input');
});
test('page schema minimal', () => {
    const p = pageSchema.parse({ name: 'P', route: '/', components: [] });
    expect(p.route).toBe('/');
});
test('service schema minimal', () => {
    const s = serviceSchema.parse({ name: 'product', methods: [] });
    expect(s.name).toBe('product');
});
