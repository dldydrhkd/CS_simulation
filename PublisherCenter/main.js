import { subscriber } from "./Subscriber.js";
import {PublisherCenterToSingleton} from "./Center.js";
import { publisher } from "./Publisher.js";

const center = new PublisherCenterToSingleton();                        // Center 생성
const center2 = new PublisherCenterToSingleton();
const center3 = center.sharedInstance();

console.log(`singleton인가? ${center === center2 && center2 === center3}`);

//publisher 생성
let albumModel = new publisher("albumModel", center);
let albumView = new publisher("albumView", center);
let albumController = new publisher("albumController", center);

// 구독자 생성

let A = new subscriber("A", "ModelDataChanged", "albumModel", center);
let B = new subscriber("B", "", "albumView", center);
let C = new subscriber("C", "DidShakeMotion", "albumController", center);
let D = new subscriber("D", "AllDataChanged", undefined, center);
let E = new subscriber("E", "", undefined, center);

// 구독자 추가

let sub_list = [A,B,C,D,E];
sub_list.forEach((sub) => sub.subscribe());

console.log("A,B,C,D,E 추가");
center.stringify();

console.log('A 제거');
center.removeSub("A");
center.stringify();

console.log('다시 추가');
A.subscribe();

// center 정보 출력
center.stringify();

//이벤트 발생
albumModel.sendEvent("ModelDataChanged", {data: "abc"});
albumView.sendEvent("viewUpdated", {view: "xxx"});
albumController.sendEvent("DidShakeMotion", {from:"blue"});