<?php
namespace App\Interfaces;

use App\Entity\Cart;

interface CartInterface
{
    public function add( array $params);

    public function list($limit);

}