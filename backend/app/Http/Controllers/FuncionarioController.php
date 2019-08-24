<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FuncionarioController extends Controller
{
    /**
     * Lista todos os Funcionários
     */
    public function showAll()
    {
        // Lista tudo sem paginação
        return Funcionario::all();
    }

    /**
     * Busca por um funcionário e mostra as informações do mesmo
     *
     * @param int $id ID do Funcionário no banco de dados
     *
     * @return Funcionario
     */
    public function show($id = null)
    {
        if (empty($id)) {
            throw new NotFoundHttpException("Funcionário não encontrado");
        }

        try {
            /** @var Funcionario $funcionario */
            $funcionario = Funcionario::findOrFail($id);
            return $funcionario;
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException("Funcionário não encontrado", $e, 404);
        }
    }

    /**
     * Cria um novo Funcionário no Sistema
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     *
     * @throws ValidationException
     */
    public function create(Request $request)
    {
        // Valida a requisição, e já mostra os erros se houverem (HttpCode: 422)
        $this->validate($request, [
            'nome_completo'   => 'required',
            'email'           => 'email|unique:funcionarios',
            'cpf'             => 'unique:funcionarios',
            'data_nascimento' => 'date',
            'linkedin'        => 'url',
        ]);

        /** @var Funcionario $funcionario */
        $funcionario = Funcionario::create($request->all());

        return response()->json($funcionario, 201);
    }

    /**
     * Apaga um funcionário do sistema
     *
     * @param int $id ID do funcionário no Banco de Dados
     *
     * @return \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory
     */
    public function delete($id = null)
    {
        Funcionario::findOrFail($id)->delete();
        return response([
            'success' => true,
            'message' => 'Funcionário apagado com sucesso.',
        ], 200);
    }

    /**
     * Atualiza os dados de um funcionário
     *
     * @param int $id ID do funcionário no Banco de Dados
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id = null, Request $request)
    {
        $funcionario = Funcionario::findOrFail($id);
        $funcionario->update($request->all());

        return response()->json($funcionario, 200);
    }
}
