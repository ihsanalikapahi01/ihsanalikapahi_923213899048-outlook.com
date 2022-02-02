/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// @ts-check

const cp = require('child_process');
const path = require('path');
const opn = require('opn');
const crypto = require('crypto');
const minimist = require('minimist');

function main() {

	const args = minimist(process.argv.slice(2), {
		boolean: [
			'help',
			'launch'
		],
		string: [
			'host',
			'port',
			'driver',
			'connection-token',
			'server-data-dir'
		],
	});

	if (args.help) {
		console.log(
			'./scripts/code-server.sh|bat [options]\n' +
			' --launch              Opens a browser'
		);
		startServer(['--help']);
		return
	}

	const serverArgs = process.argv.slice(2).filter(v => v !== '--launch');

	const HOST = args['host'] ?? 'localhost';
	const PORT = args['port'] ?? '9888';
	const TOKEN = args['connection-token'] ?? String(crypto.randomInt(0xffffffff));

	if (args['connection-token'] === undefined && args['connection-token-file'] === undefined && !args['without-connection-token']) {
		serverArgs.push('--connection-token', TOKEN);
	}
	if (args['host'] === undefined) {
		serverArgs.push('--host', HOST);
	}
	if (args['port'] === undefined) {
		serverArgs.push('--port', PORT);
	}

	startServer(serverArgs);
	if (args['launch']) {
		opn(`http://${HOST}:${PORT}/?tkn=${TOKEN}`);
	}
}

function startServer(programArgs) {
	const env = { ...process.env };

	const entryPoint = path.join(__dirname, '..', 'out', 'server-main.js');

	console.log(`Starting server: ${entryPoint} ${programArgs.join(' ')}`);
	const proc = cp.spawn(process.execPath, [entryPoint, ...programArgs], { env, stdio: 'inherit' });

	proc.on('exit', (code) => process.exit(code));

	process.on('exit', () => proc.kill());
	process.on('SIGINT', () => {
		proc.kill();
		process.exit(128 + 2); // https://nodejs.org/docs/v14.16.0/api/process.html#process_signal_events
	});
	process.on('SIGTERM', () => {
		proc.kill();
		process.exit(128 + 15); // https://nodejs.org/docs/v14.16.0/api/process.html#process_signal_events
	});

}

main();

