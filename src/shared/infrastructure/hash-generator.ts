import * as bcrypt from 'bcrypt';

export class HashManager {
  async generateHash(content: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedContent = await bcrypt.hash(content, salt);
    return hashedContent;
  }

  async compare(content: string, hash: string): Promise<boolean> {
    const compareResult = await bcrypt.compare(content, hash);
    return compareResult;
  }
}
