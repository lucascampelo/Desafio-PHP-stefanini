<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/** @var Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'funcionarios'], function() use ($router) {

    // Rotas para "/funcionarios"
    $router->get('/', ['uses' => 'FuncionarioController@showAll']);
    $router->get('/{id}', ['uses' => 'FuncionarioController@show']);
    $router->post('/', ['uses' => 'FuncionarioController@create']);
    $router->delete('/{id}', ['uses' => 'FuncionarioController@delete']);
    $router->put('/{id}', ['uses' => 'FuncionarioController@update']);

    $router->group(['prefix' => '{funcionarioId}/dependentes'], function() use ($router) {

        // Rotas para "/funcionarios/{funcionarioId}/dependentes"
        $router->get('/', ['uses' => 'DependenteController@showAll']);
        $router->get('/{id}', ['uses' => 'DependenteController@show']);
        $router->post('/', ['uses' => 'DependenteController@create']);
        $router->delete('/{id}', ['uses' => 'DependenteController@delete']);
        $router->put('/{id}', ['uses' => 'DependenteController@update']);
    });

});
