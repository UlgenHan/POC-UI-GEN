import { TemplateRenderer } from '../src/utils/TemplateRenderer';
import path from 'node:path';
test('renders service template', async () => {
    const renderer = new TemplateRenderer(path.join(__dirname, '..', 'templates'));
    const out = await renderer.render('next/service.hbs', {
        apiBaseUrl: '/api',
        service: { name: 'x', methods: [{ name: 'a', endpoint: '/t', method: 'GET' }] }
    });
    expect(out).toContain('xService');
});
