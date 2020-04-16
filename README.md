## React

Vamos criar uma aplicação em React, utilizando o Boilerplate oficial.

```
npm install -g create-react-app
npx create-react-app app
```

### Removendo arquivos desnecessários
Remover os arquivos listado abaixo, bem como suas referências: 
- src/App.css
- src/index.css
- src/logo.svg

Atualizar os arquivos abaixo, removendo a referência dos arquivos removidos:
- App.js
- index.js


### Running
```
cd app
npm install
yarn start
```

### Build
```
cd app
yarn build
```


## Packages

### Material UI

Para deixar nossa aplicação mais atraente, vamos utilizar o Material UI como Framework de CSS.

```
npm install @material-ui/core
```


### React Router

Controle de rotas da aplicação.

```
npm install react-router-dom --save
```


### AXIOS

Auxilia requisições HTTP.

```
npm install axios
```


### Styled Components

CSS em componentes.

```
npm install --save styled-components
```