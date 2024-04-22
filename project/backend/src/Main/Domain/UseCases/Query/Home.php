<?php

declare(strict_types=1);

namespace App\Main\Domain\UseCases\Query;

use App\Main\Application\UseCases\Querys\Home\HomeQuery;
use App\Main\Domain\Repository\Interfaces\HomeInterface;

final readonly class Home
{

    public function __construct(
        private HomeInterface $baseSearch,
    ) {}

    public function __invoke(HomeQuery $query): array
    {
        return $this->baseSearch->search();
    }
}
