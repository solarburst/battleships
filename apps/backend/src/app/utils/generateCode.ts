export const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const codeLength = 10;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
        const character = Math.floor(Math.random() * characters.length);

        code += characters.substring(character, character + 1);
    }

    return code;
};
