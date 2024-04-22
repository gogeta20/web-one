<?php
declare(strict_types=1);
namespace App\Main\Application\Controller\Home;

use App\Main\Application\UseCases\Querys\Home\HomeQuery;
use App\Main\Domain\Exception\StoreException;
use App\Shared\Domain\BaseResponse;
use App\Shared\Domain\StandardApiResponse;
use App\Shared\Infrastructure\Symfony\ApiController;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

class HomeController extends ApiController
{
    public function __invoke(): JsonResponse
    {
        /** @var BaseResponse $response */
        $response = $this->ask(
            new HomeQuery()
        );

        return (new StandardApiResponse(
            data: $response->data(),
            message: $response->message(),
            code: $response->status()
        ))->__invoke();
    }

    protected function exceptions(): array
    {
        return [
            StoreException::class => 500,
            Exception::class => 503,
        ];
    }
}
