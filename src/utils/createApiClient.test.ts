import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApiClient } from '../utils/createApiClient';

describe('createApiClient', () => {
	const mockFetch = vi.fn();
	const getToken = vi.fn().mockReturnValue('test-token');

	beforeEach(() => {
		vi.clearAllMocks();
		vi.stubGlobal('fetch', mockFetch);
	});

	it('sends GET request with correct headers', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			status: 200,
			headers: new Headers({ 'content-type': 'application/json' }),
			json: () => Promise.resolve({ result: 'ok' }),
		});

		const client = createApiClient({ getToken, baseUrl: '/api' });
		const result = await client.get('/users');

		expect(mockFetch).toHaveBeenCalled();
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe('/api/users');
		expect(opts.method).toBe('GET');
		expect(opts.headers.get('Authorization')).toBe('Bearer test-token');
		expect(result).toEqual({ result: 'ok' });
	});

	it('sends POST request with JSON body', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			status: 201,
			headers: new Headers({ 'content-type': 'application/json' }),
			json: () => Promise.resolve({ id: 1 }),
		});

		const client = createApiClient({ getToken, baseUrl: '/api' });
		const result = await client.post('/users', { name: 'Alice' });

		expect(mockFetch).toHaveBeenCalled();
		const [url, opts] = mockFetch.mock.calls[0];
		expect(url).toBe('/api/users');
		expect(opts.method).toBe('POST');
		expect(opts.body).toBe(JSON.stringify({ name: 'Alice' }));
		expect(result).toEqual({ id: 1 });
	});

	it('throws on non-ok response', async () => {
		mockFetch.mockResolvedValue({
			ok: false,
			status: 404,
			statusText: 'Not Found',
			headers: new Headers({ 'content-type': 'application/json' }),
			json: () => Promise.resolve({ message: 'Not found' }),
		});

		const client = createApiClient({ getToken, baseUrl: '/api' });
		await expect(client.get('/missing')).rejects.toThrow();
	});

	it('handles 204 No Content', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			status: 204,
			headers: new Headers(),
		});

		const client = createApiClient({ getToken, baseUrl: '/api' });
		const result = await client.delete('/items/1');
		expect(result).toEqual({});
	});

	it('appends query params to GET requests', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			status: 200,
			headers: new Headers({ 'content-type': 'application/json' }),
			json: () => Promise.resolve([]),
		});

		const client = createApiClient({ getToken, baseUrl: '/api' });
		await client.get('/users', { page: '1', limit: '10' });

		const calledUrl = mockFetch.mock.calls[0][0];
		expect(calledUrl).toContain('page=1');
		expect(calledUrl).toContain('limit=10');
	});

	it('omits Authorization header when getToken returns null', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			status: 200,
			headers: new Headers({ 'content-type': 'application/json' }),
			json: () => Promise.resolve({}),
		});

		const client = createApiClient({ getToken: () => null, baseUrl: '/api' });
		await client.get('/public');

		const headers = mockFetch.mock.calls[0][1].headers;
		expect(headers).not.toHaveProperty('Authorization');
	});
});
