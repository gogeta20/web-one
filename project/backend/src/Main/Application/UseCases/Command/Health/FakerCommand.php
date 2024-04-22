<?php

declare(strict_types=1);

namespace App\Main\Application\UseCases\Command\Health;

use App\Shared\Domain\Bus\Command\Command;

readonly class FakerCommand implements Command
{
    public static function create(array $parameters): self
    {
        return new self(
            entity: $parameters['entity'],
        );
    }

    public function __construct(
        public string $entity,
    ) {
    }
}
