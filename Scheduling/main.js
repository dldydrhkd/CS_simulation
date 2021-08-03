import {process} from './Process.js';
import {fcfs_scheduler} from './FCFS_scheduler.js';
import { pq_scheduler } from './PQ_scheduler.js';

// //mission1
let a = new process('A',3,1,'single');
let b = new process('B',5,1,'single');
let c = new process('C',7,1,'single');
let d = new process('D',8,1,'single');
let e = new process('D',4,1,'single');
let fifo = new fcfs_scheduler([a,b,c,d,e]);
fifo.scheduling();

// mission2
// 우선순위는 숫자가 작을수록 먼저 실행됩니다.
a = new process('A',3,2,'multi');
b = new process('B',5,1,'multi');
c = new process('C',13,4,'multi');
d = new process('D',5,5,'multi');
e = new process('E',10,3,'multi');
let pq = new pq_scheduler([a,b,c,d,e]);
pq.scheduling();
