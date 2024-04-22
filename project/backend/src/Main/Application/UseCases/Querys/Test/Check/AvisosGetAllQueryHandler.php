<?php

declare(strict_types=1);

namespace App\Main\Application\UseCases\Querys\Test\Check;

use App\Main\Domain\UseCases\Query\Test\AvisosGetAll;
use App\Shared\Domain\BaseResponse;
use App\Shared\Domain\Bus\Query\QueryHandler;
use App\Shared\Domain\Interfaces\TranslateInterfaceCustom;
use Symfony\Component\HttpFoundation\Response;

final class AvisosGetAllQueryHandler implements QueryHandler
{
    public function __construct(
        private readonly AvisosGetAll $avisosGetAll,
        protected TranslateInterfaceCustom $translatorCustom
    ) {
    }

    public function __invoke(AvisosGetAllQuery $query): BaseResponse
    {
        $result =  $this->avisosGetAll->__invoke($query);
        list($status, $message, $data) = $this->resolveResponseParams($result);
        $response = new BaseResponse($data);
        $response->setStatus($status);
        $response->setMessage($message);
        return $response;
    }

    private function resolveResponseParams(array $result): array
    {
        if (empty($result)) {
            $message = $this->translatorCustom->translate('empty', [], 'basicos');
        } else {
            $message = $this->translatorCustom->translate('success', [], 'basicos');
        }
        $status =  Response::HTTP_OK;
        $data = $result;
        return array($status, $message, $data);
    }
}
