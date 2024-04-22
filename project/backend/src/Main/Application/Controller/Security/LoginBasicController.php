<?php

declare(strict_types=1);

namespace App\Main\Application\Controller\Security;

use App\Main\Application\UseCases\Querys\Security\LoginBasicQuery;
use App\Shared\Domain\BaseResponse;
use App\Shared\Domain\StandardApiResponse;
use App\Shared\Infrastructure\Symfony\ApiController;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;


class LoginBasicController extends ApiController
{
    public function __invoke(): JsonResponse
    {
        /** @var BaseResponse $response */
        $response = $this->ask(
            new LoginBasicQuery()
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
            Exception::class => 500,
        ];
    }
}
