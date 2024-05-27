import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import {join} from 'path';
import maxmind, { CityResponse, Reader } from 'maxmind';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 优先获取 query 参数,如果获取不到则获取本次请求的 req.headers.host
  const ipStr = req.query?.ip as string ?? req.headers.host

  const filePath = join(process.cwd(), 'data', 'GeoLite2-City.mmdb');
  const buffer = readFileSync(filePath);
  const lookup = new Reader<CityResponse>(buffer);
  const ipInfo = lookup.get(ipStr) ?? {}

  console.log(ipStr)

  return res.json(ipInfo)
}
