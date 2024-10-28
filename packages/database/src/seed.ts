const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const availableTriggers = await prisma.availableTriggers.createMany({
		data: [
			{
				name: 'Webhook Trigger',
				image: 'https://www.svgrepo.com/show/361957/webhooks.svg',
			},
		],
	});

	const availableActions = await prisma.availableActions.createMany({
		data: [
			{
				name: 'Send Email',
				image: 'https://www.svgrepo.com/show/14478/email.svg',
			},
			{
				name: 'Send Solana',
				image: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035',
			},
		],
	});

	console.log({ availableTriggers, availableActions });
}

main()
	.then(() => prisma.$disconnect())
	.catch((e) => {
		console.error(e);
		prisma.$disconnect();
		process.exit(1);
	});
