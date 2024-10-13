module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: [
		'/node_modules/', // Essa linha ignora a transformação de módulos em node_modules
	],
};
