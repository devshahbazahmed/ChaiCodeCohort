import express from 'express';
import axios from 'axios';
import Redis from 'ioredis';
import http from 'http';
import { Server } from 'socket.io';

const app = express(); // Express Server

const redis = new Redis({ host: 'localhost', port: Number(6379) });
const publisher = new Redis({ host: 'localhost', port: Number(6379) });
const subscriber = new Redis({ host: 'localhost', port: Number(6379) });

const httpServer = http.createServer(app); // Http Server (Mounted Express server on Http Server)

const io = new Server(); // Socket Server

io.attach(httpServer);

const stateKey = "state1";

redis.setnx(stateKey, JSON.stringify(new Array(100).fill(false)));

subscriber.subscribe('server:broker');
subscriber.on('message', (channel, message) => {
	const { event, data } = JSON.parse(message);

	// state[data.index] = data.value;
	io.emit(event, data); // Relay
});

io.on('connection', (socket) => {
	console.log('Socket connected', socket.id);
	socket.on('message', (msg) => {
		io.emit('server-message', msg); // Broadcast to all connected clients
	});

	socket.on('checkbox-update', async (data) => {
		const state = await redis.get(stateKey);

		if (state) {
			const paredState = JSON.parse(state);
			paredState[data.index] = data.value;
			await redis.set(stateKey, JSON.stringify(paredState));
		}

		await publisher.publish(
			'server:broker',
			JSON.stringify({ event: 'checkbox-update', data }),
		);
		// state[data.index] = data.value;
		// io.emit('checkbox-update', data);
	});
});

const PORT = process.env.PORT ?? 8000;

interface CachedStoreType {
	totalPageCount: number;
}

const cacheStore: CachedStoreType = {
	// Clear, LRU, Server Crash, New Set of Problems
	totalPageCount: 0,
};

app.use(express.static('./public'));

app.use(async function (req: any, res: any, next: any) {
	const key = 'rate-limit';

	const value = await redis.get(key);

	if (value === null) {
		redis.set(key, 0);
		redis.expire(key, 60);
	}

	if (value && Number(value) > 100) {
		return res.status(429).json({ message: 'Too many requests' });
	}

	redis.incr(key);
	next();
});

app.get('/state', async (req: any, res: any) => {
	const state = await redis.get(stateKey);
	if (state) {
		const parsedState = JSON.parse(state);
		return res.json({ state: parsedState });
	}

	return res.json({ state: [] });
});

app.get('/', (req: any, res: any) => {
	return res.json({ message: 'success' });
});

app.get('/books', async (req: any, res: any) => {
	const response = await axios.get(
		'https://api.freeapi.app/api/v1/public/books',
	);
	console.log(response.data);
	return res.json(response.data);
});

app.get('/books/total', async (req: any, res: any) => {
	const cachedValue = await redis.get('totalPageValue');
	// Check Cache
	if (cachedValue) {
		console.log(`Cache Hit`);
		return res.json({ totalPageCount: Number(cachedValue) });
	}
	const response = await axios.get(
		'https://api.freeapi.app/api/v1/public/books',
	);

	const totalPageCount = response.data?.data?.data?.reduce(
		(acc: number, curr: { volumeInfo?: { pageCount?: number } }) =>
			!curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc,
		0,
	);

	await redis.set('totalPageValue', totalPageCount);

	// Set the cache
	// cacheStore.totalPageCount = Number(totalPageCount);
	console.log(`Cache Miss`);
	console.log(totalPageCount);

	return res.json({ totalPageCount });
});

httpServer.listen(PORT, () =>
	console.log(`HTTP Server is Running on port ${PORT}`),
);
