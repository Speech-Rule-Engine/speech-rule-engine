export const MathMaps: Map<string, {[path: string]: any}> = new Map();

export const preloadLocales = async function(locale: string) {
  console.log(`Preloading locale ${locale} from bundle.`);
  const json = MathMaps.get(locale);
  return json ? new Promise((res, _rej) => res(JSON.stringify(json))) : '{}';
};

