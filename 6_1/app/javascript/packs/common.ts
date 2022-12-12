// 翻訳
export { t };
const t = (arg: any, options: {} = null): any => {
  return (<any>window).I18n.t(arg, options);
};
