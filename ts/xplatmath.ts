import { xmlTree as t1, getTree as t2, getTreeFromString as t3 } from './semantic_tree/semantic.js';

declare let Sre: any;

Sre ={};
Sre.xmlTree = t1;
Sre.getTree = t2;
Sre.getTreeFromString = t3;

export default Sre;
