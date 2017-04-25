var d3 = require("d3"),
    c3 = require("./../c3"),
    topojson = require("topojson"),
    utility = require("./../utility"),
    Tooltip = require("./../tooltip"),
    Text = require("./../text");

var chinaGeo ={
  "type": "Topology",
  "transform": {
    "scale": [
      0.006000031690044157,
      0.0045340551180617856
    ],
    "translate": [
      73.60225630700012,
      18.19318268400005
    ]
  },
  "objects": {
    "provinces": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "arcs": [
            [
              0,
              1,
              2,
              3,
              4,
              5,
              6
            ]
          ],
          "id": 0,
          "properties": {
            "adm1_code": "CHN-1150",
            "OBJECTID_1": 1492,
            "diss_me": 1150,
            "adm1_cod_1": "CHN-1150",
            "iso_3166_2": "CN-62",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Gansu",
            "name_alt": "Gānsù",
            "name_local": "甘肅|甘肃",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.GS",
            "note": null,
            "hasc_maybe": null,
            "region": "Northwest China",
            "region_cod": "6",
            "provnum_ne": 39,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "GS",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH15",
            "fips_alt": null,
            "woe_id": 12578005,
            "woe_label": "Gansu, CN, China",
            "woe_name": "Gansu",
            "latitude": 38.7393,
            "longitude": 100.735,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1810676,
            "gn_name": "Gansu Sheng",
            "gns_id": -1906131,
            "gns_name": "Gansu Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.15",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH15",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              7,
              8,
              9,
              -4
            ]
          ],
          "id": 1,
          "properties": {
            "adm1_code": "CHN-1151",
            "OBJECTID_1": 1493,
            "diss_me": 1151,
            "adm1_cod_1": "CHN-1151",
            "iso_3166_2": "CN-63",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Qinghai",
            "name_alt": null,
            "name_local": "青海|青海",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.QH",
            "note": null,
            "hasc_maybe": null,
            "region": "Northwest China",
            "region_cod": "6",
            "provnum_ne": 36,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "QH",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": null,
            "fips_alt": null,
            "woe_id": 12577996,
            "woe_label": "Qinghai, CN, China",
            "woe_name": "Qinghai",
            "latitude": 35.2652,
            "longitude": 96.2377,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1280239,
            "gn_name": "Qinghai Sheng",
            "gns_id": -1922240,
            "gns_name": "Qinghai Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.06",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH06",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              10,
              11,
              12,
              13,
              14
            ]
          ],
          "id": 2,
          "properties": {
            "adm1_code": "CHN-1152",
            "OBJECTID_1": 1229,
            "diss_me": 1152,
            "adm1_cod_1": "CHN-1152",
            "iso_3166_2": "CN-45",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 5,
            "name": "Guangxi",
            "name_alt": "Guangxi Zhuang|Guangxi Zhuàngzú",
            "name_local": "廣西壯族自治區|广西壮族自治区",
            "type": "Zìzhìqu",
            "type_en": "Autonomous Region",
            "code_local": null,
            "code_hasc": "CN.GX",
            "note": null,
            "hasc_maybe": null,
            "region": "South Central China",
            "region_cod": "4",
            "provnum_ne": 6,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "GX",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH16",
            "fips_alt": null,
            "woe_id": 12578006,
            "woe_label": "Guangxi, CN, China",
            "woe_name": "Guangxi",
            "latitude": 23.7451,
            "longitude": 108.756,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1809867,
            "gn_name": "Guangxi Zhuangzu Zizhiqu",
            "gns_id": -1907151,
            "gns_name": "Guangxi Zhuangzu Zizhiqu",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.16",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH16",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              15,
              -14,
              16,
              17,
              18
            ]
          ],
          "id": 3,
          "properties": {
            "adm1_code": "CHN-1153",
            "OBJECTID_1": 1494,
            "diss_me": 1153,
            "adm1_cod_1": "CHN-1153",
            "iso_3166_2": "CN-52",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Guizhou",
            "name_alt": "Gùizhōu",
            "name_local": "貴州|贵州",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.GZ",
            "note": null,
            "hasc_maybe": null,
            "region": "Southwest China",
            "region_cod": "5",
            "provnum_ne": 41,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "GZ",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH18",
            "fips_alt": null,
            "woe_id": 12578007,
            "woe_label": "Guizhou, CN, China",
            "woe_name": "Guizhou",
            "latitude": 26.8033,
            "longitude": 106.559,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1809445,
            "gn_name": "Guizhou Sheng",
            "gns_id": -1907620,
            "gns_name": "Guizhou Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.18",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH18",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              19,
              20,
              -19,
              21,
              22
            ]
          ],
          "id": 4,
          "properties": {
            "adm1_code": "CHN-1154",
            "OBJECTID_1": 1495,
            "diss_me": 1154,
            "adm1_cod_1": "CHN-1154",
            "iso_3166_2": "CN-50",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Chongqing",
            "name_alt": "Chóngqìng",
            "name_local": "重慶|重庆",
            "type": "Zhíxiáshì",
            "type_en": "Municipality",
            "code_local": null,
            "code_hasc": "CN.CQ",
            "note": null,
            "hasc_maybe": null,
            "region": "Southwest China",
            "region_cod": "5",
            "provnum_ne": 51,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "CQ",
            "area_sqkm": 0,
            "sameascity": 7,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 9,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH33",
            "fips_alt": "CH18|CH32",
            "woe_id": 20070171,
            "woe_label": "Chongqing, CN, China",
            "woe_name": "Chongqing",
            "latitude": 30.0173,
            "longitude": 107.73,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1814905,
            "gn_name": "Chongqing Shi",
            "gns_id": -1900775,
            "gns_name": "Chongqing Shi",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.33",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH33",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              23,
              24,
              25,
              26
            ]
          ],
          "id": 5,
          "properties": {
            "adm1_code": "CHN-1155",
            "OBJECTID_1": 1512,
            "diss_me": 1155,
            "adm1_cod_1": "CHN-1155",
            "iso_3166_2": "CN-11",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Beijing",
            "name_alt": "Běijīng",
            "name_local": "北京|北京",
            "type": "Zhíxiáshì",
            "type_en": "Municipality",
            "code_local": null,
            "code_hasc": "CN.BJ",
            "note": null,
            "hasc_maybe": null,
            "region": "North China",
            "region_cod": "1",
            "provnum_ne": 45,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "BJ",
            "area_sqkm": 0,
            "sameascity": 7,
            "labelrank": 7,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH22",
            "fips_alt": null,
            "woe_id": 12578011,
            "woe_label": "Beijing, CN, China",
            "woe_name": "Beijing",
            "latitude": 39.9488,
            "longitude": 116.389,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 2038349,
            "gn_name": "Beijing Shi",
            "gns_id": -1898545,
            "gns_name": "Beijing Shi",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.22",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH22",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              27,
              28,
              29,
              30
            ]
          ],
          "id": 6,
          "properties": {
            "adm1_code": "CHN-1178",
            "OBJECTID_1": 6318,
            "diss_me": 1178,
            "adm1_cod_1": "CHN-1178",
            "iso_3166_2": "CN-",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Fujian",
            "name_alt": "Fújiàn",
            "name_local": "福建|福建",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.FJ",
            "note": null,
            "hasc_maybe": null,
            "region": null,
            "region_cod": null,
            "provnum_ne": 5,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "FJ",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 6,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH07",
            "fips_alt": null,
            "woe_id": 12577997,
            "woe_label": "Fujian, CN, China",
            "woe_name": "Fujian",
            "latitude": 26.408,
            "longitude": 118.178,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1811017,
            "gn_name": "Fujian Sheng",
            "gns_id": -1905684,
            "gns_name": "Fujian Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.07",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH07",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              31,
              32,
              33,
              34,
              35,
              36
            ]
          ],
          "id": 7,
          "properties": {
            "adm1_code": "CHN-1179",
            "OBJECTID_1": 1513,
            "diss_me": 1179,
            "adm1_cod_1": "CHN-1179",
            "iso_3166_2": "CN-34",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Anhui",
            "name_alt": "Ānhuī",
            "name_local": "安徽|安徽",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.AH",
            "note": null,
            "hasc_maybe": null,
            "region": "East China",
            "region_cod": "3",
            "provnum_ne": 31,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "AH",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH01",
            "fips_alt": null,
            "woe_id": 12578022,
            "woe_label": "Anhui, CN, China",
            "woe_name": "Anhui",
            "latitude": 31.9537,
            "longitude": 117.253,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1818058,
            "gn_name": "Anhui Sheng",
            "gns_id": -1896677,
            "gns_name": "Anhui Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.01",
            "region_sub": "Central",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH01",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              37,
              -29,
              38,
              -11,
              39
            ]
          ],
          "id": 8,
          "properties": {
            "adm1_code": "CHN-1180",
            "OBJECTID_1": 1226,
            "diss_me": 1180,
            "adm1_cod_1": "CHN-1180",
            "iso_3166_2": "CN-44",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 5,
            "name": "Guangdong",
            "name_alt": "Guǎngdōng",
            "name_local": "廣東|广东",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.GD",
            "note": null,
            "hasc_maybe": null,
            "region": "South Central China",
            "region_cod": "4",
            "provnum_ne": 3,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "GD",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 9,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH30",
            "fips_alt": null,
            "woe_id": 12578019,
            "woe_label": "Guangdong, CN, China",
            "woe_name": "Guangdong",
            "latitude": 23.7924,
            "longitude": 113.72,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1809935,
            "gn_name": "Guangdong Sheng",
            "gns_id": -1907075,
            "gns_name": "Guangdong Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.30",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH30",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -9,
              40,
              41,
              42,
              43
            ]
          ],
          "id": 9,
          "properties": {
            "adm1_code": "CHN-1662",
            "OBJECTID_1": 2283,
            "diss_me": 1662,
            "adm1_cod_1": "CHN-1662",
            "iso_3166_2": "CN-54",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Xizang",
            "name_alt": "Tibet|Xīzàng",
            "name_local": "西藏自治區|西藏自治区",
            "type": "Zìzhìqu",
            "type_en": "Autonomous Region",
            "code_local": null,
            "code_hasc": "CN.XZ",
            "note": null,
            "hasc_maybe": null,
            "region": "Southwest China",
            "region_cod": "5",
            "provnum_ne": 48,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "XZ",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 6,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH14",
            "fips_alt": null,
            "woe_id": 12578004,
            "woe_label": "Tibet, CN, China",
            "woe_name": "Xizang",
            "latitude": 31.4515,
            "longitude": 88.4137,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1279685,
            "gn_name": "Tibet Autonomous Region",
            "gns_id": -1934604,
            "gns_name": "Xizang Zizhiqu",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.14",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH14",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -5,
              -10,
              -44,
              44
            ]
          ],
          "id": 10,
          "properties": {
            "adm1_code": "CHN-1756",
            "OBJECTID_1": 2284,
            "diss_me": 1756,
            "adm1_cod_1": "CHN-1756",
            "iso_3166_2": "CN-65",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Xinjiang",
            "name_alt": "Xinjiang Uygur|Xīnjiāng Wéiwúěr",
            "name_local": "新疆維吾爾自治區|新疆维吾尔自治区",
            "type": "Zìzhìqu",
            "type_en": "Autonomous Region",
            "code_local": null,
            "code_hasc": "CN.XJ",
            "note": null,
            "hasc_maybe": null,
            "region": "Northwest China",
            "region_cod": "6",
            "provnum_ne": 49,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "XJ",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 8,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH13",
            "fips_alt": null,
            "woe_id": 12578003,
            "woe_label": "Xinjiang, CN, China",
            "woe_name": "Xinjiang",
            "latitude": 41.122,
            "longitude": 85.4253,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1529047,
            "gn_name": "Xinjiang Uygur Zizhiqu",
            "gns_id": -1933787,
            "gns_name": "Xinjiang Uygur Zizhiqu",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.13",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "uig",
            "gns_adm1": "CH13",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              45
            ]
          ],
          "id": 11,
          "properties": {
            "adm1_code": "CHN-1775",
            "OBJECTID_1": 1876,
            "diss_me": 1775,
            "adm1_cod_1": "CHN-1775",
            "iso_3166_2": "CN-46",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Hainan",
            "name_alt": "Hǎinán",
            "name_local": "海南|海南",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.HA",
            "note": null,
            "hasc_maybe": null,
            "region": "South Central China",
            "region_cod": "4",
            "provnum_ne": 7,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "HA",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 6,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH31",
            "fips_alt": "CH",
            "woe_id": 12578020,
            "woe_label": "Hainan, CN, China",
            "woe_name": "Hainan",
            "latitude": 19.1865,
            "longitude": 109.825,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1809054,
            "gn_name": "Hainan Sheng",
            "gns_id": -1908190,
            "gns_name": "Hainan Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.31",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH31",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              46,
              -1,
              47
            ]
          ],
          "id": 12,
          "properties": {
            "adm1_code": "CHN-1803",
            "OBJECTID_1": 2285,
            "diss_me": 1803,
            "adm1_cod_1": "CHN-1803",
            "iso_3166_2": "CN-64",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Ningxia",
            "name_alt": "Ningxia Hui|Níngxià Húizú",
            "name_local": "寧夏回族自治區|宁夏回族自治区",
            "type": "Zìzhìqu",
            "type_en": "Autonomous Region",
            "code_local": null,
            "code_hasc": "CN.NX",
            "note": null,
            "hasc_maybe": null,
            "region": "Northwest China",
            "region_cod": "6",
            "provnum_ne": 38,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "NX",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH21",
            "fips_alt": null,
            "woe_id": 12578010,
            "woe_label": "Ningxia, CN, China",
            "woe_name": "Ningxia",
            "latitude": 37.1762,
            "longitude": 106.038,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1799355,
            "gn_name": "Ningxia Huizu Zizhiqu",
            "gns_id": -1920281,
            "gns_name": "Ningxia Huizu Zizhiqu",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.21",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH21",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              48,
              49,
              50,
              -23,
              51,
              -2,
              -47,
              52
            ]
          ],
          "id": 13,
          "properties": {
            "adm1_code": "CHN-1804",
            "OBJECTID_1": 2286,
            "diss_me": 1804,
            "adm1_cod_1": "CHN-1804",
            "iso_3166_2": "CN-61",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Shaanxi",
            "name_alt": "Shǎnxī",
            "name_local": "陝西|陕西",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.SA",
            "note": null,
            "hasc_maybe": null,
            "region": "Northwest China",
            "region_cod": "6",
            "provnum_ne": 37,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "SA",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH26",
            "fips_alt": null,
            "woe_id": 12578015,
            "woe_label": "Shaanxi, CN, China",
            "woe_name": "Shaanxi",
            "latitude": 33.7713,
            "longitude": 108.363,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1796480,
            "gn_name": "Shaanxi",
            "gns_id": -1924159,
            "gns_name": "Shaanxi Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.26",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH26",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              53,
              -49,
              54,
              55
            ]
          ],
          "id": 14,
          "properties": {
            "adm1_code": "CHN-1805",
            "OBJECTID_1": 2321,
            "diss_me": 1805,
            "adm1_cod_1": "CHN-1805",
            "iso_3166_2": "CN-14",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Shanxi",
            "name_alt": "Shānxī",
            "name_local": "山西|山西",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.SX",
            "note": null,
            "hasc_maybe": null,
            "region": "North China",
            "region_cod": "1",
            "provnum_ne": 35,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "SX",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 6,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH24",
            "fips_alt": null,
            "woe_id": 12578013,
            "woe_label": "Shanxi, CN, China",
            "woe_name": "Shanxi",
            "latitude": 37.7586,
            "longitude": 112.389,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1795912,
            "gn_name": "Shanxi Sheng",
            "gns_id": -1924845,
            "gns_name": "Shanxi Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.24",
            "region_sub": "Central",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH24",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -34,
              56,
              57,
              -20,
              -51,
              58
            ]
          ],
          "id": 15,
          "properties": {
            "adm1_code": "CHN-1807",
            "OBJECTID_1": 2322,
            "diss_me": 1807,
            "adm1_cod_1": "CHN-1807",
            "iso_3166_2": "CN-42",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Hubei",
            "name_alt": "Húběi",
            "name_local": "湖北|湖北",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.HU",
            "note": null,
            "hasc_maybe": null,
            "region": "South Central China",
            "region_cod": "4",
            "provnum_ne": 32,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "HU",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH12",
            "fips_alt": null,
            "woe_id": 12578002,
            "woe_label": "Hubei, CN, China",
            "woe_name": "Hubei",
            "latitude": 30.9857,
            "longitude": 112.264,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1806949,
            "gn_name": "Hubei Sheng",
            "gns_id": -1910798,
            "gns_name": "Hubei Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.12",
            "region_sub": "Central",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH12",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              59,
              -40,
              -15,
              -16,
              -21,
              -58
            ]
          ],
          "id": 16,
          "properties": {
            "adm1_code": "CHN-1808",
            "OBJECTID_1": 2323,
            "diss_me": 1808,
            "adm1_cod_1": "CHN-1808",
            "iso_3166_2": "CN-43",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Hunan",
            "name_alt": "Húnán",
            "name_local": "湖南|湖南",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.HN",
            "note": null,
            "hasc_maybe": null,
            "region": "South Central China",
            "region_cod": "4",
            "provnum_ne": 40,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "HN",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH11",
            "fips_alt": null,
            "woe_id": 12578001,
            "woe_label": "Hunan, CN, China",
            "woe_name": "Hunan",
            "latitude": 27.6667,
            "longitude": 111.712,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1806691,
            "gn_name": "Hunan Sheng",
            "gns_id": -1911104,
            "gns_name": "Hunan Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.11",
            "region_sub": "Central",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH11",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -52,
              -22,
              -18,
              60,
              -41,
              -8,
              -3
            ]
          ],
          "id": 17,
          "properties": {
            "adm1_code": "CHN-1809",
            "OBJECTID_1": 2287,
            "diss_me": 1809,
            "adm1_cod_1": "CHN-1809",
            "iso_3166_2": "CN-51",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Sichuan",
            "name_alt": "Sìchuān",
            "name_local": "四川|四川",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.SC",
            "note": null,
            "hasc_maybe": null,
            "region": "Southwest China",
            "region_cod": "5",
            "provnum_ne": 42,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "SC",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH32",
            "fips_alt": "CH27",
            "woe_id": 12578016,
            "woe_label": "Sichuan, CN, China",
            "woe_name": "Sichuan",
            "latitude": 30.5431,
            "longitude": 102.384,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1794299,
            "gn_name": "Sichuan Sheng",
            "gns_id": -1926775,
            "gns_name": "Sichuan Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.32",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH32",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -17,
              -13,
              61,
              -42,
              -61
            ]
          ],
          "id": 18,
          "properties": {
            "adm1_code": "CHN-1810",
            "OBJECTID_1": 2288,
            "diss_me": 1810,
            "adm1_cod_1": "CHN-1810",
            "iso_3166_2": "CN-53",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Yunnan",
            "name_alt": "Yúnnán",
            "name_local": "雲南|云南",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.YN",
            "note": null,
            "hasc_maybe": null,
            "region": "Southwest China",
            "region_cod": "5",
            "provnum_ne": 47,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "YN",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 6,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH29",
            "fips_alt": null,
            "woe_id": 12578018,
            "woe_label": "Yunnan, CN, China",
            "woe_name": "Yunnan",
            "latitude": 24.4603,
            "longitude": 101.661,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1785694,
            "gn_name": "Yunnan Sheng",
            "gns_id": -1937567,
            "gns_name": "Yunnan Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.29",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH29",
            "gns_region": null
          }
        },
        {
          "type": "MultiPolygon",
          "arcs": [
            [
              [
                -25,
                62
              ]
            ],
            [
              [
                63,
                64,
                65,
                -27,
                66,
                67,
                68,
                69,
                -56,
                70
              ]
            ]
          ],
          "id": 19,
          "properties": {
            "adm1_code": "CHN-1811",
            "OBJECTID_1": 2324,
            "diss_me": 1811,
            "adm1_cod_1": "CHN-1811",
            "iso_3166_2": "CN-13",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Hebei",
            "name_alt": "Héběi",
            "name_local": "河北|河北",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.HB",
            "note": null,
            "hasc_maybe": null,
            "region": "North China",
            "region_cod": "1",
            "provnum_ne": 44,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "HB",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH10",
            "fips_alt": null,
            "woe_id": 12578000,
            "woe_label": "Hebei, CN, China",
            "woe_name": "Hebei",
            "latitude": 38.5205,
            "longitude": 115.314,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1808773,
            "gn_name": "Hebei Sheng",
            "gns_id": -1908578,
            "gns_name": "Hebei Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.10",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH10",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              71,
              -35,
              -59,
              -50,
              -54,
              -70
            ]
          ],
          "id": 20,
          "properties": {
            "adm1_code": "CHN-1812",
            "OBJECTID_1": 2325,
            "diss_me": 1812,
            "adm1_cod_1": "CHN-1812",
            "iso_3166_2": "CN-41",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Henan",
            "name_alt": "Hénán",
            "name_local": "河南|河南",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.HE",
            "note": null,
            "hasc_maybe": null,
            "region": "South Central China",
            "region_cod": "4",
            "provnum_ne": 33,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "HE",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH09",
            "fips_alt": null,
            "woe_id": 12577999,
            "woe_label": "Henan, CN, China",
            "woe_name": "Henan",
            "latitude": 33.9055,
            "longitude": 113.484,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1808520,
            "gn_name": "Henan Sheng",
            "gns_id": -1908908,
            "gns_name": "Henan Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.09",
            "region_sub": "Central",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH09",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              72,
              -64,
              73,
              74
            ]
          ],
          "id": 21,
          "properties": {
            "adm1_code": "CHN-1813",
            "OBJECTID_1": 2039,
            "diss_me": 1813,
            "adm1_cod_1": "CHN-1813",
            "iso_3166_2": "CN-21",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 5,
            "name": "Liaoning",
            "name_alt": "Liáoníng",
            "name_local": "遼寧|辽宁",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.LN",
            "note": null,
            "hasc_maybe": null,
            "region": "Northeast China",
            "region_cod": "2",
            "provnum_ne": 11,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "LN",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 8,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH19",
            "fips_alt": null,
            "woe_id": 12578008,
            "woe_label": "Liaoning, CN, China",
            "woe_name": "Liaoning",
            "latitude": 41.386,
            "longitude": 123.07,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 2036115,
            "gn_name": "Liaoning Sheng",
            "gns_id": -1914920,
            "gns_name": "Liaoning Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.19",
            "region_sub": "Northeast",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH19",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              75,
              -36,
              -72,
              -69,
              76
            ]
          ],
          "id": 22,
          "properties": {
            "adm1_code": "CHN-1814",
            "OBJECTID_1": 2001,
            "diss_me": 1814,
            "adm1_cod_1": "CHN-1814",
            "iso_3166_2": "CN-37",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 6,
            "name": "Shandong",
            "name_alt": "Shāndōng",
            "name_local": "山東|山东",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.SD",
            "note": null,
            "hasc_maybe": null,
            "region": "East China",
            "region_cod": "3",
            "provnum_ne": 10,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "SD",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 8,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH25",
            "fips_alt": null,
            "woe_id": 12578014,
            "woe_label": "Shandong, CN, China",
            "woe_name": "Shandong",
            "latitude": 36.3271,
            "longitude": 118.114,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1796328,
            "gn_name": "Shandong Sheng",
            "gns_id": -1924356,
            "gns_name": "Shandong Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.25",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH25",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              77,
              -67,
              -26,
              -63,
              -24,
              -66
            ]
          ],
          "id": 23,
          "properties": {
            "adm1_code": "CHN-1816",
            "OBJECTID_1": 2326,
            "diss_me": 1816,
            "adm1_cod_1": "CHN-1816",
            "iso_3166_2": "CN-12",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Tianjin",
            "name_alt": "Tiānjīn",
            "name_local": "天津|天津",
            "type": "Zhíxiáshì",
            "type_en": "Municipality",
            "code_local": null,
            "code_hasc": "CN.TJ",
            "note": null,
            "hasc_maybe": null,
            "region": "North China",
            "region_cod": "1",
            "provnum_ne": 46,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "TJ",
            "area_sqkm": 0,
            "sameascity": 7,
            "labelrank": 7,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH28",
            "fips_alt": null,
            "woe_id": 12578017,
            "woe_label": "Tianjin, CN, China",
            "woe_name": "Tianjin",
            "latitude": 39.3708,
            "longitude": 117.347,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1792943,
            "gn_name": "Tianjin Shi",
            "gns_id": -1928568,
            "gns_name": "Tianjin Shi",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.28",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH28",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              78,
              -30,
              -38,
              -60,
              -57,
              -33
            ]
          ],
          "id": 24,
          "properties": {
            "adm1_code": "CHN-1817",
            "OBJECTID_1": 2327,
            "diss_me": 1817,
            "adm1_cod_1": "CHN-1817",
            "iso_3166_2": "CN-36",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Jiangxi",
            "name_alt": "Jiāngxī",
            "name_local": "江西|江西",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.JX",
            "note": null,
            "hasc_maybe": null,
            "region": "East China",
            "region_cod": "3",
            "provnum_ne": 34,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "JX",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH03",
            "fips_alt": null,
            "woe_id": 12577993,
            "woe_label": "Jiangxi, CN, China",
            "woe_name": "Jiangxi",
            "latitude": 27.6397,
            "longitude": 116.017,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1806222,
            "gn_name": "Jiangxi Sheng",
            "gns_id": -1911731,
            "gns_name": "Jiangxi Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.03",
            "region_sub": "Central",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH03",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              79,
              80,
              -37,
              -76,
              81
            ]
          ],
          "id": 25,
          "properties": {
            "adm1_code": "CHN-1818",
            "OBJECTID_1": 1925,
            "diss_me": 1818,
            "adm1_cod_1": "CHN-1818",
            "iso_3166_2": "CN-32",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 3,
            "name": "Jiangsu",
            "name_alt": "Jiāngsū",
            "name_local": "江蘇|江苏",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.JS",
            "note": null,
            "hasc_maybe": null,
            "region": "East China",
            "region_cod": "3",
            "provnum_ne": 8,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "JS",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 7,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH04",
            "fips_alt": null,
            "woe_id": 12577994,
            "woe_label": "Jiangsu, CN, China",
            "woe_name": "Jiangsu",
            "latitude": 32.9844,
            "longitude": 119.942,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1806260,
            "gn_name": "Jiangsu Sheng",
            "gns_id": -1911691,
            "gns_name": "Jiangsu Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.04",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH04",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              82,
              83,
              -80
            ]
          ],
          "id": 26,
          "properties": {
            "adm1_code": "CHN-1819",
            "OBJECTID_1": 1923,
            "diss_me": 1819,
            "adm1_cod_1": "CHN-1819",
            "iso_3166_2": "CN-31",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 5,
            "name": "Shanghai",
            "name_alt": "Shànghǎi",
            "name_local": "上海|上海",
            "type": "Zhíxiáshì",
            "type_en": "Municipality",
            "code_local": null,
            "code_hasc": "CN.SH",
            "note": null,
            "hasc_maybe": null,
            "region": "East China",
            "region_cod": "3",
            "provnum_ne": 9,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "SH",
            "area_sqkm": 0,
            "sameascity": 7,
            "labelrank": 7,
            "featurecla": "Admin-1 scale rank",
            "name_len": 8,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH23",
            "fips_alt": null,
            "woe_id": 12578012,
            "woe_label": "Shanghai, CN, China",
            "woe_name": "Shanghai",
            "latitude": 31.0909,
            "longitude": 121.409,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1796231,
            "gn_name": "Shanghai Shi",
            "gns_id": -1924470,
            "gns_name": "Shanghai Shi",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.23",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH23",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -84,
              84,
              -31,
              -79,
              -32,
              -81
            ]
          ],
          "id": 27,
          "properties": {
            "adm1_code": "CHN-1820",
            "OBJECTID_1": 1896,
            "diss_me": 1820,
            "adm1_cod_1": "CHN-1820",
            "iso_3166_2": "CN-33",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 5,
            "name": "Zhejiang",
            "name_alt": "Zhèjiāng",
            "name_local": "浙江|浙江",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.ZJ",
            "note": null,
            "hasc_maybe": null,
            "region": "East China",
            "region_cod": "3",
            "provnum_ne": 4,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "ZJ",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 8,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH02",
            "fips_alt": null,
            "woe_id": 12577992,
            "woe_label": "Zhejiang, CN, China",
            "woe_name": "Zhejiang",
            "latitude": 29.1084,
            "longitude": 119.97,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 1784764,
            "gn_name": "Zhejiang Sheng",
            "gns_id": -1938694,
            "gns_name": "Zhejiang Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.02",
            "region_sub": null,
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH02",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              85,
              -75,
              86,
              87
            ]
          ],
          "id": 28,
          "properties": {
            "adm1_code": "CHN-1828",
            "OBJECTID_1": 2328,
            "diss_me": 1828,
            "adm1_cod_1": "CHN-1828",
            "iso_3166_2": "CN-22",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Jilin",
            "name_alt": "Jílín",
            "name_local": "吉林|吉林",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.JL",
            "note": null,
            "hasc_maybe": null,
            "region": "Northeast China",
            "region_cod": "2",
            "provnum_ne": 52,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "JL",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 5,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH05",
            "fips_alt": null,
            "woe_id": 12577995,
            "woe_label": "Jilin, CN, China",
            "woe_name": "Jilin",
            "latitude": 43.2978,
            "longitude": 126.466,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 2036500,
            "gn_name": "Jilin Sheng",
            "gns_id": -1912251,
            "gns_name": "Jilin Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.05",
            "region_sub": "Northeast",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH05",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              88,
              -87,
              -74,
              -71,
              -55,
              -53,
              -48,
              -7,
              89
            ]
          ],
          "id": 29,
          "properties": {
            "adm1_code": "CHN-1838",
            "OBJECTID_1": 2329,
            "diss_me": 1838,
            "adm1_cod_1": "CHN-1838",
            "iso_3166_2": "CN-15",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Inner Mongol",
            "name_alt": "Nei Mongol|Nèiměnggǔ",
            "name_local": "內蒙古自治區|内蒙古自治区",
            "type": "Zìzhìqu",
            "type_en": "Autonomous Region",
            "code_local": null,
            "code_hasc": "CN.NM",
            "note": null,
            "hasc_maybe": null,
            "region": "North China",
            "region_cod": "1",
            "provnum_ne": 43,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "NM",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 12,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH20",
            "fips_alt": null,
            "woe_id": 12578009,
            "woe_label": "Nei Mongol, CN, China",
            "woe_name": "Inner Mongol",
            "latitude": 41.5938,
            "longitude": 111.623,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 2035607,
            "gn_name": "Inner Mongolia Autonomous Region",
            "gns_id": -1920094,
            "gns_name": "Nei Mongol Zizhiqu",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.20",
            "region_sub": "Western",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH20",
            "gns_region": null
          }
        },
        {
          "type": "Polygon",
          "arcs": [
            [
              -88,
              -89,
              90
            ]
          ],
          "id": 30,
          "properties": {
            "adm1_code": "CHN-1839",
            "OBJECTID_1": 2330,
            "diss_me": 1839,
            "adm1_cod_1": "CHN-1839",
            "iso_3166_2": "CN-23",
            "wikipedia": null,
            "iso_a2": "CN",
            "adm0_sr": 1,
            "name": "Heilongjiang",
            "name_alt": "Hēilóngjiāng",
            "name_local": "黑龍江省|黑龙江省",
            "type": "Shěng",
            "type_en": "Province",
            "code_local": null,
            "code_hasc": "CN.HL",
            "note": null,
            "hasc_maybe": null,
            "region": "Northeast China",
            "region_cod": "2",
            "provnum_ne": 50,
            "gadm_level": 1,
            "check_me": 20,
            "scalerank": 2,
            "datarank": 1,
            "abbrev": null,
            "postal": "HL",
            "area_sqkm": 0,
            "sameascity": -99,
            "labelrank": 2,
            "featurecla": "Admin-1 scale rank",
            "name_len": 12,
            "mapcolor9": 4,
            "mapcolor13": 3,
            "fips": "CH08",
            "fips_alt": null,
            "woe_id": 12577998,
            "woe_label": "Heilongjiang, CN, China",
            "woe_name": "Heilongjiang",
            "latitude": 46.8451,
            "longitude": 127.97,
            "sov_a3": "CH1",
            "adm0_a3": "CHN",
            "adm0_label": 2,
            "admin": "China",
            "geonunit": "China",
            "gu_a3": "CHN",
            "gn_id": 2036965,
            "gn_name": "Heilongjiang Sheng",
            "gns_id": -1908709,
            "gns_name": "Heilongjiang Sheng",
            "gn_level": 1,
            "gn_region": null,
            "gn_a1_code": "CN.08",
            "region_sub": "Northeast",
            "sub_code": null,
            "gns_level": 1,
            "gns_lang": "zho",
            "gns_adm1": "CH08",
            "gns_region": null
          }
        }
      ],
      "bbox": [
        73.60225630700012,
        18.19318268400005,
        134.7725793870003,
        53.563346660000036
      ]
    }
  },
  "arcs": [
    [
      [
        5126,
        4236
      ],
      [
        55,
        3
      ],
      [
        106,
        -139
      ],
      [
        -17,
        -20
      ],
      [
        37,
        -97
      ],
      [
        -21,
        -70
      ],
      [
        166,
        -146
      ],
      [
        32,
        62
      ],
      [
        68,
        52
      ],
      [
        5,
        63
      ],
      [
        -75,
        43
      ],
      [
        1,
        96
      ],
      [
        24,
        105
      ],
      [
        107,
        -25
      ]
    ],
    [
      [
        5614,
        4163
      ],
      [
        -1,
        -34
      ],
      [
        101,
        -35
      ],
      [
        26,
        -35
      ],
      [
        110,
        -52
      ],
      [
        -4,
        -78
      ],
      [
        -31,
        -28
      ],
      [
        21,
        -108
      ],
      [
        -21,
        -26
      ],
      [
        -137,
        -10
      ],
      [
        27,
        -55
      ],
      [
        -104,
        -19
      ],
      [
        -49,
        43
      ],
      [
        -58,
        -2
      ],
      [
        -3,
        -48
      ],
      [
        -38,
        -61
      ],
      [
        59,
        -44
      ],
      [
        -42,
        -107
      ],
      [
        23,
        -66
      ],
      [
        -81,
        4
      ],
      [
        -59,
        -51
      ],
      [
        32,
        -34
      ],
      [
        -4,
        -56
      ],
      [
        -65,
        -16
      ]
    ],
    [
      [
        5316,
        3245
      ],
      [
        -38,
        -58
      ],
      [
        -62,
        -7
      ],
      [
        -102,
        52
      ],
      [
        20,
        48
      ],
      [
        -52,
        133
      ],
      [
        -58,
        2
      ],
      [
        -94,
        32
      ],
      [
        -10,
        76
      ],
      [
        -57,
        24
      ],
      [
        -68,
        -66
      ],
      [
        -34,
        -8
      ],
      [
        49,
        -106
      ],
      [
        -102,
        -74
      ],
      [
        12,
        62
      ],
      [
        -24,
        28
      ]
    ],
    [
      [
        4696,
        3383
      ],
      [
        -47,
        38
      ],
      [
        -56,
        -9
      ],
      [
        -5,
        41
      ],
      [
        -56,
        67
      ],
      [
        23,
        51
      ],
      [
        113,
        -43
      ],
      [
        28,
        -27
      ],
      [
        72,
        63
      ],
      [
        -42,
        45
      ],
      [
        8,
        85
      ],
      [
        62,
        58
      ],
      [
        -15,
        45
      ],
      [
        66,
        23
      ],
      [
        3,
        72
      ],
      [
        46,
        -1
      ],
      [
        10,
        84
      ],
      [
        -37,
        24
      ],
      [
        -59,
        139
      ],
      [
        15,
        46
      ],
      [
        -87,
        70
      ],
      [
        -41,
        9
      ],
      [
        -122,
        97
      ],
      [
        -69,
        32
      ],
      [
        -83,
        84
      ],
      [
        -10,
        -46
      ],
      [
        -47,
        19
      ],
      [
        -169,
        155
      ],
      [
        -30,
        -27
      ],
      [
        -47,
        17
      ],
      [
        -42,
        -49
      ],
      [
        -118,
        77
      ],
      [
        -56,
        10
      ],
      [
        -13,
        -185
      ],
      [
        -149,
        71
      ],
      [
        -125,
        111
      ],
      [
        -41,
        -7
      ],
      [
        -97,
        37
      ],
      [
        -126,
        -2
      ],
      [
        -131,
        -34
      ]
    ],
    [
      [
        3222,
        4623
      ],
      [
        2,
        66
      ],
      [
        -29,
        79
      ],
      [
        28,
        146
      ],
      [
        106,
        25
      ],
      [
        72,
        114
      ],
      [
        95,
        106
      ],
      [
        80,
        45
      ],
      [
        119,
        9
      ],
      [
        44,
        37
      ],
      [
        1,
        111
      ],
      [
        54,
        49
      ]
    ],
    [
      [
        3794,
        5410
      ],
      [
        137,
        14
      ]
    ],
    [
      [
        3931,
        5424
      ],
      [
        110,
        -257
      ],
      [
        -33,
        -36
      ],
      [
        50,
        -74
      ],
      [
        63,
        -59
      ],
      [
        -16,
        -69
      ],
      [
        69,
        6
      ],
      [
        85,
        59
      ],
      [
        142,
        13
      ],
      [
        33,
        -61
      ],
      [
        -51,
        -91
      ],
      [
        -46,
        -30
      ],
      [
        10,
        -43
      ],
      [
        84,
        -40
      ],
      [
        59,
        -63
      ],
      [
        48,
        -6
      ],
      [
        4,
        -47
      ],
      [
        54,
        -32
      ],
      [
        22,
        -56
      ],
      [
        87,
        -17
      ],
      [
        33,
        41
      ],
      [
        -34,
        41
      ],
      [
        94,
        38
      ],
      [
        96,
        -26
      ],
      [
        130,
        68
      ],
      [
        52,
        0
      ],
      [
        28,
        -74
      ],
      [
        -72,
        -110
      ],
      [
        -54,
        -34
      ],
      [
        -5,
        -131
      ],
      [
        40,
        -15
      ],
      [
        71,
        -69
      ],
      [
        42,
        -14
      ]
    ],
    [
      [
        4696,
        3383
      ],
      [
        -22,
        -89
      ],
      [
        -34,
        24
      ],
      [
        -46,
        -24
      ],
      [
        1,
        -97
      ],
      [
        -83,
        -1
      ],
      [
        -86,
        22
      ],
      [
        -19,
        33
      ],
      [
        -46,
        -3
      ],
      [
        -12,
        -39
      ],
      [
        -68,
        32
      ],
      [
        -73,
        63
      ],
      [
        -34,
        111
      ],
      [
        -31,
        36
      ],
      [
        -71,
        26
      ],
      [
        -108,
        -19
      ],
      [
        1,
        -57
      ],
      [
        55,
        -46
      ],
      [
        -60,
        -112
      ],
      [
        11,
        -43
      ],
      [
        48,
        -35
      ]
    ],
    [
      [
        4019,
        3165
      ],
      [
        -59,
        -10
      ],
      [
        -18,
        -93
      ],
      [
        -87,
        -26
      ],
      [
        11,
        -54
      ],
      [
        -87,
        43
      ],
      [
        -30,
        -46
      ],
      [
        -100,
        9
      ],
      [
        -12,
        78
      ],
      [
        -60,
        37
      ],
      [
        -80,
        90
      ],
      [
        -79,
        -42
      ],
      [
        -63,
        20
      ],
      [
        -37,
        -12
      ],
      [
        -84,
        48
      ],
      [
        -131,
        2
      ],
      [
        -113,
        74
      ],
      [
        -30,
        57
      ],
      [
        -93,
        -43
      ],
      [
        -100,
        57
      ],
      [
        -95,
        153
      ],
      [
        35,
        61
      ],
      [
        -47,
        129
      ],
      [
        -13,
        85
      ],
      [
        41,
        23
      ],
      [
        10,
        84
      ],
      [
        -19,
        56
      ]
    ],
    [
      [
        2679,
        3945
      ],
      [
        158,
        7
      ],
      [
        42,
        -24
      ],
      [
        43,
        30
      ],
      [
        -21,
        80
      ],
      [
        -53,
        43
      ],
      [
        20,
        47
      ],
      [
        80,
        23
      ],
      [
        -36,
        105
      ],
      [
        -106,
        64
      ],
      [
        0,
        48
      ],
      [
        -48,
        96
      ],
      [
        84,
        53
      ],
      [
        60,
        6
      ],
      [
        185,
        53
      ],
      [
        135,
        47
      ]
    ],
    [
      [
        6399,
        1443
      ],
      [
        8,
        -78
      ],
      [
        -29,
        -33
      ],
      [
        5,
        -51
      ],
      [
        -40,
        -35
      ],
      [
        -45,
        -91
      ],
      [
        -7,
        -115
      ],
      [
        -54,
        -60
      ],
      [
        -45,
        -12
      ],
      [
        -19,
        -88
      ],
      [
        -51,
        2
      ],
      [
        4,
        -67
      ],
      [
        -65,
        -5
      ],
      [
        -37,
        -64
      ]
    ],
    [
      [
        6024,
        746
      ],
      [
        -101,
        -38
      ],
      [
        -1,
        44
      ],
      [
        -67,
        13
      ],
      [
        -27,
        33
      ],
      [
        -97,
        -72
      ],
      [
        -26,
        34
      ],
      [
        -81,
        -9
      ],
      [
        -80,
        82
      ],
      [
        -36,
        6
      ],
      [
        -21,
        95
      ],
      [
        37,
        70
      ],
      [
        -43,
        40
      ],
      [
        -29,
        -16
      ],
      [
        -53,
        27
      ],
      [
        -24,
        -16
      ],
      [
        -55,
        57
      ]
    ],
    [
      [
        5320,
        1096
      ],
      [
        54,
        79
      ],
      [
        47,
        4
      ],
      [
        5,
        96
      ],
      [
        -41,
        24
      ],
      [
        -120,
        9
      ],
      [
        -13,
        63
      ],
      [
        -86,
        -2
      ],
      [
        -10,
        75
      ]
    ],
    [
      [
        5156,
        1444
      ],
      [
        32,
        -24
      ],
      [
        76,
        83
      ],
      [
        54,
        -42
      ],
      [
        85,
        -39
      ],
      [
        23,
        71
      ],
      [
        140,
        65
      ],
      [
        -4,
        40
      ],
      [
        45,
        26
      ],
      [
        42,
        -76
      ],
      [
        61,
        -15
      ],
      [
        44,
        28
      ],
      [
        28,
        59
      ],
      [
        46,
        -27
      ],
      [
        78,
        28
      ],
      [
        -2,
        39
      ],
      [
        46,
        5
      ],
      [
        26,
        65
      ]
    ],
    [
      [
        5976,
        1730
      ],
      [
        52,
        -28
      ],
      [
        26,
        63
      ],
      [
        53,
        -48
      ],
      [
        52,
        80
      ],
      [
        54,
        -14
      ],
      [
        11,
        25
      ],
      [
        51,
        -24
      ],
      [
        -10,
        -72
      ],
      [
        21,
        -100
      ],
      [
        -54,
        -77
      ],
      [
        72,
        -10
      ],
      [
        40,
        -72
      ],
      [
        55,
        -10
      ]
    ],
    [
      [
        5943,
        2275
      ],
      [
        16,
        -54
      ],
      [
        -8,
        -81
      ],
      [
        23,
        -54
      ],
      [
        -58,
        -114
      ],
      [
        57,
        -1
      ],
      [
        13,
        -60
      ],
      [
        -20,
        -23
      ],
      [
        -17,
        -97
      ],
      [
        27,
        -61
      ]
    ],
    [
      [
        5156,
        1444
      ],
      [
        30,
        104
      ],
      [
        -69,
        100
      ],
      [
        62,
        157
      ],
      [
        -19,
        46
      ],
      [
        -68,
        14
      ],
      [
        -22,
        -30
      ],
      [
        -39,
        14
      ],
      [
        -16,
        127
      ],
      [
        36,
        52
      ],
      [
        44,
        -26
      ],
      [
        45,
        17
      ],
      [
        71,
        -8
      ],
      [
        55,
        19
      ],
      [
        16,
        72
      ]
    ],
    [
      [
        5282,
        2102
      ],
      [
        56,
        -9
      ],
      [
        119,
        34
      ],
      [
        -39,
        74
      ],
      [
        -36,
        -4
      ],
      [
        -41,
        41
      ],
      [
        6,
        54
      ],
      [
        50,
        37
      ],
      [
        66,
        -40
      ]
    ],
    [
      [
        5463,
        2289
      ],
      [
        52,
        -20
      ],
      [
        56,
        90
      ],
      [
        68,
        -3
      ],
      [
        20,
        69
      ],
      [
        53,
        -45
      ],
      [
        69,
        20
      ],
      [
        13,
        -66
      ],
      [
        60,
        -118
      ],
      [
        61,
        -8
      ],
      [
        28,
        67
      ]
    ],
    [
      [
        5999,
        2987
      ],
      [
        23,
        -39
      ],
      [
        62,
        -36
      ],
      [
        11,
        -46
      ],
      [
        -18,
        -79
      ],
      [
        -32,
        13
      ],
      [
        -80,
        -67
      ],
      [
        -120,
        -2
      ],
      [
        -23,
        -57
      ],
      [
        -2,
        -130
      ],
      [
        58,
        -20
      ],
      [
        8,
        -64
      ],
      [
        48,
        -54
      ]
    ],
    [
      [
        5934,
        2406
      ],
      [
        9,
        -131
      ]
    ],
    [
      [
        5463,
        2289
      ],
      [
        -20,
        66
      ],
      [
        -86,
        27
      ],
      [
        -7,
        51
      ],
      [
        -48,
        26
      ],
      [
        -21,
        53
      ],
      [
        70,
        63
      ],
      [
        -25,
        62
      ],
      [
        39,
        60
      ],
      [
        74,
        -44
      ],
      [
        50,
        26
      ],
      [
        30,
        -62
      ],
      [
        53,
        0
      ],
      [
        74,
        121
      ],
      [
        5,
        47
      ],
      [
        70,
        11
      ],
      [
        17,
        78
      ],
      [
        63,
        75
      ],
      [
        15,
        50
      ],
      [
        -38,
        40
      ],
      [
        41,
        50
      ]
    ],
    [
      [
        5819,
        3089
      ],
      [
        90,
        -57
      ],
      [
        47,
        -52
      ],
      [
        43,
        7
      ]
    ],
    [
      [
        7292,
        4866
      ],
      [
        -19,
        -36
      ]
    ],
    [
      [
        7273,
        4830
      ],
      [
        -80,
        -18
      ],
      [
        19,
        -72
      ]
    ],
    [
      [
        7212,
        4740
      ],
      [
        -14,
        -18
      ]
    ],
    [
      [
        7198,
        4722
      ],
      [
        -67,
        -35
      ],
      [
        -30,
        28
      ],
      [
        -75,
        -14
      ],
      [
        -49,
        30
      ],
      [
        -6,
        70
      ],
      [
        86,
        73
      ],
      [
        -36,
        55
      ],
      [
        158,
        88
      ],
      [
        64,
        -58
      ],
      [
        49,
        -93
      ]
    ],
    [
      [
        7803,
        1988
      ],
      [
        -23,
        -21
      ],
      [
        -27,
        -103
      ],
      [
        -44,
        2
      ],
      [
        -48,
        -133
      ],
      [
        9,
        -64
      ],
      [
        -87,
        -75
      ],
      [
        -88,
        -188
      ],
      [
        -59,
        -6
      ],
      [
        -15,
        -61
      ],
      [
        -39,
        -52
      ],
      [
        -100,
        -59
      ],
      [
        -20,
        -32
      ]
    ],
    [
      [
        7262,
        1196
      ],
      [
        -23,
        27
      ],
      [
        -11,
        99
      ],
      [
        -37,
        80
      ],
      [
        -36,
        14
      ],
      [
        -27,
        50
      ],
      [
        -80,
        17
      ]
    ],
    [
      [
        7048,
        1483
      ],
      [
        -8,
        61
      ],
      [
        23,
        35
      ],
      [
        26,
        113
      ],
      [
        31,
        20
      ],
      [
        13,
        73
      ],
      [
        36,
        45
      ],
      [
        -19,
        44
      ],
      [
        28,
        65
      ],
      [
        42,
        8
      ],
      [
        39,
        56
      ],
      [
        -7,
        65
      ],
      [
        28,
        63
      ],
      [
        38,
        25
      ],
      [
        52,
        -7
      ],
      [
        91,
        36
      ],
      [
        13,
        42
      ]
    ],
    [
      [
        7474,
        2227
      ],
      [
        48,
        8
      ],
      [
        2,
        -78
      ],
      [
        29,
        -109
      ],
      [
        58,
        -12
      ],
      [
        47,
        55
      ],
      [
        37,
        -79
      ],
      [
        95,
        14
      ],
      [
        13,
        -38
      ]
    ],
    [
      [
        7671,
        2854
      ],
      [
        -9,
        -63
      ],
      [
        -55,
        -65
      ],
      [
        0,
        -55
      ],
      [
        -61,
        5
      ],
      [
        3,
        -76
      ],
      [
        -29,
        -55
      ],
      [
        -91,
        -72
      ]
    ],
    [
      [
        7429,
        2473
      ],
      [
        -32,
        37
      ],
      [
        -76,
        11
      ],
      [
        -20,
        46
      ],
      [
        -114,
        -62
      ],
      [
        -8,
        35
      ],
      [
        35,
        46
      ],
      [
        -39,
        29
      ],
      [
        -27,
        -36
      ],
      [
        -57,
        -22
      ]
    ],
    [
      [
        7091,
        2557
      ],
      [
        -34,
        145
      ],
      [
        -29,
        54
      ],
      [
        44,
        66
      ],
      [
        -110,
        95
      ]
    ],
    [
      [
        6962,
        2917
      ],
      [
        26,
        70
      ],
      [
        62,
        13
      ],
      [
        -4,
        155
      ],
      [
        -52,
        -21
      ],
      [
        -61,
        42
      ],
      [
        -3,
        59
      ],
      [
        -43,
        21
      ],
      [
        70,
        65
      ],
      [
        0,
        55
      ],
      [
        48,
        20
      ],
      [
        4,
        101
      ],
      [
        51,
        -11
      ],
      [
        37,
        -62
      ],
      [
        76,
        52
      ],
      [
        -15,
        74
      ],
      [
        -25,
        -3
      ],
      [
        -42,
        64
      ]
    ],
    [
      [
        7091,
        3611
      ],
      [
        38,
        16
      ]
    ],
    [
      [
        7129,
        3627
      ],
      [
        95,
        -55
      ],
      [
        15,
        -51
      ],
      [
        98,
        -33
      ],
      [
        17,
        -62
      ],
      [
        75,
        -8
      ],
      [
        -41,
        -100
      ],
      [
        48,
        -13
      ],
      [
        30,
        -99
      ],
      [
        54,
        1
      ],
      [
        22,
        53
      ],
      [
        50,
        -34
      ],
      [
        -81,
        -81
      ],
      [
        -3,
        -47
      ],
      [
        -50,
        -65
      ],
      [
        85,
        -70
      ],
      [
        -7,
        -88
      ],
      [
        88,
        13
      ],
      [
        47,
        -34
      ]
    ],
    [
      [
        6721,
        1600
      ],
      [
        16,
        -40
      ],
      [
        91,
        31
      ],
      [
        27,
        -61
      ],
      [
        -53,
        -33
      ],
      [
        -28,
        -74
      ],
      [
        30,
        -32
      ],
      [
        166,
        63
      ],
      [
        47,
        -53
      ],
      [
        31,
        82
      ]
    ],
    [
      [
        7262,
        1196
      ],
      [
        -50,
        -2
      ],
      [
        -18,
        -68
      ],
      [
        -45,
        -79
      ],
      [
        -67,
        -25
      ],
      [
        -86,
        11
      ],
      [
        -34,
        -40
      ],
      [
        -21,
        31
      ],
      [
        -82,
        -54
      ],
      [
        -7,
        44
      ],
      [
        -53,
        -39
      ],
      [
        -81,
        -28
      ],
      [
        -53,
        98
      ],
      [
        -37,
        -11
      ],
      [
        38,
        -68
      ],
      [
        -19,
        -92
      ],
      [
        -78,
        -22
      ],
      [
        -68,
        -62
      ],
      [
        -68,
        11
      ],
      [
        -95,
        -65
      ],
      [
        -71,
        0
      ],
      [
        -95,
        -66
      ],
      [
        -33,
        2
      ],
      [
        -47,
        -56
      ],
      [
        63,
        -112
      ],
      [
        -22,
        -39
      ],
      [
        -45,
        -12
      ],
      [
        -52,
        61
      ],
      [
        -25,
        132
      ],
      [
        23,
        52
      ],
      [
        -10,
        48
      ]
    ],
    [
      [
        6399,
        1443
      ],
      [
        25,
        13
      ],
      [
        6,
        79
      ],
      [
        80,
        -9
      ],
      [
        54,
        -33
      ],
      [
        -13,
        79
      ],
      [
        51,
        41
      ],
      [
        61,
        -40
      ],
      [
        58,
        27
      ]
    ],
    [
      [
        4019,
        3165
      ],
      [
        82,
        -41
      ],
      [
        41,
        -82
      ],
      [
        -5,
        -38
      ],
      [
        77,
        -101
      ],
      [
        -44,
        -37
      ],
      [
        55,
        -97
      ],
      [
        -8,
        -19
      ],
      [
        25,
        -165
      ],
      [
        -11,
        -58
      ],
      [
        20,
        -94
      ]
    ],
    [
      [
        4251,
        2433
      ],
      [
        -17,
        -33
      ],
      [
        -57,
        -22
      ],
      [
        -4,
        -122
      ],
      [
        -25,
        -38
      ],
      [
        -32,
        23
      ],
      [
        -31,
        -46
      ]
    ],
    [
      [
        4085,
        2195
      ],
      [
        -94,
        87
      ],
      [
        -37,
        -71
      ],
      [
        -60,
        25
      ],
      [
        -45,
        57
      ],
      [
        -92,
        172
      ],
      [
        -67,
        -6
      ],
      [
        -39,
        -46
      ],
      [
        -50,
        -10
      ],
      [
        -72,
        17
      ],
      [
        -24,
        34
      ],
      [
        -48,
        -65
      ],
      [
        -120,
        -78
      ],
      [
        -30,
        0
      ],
      [
        -59,
        -67
      ],
      [
        -73,
        -58
      ],
      [
        -4,
        -42
      ],
      [
        -109,
        -41
      ],
      [
        -57,
        7
      ],
      [
        3,
        35
      ],
      [
        -60,
        38
      ],
      [
        -33,
        -26
      ],
      [
        -68,
        25
      ],
      [
        -16,
        32
      ],
      [
        -60,
        28
      ],
      [
        -111,
        -49
      ],
      [
        -85,
        -116
      ],
      [
        -52,
        -14
      ],
      [
        19,
        65
      ],
      [
        -41,
        58
      ],
      [
        -85,
        -53
      ],
      [
        -62,
        -12
      ],
      [
        -95,
        4
      ],
      [
        -102,
        58
      ],
      [
        -18,
        -40
      ],
      [
        -76,
        -5
      ],
      [
        -22,
        60
      ],
      [
        -128,
        35
      ],
      [
        15,
        59
      ],
      [
        -82,
        4
      ],
      [
        -74,
        65
      ],
      [
        -23,
        77
      ],
      [
        -97,
        -12
      ],
      [
        -59,
        95
      ],
      [
        -54,
        8
      ],
      [
        -49,
        58
      ],
      [
        -66,
        32
      ],
      [
        -10,
        58
      ],
      [
        -82,
        18
      ],
      [
        -67,
        -90
      ],
      [
        -36,
        55
      ],
      [
        -121,
        69
      ],
      [
        -69,
        87
      ],
      [
        -43,
        -5
      ],
      [
        -47,
        41
      ],
      [
        -104,
        143
      ],
      [
        12,
        42
      ],
      [
        -48,
        59
      ],
      [
        -13,
        66
      ],
      [
        42,
        11
      ],
      [
        47,
        -50
      ],
      [
        94,
        64
      ],
      [
        -24,
        69
      ],
      [
        8,
        46
      ],
      [
        -68,
        32
      ],
      [
        -32,
        54
      ],
      [
        -8,
        116
      ],
      [
        37,
        57
      ]
    ],
    [
      [
        892,
        3561
      ],
      [
        42,
        22
      ],
      [
        98,
        -2
      ],
      [
        27,
        56
      ],
      [
        -12,
        52
      ],
      [
        72,
        130
      ],
      [
        110,
        -47
      ],
      [
        14,
        20
      ],
      [
        109,
        -31
      ],
      [
        48,
        16
      ],
      [
        71,
        82
      ],
      [
        85,
        -4
      ],
      [
        27,
        -57
      ],
      [
        77,
        -12
      ],
      [
        109,
        7
      ],
      [
        156,
        79
      ],
      [
        68,
        -20
      ],
      [
        62,
        23
      ],
      [
        47,
        78
      ],
      [
        41,
        23
      ],
      [
        333,
        50
      ],
      [
        128,
        -41
      ],
      [
        75,
        -40
      ]
    ],
    [
      [
        892,
        3561
      ],
      [
        -114,
        71
      ],
      [
        -45,
        134
      ],
      [
        9,
        41
      ],
      [
        -107,
        3
      ],
      [
        -86,
        27
      ],
      [
        -55,
        61
      ],
      [
        -67,
        -13
      ],
      [
        -45,
        64
      ],
      [
        14,
        80
      ],
      [
        -31,
        50
      ],
      [
        -64,
        13
      ],
      [
        -9,
        37
      ],
      [
        -74,
        11
      ],
      [
        -21,
        56
      ],
      [
        63,
        40
      ],
      [
        -45,
        44
      ],
      [
        12,
        37
      ],
      [
        -29,
        69
      ],
      [
        -2,
        95
      ],
      [
        -74,
        35
      ],
      [
        -51,
        -31
      ],
      [
        -38,
        16
      ],
      [
        -19,
        56
      ],
      [
        22,
        31
      ],
      [
        -36,
        53
      ],
      [
        5,
        47
      ],
      [
        49,
        32
      ],
      [
        -17,
        47
      ],
      [
        30,
        56
      ],
      [
        61,
        10
      ],
      [
        78,
        89
      ],
      [
        59,
        -15
      ],
      [
        66,
        38
      ],
      [
        16,
        -71
      ],
      [
        127,
        27
      ],
      [
        53,
        117
      ],
      [
        41,
        22
      ],
      [
        77,
        -14
      ],
      [
        100,
        13
      ],
      [
        48,
        74
      ],
      [
        157,
        91
      ],
      [
        147,
        51
      ],
      [
        14,
        48
      ],
      [
        -21,
        85
      ],
      [
        108,
        111
      ],
      [
        -13,
        73
      ],
      [
        -61,
        143
      ],
      [
        2,
        121
      ],
      [
        -49,
        81
      ],
      [
        132,
        23
      ],
      [
        147,
        47
      ],
      [
        35,
        -43
      ],
      [
        106,
        7
      ],
      [
        5,
        57
      ],
      [
        -54,
        22
      ],
      [
        143,
        370
      ],
      [
        126,
        -52
      ],
      [
        127,
        2
      ],
      [
        17,
        -37
      ],
      [
        73,
        48
      ],
      [
        49,
        4
      ],
      [
        28,
        73
      ],
      [
        -25,
        118
      ],
      [
        44,
        108
      ],
      [
        130,
        26
      ],
      [
        54,
        128
      ],
      [
        86,
        -8
      ],
      [
        69,
        21
      ],
      [
        21,
        -125
      ],
      [
        104,
        -56
      ],
      [
        2,
        -29
      ],
      [
        78,
        -49
      ],
      [
        83,
        9
      ],
      [
        34,
        -46
      ],
      [
        49,
        12
      ],
      [
        50,
        -48
      ],
      [
        21,
        -77
      ],
      [
        60,
        -72
      ],
      [
        37,
        -92
      ],
      [
        -26,
        -59
      ],
      [
        18,
        -61
      ],
      [
        -49,
        -60
      ],
      [
        -10,
        -57
      ],
      [
        37,
        -68
      ],
      [
        132,
        -28
      ],
      [
        135,
        -13
      ],
      [
        47,
        9
      ],
      [
        128,
        -19
      ],
      [
        68,
        -62
      ],
      [
        184,
        -92
      ],
      [
        58,
        7
      ],
      [
        -9,
        -62
      ],
      [
        30,
        -6
      ],
      [
        67,
        -168
      ],
      [
        64,
        -62
      ],
      [
        12,
        -47
      ]
    ],
    [
      [
        6180,
        432
      ],
      [
        42,
        -35
      ],
      [
        10,
        -68
      ],
      [
        -54,
        -67
      ],
      [
        -41,
        -154
      ],
      [
        -33,
        -9
      ],
      [
        -31,
        -57
      ],
      [
        -49,
        3
      ],
      [
        -30,
        -45
      ],
      [
        -67,
        21
      ],
      [
        -78,
        48
      ],
      [
        -12,
        157
      ],
      [
        113,
        155
      ],
      [
        27,
        -19
      ],
      [
        42,
        39
      ],
      [
        50,
        -12
      ],
      [
        61,
        27
      ],
      [
        33,
        -22
      ],
      [
        17,
        38
      ]
    ],
    [
      [
        5676,
        4336
      ],
      [
        -57,
        -58
      ],
      [
        -5,
        -115
      ]
    ],
    [
      [
        5126,
        4236
      ],
      [
        11,
        22
      ],
      [
        87,
        10
      ],
      [
        68,
        46
      ],
      [
        72,
        11
      ],
      [
        9,
        169
      ],
      [
        45,
        122
      ],
      [
        32,
        37
      ],
      [
        81,
        16
      ],
      [
        32,
        -72
      ],
      [
        -85,
        -164
      ],
      [
        115,
        -34
      ],
      [
        83,
        -63
      ]
    ],
    [
      [
        6251,
        4674
      ],
      [
        19,
        -16
      ],
      [
        -38,
        -68
      ],
      [
        -24,
        -121
      ],
      [
        -57,
        -56
      ],
      [
        1,
        -54
      ],
      [
        46,
        -87
      ],
      [
        -70,
        -148
      ],
      [
        19,
        -66
      ],
      [
        -6,
        -99
      ],
      [
        29,
        -120
      ],
      [
        -48,
        -89
      ],
      [
        -16,
        -87
      ],
      [
        16,
        -41
      ]
    ],
    [
      [
        6122,
        3622
      ],
      [
        47,
        -100
      ],
      [
        -4,
        -62
      ],
      [
        63,
        -62
      ],
      [
        1,
        -74
      ]
    ],
    [
      [
        6229,
        3324
      ],
      [
        -44,
        -34
      ],
      [
        -28,
        30
      ],
      [
        -52,
        -20
      ],
      [
        -95,
        24
      ],
      [
        13,
        -74
      ],
      [
        59,
        -19
      ],
      [
        12,
        -49
      ],
      [
        -89,
        -7
      ],
      [
        -24,
        -52
      ],
      [
        30,
        -68
      ],
      [
        -12,
        -68
      ]
    ],
    [
      [
        5819,
        3089
      ],
      [
        -77,
        6
      ],
      [
        -66,
        36
      ],
      [
        -98,
        29
      ],
      [
        -1,
        41
      ],
      [
        -59,
        7
      ],
      [
        -80,
        -32
      ],
      [
        -29,
        27
      ],
      [
        -81,
        3
      ],
      [
        -12,
        39
      ]
    ],
    [
      [
        5676,
        4336
      ],
      [
        63,
        -49
      ],
      [
        121,
        11
      ],
      [
        12,
        68
      ],
      [
        32,
        27
      ],
      [
        -7,
        49
      ],
      [
        115,
        149
      ],
      [
        137,
        81
      ],
      [
        24,
        -29
      ],
      [
        62,
        71
      ],
      [
        16,
        -40
      ]
    ],
    [
      [
        6686,
        4006
      ],
      [
        -18,
        -157
      ],
      [
        -118,
        -89
      ],
      [
        -141,
        -1
      ],
      [
        -83,
        -82
      ],
      [
        -70,
        -10
      ],
      [
        -42,
        -34
      ],
      [
        -92,
        -11
      ]
    ],
    [
      [
        6251,
        4674
      ],
      [
        64,
        59
      ],
      [
        72,
        8
      ],
      [
        79,
        132
      ],
      [
        50,
        -25
      ],
      [
        89,
        53
      ],
      [
        17,
        -21
      ],
      [
        118,
        37
      ],
      [
        19,
        56
      ]
    ],
    [
      [
        6759,
        4973
      ],
      [
        22,
        -80
      ],
      [
        -59,
        -80
      ],
      [
        75,
        -34
      ],
      [
        26,
        -73
      ],
      [
        -24,
        -80
      ],
      [
        -91,
        -21
      ],
      [
        -4,
        -58
      ],
      [
        -49,
        -60
      ],
      [
        4,
        -65
      ],
      [
        39,
        -20
      ],
      [
        39,
        -89
      ],
      [
        5,
        -55
      ],
      [
        -50,
        -85
      ],
      [
        4,
        -49
      ],
      [
        -54,
        -34
      ],
      [
        44,
        -84
      ]
    ],
    [
      [
        7091,
        2557
      ],
      [
        -49,
        -11
      ],
      [
        -61,
        28
      ],
      [
        -22,
        -48
      ],
      [
        -64,
        -19
      ],
      [
        -26,
        -37
      ],
      [
        -95,
        -32
      ],
      [
        -57,
        -40
      ]
    ],
    [
      [
        6717,
        2398
      ],
      [
        -42,
        13
      ],
      [
        13,
        69
      ],
      [
        -14,
        53
      ],
      [
        -38,
        19
      ],
      [
        -48,
        -66
      ],
      [
        -80,
        36
      ],
      [
        -72,
        9
      ],
      [
        -75,
        55
      ],
      [
        -171,
        39
      ],
      [
        -45,
        -33
      ],
      [
        20,
        -38
      ],
      [
        -38,
        -27
      ],
      [
        -43,
        30
      ],
      [
        -54,
        -11
      ],
      [
        -58,
        -45
      ],
      [
        -38,
        -95
      ]
    ],
    [
      [
        6229,
        3324
      ],
      [
        39,
        -74
      ],
      [
        95,
        -90
      ],
      [
        84,
        -38
      ],
      [
        127,
        17
      ],
      [
        80,
        -28
      ],
      [
        34,
        27
      ],
      [
        11,
        -99
      ],
      [
        29,
        -50
      ],
      [
        29,
        23
      ],
      [
        69,
        -25
      ],
      [
        -2,
        -36
      ],
      [
        138,
        -34
      ]
    ],
    [
      [
        6717,
        2398
      ],
      [
        40,
        -61
      ],
      [
        14,
        -84
      ],
      [
        -52,
        -85
      ],
      [
        -30,
        -9
      ],
      [
        -29,
        -86
      ],
      [
        55,
        -143
      ],
      [
        -5,
        -64
      ],
      [
        37,
        -17
      ],
      [
        -24,
        -81
      ],
      [
        17,
        -31
      ],
      [
        -23,
        -70
      ],
      [
        4,
        -67
      ]
    ],
    [
      [
        5282,
        2102
      ],
      [
        -2,
        61
      ],
      [
        -38,
        19
      ],
      [
        -26,
        -41
      ],
      [
        -49,
        -12
      ],
      [
        -38,
        25
      ],
      [
        11,
        31
      ],
      [
        -32,
        95
      ],
      [
        -57,
        23
      ],
      [
        -5,
        -68
      ],
      [
        -70,
        -42
      ],
      [
        8,
        -60
      ],
      [
        -64,
        -100
      ],
      [
        -39,
        -26
      ],
      [
        2,
        -81
      ],
      [
        26,
        -86
      ],
      [
        -17,
        -42
      ],
      [
        -48,
        -26
      ],
      [
        -16,
        33
      ],
      [
        -76,
        -65
      ],
      [
        -87,
        28
      ],
      [
        9,
        31
      ],
      [
        -39,
        48
      ],
      [
        14,
        30
      ],
      [
        -82,
        109
      ],
      [
        -57,
        149
      ],
      [
        -61,
        -5
      ],
      [
        -40,
        48
      ],
      [
        14,
        60
      ],
      [
        -85,
        105
      ],
      [
        -21,
        -52
      ],
      [
        -57,
        -31
      ],
      [
        -9,
        173
      ]
    ],
    [
      [
        5320,
        1096
      ],
      [
        -32,
        34
      ],
      [
        -77,
        -34
      ],
      [
        -7,
        -53
      ],
      [
        -81,
        -52
      ],
      [
        -21,
        31
      ],
      [
        -38,
        -66
      ],
      [
        -57,
        60
      ],
      [
        -22,
        -47
      ],
      [
        -34,
        44
      ],
      [
        -53,
        -77
      ],
      [
        -91,
        72
      ],
      [
        -38,
        -78
      ],
      [
        -84,
        18
      ],
      [
        -32,
        -58
      ],
      [
        38,
        -91
      ],
      [
        -5,
        -150
      ],
      [
        -37,
        24
      ],
      [
        -37,
        -16
      ],
      [
        -26,
        130
      ],
      [
        -110,
        -68
      ],
      [
        -85,
        59
      ],
      [
        -21,
        66
      ],
      [
        -113,
        29
      ],
      [
        36,
        76
      ],
      [
        -9,
        55
      ],
      [
        31,
        69
      ],
      [
        -106,
        27
      ],
      [
        0,
        93
      ],
      [
        -59,
        114
      ],
      [
        -53,
        0
      ],
      [
        -91,
        -56
      ],
      [
        12,
        57
      ],
      [
        -29,
        137
      ],
      [
        95,
        142
      ],
      [
        6,
        49
      ],
      [
        32,
        -10
      ],
      [
        29,
        60
      ],
      [
        41,
        174
      ],
      [
        -13,
        210
      ],
      [
        -44,
        23
      ],
      [
        -51,
        64
      ],
      [
        1,
        38
      ]
    ],
    [
      [
        7273,
        4830
      ],
      [
        -15,
        -105
      ],
      [
        -46,
        15
      ]
    ],
    [
      [
        7605,
        5090
      ],
      [
        -63,
        -99
      ],
      [
        73,
        -64
      ],
      [
        45,
        2
      ],
      [
        12,
        -73
      ],
      [
        36,
        -49
      ]
    ],
    [
      [
        7708,
        4807
      ],
      [
        -85,
        -60
      ],
      [
        -6,
        -62
      ],
      [
        -48,
        -54
      ],
      [
        -112,
        -35
      ],
      [
        -56,
        41
      ]
    ],
    [
      [
        7401,
        4637
      ],
      [
        -19,
        77
      ],
      [
        -46,
        5
      ],
      [
        -44,
        147
      ]
    ],
    [
      [
        7198,
        4722
      ],
      [
        17,
        -110
      ],
      [
        -30,
        -63
      ],
      [
        93,
        -57
      ],
      [
        46,
        13
      ]
    ],
    [
      [
        7324,
        4505
      ],
      [
        48,
        -77
      ]
    ],
    [
      [
        7372,
        4428
      ],
      [
        -69,
        -93
      ],
      [
        -113,
        -11
      ],
      [
        -54,
        -70
      ],
      [
        -74,
        -35
      ],
      [
        -58,
        -117
      ],
      [
        -58,
        -70
      ],
      [
        30,
        -70
      ]
    ],
    [
      [
        6976,
        3962
      ],
      [
        -152,
        -4
      ],
      [
        -93,
        49
      ],
      [
        -45,
        -1
      ]
    ],
    [
      [
        6759,
        4973
      ],
      [
        -55,
        75
      ],
      [
        17,
        74
      ],
      [
        45,
        39
      ],
      [
        10,
        59
      ],
      [
        91,
        70
      ],
      [
        14,
        -125
      ],
      [
        71,
        19
      ],
      [
        91,
        51
      ],
      [
        30,
        -28
      ],
      [
        56,
        46
      ],
      [
        80,
        2
      ],
      [
        5,
        83
      ],
      [
        88,
        14
      ],
      [
        62,
        33
      ],
      [
        34,
        -85
      ],
      [
        55,
        -79
      ],
      [
        -27,
        -32
      ],
      [
        32,
        -85
      ],
      [
        147,
        -14
      ]
    ],
    [
      [
        6976,
        3962
      ],
      [
        -2,
        -56
      ],
      [
        52,
        -12
      ],
      [
        -115,
        -103
      ],
      [
        -39,
        -81
      ],
      [
        57,
        -16
      ],
      [
        61,
        -80
      ],
      [
        101,
        -3
      ]
    ],
    [
      [
        8684,
        4999
      ],
      [
        -29,
        -30
      ],
      [
        -106,
        -53
      ],
      [
        -130,
        -143
      ],
      [
        -142,
        -15
      ],
      [
        -145,
        -78
      ],
      [
        -89,
        -103
      ],
      [
        -92,
        144
      ],
      [
        38,
        58
      ],
      [
        56,
        29
      ],
      [
        72,
        112
      ],
      [
        -43,
        54
      ],
      [
        -114,
        43
      ],
      [
        -62,
        -24
      ],
      [
        -92,
        -141
      ],
      [
        -98,
        -45
      ]
    ],
    [
      [
        7605,
        5090
      ],
      [
        26,
        44
      ],
      [
        -15,
        68
      ],
      [
        44,
        131
      ],
      [
        96,
        -129
      ],
      [
        82,
        82
      ],
      [
        67,
        22
      ],
      [
        56,
        53
      ],
      [
        46,
        -10
      ],
      [
        67,
        59
      ],
      [
        42,
        -19
      ],
      [
        30,
        47
      ],
      [
        42,
        -24
      ],
      [
        147,
        75
      ],
      [
        14,
        60
      ]
    ],
    [
      [
        8349,
        5549
      ],
      [
        9,
        26
      ],
      [
        89,
        -54
      ],
      [
        33,
        -83
      ],
      [
        47,
        57
      ],
      [
        32,
        -100
      ],
      [
        63,
        -108
      ],
      [
        -5,
        -107
      ],
      [
        77,
        -119
      ],
      [
        -10,
        -62
      ]
    ],
    [
      [
        7613,
        3724
      ],
      [
        -69,
        -9
      ],
      [
        -18,
        -64
      ],
      [
        -47,
        -13
      ],
      [
        -14,
        -54
      ],
      [
        -38,
        -10
      ],
      [
        -19,
        56
      ],
      [
        -145,
        -44
      ],
      [
        -59,
        112
      ],
      [
        -59,
        -14
      ],
      [
        -16,
        -57
      ]
    ],
    [
      [
        7372,
        4428
      ],
      [
        118,
        -44
      ],
      [
        50,
        18
      ],
      [
        46,
        -66
      ],
      [
        -24,
        -53
      ],
      [
        0,
        -73
      ],
      [
        78,
        -36
      ],
      [
        55,
        7
      ],
      [
        14,
        46
      ],
      [
        76,
        72
      ],
      [
        71,
        33
      ],
      [
        142,
        -90
      ],
      [
        90,
        13
      ],
      [
        70,
        -39
      ],
      [
        -4,
        -80
      ],
      [
        -34,
        -27
      ],
      [
        -47,
        36
      ],
      [
        -147,
        -70
      ],
      [
        -68,
        -46
      ],
      [
        -9,
        -70
      ],
      [
        -76,
        -37
      ],
      [
        -56,
        -77
      ],
      [
        -43,
        -9
      ],
      [
        -61,
        -112
      ]
    ],
    [
      [
        7401,
        4637
      ],
      [
        -48,
        -27
      ],
      [
        -29,
        -105
      ]
    ],
    [
      [
        7429,
        2473
      ],
      [
        -29,
        -58
      ],
      [
        71,
        -99
      ],
      [
        3,
        -89
      ]
    ],
    [
      [
        7956,
        2933
      ],
      [
        -25,
        -8
      ],
      [
        -47,
        -98
      ]
    ],
    [
      [
        7884,
        2827
      ],
      [
        -69,
        -55
      ],
      [
        -93,
        86
      ],
      [
        -51,
        -4
      ]
    ],
    [
      [
        7613,
        3724
      ],
      [
        -13,
        -65
      ],
      [
        176,
        -104
      ],
      [
        25,
        -100
      ],
      [
        81,
        -186
      ],
      [
        -5,
        -76
      ],
      [
        87,
        -63
      ],
      [
        9,
        -60
      ],
      [
        64,
        -35
      ],
      [
        -1,
        -58
      ],
      [
        -89,
        44
      ],
      [
        -23,
        -45
      ],
      [
        32,
        -43
      ]
    ],
    [
      [
        7956,
        2933
      ],
      [
        64,
        -46
      ],
      [
        42,
        -81
      ],
      [
        -117,
        -50
      ]
    ],
    [
      [
        7945,
        2756
      ],
      [
        -49,
        32
      ],
      [
        -12,
        39
      ]
    ],
    [
      [
        7945,
        2756
      ],
      [
        -49,
        -32
      ],
      [
        -32,
        -55
      ],
      [
        18,
        -28
      ],
      [
        80,
        35
      ],
      [
        51,
        -72
      ],
      [
        50,
        -39
      ],
      [
        -6,
        -138
      ],
      [
        -49,
        -3
      ],
      [
        6,
        -59
      ],
      [
        -29,
        -57
      ],
      [
        24,
        -70
      ],
      [
        -90,
        -27
      ],
      [
        -87,
        -143
      ],
      [
        -29,
        -80
      ]
    ],
    [
      [
        9608,
        5575
      ],
      [
        -43,
        -137
      ],
      [
        -125,
        -23
      ],
      [
        -1,
        35
      ],
      [
        -59,
        20
      ],
      [
        -30,
        -122
      ],
      [
        -77,
        -14
      ],
      [
        -56,
        -78
      ],
      [
        -145,
        -7
      ],
      [
        45,
        -90
      ],
      [
        -20,
        -40
      ],
      [
        -180,
        30
      ],
      [
        -29,
        58
      ],
      [
        -52,
        -30
      ],
      [
        -30,
        -70
      ],
      [
        -74,
        -100
      ],
      [
        -48,
        -8
      ]
    ],
    [
      [
        8349,
        5549
      ],
      [
        -53,
        22
      ],
      [
        24,
        54
      ],
      [
        -71,
        184
      ],
      [
        -120,
        -69
      ],
      [
        -55,
        105
      ],
      [
        -6,
        93
      ],
      [
        37,
        38
      ],
      [
        -50,
        88
      ],
      [
        78,
        58
      ],
      [
        51,
        -52
      ],
      [
        15,
        83
      ],
      [
        61,
        28
      ]
    ],
    [
      [
        8260,
        6181
      ],
      [
        132,
        16
      ],
      [
        11,
        -112
      ],
      [
        59,
        -72
      ],
      [
        167,
        -13
      ],
      [
        54,
        25
      ],
      [
        23,
        -61
      ],
      [
        52,
        -21
      ],
      [
        68,
        24
      ],
      [
        66,
        -25
      ],
      [
        15,
        -118
      ],
      [
        86,
        -6
      ],
      [
        -11,
        -36
      ],
      [
        59,
        -78
      ],
      [
        32,
        63
      ],
      [
        53,
        35
      ],
      [
        15,
        -76
      ],
      [
        72,
        -132
      ],
      [
        58,
        11
      ],
      [
        3,
        40
      ],
      [
        181,
        31
      ],
      [
        14,
        -57
      ],
      [
        70,
        -49
      ],
      [
        69,
        5
      ]
    ],
    [
      [
        7968,
        7747
      ],
      [
        65,
        -65
      ],
      [
        -104,
        -95
      ],
      [
        140,
        -68
      ],
      [
        26,
        43
      ],
      [
        100,
        -62
      ],
      [
        -22,
        -23
      ],
      [
        12,
        -87
      ],
      [
        41,
        -69
      ],
      [
        102,
        -40
      ],
      [
        49,
        24
      ],
      [
        81,
        -8
      ],
      [
        78,
        19
      ],
      [
        52,
        55
      ],
      [
        59,
        -23
      ],
      [
        95,
        -117
      ],
      [
        -50,
        -50
      ],
      [
        9,
        -42
      ],
      [
        -46,
        -37
      ],
      [
        -40,
        -84
      ],
      [
        -4,
        -127
      ],
      [
        -18,
        -63
      ],
      [
        -49,
        5
      ],
      [
        -55,
        -133
      ],
      [
        -50,
        -9
      ],
      [
        -172,
        -158
      ],
      [
        -107,
        -62
      ],
      [
        -26,
        -44
      ],
      [
        28,
        -45
      ],
      [
        102,
        -81
      ],
      [
        -30,
        -39
      ],
      [
        26,
        -81
      ]
    ],
    [
      [
        3931,
        5424
      ],
      [
        381,
        -49
      ],
      [
        90,
        25
      ],
      [
        201,
        -32
      ],
      [
        70,
        -4
      ],
      [
        66,
        -73
      ],
      [
        173,
        -39
      ],
      [
        108,
        -55
      ],
      [
        130,
        25
      ],
      [
        -1,
        -45
      ],
      [
        86,
        -15
      ],
      [
        143,
        87
      ],
      [
        150,
        65
      ],
      [
        234,
        37
      ],
      [
        104,
        -12
      ],
      [
        114,
        11
      ],
      [
        154,
        70
      ],
      [
        88,
        115
      ],
      [
        166,
        90
      ],
      [
        -15,
        53
      ],
      [
        -74,
        90
      ],
      [
        57,
        137
      ],
      [
        46,
        27
      ],
      [
        71,
        -8
      ],
      [
        29,
        -32
      ],
      [
        170,
        -36
      ],
      [
        70,
        43
      ],
      [
        80,
        98
      ],
      [
        184,
        13
      ],
      [
        89,
        59
      ],
      [
        7,
        44
      ],
      [
        65,
        88
      ],
      [
        116,
        9
      ],
      [
        16,
        49
      ],
      [
        50,
        -13
      ],
      [
        90,
        45
      ],
      [
        97,
        9
      ],
      [
        144,
        -37
      ],
      [
        37,
        26
      ],
      [
        -34,
        100
      ],
      [
        -156,
        131
      ],
      [
        -37,
        47
      ],
      [
        -60,
        13
      ],
      [
        -83,
        -16
      ],
      [
        -54,
        -67
      ],
      [
        -85,
        49
      ],
      [
        -101,
        -2
      ],
      [
        -65,
        -35
      ],
      [
        -57,
        92
      ],
      [
        49,
        33
      ],
      [
        -1,
        57
      ],
      [
        147,
        285
      ],
      [
        179,
        -68
      ],
      [
        148,
        97
      ],
      [
        112,
        31
      ],
      [
        -4,
        111
      ],
      [
        76,
        107
      ],
      [
        60,
        128
      ],
      [
        112,
        100
      ],
      [
        -9,
        94
      ],
      [
        -112,
        13
      ],
      [
        -4,
        35
      ],
      [
        141,
        115
      ],
      [
        89,
        8
      ]
    ],
    [
      [
        7968,
        7747
      ],
      [
        155,
        38
      ],
      [
        87,
        -4
      ],
      [
        125,
        20
      ],
      [
        185,
        -91
      ],
      [
        67,
        12
      ],
      [
        83,
        -32
      ],
      [
        151,
        -200
      ],
      [
        -14,
        -38
      ],
      [
        81,
        -202
      ],
      [
        59,
        -69
      ],
      [
        8,
        -94
      ],
      [
        41,
        -23
      ],
      [
        -12,
        -88
      ],
      [
        98,
        -62
      ],
      [
        117,
        7
      ],
      [
        49,
        -49
      ],
      [
        103,
        -17
      ],
      [
        90,
        -90
      ],
      [
        71,
        1
      ],
      [
        -24,
        -52
      ],
      [
        49,
        -66
      ],
      [
        -24,
        -63
      ],
      [
        57,
        -81
      ],
      [
        250,
        5
      ],
      [
        25,
        54
      ],
      [
        70,
        35
      ],
      [
        62,
        -4
      ],
      [
        43,
        34
      ],
      [
        111,
        30
      ],
      [
        52,
        -26
      ],
      [
        -22,
        -49
      ],
      [
        34,
        -73
      ],
      [
        -103,
        -100
      ],
      [
        -42,
        -220
      ],
      [
        -36,
        -26
      ],
      [
        -44,
        -124
      ],
      [
        -47,
        -32
      ],
      [
        -4,
        -69
      ],
      [
        -46,
        -14
      ],
      [
        -20,
        43
      ],
      [
        -150,
        18
      ],
      [
        -67,
        -83
      ],
      [
        -81,
        -26
      ],
      [
        22,
        -35
      ],
      [
        33,
        -138
      ],
      [
        -15,
        -61
      ],
      [
        13,
        -68
      ]
    ]
  ],
  "bbox": [
    73.60225630700012,
    18.19318268400005,
    134.7725793870003,
    53.563346660000036
  ]
};

function C3Map(defsDropshadow){
    var self = this;

    this.defsDropshadow = defsDropshadow;

    return {
        initMap: function(){
            var $$ = this, width;

            width = $$.currentWidth;
            if($$.config.size_width > $$.getParentWidth())
                width = $$.getParentWidth();

            $$.mapProjection = $$.d3.geo.mercator()
                .center([105,39])
                .scale(($$.currentWidth < $$.currentHeight ? $$.currentWidth : $$.currentHeight) * 1 * $$.config.map_ratio)
                .translate([$$.currentWidth / 2 + $$.config.map_position_x, $$.currentHeight / 2 + $$.config.map_position_y]);
            $$.mapPath = $$.d3.geo.path()
                .projection($$.mapProjection);

            $$.main.select('.' + $$.CLASS.chart)
                .append("g")
                .attr("class", this.CLASS.chartMaps)

            //插入阴影特性
            // $$.svg.select("defs").call(self.defsDropshadow.draw);
        },
        hasMapType: function(targets){
            return this.hasType('map', targets);
        },
        isMapType: function (d) {
          var id = this.isString(d) ? d : d.id;
          return this.config.data_types[id] === 'map';
        },
        classChartMap: function (d) {
            return this.CLASS.chartMap + this.classTarget(d.id);
        },
        updateTargetsForMap: function(targets){

        },
        drawLegend: function(node){
            var $$ = this;
            var w = $$.config.map_scale_width, h = $$.config.map_scale_height;
            var y = $$.d3.scale.linear().range([h, 0]).domain([ $$.config.map_scale_min, $$.config.map_scale_max ]);
            var yAxis = $$.d3.svg.axis().scale(y).tickValues([ $$.config.map_scale_min, $$.config.map_scale_max ]).orient("right").innerTickSize(0).tickFormat($$.config.map_scale_format);
            var legend = this.svg.select("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "100%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

            legend.append("stop").attr("offset", "0%").attr("stop-color", $$.config.map_scale_colors[1]).attr("stop-opacity", 1);
            legend.append("stop").attr("offset", "100%").attr("stop-color", $$.config.map_scale_colors[0]).attr("stop-opacity", 1);

            node.append("rect").attr("width", w).attr("height", h).style("fill", "url(#gradient)");
            node.append("g").attr("class", "y axis").attr("transform", "translate(" + w + ",0)").call(yAxis).select("path.domain").style("opacity", 0);

            utility.isFunction($$.config.map_scale_draw) && $$.config.map_scale_draw.call($$, node, yAxis);
        },
        redrawMap: function(){
            var $$ = this, linear, legend, mainGeo, mainGeoPath, mainGeoText;

            $$.mapProjection
                .scale(($$.currentWidth < $$.currentHeight ? $$.currentWidth : $$.currentHeight) * 1 * $$.config.map_ratio)
                .translate([$$.currentWidth / 2 + $$.config.map_position_x, $$.currentHeight / 2 + $$.config.map_position_y]);
            $$.mapPath.projection($$.mapProjection);

            //设置图例并绘制
            linear = $$.d3.scale.linear()
                .domain([ $$.config.map_scale_min, $$.config.map_scale_max ])
                .range($$.config.map_scale_colors);
            // legend = $$.d3.legend.color()
            //     .shapePadding(0)
            //     .cells(1)
            //     .ascending(true)
            //     .labelFormat($$.config.map_scale_format)
            //     .orient($$.config.map_scale_orient)
            //     .scale(linear);
            $$.main
                .selectAll(".c3-scale")
                .data([1])
                .enter()
                .append("g")
                .attr("class", "legendQuant c3-scale")
                .call(this.drawLegend.bind($$));
            $$.main.select(".legendQuant")
                .attr("transform", function(){
                    var left = $$.config.map_scale_position_left, top = $$.config.map_scale_position_top, box = this.getBBox();

                    if($$.isString(left)){
                        switch(left){
                            case "left":
                                left = $$.getCurrentPaddingLeft();
                                break;
                            case "center":
                                left = $$.currentWidth / 2 - box["width"]/2;
                                break;
                            case "right":
                                left = $$.currentWidth - box["width"] - $$.getCurrentPaddingRight() - 30;
                                break;
                            default:
                                left = $$.currentWidth * (parseInt(left) / 100);
                                break;
                        }
                    }else if($$.isFunction(left)){
                        left = left.apply($$, [box["width"], box["height"]]);
                    }
                    if($$.isString(top)){
                        switch(top){
                            case "top":
                                top = $$.getCurrentPaddingTop();
                                break;
                            case "center":
                                top = $$.currentHeight / 2 - box["height"]/2  - $$.getCurrentPaddingBottom() - 20;
                                break;
                            case "bottom":
                                top = $$.currentHeight - box["height"] - $$.getCurrentPaddingBottom() - 20;
                                break;
                            default:
                                top = $$.currentHeight * (parseInt(top) / 100);
                                break;
                        }
                    }else if($$.isFunction(top)){
                        top = top.apply($$, [box["width"], box["height"]]);
                    }

                    return "translate(" + left + "," + top + ")"
                });

            //绘制地理位置图形
            mainGeo = $$.d3.select("." + this.CLASS.chartMaps)
                .selectAll("g")
                .data(topojson.feature(chinaGeo, chinaGeo.objects.provinces).features);
            mainGeoEnter = mainGeo
                .enter()
                .append("g")
                .attr("class", function(d){
                    return $$.CLASS.chartMap + " " + $$.CLASS.chartMap + "-" + d.properties.name.split(" ").join("");
                });
            mainGeo.each(function(d, i){
                d.value = $$.data.origin[0][d.properties.name];
                d.id = d.properties.name;
                d.name = d.properties.name;
            });

            mainGeoEnter.append("path");
            mainGeoPathEnter = mainGeo.select("path");
            mainGeoPathUpdate = mainGeo.select("path");
            mainGeoPathEnter
                .style("fill", function(d){
                    return d.value ? linear($$.data.origin[0][d.id]) : $$.config.map_region_empty_color;
                })
                .attr("stroke", "black")
                .attr("stroke-width", "0.35")
                .on('mouseover', function (d) {
                    $$.config.data_onmouseover.call($$.api, d, this);
                })
                .on('mousemove', function (d) {
                    $$.showTooltip([d], this);
                })
                .on('mouseout', function (d) {
                    $$.hideTooltip();

                    $$.config.data_onmouseout.call($$.api, d, this);
                })
                .on("click", function(){
                    $$.config.map_event_click && $$.config.map_event_click.apply($$.api, arguments);
                });
            mainGeoPathUpdate.attr("d", $$.mapPath);

            mainGeoEnter.append("text");
            mainGeoTextEnter = mainGeo.select("text");
            mainGeoTextUpdate = mainGeo.select("text");
            mainGeoTextEnter
                .attr("fill", "#000000")
                .style("text-anchor", "middle")
                .text(function(d){
                    return d.properties.name_local ? d.properties.name_local.split("|")[1] : d.id;
                })
                .style("visibility", function(){
                    return !$$.config.map_label_show ? "hidden" : "visible";
                });
            mainGeoTextUpdate
                .attr("transform", function (d) {
                  var centroid = $$.mapPath.centroid(d);
                  return "translate(" + centroid[0] + "," + centroid[1] + ")";
                });
        }
    };
}
C3Map.prototype = {
    "focus": function(){

    }
};

c3.register("map", [Tooltip, Text], {
    CLASS: {
        chartMaps: "c3-chart-maps",
        chartMap: "c3-chart-map"
    },
    config: {
        map: {
            ratio: 1,
            position: {
                x: 0,
                y: 0
            },
            scale: {
                show: false,
                max: 100,
                min: 0,
                width: 20,
                height: 120,
                format: d3.format(".001f"),
                orient: "vertical",
                position: {
                    top: 0,
                    left: 50
                },
                colors: ["rgb(223, 255, 255)", "rgb(6, 110, 221)"],
                draw: null
            },
            region: {
                empty: {
                    color: "white"
                }
            },
            label: {
                show: false,
                format: null
            },
            event: {
                click: null
            }
        }
    },
    exceptElements: ["rectEvent", "axis"]
}, C3Map);

module.exports = c3;