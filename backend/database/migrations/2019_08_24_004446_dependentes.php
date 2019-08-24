<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Dependentes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dependentes', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->unsignedBigInteger('funcionario_id');
            $table->string('nome_completo');
            $table->enum('sexo', ['f', 'm']);
            $table->string('cpf', 11)->unique()->nullable();
            $table->date('data_nascimento')->nullable();
            $table->text('anotacoes')->nullable();
            $table->timestamps();

            $table->foreign('funcionario_id')->references('id')->on('funcionarios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('dependentes');
    }
}
