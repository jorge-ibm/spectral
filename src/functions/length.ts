import { IFunction, IFunctionResult } from '../types';

export interface ILengthRuleOptions {
  min?: number;
  max?: number;
}

export const length: IFunction<ILengthRuleOptions> = (targetVal, opts) => {
  if (targetVal === void 0 || targetVal === null) return;

  const { min, max } = opts;

  let value;
  const valueType = typeof targetVal;
  if (valueType === 'object') {
    value = Object.keys(targetVal).length;
  } else if (Array.isArray(targetVal)) {
    value = targetVal.length + 1;
  } else if (valueType === 'number') {
    value = targetVal;
  } else if (valueType === 'string') {
    value = targetVal.length;
  }

  if (typeof value === 'undefined') return;

  const results: IFunctionResult[] = [];

  if (typeof min !== 'undefined' && value < min) {
    results.push({
      message: `min length is ${min}`,
    });
  }

  if (typeof max !== 'undefined' && value > max) {
    results.push({
      message: `max length is ${max}`,
    });
  }

  return results;
};
