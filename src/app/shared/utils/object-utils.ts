import { ViewModel } from 'app/core/models/base/view-model.types';
import StringUtils from 'app/shared/utils/string-utils';
import ArrayUtils from 'app/shared/utils/array-utils';

class ObjectUtils
{
  /**
   * Obtém o valor de uma propriedade de um objeto. Lança um erro se a propriedade não existir,
   * a menos que um valor padrão seja fornecido.
   * @param obj O objeto.
   * @param prop A propriedade a ser verificada no objeto.
   * @param defaultValue Um valor padrão opcional a ser retornado se a propriedade não existir.
   * @returns O valor da propriedade, ou o valor padrão, ou lança um erro.
   */
  static getPropValue<T extends Object, K extends keyof T>( obj: T, prop: K, defaultValue?: T[K] ): T[K]
  {
    if (prop in obj)
    {
      return obj[prop];
    }

    if (defaultValue !== undefined)
    {
      return defaultValue;
    }

    throw new Error(`Propriedade '${prop.toString()}' não encontrada no objeto.`);
  }

  static deepClone<T>(obj: T): T
  {
    return JSON.parse(JSON.stringify(obj));
  }

  static isObjectEmpty(obj: object): boolean
  {
    return Object.keys(obj).length === 0;
  }

  static isEqual<T>(obj1: T, obj2: T): boolean
  {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  static isEqualById<T extends ViewModel>(obj1: T, obj2: T): boolean
  {
    return ObjectUtils.getPropValue(obj1, 'id') === ObjectUtils.getPropValue(obj2, 'id');
  }
}

export default ObjectUtils;
