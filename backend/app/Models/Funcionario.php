<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome_completo',
        'email',
        'cpf',
        'data_nascimento',
        'linkedin',
        'anotacoes',
    ];

    protected $dates = [
        'data_nascimento'
    ];
}
