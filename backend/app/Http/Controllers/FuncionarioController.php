<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;

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
}
