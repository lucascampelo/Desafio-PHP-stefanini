<?php

namespace App\Http\Controllers;

use App\Models\Dependente;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DependenteController extends Controller
{
    /**
     * Lista todos os Depentenes de um devido Funcionário.
     *
     * @param null $funcionarioId
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function showAll($funcionarioId)
    {
        // Lista tudo sem paginação
        $dependentes = Dependente::all()->where('funcionario_id', '=', $funcionarioId)->toArray();

        // Reordena o Array, para evitar objeto associativo no serviço (sempre retorna um array de itens)
        sort($dependentes);

        return $dependentes;
    }

    /**
     * Busca por um dependente e mostra as informações do mesmo
     *
     * @param null $funcionarioId
     * @param int $id ID do Funcionário no banco de dados
     * @return Dependente
     */
    public function show($funcionarioId, $id)
    {
        if (empty($funcionarioId) || empty($id)) {
            throw new NotFoundHttpException("Dependente não encontrado");
        }

        try {
            return Dependente::where('funcionario_id', '=', $funcionarioId)->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException("Dependente não encontrado", $e, 404);
        }
    }

    /**
     * Cria um novo Dependente no Sistema
     *
     * @param int $funcionarioId ID do Funcionário no banco de dados
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create($funcionarioId, Request $request)
    {
        /** @var Funcionario $funcionario */
        $funcionario = Funcionario::find($funcionarioId);

        if (!$funcionario) {
            throw new NotFoundHttpException("Funcionário não encontrado");
        }

        // Valida a requisição, e já mostra os erros se houverem (HttpCode: 422)
        $this->validate($request, [
            'nome_completo'   => 'required',
            'sexo'            => 'required|in:f,m',
            'cpf'             => 'unique:dependentes',
            'data_nascimento' => 'date',
        ]);

        $data = $request->all();
        $data['funcionario_id'] = $funcionario->id;

        /** @var Dependente $dependente */
        $dependente = $funcionario->dependentes()->create($data);

        return response()->json($dependente, 201);
    }

    /**
     * Apaga um dependente do sistema
     *
     * @param int $funcionarioId ID do Funcionário no banco de dados
     * @param int $id ID do dependente no Banco de Dados
     * @return \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory
     */
    public function delete($funcionarioId, $id)
    {
        Dependente::where('funcionario_id', '=', $funcionarioId)->findOrFail($id)->delete();
        return response([
            'success' => true,
            'message' => 'Dependente apagado com sucesso.',
        ], 200);
    }

    /**
     * Atualiza os dados de um dependente
     *
     * @param int $funcionarioId ID do Funcionário no banco de dados
     * @param int $id ID do dependente no Banco de Dados
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($funcionarioId, $id, Request $request)
    {
        $dependente = Dependente::where('funcionario_id', '=', $funcionarioId)->findOrFail($id);

        // Valida a requisição, e já mostra os erros se houverem (HttpCode: 422)
        $this->validate($request, [
            'nome_completo'   => 'required',
            'sexo'            => 'required|in:f,m',
            'cpf'             => sprintf('unique:dependentes,cpf,%d,%s', $id, 'id'),
            'data_nascimento' => 'date',
        ]);

        $dependente->update($request->all());

        return response()->json($dependente, 200);
    }
}