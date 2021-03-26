import React, {useReducer} from 'react';
import blissApi from './api/blissApi';

const ServiceContext = React.createContext();
const serviceReducer = (state, action) =>{
  switch(action.type){
    case 'load':
      return {...state, allServices:action.payload}
    default:
      return state;
  }  
}
 
export const ServiceProvider = ({children})=>{
  const [stateService, dispatch]  = useReducer(serviceReducer, {allServices:[]});
  const getServices =  ()=>{
      blissApi.get(`/get-all-services`).then(response =>{
        dispatch({type:'load', payload:response.data});
      }).catch(err=>{
          console.log(err);
      });
  }
  return <ServiceContext.Provider value={{stateService, getServices}}>{children}</ServiceContext.Provider>
}
 
export default ServiceContext;


export const users =   [
    {
      "gender": "female",
      "name": {
        "title": "Mrs",
        "first": "Zohal",
        "last": "Min"
      },
      "location": {
        "street": {
          "number": 6897,
          "name": "Dodewaardstraat"
        },
        "city": "Steenderen",
        "state": "Friesland",
        "country": "Netherlands",
        "postcode": 35377,
        "coordinates": {
          "latitude": "13.4349",
          "longitude": "133.9600"
        },
        "timezone": {
          "offset": "+9:30",
          "description": "Adelaide, Darwin"
        }
      },
      "email": "zohal.min@example.com",
      "login": {
        "uuid": "f76eb6c3-4082-4126-9b15-51295af649dd",
        "username": "greenfrog162",
        "password": "bdsm",
        "salt": "aFihjxYR",
        "md5": "38cfe59c96774374159b0b7a53ee461a",
        "sha1": "313fb7c33592ef1db61102c4b5e8ffab81845507",
        "sha256": "3f0e72d4d1ba7c0bdbd059cccd1dc9542a028346abcb834b49ab3653890ff6ce"
      },
      "dob": {
        "date": "1952-03-21T16:32:26.088Z",
        "age": 69
      },
      "registered": {
        "date": "2012-07-17T21:58:17.922Z",
        "age": 9
      },
      "phone": "(694)-268-8474",
      "cell": "(446)-092-0577",
      "id": {
        "name": "BSN",
        "value": "46136317"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/32.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/32.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/32.jpg"
      },
      "nat": "NL"
    },
    {
      "gender": "female",
      "name": {
        "title": "Miss",
        "first": "Peterke",
        "last": "Van der Poll"
      },
      "location": {
        "street": {
          "number": 2014,
          "name": "Cacaomolen"
        },
        "city": "Sint Annen",
        "state": "Gelderland",
        "country": "Netherlands",
        "postcode": 13501,
        "coordinates": {
          "latitude": "-16.3165",
          "longitude": "90.7387"
        },
        "timezone": {
          "offset": "+4:30",
          "description": "Kabul"
        }
      },
      "email": "peterke.vanderpoll@example.com",
      "login": {
        "uuid": "66790f41-8bb7-4a25-a52c-babc1a34c408",
        "username": "purplebutterfly854",
        "password": "script",
        "salt": "HQUQOLkx",
        "md5": "1d219f16e29c50d72c010255fe021a83",
        "sha1": "105a07285f16d0f7f9528292ffd9bfcd3c5ec997",
        "sha256": "fd0cb3d499630e8f0209a1ac69a34a33eaa4b9cec7588dee540d36a0159bb702"
      },
      "dob": {
        "date": "1966-04-05T01:11:30.883Z",
        "age": 55
      },
      "registered": {
        "date": "2012-11-27T08:54:26.858Z",
        "age": 9
      },
      "phone": "(016)-332-9453",
      "cell": "(077)-302-1191",
      "id": {
        "name": "BSN",
        "value": "58435348"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/88.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/88.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/88.jpg"
      },
      "nat": "NL"
    },
    {
      "gender": "female",
      "name": {
        "title": "Mrs",
        "first": "Jaimey",
        "last": "Crommentuijn"
      },
      "location": {
        "street": {
          "number": 1317,
          "name": "Bestevaerplein"
        },
        "city": "De Friese Meren",
        "state": "Noord-Holland",
        "country": "Netherlands",
        "postcode": 22945,
        "coordinates": {
          "latitude": "34.2197",
          "longitude": "88.3901"
        },
        "timezone": {
          "offset": "+6:00",
          "description": "Almaty, Dhaka, Colombo"
        }
      },
      "email": "jaimey.crommentuijn@example.com",
      "login": {
        "uuid": "ba926ca1-d69e-4129-a54f-7860bc50322f",
        "username": "bluepanda408",
        "password": "flint",
        "salt": "3FjFBaUh",
        "md5": "26a4d4979d6345aa92bcfe77433ac236",
        "sha1": "e6a332c5081ded7dafdaa3be7f759dad8f3dc98c",
        "sha256": "597cc8705db0036d9a7194ce9a8f010a3683004f59a73409846b8f3379eb25b2"
      },
      "dob": {
        "date": "1955-10-30T06:43:28.243Z",
        "age": 66
      },
      "registered": {
        "date": "2005-02-25T20:39:43.237Z",
        "age": 16
      },
      "phone": "(004)-454-1144",
      "cell": "(384)-930-2631",
      "id": {
        "name": "BSN",
        "value": "05391319"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/1.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/1.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/1.jpg"
      },
      "nat": "NL"
    },
    {
      "gender": "female",
      "name": {
        "title": "Ms",
        "first": "Müge",
        "last": "Stiphout"
      },
      "location": {
        "street": {
          "number": 337,
          "name": "Albers Pistoriusweg"
        },
        "city": "Overasselt",
        "state": "Friesland",
        "country": "Netherlands",
        "postcode": 35948,
        "coordinates": {
          "latitude": "-68.6639",
          "longitude": "8.7609"
        },
        "timezone": {
          "offset": "-3:00",
          "description": "Brazil, Buenos Aires, Georgetown"
        }
      },
      "email": "muge.stiphout@example.com",
      "login": {
        "uuid": "d65856e4-f629-4c22-aa2e-82870b252b53",
        "username": "organiczebra780",
        "password": "guitar",
        "salt": "8ySY5IoE",
        "md5": "8e893ff77a142a846d2939ede6787a62",
        "sha1": "520e5d5b64a1123375d0edceb6bffccc031e644e",
        "sha256": "fd90d492171a7cc7149668747af191eb123b7469bb5d5c5a7adeacb08bb73355"
      },
      "dob": {
        "date": "1946-06-02T15:17:17.491Z",
        "age": 75
      },
      "registered": {
        "date": "2008-07-13T16:36:19.848Z",
        "age": 13
      },
      "phone": "(094)-192-7825",
      "cell": "(830)-704-5271",
      "id": {
        "name": "BSN",
        "value": "63439305"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/62.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
      },
      "nat": "NL"
    },
    {
      "gender": "female",
      "name": {
        "title": "Miss",
        "first": "Everdine",
        "last": "Onstein"
      },
      "location": {
        "street": {
          "number": 8666,
          "name": "Folkertsgreft"
        },
        "city": "Drempt",
        "state": "Limburg",
        "country": "Netherlands",
        "postcode": 76449,
        "coordinates": {
          "latitude": "-59.8214",
          "longitude": "-173.9070"
        },
        "timezone": {
          "offset": "-3:00",
          "description": "Brazil, Buenos Aires, Georgetown"
        }
      },
      "email": "everdine.onstein@example.com",
      "login": {
        "uuid": "00668611-764d-47f5-83a5-2095f341f3ba",
        "username": "sadzebra577",
        "password": "bobbie",
        "salt": "xDq4Y8Z9",
        "md5": "1f8523a6ec62b341a44297e0238a69d6",
        "sha1": "05892c17f3a5b57b7bbf04e0c470a47ee2da9514",
        "sha256": "1b5d6e7782b1686ce59d9b90c54e86fb4f790a839878cdea6f2d21358847f257"
      },
      "dob": {
        "date": "1968-11-01T15:05:19.447Z",
        "age": 53
      },
      "registered": {
        "date": "2008-11-11T20:57:02.838Z",
        "age": 13
      },
      "phone": "(243)-736-1483",
      "cell": "(118)-769-5858",
      "id": {
        "name": "BSN",
        "value": "45021139"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/9.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/9.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/9.jpg"
      },
      "nat": "NL"
    }
  ]