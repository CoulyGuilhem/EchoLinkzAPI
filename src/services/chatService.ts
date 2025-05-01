import OpenAI from 'openai';

let api: OpenAI | null = null;
const getApi = () => {
  if (!api) api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });
  return api;
};

const getAssistantId = () => {
  if (!process.env.ASST_ID) throw new Error('ASST_ID missing');
  return process.env.ASST_ID;
};

export const sendChat = async (
  threadId: string | undefined,
  message: string,
) => {
  const openai = getApi();
  const assistantId = getAssistantId();

  console.time('echo-bot total');

  const thread = threadId
    ? await openai.beta.threads.retrieve(threadId)
    : await openai.beta.threads.create();

  console.log('thread', thread.id);

  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: message,
  });

  console.time('run generation');
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistantId,
  });
  console.log('run', run.id);

  let status;
  do {
    await new Promise(r => setTimeout(r, 1000));
    status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    console.log('run status', status.status, status.last_error ?? '');
    if (status.status === 'failed') throw new Error(status.last_error?.message);
  } while (status.status !== 'completed');
  

  console.timeEnd('run generation');

  const list = await openai.beta.threads.messages.list(thread.id, { limit: 1 });
  const block = list.data[0].content[0];
  const answer =
    block.type === 'text' ? block.text.value : '[unsupported content]';

  console.timeEnd('echo-bot total');

  return { threadId: thread.id, answer };
};
