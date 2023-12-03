class PasswordUtils {
  private static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  public static isValid(password: string): boolean {
    return this.PASSWORD_REGEX.test(password);
  }

  public static generateStrongPassword(length: number = 12): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  public static calculateStrength(password: string): string {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^A-Za-z\d]/)) strength++;

    switch (strength) {
      case 5: return 'Muito forte';
      case 4: return 'Forte';
      case 3: return 'Moderada';
      default: return 'Fraca';
    }
  }

  public static isDifferent(newPassword: string, oldPassword: string): boolean {
    return newPassword !== oldPassword;
  }
}

export default PasswordUtils;
