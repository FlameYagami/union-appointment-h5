import JSEncrypt from 'jsencrypt/bin/jsencrypt.min';

// 密钥对生成 http://web.chacuo.net/netrsakeypair

// const publicKey =
//   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+BsLujSBdZN1dAYeoNZwzHYmA97mZk72EhQUO5IiaInRPsi0KXRVLpQ7by' +
//   'dz+WluoAixDXYkRAp0aa7eaby825Tli5OlJQj+i0US457lnM8h3xrFZMsEqp6TDNaTvk1pecqb/92YRjaLLZ5fCIQXftRDMOnUeeh8I/TJNs6ZZdE1K' +
//   '10cWGONa7H1LvhI9SCH6NP0drxB+bn4GZtMrSV7PafnDkMU2+CiSNfxu3/pJQG3UlpIJeFD9LfDSxi/LjwmjsBRCD6z921nZ3M85k' +
//   '6RHODL07fqk1AH1oWnjXqGqx0zl6/sTmv+xT/M/1SR4MdrQ6ngVojWLTZO8aZ6g07ATwIDAQAB';
// const privateKey =
//   'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY\n' +
//   '7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN\n' +
//   'PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA\n' +
//   'kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow\n' +
//   'cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv\n' +
//   'DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh\n' +
//   'YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3\n' +
//   'UP8iWi1Qw0Y=';

// 加密
export function rsaEncrypt(txt, publicKey) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
// export function decrypt(txt) {
//   const encryptor = new JSEncrypt();
//   encryptor.setPrivateKey(privateKey); // 设置私钥
//   return encryptor.decrypt(txt); // 对数据进行解密
// }
