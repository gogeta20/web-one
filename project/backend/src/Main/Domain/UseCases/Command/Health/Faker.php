<?php

declare(strict_types=1);

namespace App\Main\Domain\UseCases\Command\Health;

use App\Main\Application\UseCases\Command\Health\FakerCommand;
use App\Main\Domain\Repository\Interfaces\Health\FakerInterface;

final readonly class Faker
{

    public function __construct(
        private FakerInterface $baseSearch,
    ) {}

    public function __invoke(FakerCommand $command): array
    {
        $entity = $command->entity;
        return $this->baseSearch->createData($entity);
    }

}
