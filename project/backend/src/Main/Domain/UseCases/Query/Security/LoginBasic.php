<?php

declare(strict_types=1);

namespace App\Main\Domain\UseCases\Query\Security;

use App\Main\Application\UseCases\Querys\Security\LoginBasicQuery;
use App\Main\Domain\Repository\Interfaces\Security\LoginBasicInterface;

final readonly class LoginBasic
{

    public function __construct(
        private LoginBasicInterface $baseSearch,
    ) {}

    public function __invoke(LoginBasicQuery $query): array
    {
        return $this->baseSearch->verify("");
    }
}
