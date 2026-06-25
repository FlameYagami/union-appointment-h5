/**
 * 核心安全加固逻辑
 */
export function useSecurity() {
    // 无限 debugger 陷阱：如果打开控制台，页面会卡死在断点处
    const initDebugTrap = () => {
        const trap = () => {
            try {
                (function () {
                    return false;
                })
                ['constructor']('debugger')
                ['call']();
            } catch (e) { }

            setTimeout(trap, 10);
        };

        trap();
    };

    // 禁用开发者工具快捷键 (F12, Ctrl+Shift+I, Ctrl+U等)
    const disableKeydown = () => {
        document.onkeydown = (e) => {
            const { keyCode, ctrlKey, shiftKey, metaKey } = e;
            // F12 (123)
            // Ctrl+Shift+I (73)
            // Ctrl+Shift+J (74)
            // Ctrl+Shift+C (67)
            // Ctrl+U (85) 查看源码
            // Ctrl+S (83) 保存网页
            const isForbidden =
                keyCode === 123 ||
                ((ctrlKey || metaKey) && shiftKey && [73, 74, 67].includes(keyCode)) ||
                ((ctrlKey || metaKey) && [85, 83].includes(keyCode));

            if (isForbidden) {
                e.preventDefault();
                return false;
            }
        };
    };

    // 清理控制台（可选）
    const clearConsole = () => {
        const _clear = () => {
            console.clear();
            setTimeout(() => {
                _clear();
            }, 2000);
        };

        _clear();
    };

    // 执行初始化
    const init = () => {
        /* 不同的项目最好使用不同的调试暗号 */
        const _0x1a2a = '_0x1a2a';
        // 检查 URL 是否包含特定的调试暗号
        const _search = window.location.search;
        if (_search) {
            const _0x1a2b = _search
                .slice(1)
                .split('&')
                .map((s) => s.split('='))
                .find(([k, v]) => k === '_0x1a2b')?.[1];

            if (_0x1a2b === _0x1a2a) return; // 直接跳出，不执行任何防调试逻辑
        }

        // 仅在生产环境生效，避免影响本地开发体验
        if (import.meta.env.MODE === 'production') {
            initDebugTrap();
            disableKeydown();
            clearConsole();
            console.log('%cSecurity System Active', 'color: red; font-size: 20px; font-weight: bold;');
        }
    };

    init();
}
