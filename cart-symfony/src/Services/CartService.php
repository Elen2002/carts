<?php


namespace App\Services;


use App\Entity\Cart;
use App\Interfaces\CartInterface;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManager;
use PHPUnit\Util\Exception;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Contracts\Translation\TranslatorInterface;

class CartService implements CartInterface
{

    /**
     * @var EntityManagerInterface
     */
    protected $em;
    public function __construct(EntityManagerInterface $em){
       $this->em = $em;
    }


    public function add(array $params)
    {
        $cart = new Cart();
        if(empty($params['number'])){
            $result = ["status" => 'error', 'message' => 'Number is missing'];
            return $result;
        }elseif (empty($params['date'])){
            $result = ["status" => 'error', 'message' => 'Data is missing'];
            return $result;
        }elseif (empty($params['cvv'])){
            $result = ["status" => 'error', 'message' => 'cvv is missing'];
            return $result;
        }else{
        $cart->setDate($params['date']);
        $cart->setNumber((int)$params['number']);
        $cart->setCvv((int)$params['cvv']);
        $this->em->persist($cart);
        $this->em->flush();
    }
        $result = ["status" => 'ok', 'message' => $cart];
        return  $result;

    }

    public function list($limit = '')
    {
        /**
         * @var CartRepository $repo
         */
        $repo = $this->em->getRepository(Cart::class);
        $carts = $repo->getCarts($limit);
        foreach ($carts as &$cart){
            $number= str_split($cart['number'], 4);
            $cart['shortNum']=end($number);
        }
        return $carts;
    }


}