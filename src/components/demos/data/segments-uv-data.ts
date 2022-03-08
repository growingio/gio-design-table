export const response = {
  "data": [
    [
      "全部用户",
      557
    ],
    [
      "新用户",
      151
    ]
  ],
  "meta": {
    "columns": [
      {
        "id": "segmentation",
        "name": "目标用户",
        "canSort": true,
        "isDim": true,
        "isRate": false,
        "isDuration": false
      },
      {
        "id": "AbQ3bDYe",
        "name": "页面浏览的总次数",
        "canSort": true,
        "isDim": false,
        "isRate": false,
        "isDuration": false
      }
    ],
    "fetchedTimestamp": 1646706021251
  }
}
export const request = {
  "attrs": {
    "metricType": "none",
    "subChartType": "seperate"
  },
  "dimensions": [
    "segmentation"
  ],
  "filter": null,
  "granularities": [
    {
      "id": "tm",
      "interval": 86400000
    },
    {
      "id": "segmentation",
      "values": [
        "nuv",
        "y9pm1pme"
      ]
    }
  ],
  "limit": 20,
  "metrics": [
    {
      "id": "AbQ3bDYe",
      "type": "custom",
      "name": "页面浏览的总次数",
      "alias": "页面浏览的总次数",
      "math": "count",
      "attributeKey": null
    }
  ],
  "orders": [
    {
      "isDim": false,
      "index": 0,
      "orderType": "desc"
    }
  ],
  "timeRange": "day:8,1",
  "skip": 0,
  "compProps": {},
  "updatedAt": ""
}