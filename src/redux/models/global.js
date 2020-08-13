import _ from "lodash";
import {Record, List, Map, isImmutable, fromJS } from 'immutable';
import stations from '../../data/radyolar';
var powerturk = require("./../../assets/images/powerturk.png");
var radyod = require("./../../assets/images/radyod.jpeg");
var alemfm = require("./../../assets/images/alemfm.jpeg");
var joyturk = require("./../../assets/images/joyturk.jpg");
var joyturkakustik = require("./../../assets/images/joyturkakustik.jpg");
var bestfm = require("./../../assets/images/best-fm-dinle-100x100.png");
var kralfm = require("./../../assets/images/kral-fm-dinle.jpg");
var kralpop = require("./../../assets/images/kral-pop-dinle.png");
var showradyo = require("./../../assets/images/show-radyo.jpg");
var ondacero = require("./../../assets/images/ondacero.png");
var nostaljisanatmuzigi = require("./../../assets/images/nostaljisanatmuzigi.jpg");
var babaradyo = require("./../../assets/images/babaradyo.jpg");
var superfm = require("./../../assets/images/super-fm-dinle.jpg");
var radyo7nostalji = require("./../../assets/images/radyo-7-nostalji.jpg");
var radyodejavu = require("./../../assets/images/radyo-dejavu-100x100.jpg");
var palnostalji = require("./../../assets/images/pal-nostalji-radyo.jpg");
var radyoalaturka = require("./../../assets/images/radyo-alaturka-dinle.png");
var radyovoyage = require("./../../assets/images/radyo-voyage-dinle.jpg");
var numberonefm = require("./../../assets/images/number-one-fm.jpg");
var metrofm = require("./../../assets/images/metro-fm.jpg");
var slowturk = require("./../../assets/images/slow-turk-dinle.jpg");
var radyoviva = require("./../../assets/images/radyo-viva.jpg");



var camelCase = require("lodash.camelcase");

class GlobalReducer extends Record({
  player: new Map({
    playing: false,
    src: "",
    type: "",
    id: -1,
    volume: 0.5,
    muted:false,
    audioOnly: false  
  }),
  tagsExpanded: false,
  selectedTags:new List([]),
  allTags:new List(["Türkçe", "İngilizce", "Slow", "Akustik", "Pop", "Arabesk", "Türkü", "Sanat", "Nostalji", "İspanyolca", "Dünya", "Haber", "Video"]),
  stations: new List([{
    id: 0,
    img: powerturk,
    name: "Powertürk",      
    src: "https://listen.powerapp.com.tr/powerturk/mpeg/icecast.audio?/;stream.mp3",
    tags:["Türkçe", "Pop"]
  },
  {
    id: 1,
    name: "Radyo D",
    img: radyod,
    src: "https://radyo.dogannet.tv/radyod",    
    tags:["Türkçe", "Pop"]  
  },
  {
    id: 2,
    name: "Alem FM",
    src: "https://turkmedya.radyotvonline.com/turkmedya/alemfm.stream/playlist.m3u8",    
    img: alemfm,
    tags:["Türkçe", "Pop"]
  },
  {
    id:3,
    name:"JOY TÜRK",
    src:"https://17753.live.streamtheworld.com/JOY_TURK2_SC?/;stream.mp3",
    img:joyturk,
    tags:["Türkçe", "Pop"]
  },
  {
    id:4,
    name:"JOY TÜRK AKUSTİK",
    src:"https://17773.live.streamtheworld.com/JOYTURK_AKUSTIK_SC?/;stream.mp3",
    img:joyturkakustik,
    tags:["Türkçe", "Akustik", "Slow"]
  },
  {
    id:5,
    name:"BEST FM",
    src:"http://46.20.7.126:80/;stream.mp3",
    img:bestfm,
    tags:["Türkçe", "Pop"]
  },
  {
    id:6,
    name:"KRAL FM",
    src:"https://ssldyg2.radyotvonline.com/smil/smil:kralfm.smil/playlist.m3u8",
    img:kralfm,
    tags:["Türkçe", "Arabesk"]
  },
  {
    id:7,
    name:"KRAL POP",
    src:"https://ssldyg.radyotvonline.com/smil/smil:kralpop.smil/playlist.m3u8",
    img:kralpop,
    tags:["Türkçe", "Pop"]
  },
  {
    id:8,
    name:"SHOW RADYO",
    src:"http://46.20.3.228/;stream.mp3",
    img:showradyo,
    tags:["Türkçe", "Pop"]
  },
  {
    id:9,
    name:"ONDA CERO",
    src:"https://livefastly-webs.ondacero.es/ondacero/audio/chunklist.m3u8",
    img:ondacero,
    tags:["İspanyolca", "Haber"]
  },
  {
    id:10,
    name:"NOSTALJİ SANAT",
    src:"https://www.youtube.com/watch?v=xc1HBnbAViU&list=PLdUbSsmwdI4Kyyr5OZLUbNgqEX2RIz0Ne",
    img:nostaljisanatmuzigi,
    tags:["Türkçe", "Sanat", "Video", "List"]
  },
  {
    id:11,
    name:"Baba Radyo",
    src:"https://babaradyo.turkhosted.com/best/babaradyo.stream/playlist.m3u8",
    img:babaradyo,
    tags:["Türkçe", "Arabesk"]
  },
  {
    id:12,
    name:"Süper FM",
    src:"https://17703.live.streamtheworld.com/SUPER_FM_SC?/;stream.mp3",
    img:superfm,
    tags:["Türkçe", "Pop"]
  },
  {
    id:13,
    name:"Radyo 7 Nostalji",
    src:"http://37.247.98.8/stream/25//;stream.mp3",
    img:radyo7nostalji,
    tags:["Türkçe", "Nostalji", "Arabesk"]
  },
  {
    id:14,
    name:"Radyo Dejavu",
    src:"https://radyodinle.turkhosted.com/live/radyo-dejavu.mp3?tkn=n1wEKf4sODqu1-2Ub2rFLA&tms=1551089590",
    img:radyodejavu,
    tags:["Türkçe", "Nostalji", "Pop"]
  },
  {
    id:15,
    name:"Pal FM Nostalji",
    src:"http://shoutcast.radyogrup.com:1010/;stream.mp3",
    img:palnostalji,
    tags:["Türkçe", "Nostalji", "Pop"]
  },
  {
    id:16,
    name:"Radyo Alaturka",
    src:"http://stream.radyoalaturka.com.tr:9100/;stream.mp3",
    img:radyoalaturka,
    tags:["Türkçe", "Arabesk", "Türkü"]
  },
  {
    id:17,
    name:"Radyo Voyage",
    src:"https://voyage.turkhosted.com/pozitif/smil:voyage.smil/playlist.m3u8",
    img:radyovoyage,
    tags:["Dünya"]
  },
  {
    id:18,
    name:"Number One Radyo",
    src:"https://playerservices.streamtheworld.com/api/livestream-redirect/NUMBER1FM_SC?/;stream.mp3",
    img:numberonefm,
    tags:["Pop", "İngilizce"]
  },
  {
    id:19,
    name:"Metro FM",
    src:"https://17773.live.streamtheworld.com/METRO_FM_SC?/;stream.mp3",
    img:metrofm,
    tags:["Pop", "İngilizce"]
  },
  {
    id:20,
    name:"Slow Türk",
    src:"https://slowturk3.turkhosted.com/slowturk?/;stream.mp3",
    img:slowturk,
    tags:["Türkçe", "Slow"]
  },
  {
    id:21,
    name:"Radyo Viva",
    src:"http://46.20.3.231/;stream.mp3",
    img:radyoviva,
    tags:["İngilizce", "Pop"]
  }                            
])
}) {
  process(action) {
    return this.setIn([...action.propertyNames], action.payload);
  }
}

function reducerFromRecordClass(klass) {
  return function (state = new klass(), action) {
    let actionType = action.type;

    const fn = state[camelCase(actionType)];

    if (action.type.indexOf("/") >= 0 && action.type.indexOf("@") < 0 && action.type.indexOf("CALLCONTEXT") < 0) {
      actionType = action.type.substring(0, action.type.indexOf("/"));
      const actionSubType = action.type.substring(action.type.indexOf("/") + 1);
      const sub = state[camelCase(actionType)][camelCase(actionSubType)](action);

      return state.set(actionType, sub);
    } else {
      if (fn) {
        if (action.type.indexOf("CALLCONTEXT") >= 0) {
          return state[camelCase(actionType)](state, action);
        } else {
          return state[camelCase(actionType)](action);
        }
      } else {
        if (state[camelCase(action.type)]) {
          console.warn("You tried to call an action method, but no such action method provided.", action.type);
        }
        return state;
      }
    }
  };
}

const globalReducer = reducerFromRecordClass(GlobalReducer);

export default globalReducer;