import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path';
import maxmind, { CityResponse, Reader } from 'maxmind';

function formattedData(info: CityResponse, ip: string, lang = 'zh-CN') {
  const data = {
    code: 0,
    msg: 'success!',
    ip,
    "continent": info.continent.names[lang],
    "continentCode": info.continent.code,
    "country": info.country.names[lang],
    "countryCode": info.country.iso_code,
    "region": info.registered_country.names[lang],
    "regionName": info.registered_country.iso_code,
    "city": info.city.names[lang] ?? '',
    "lat": info.location.latitude,
    "lon": info.location.longitude,
    "timezone": info.location.time_zone,
  }

  // 如果检测到香港，将其归类为中国
  if (info?.country?.iso_code === 'HK') {
    data.countryCode = 'CN';
    data.country = '中国';
  }

  return data
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 优先获取 query 参数,如果获取不到则获取请求头中的 x-forwarded-for 或 x-real-ip
  let ipStr = req.query?.ip as string || req.headers['x-forwarded-for'] as string || req.headers['x-real-ip'] as string;

  if (!maxmind.validate(ipStr)) {
    return res.json({ code: 1, msg: 'ip 地址格式不正确!' })
  }

  const filePath = join(process.cwd(), 'data', 'GeoLite2-City.mmdb');
  const buffer = readFileSync(filePath);
  const lookup = new Reader<CityResponse>(buffer);
  const ipInfo = lookup.get(ipStr)

  if (!ipInfo) {
    return res.json({ code: 1, msg: `未获取到 ip(${ipStr}) 信息!` })
  }

  // 参数校验
  const langList = ["de", "en", "es", "fr", "ja", "pt-BR", "ru", "zh-CN"]
  const paramsLang = req.query.lang as string ?? ''
  if (paramsLang && !langList.includes(paramsLang)) {
    return res.json({ code: 1, msg: `参数 lang 不争取, 仅支持${langList.join('、')}` })
  }

  // paramsLang 存在返回格式化后的数据
  if (paramsLang) {
    return res.json(formattedData(ipInfo, ipStr, paramsLang))
  }

  return res.json({ code: 0, msg: 'success!', ...ipInfo })
}
