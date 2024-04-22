<?php

declare(strict_types=1);

namespace App\Main\Domain\UseCases\Query\Test;

use App\Main\Application\UseCases\Querys\Test\Check\AvisosGetAllQuery;
use App\Shared\Domain\Interfaces\TranslateInterfaceCustom;

final class AvisosGetAll
{

    public function __construct(
        protected TranslateInterfaceCustom $translatorCustom,
    )
    {
    }

    public function __invoke(AvisosGetAllQuery $query): array
    {
        return ["name"=>'check'];
    }
}
