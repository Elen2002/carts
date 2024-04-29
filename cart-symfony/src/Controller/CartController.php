<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Form\CartType;
use App\Interfaces\CartInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'app_cart_api_')]

class CartController extends AbstractController
{
    #[Route('/add/cart', name: 'add')]
    public function add(Request $request, CartInterface $cartService): Response
    {
       $params = array_merge($request->request->all(), $request->query->all());
        $result = $cartService->add($params);
        return new JsonResponse($result);
    }
    #[Route('/list', name: 'list')]
    public function list(Request $request, CartInterface $cartService): Response
    {
        $params = array_merge($request->request->all(), $request->query->all());
        $carts = $cartService->list(2);
        return new JsonResponse(["status" => 'ok', 'cart' => $carts]);
    }
}