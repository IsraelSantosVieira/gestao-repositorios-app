class StringUtils {

  static empty(): string
  {
    return '';
  }

  static isNullOrEmpty(str: string | null): boolean {
    return !str || str.trim().length === 0;
  }

  static stringToBool(str: string | null): boolean {
    return str != null && str.length > 0 &&
      str.toLowerCase() === 'true';
  }

  static capitalizeFirstLetter(str: string): string {
    if (StringUtils.isNullOrEmpty(str)) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export default StringUtils;
