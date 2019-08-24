<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FuncionarioController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        //
    }

    public function showAll()
    {
        return Funcionario::all();
    }

    public function show($id = null)
    {
        if (empty($id)) {
            throw new NotFoundHttpException("Funcionário não encontrado");
        }

        try {
            $funcionario = Funcionario::findOrFail($id);
            return $funcionario;
        } catch (ModelNotFoundException $e) {
            throw new NotFoundHttpException("Funcionário não encontrado", $e, 404);
        } catch (\Exception $e) {
            throw new BadRequestHttpException("Um erro inexperado ocorreu. Tente novamente mais tarde.");
        }
    }
}
