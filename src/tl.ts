import process from 'node:process';
import { AtpAgent } from '@atproto/api';

const agent = new AtpAgent({ service: 'https://bsky.social'});

// @ts-ignore
const loginResp = await agent.login({
  identifier: process.env['ATP_IDENTIFIER'] ?? '',
  password: process.env['ATP_PASSWORD'] ?? '',
});

const tl = await agent.api.app.bsky.feed.getTimeline({});

for (const p of tl.data.feed) {
  console.log({
    handle: p.post.author.handle,
    name: p.post.author.displayName, // @ts-ignore
    text: p.post.record.text,
    reposts: p.post.repostCount,
    likes: p.post.upvoteCount,
  });
}
