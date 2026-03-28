import { chatRequestSchema } from '../src/schemas/chat';

const assert = (cond: unknown, msg: string) => {
  if (!cond) throw new Error(msg);
};

function main() {
  const parsed = chatRequestSchema.parse({ prompt: 'hola', temperature: 0.7 });
  assert(parsed.prompt === 'hola', 'prompt parsed');
  assert(parsed.temperature === 0.7, 'temperature parsed');

  try {
    chatRequestSchema.parse({ prompt: '' });
    throw new Error('empty prompt should throw');
  } catch {
    // expected
  }

  try {
    chatRequestSchema.parse({ prompt: 'a'.repeat(2001) });
    throw new Error('long prompt should throw');
  } catch {
    // expected
  }

  console.log('chat-schema.test.ts passed');
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
