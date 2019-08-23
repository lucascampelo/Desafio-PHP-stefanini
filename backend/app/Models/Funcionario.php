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
        'nomeCompleto',
        'email',
        'cpf',
        'linkedin',
        'anotacoes',
    ];

    protected $dates = [
        'dataNascimento'
    ];
}
