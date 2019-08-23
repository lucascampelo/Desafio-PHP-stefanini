<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Funcionarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->bigIncrements('id')->autoIncrement();
            $table->string('nome_completo')->nullable(false);
            $table->string('email')->unique();
            $table->string('cpf', 11)->unique()->nullable(false);
            $table->date('data_nascimento');
            $table->string('linkedin');
            $table->text('anotacoes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('funcionarios');
    }
}
