class PasswordUtils
{
  static readonly PASSWORD_REGEX = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,32}$/;

  public static getRegexString(): string
  {
    return PasswordUtils.PASSWORD_REGEX.source;
  }

  public static isValid(password: string): boolean
  {
    return this.PASSWORD_REGEX.test(password);
  }

  public static generateStrongPassword(length: number = 12): string
  {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++)
    {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  public static calculateStrength(password: string): string
  {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^A-Za-z\d]/)) strength++;

    switch (strength)
    {
      case 5: return 'Muito forte';
      case 4: return 'Forte';
      case 3: return 'Moderada';
      default: return 'Fraca';
    }
  }

  public static isDifferent(newPassword: string, oldPassword: string): boolean
  {
    return newPassword !== oldPassword;
  }
}

export default PasswordUtils;
