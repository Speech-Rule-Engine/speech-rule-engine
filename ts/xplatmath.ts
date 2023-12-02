import { xmlTree, getTree, getTreeFromString } from './semantic_tree/semantic.js';

declare let Sre: any;

Sre = {};
Sre.xmlTree = xmlTree;
Sre.getTree = getTree;
Sre.getTreeFromString = getTreeFromString;

export default Sre;
