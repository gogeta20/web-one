<?php

declare(strict_types=1);

namespace App\Main\Application\UseCases\Command\Health;

use App\Main\Domain\UseCases\Command\Health\Faker;
use App\Shared\Domain\Bus\Command\CommandHandler;
use App\Shared\Domain\Interfaces\TranslateInterfaceCustom;

final class FakerCommandHandler implements CommandHandler
{
    public function __construct(
        private readonly Faker $faker,
        protected TranslateInterfaceCustom $translatorCustom
    ) {
    }

    public function __invoke(FakerCommand $command): void
    {
        $this->faker->__invoke($command);
    }
}
