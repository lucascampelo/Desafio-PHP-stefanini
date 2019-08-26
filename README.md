# Desafio PHP

## Objetivo
Este repositório tem como objetivo comprovar proficiência técnica em Desenvolvimento e Engenharia de Software descritos no arquivo [`instrucoes.md`](./instrucoes.md), a pedido Tatiane Vieira.
Você pode ver a minha lista pessoal de itens a fazer em [`todo.md`](./todo.md).

## Tecnologias e Versões
- PHP 7.3.8
	- Lumen 5.8.12
- Node 10.16.3
	- Angular 8.2.3
	- Twitter Bootstrap 4.3.1
- SQLite 3

Vários outros pacotes foram utilizados. Para mais detalhes de versões e bibliotecas utilizadas, consulte os arquivos `composer.lock` e `package-lock.json` no repositório.

## Instalação

### Backend
Navegue para a pasta `backend` e rode os comandos a seguir.

Instalação das dependências:
```shell
$ composer install && composer run-script post-root-package-install
```

Criar a estrutura do banco de dados:
```shell
$ php artisan migrate
```

(Opcional) Preencher o banco dados com **dados de teste**:
```shell
$ php artisan db:seed
```

E para iniciar o serviço de API web, rode o comando:
```shell
$ php -S 0.0.0.0:8080 -t public/
```
Mantenha este terminal aberto.

### Frontend
Abra outro  para o **frontend**, navegue para a pasta `frontend` e rode o comando abaixo:
```shell
$ npm install	
```

E para iniciar a navegação na interface web, rode o comando:
```shell
$ npm run start
```
Com os dois terminais abertos, você pode acessar o endereço [http://localhost:4200/](http://localhost:4200/).

## Testes
Para rodar os testes automatizados, você pode rodar os comandos baixo:

Na pasta `backend`:
```shell
$ php vendor/bin/phpunit
```

Na pasta `frontend` (siga as instruções do terminal):
```shell
$ npm run test
```