<?php

declare(strict_types=1);

namespace App\Main\Application\Controller\Health;

use App\Main\Application\UseCases\Command\Health\FakerCommand;
use App\Shared\Domain\StandardApiResponse;
use App\Shared\Infrastructure\Symfony\ApiController;
use Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class FakerController extends ApiController
{
    public function __invoke(Request $request): JsonResponse
    {
        $content = $this->paramsRequest->requestParameters($request);

        $this->dispatch(FakerCommand::create($content));
        return (new StandardApiResponse(
            data: [],
            message:'facker command success',
            code: 200
        ))->__invoke();
    }

    protected function exceptions(): array
    {
        return [
            Exception::class => 500,
        ];
    }
}
