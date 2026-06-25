/**
 * 字符索引映射器
 */
class CharIndexMapper {
    /**
     * 下标 -> 字符
     * @type {string[]}
     * @private
     */
    charList;

    /**
     * 字符 -> 下标
     * @type {Map<string, number>}
     * @private
     */
    charMap = new Map();

    /**
     * 构造函数
     * @param {string | string[]} [chars] - 自定义字符集，如果未提供则使用可复现的随机字符集
     * @param {string} [seed='default-seed'] - 随机数种子
     */
    constructor(chars, seed = 'default-seed') {
        // 默认使用可复现随机字符集
        const source = chars ?? CharIndexMapper.createAlphaNumericChars(seed);

        this.charList = Array.isArray(source) ? source : [...source];

        this.charList.forEach((char, index) => {
            if (this.charMap.has(char)) {
                throw new Error(`存在重复字符: ${char}`);
            }

            this.charMap.set(char, index);
        });
    }

    /**
     * 获取字符对应下标
     * @param {string} char
     * @returns {number}
     */
    getIndex(char) {
        const index = this.charMap.get(char);

        if (index === undefined) {
            throw new Error(`字符不存在: ${char}`);
        }

        return index;
    }

    /**
     * 获取字符串所有字符对应下标
     * @param {string} text
     * @returns {number[]}
     */
    getIndexes(text) {
        return [...text].map((char) => this.getIndex(char));
    }

    /**
     * 根据下标获取字符
     * @param {number} index
     * @returns {string}
     */
    getChar(index) {
        const char = this.charList[index];

        if (char === undefined) {
            throw new Error(`下标不存在: ${index}`);
        }

        return char;
    }

    /**
     * 根据下标数组恢复字符串
     * @param {number[]} indexes
     * @returns {string}
     */
    getText(indexes) {
        return indexes.map((index) => this.getChar(index)).join('');
    }

    /**
     * 获取字符集
     * @returns {string}
     */
    getCharset() {
        return this.charList.join('');
    }

    /**
     * 字符集长度
     * @returns {number}
     */
    size() {
        return this.charList.length;
    }

    /**
     * 创建可复现随机字符集
     * @param {string} seed
     * @returns {string}
     */
    static createAlphaNumericChars(seed) {
        const chars = [
            ...this.range(97, 122), // a-z
            ...this.range(65, 90), // A-Z
            ...this.range(48, 57) // 0-9
        ];

        return this.seedShuffle(chars, seed).join('');
    }

    /**
     * Seed 随机洗牌
     * @template T
     * @param {T[]} array
     * @param {string} seed
     * @returns {T[]}
     * @private
     */
    static seedShuffle(array, seed) {
        const result = [...array];

        const random = this.createSeedRandom(seed);

        for (let i = result.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(random() * (i + 1));

            [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
        }

        return result;
    }

    /**
     * Seed 随机数生成器（mulberry32）
     * @param {string} seed
     * @returns {() => number}
     * @private
     */
    static createSeedRandom(seed) {
        let h = 1779033703 ^ seed.length;

        for (let i = 0; i < seed.length; i++) {
            h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
            h = (h << 13) | (h >>> 19);
        }

        return function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);

            const t = (h ^= h >>> 16) >>> 0;

            return t / 4294967296;
        };
    }

    /**
     * ASCII 范围生成
     * @param {number} start
     * @param {number} end
     * @returns {string[]}
     * @private
     */
    static range(start, end) {
        const result = [];

        for (let i = start; i <= end; i++) {
            result.push(String.fromCharCode(i));
        }

        return result;
    }
}

export default CharIndexMapper;
