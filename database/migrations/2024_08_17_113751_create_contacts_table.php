<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('contacts', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email');
      $table->string('phone')->nullable();
      $table->enum('category', ['制作に関するご相談', '外注・業務委託に関するご相談', '単価（料金）に関するお問い合わせ', 'その他']);
      $table->text('content');
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('contacts');
  }
};
