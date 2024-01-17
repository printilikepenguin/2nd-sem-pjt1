# 프로젝트 실행방법

```
$ npm create vite@latest
$ cd vite-project
$ npm install
$ npm install -D vite-plugin-pwa
$ npm run dev
```

일단 다 썼는데 파일 받으시면 그냥 npm install 하고 run dev 바로 하시면 됩니당

# 규칙

1. 폴더는 소문자로 써서 생성해주세요.
2. 페이지명은 파스칼로 써주세요 예시: HomePage. 
3. 컴포넌트는 용도별로 디렉토리 나눠주세요.
4. 탭사이즈는 4개로 해주세요.

# React + TypeScript + Vite

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
