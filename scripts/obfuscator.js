/**
 * 加强代码混淆效果
 */
import obfuscator from 'vite-plugin-javascript-obfuscator';

export const createObfuscator = () => {
	return {
		...obfuscator({
			// 1. 基础配置
			compact: true, // 压缩代码为一行
			controlFlowFlattening: true, // 【核心】控制流扁平化，使逻辑极其复杂
			controlFlowFlatteningThreshold: 0.75, // 应用概率

			// 2. 字符串混淆（最能直观感受到的混淆）
			stringArray: true, // 启用字符串数组
			rotateStringArray: true, // 轮转字符串数组
			stringArrayThreshold: 0.75,

			// 3. 变量与标识符
			identifierNamesGenerator: 'hexadecimal', // 变量名生成十六进制字符 (如 _0x1a2b)
			renameGlobals: false, // 注意：通常不混淆全局变量，否则可能导致报错

			// 4. 注入防御代码
			selfDefending: true, // 开启自我防御，如果代码被格式化，会停止运行
			debugProtection: true, // 开启调试保护，打开控制台可能会卡死浏览器
			debugProtectionInterval: 2000, // 定期检查是否开启了调试
			disableConsoleOutput: true,

			// 5. 性能损耗权衡
			deadCodeInjection: true, // 注入死代码（会增大包体积）
			deadCodeInjectionThreshold: 0.4,
			// 【包含】：只混淆 匹配到的文件/目录
			// 这里的配置需要根据自己的项目调整目录

			include: [
				/src\/utils\/auth\/auth\.js/,
				/src\/utils\/auth\/crypto\.js/,
				/src\/lib\/chartMapper\.js/,
				/src\/auth\.config\.js/,
				/src\/store\/modules\/user/,
				/src\/interceptors\/route\.js/,
			],

			// 【排除】：排除 node_modules 和特定的工具类文件
			exclude: [/node_modules/],
		}),
		// 仅在生产环境打包时执行混淆
		apply: 'build', // 仅生产环境应用
	};
};
