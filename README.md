# geo-ip2-api
根据 ip 获取地理信息在线调用版

# 使用 [vercel](https://vercel.com) 部署

```bash
git clone https://github.com/vaebe/geo-ip2-api
```

## Install the Vercel CLI:

```bash
npm i -g vercel
```

## Then run the app at the root of the repository:

```bash
vercel dev
```
# 使用

`code: 0` 表示获取数据正常, 目前仅支持 `https` 调用!

### 获取格式化后的数据 `https://geo-ip2-api.vercel.app/api/query?ip=159.226.171.49&lang=zh-CN`
```json
{
  "code": 0,
  "msg": "success!",
  "ip": "159.226.171.49",
  "continent": "亚洲",
  "continentCode": "AS",
  "country": "中国",
  "countryCode": "CN",
  "region": "中国",
  "regionName": "CN",
  "city": "天津",
  "lat": 39.1488,
  "lon": 117.1762,
  "timezone": "Asia/Shanghai"
}

```

### 获取未格式化的数据 `https://geo-ip2-api.vercel.app/api/query?ip=139.226.171.49`
```json
{
  "code": 0,
  "msg": "success!",
  "city": {
    "geoname_id": 1792947,
    "names": {
      "de": "Tianjin",
      "en": "Tianjin",
      "es": "Tianjín",
      "fr": "Tianjin",
      "ja": "天津市",
      "pt-BR": "Tianjin",
      "ru": "Тяньцзинь",
      "zh-CN": "天津"
    }
  },
  "continent": {
    "code": "AS",
    "geoname_id": 6255147,
    "names": {
      "de": "Asien",
      "en": "Asia",
      "es": "Asia",
      "fr": "Asie",
      "ja": "アジア",
      "pt-BR": "Ásia",
      "ru": "Азия",
      "zh-CN": "亚洲"
    }
  },
  "country": {
    "geoname_id": 1814991,
    "iso_code": "CN",
    "names": {
      "de": "China",
      "en": "China",
      "es": "China",
      "fr": "Chine",
      "ja": "中国",
      "pt-BR": "China",
      "ru": "Китай",
      "zh-CN": "中国"
    }
  },
  "location": {
    "accuracy_radius": 100,
    "latitude": 39.1488,
    "longitude": 117.1762,
    "time_zone": "Asia/Shanghai"
  },
  "registered_country": {
    "geoname_id": 1814991,
    "iso_code": "CN",
    "names": {
      "de": "China",
      "en": "China",
      "es": "China",
      "fr": "Chine",
      "ja": "中国",
      "pt-BR": "China",
      "ru": "Китай",
      "zh-CN": "中国"
    }
  },
  "subdivisions": [
    {
      "geoname_id": 1792943,
      "iso_code": "TJ",
      "names": {
        "en": "Tianjin",
        "fr": "Municipalité de Tianjin",
        "zh-CN": "天津市"
      }
    }
  ]
}
```

